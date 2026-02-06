import { useState, useEffect, useCallback, useRef } from 'react';

export interface GoldPrice {
  id: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  prevBuyPrice: number;
  prevSellPrice: number;
  changePercent: number;
  direction: 'up' | 'down' | 'neutral';
  lastUpdate: Date;
  unit: string;
}

export interface CurrencyRate {
  id: string;
  name: string;
  symbol: string;
  buyPrice: number;
  sellPrice: number;
  prevBuyPrice: number;
  prevSellPrice: number;
  changePercent: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface PriceHistory {
  timestamp: Date;
  price: number;
}

const BASE_PRICES: Record<string, { buy: number; sell: number; unit: string }> = {
  gram: { buy: 3245.50, sell: 3258.80, unit: '₺/gr' },
  ceyrek: { buy: 5302.00, sell: 5380.00, unit: '₺' },
  yarim: { buy: 10604.00, sell: 10720.00, unit: '₺' },
  tam: { buy: 21108.00, sell: 21340.00, unit: '₺' },
  cumhuriyet: { buy: 22050.00, sell: 22380.00, unit: '₺' },
  bilezik22: { buy: 3100.00, sell: 3145.00, unit: '₺/gr' },
  ayar14: { buy: 1920.00, sell: 1965.00, unit: '₺/gr' },
};

const BASE_CURRENCIES: Record<string, { buy: number; sell: number; symbol: string }> = {
  usd: { buy: 38.42, sell: 38.55, symbol: '$' },
  eur: { buy: 40.18, sell: 40.35, symbol: '€' },
};

const GOLD_NAMES: Record<string, string> = {
  gram: 'Gram Altın',
  ceyrek: 'Çeyrek Altın',
  yarim: 'Yarım Altın',
  tam: 'Tam Altın',
  cumhuriyet: 'Cumhuriyet Altını',
  bilezik22: '22 Ayar Bilezik',
  ayar14: '14 Ayar Altın',
};

const CURRENCY_NAMES: Record<string, string> = {
  usd: 'Amerikan Doları',
  eur: 'Euro',
};

function fluctuate(price: number, maxPercent: number = 0.15): number {
  const change = price * (maxPercent / 100) * (Math.random() * 2 - 1);
  return Math.round((price + change) * 100) / 100;
}

function generateHistory(basePrice: number, days: number): PriceHistory[] {
  const history: PriceHistory[] = [];
  const now = new Date();
  let price = basePrice * (1 - days * 0.0003);

  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - i);
    timestamp.setHours(10, 0, 0, 0);

    price = fluctuate(price, 0.5);
    history.push({ timestamp, price });
  }

  return history;
}

export function useGoldPrices() {
  const [prices, setPrices] = useState<GoldPrice[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const prevPricesRef = useRef<Map<string, { buy: number; sell: number }>>(new Map());

  const initializePrices = useCallback(() => {
    const goldPrices: GoldPrice[] = Object.entries(BASE_PRICES).map(([id, base]) => {
      const buy = fluctuate(base.buy, 0.05);
      const sell = fluctuate(base.sell, 0.05);
      prevPricesRef.current.set(id, { buy, sell });
      return {
        id,
        name: GOLD_NAMES[id],
        buyPrice: buy,
        sellPrice: sell,
        prevBuyPrice: buy,
        prevSellPrice: sell,
        changePercent: 0,
        direction: 'neutral' as const,
        lastUpdate: new Date(),
        unit: base.unit,
      };
    });

    const currencyRates: CurrencyRate[] = Object.entries(BASE_CURRENCIES).map(([id, base]) => {
      const buy = fluctuate(base.buy, 0.02);
      const sell = fluctuate(base.sell, 0.02);
      return {
        id,
        name: CURRENCY_NAMES[id],
        symbol: base.symbol,
        buyPrice: buy,
        sellPrice: sell,
        prevBuyPrice: buy,
        prevSellPrice: sell,
        changePercent: 0,
        direction: 'neutral' as const,
      };
    });

    setPrices(goldPrices);
    setCurrencies(currencyRates);
    setLastUpdate(new Date());
  }, []);

  const updatePrices = useCallback(() => {
    setPrices(prev =>
      prev.map(price => {
        const newBuy = fluctuate(price.buyPrice, 0.08);
        const newSell = fluctuate(price.sellPrice, 0.08);
        const change = ((newBuy - price.buyPrice) / price.buyPrice) * 100;
        const direction: 'up' | 'down' | 'neutral' =
          change > 0.01 ? 'up' : change < -0.01 ? 'down' : 'neutral';

        return {
          ...price,
          prevBuyPrice: price.buyPrice,
          prevSellPrice: price.sellPrice,
          buyPrice: newBuy,
          sellPrice: newSell,
          changePercent: Math.round(change * 100) / 100,
          direction,
          lastUpdate: new Date(),
        };
      })
    );

    setCurrencies(prev =>
      prev.map(rate => {
        const newBuy = fluctuate(rate.buyPrice, 0.04);
        const newSell = fluctuate(rate.sellPrice, 0.04);
        const change = ((newBuy - rate.buyPrice) / rate.buyPrice) * 100;
        const direction: 'up' | 'down' | 'neutral' =
          change > 0.005 ? 'up' : change < -0.005 ? 'down' : 'neutral';

        return {
          ...rate,
          prevBuyPrice: rate.buyPrice,
          prevSellPrice: rate.sellPrice,
          buyPrice: newBuy,
          sellPrice: newSell,
          changePercent: Math.round(change * 100) / 100,
          direction,
        };
      })
    );

    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    initializePrices();
    const interval = setInterval(updatePrices, 3000);
    return () => clearInterval(interval);
  }, [initializePrices, updatePrices]);

  const gramPrice = prices.find(p => p.id === 'gram');

  return {
    prices,
    currencies,
    gramPrice,
    lastUpdate,
    generateHistory,
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}