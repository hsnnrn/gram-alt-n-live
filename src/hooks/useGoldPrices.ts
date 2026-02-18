import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';
import {
  fetchKapalicarsiData,
  parseNumber,
  GOLD_CODES,
  CURRENCY_CODES,
  type ApiItem,
} from '@/services/goldApi';
import { connectGoldSocket } from '@/services/goldSocket';

export interface GoldPrice {
  id: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  lowPrice: number;
  highPrice: number;
  closingPrice: number;
  changePercent: number;
  changeAmount: number;
  direction: 'up' | 'down' | 'neutral';
  lastUpdate: Date;
  unit: string;
  rawDate: string;
}

export interface CurrencyRate {
  id: string;
  name: string;
  symbol: string;
  buyPrice: number;
  sellPrice: number;
  lowPrice: number;
  highPrice: number;
  closingPrice: number;
  changePercent: number;
  direction: 'up' | 'down' | 'neutral';
  rawDate: string;
}

export interface PriceHistory {
  timestamp: Date;
  price: number;
}

function parseApiDate(tarih: string): Date {
  // Format: "06-09-2024 01:41:31" -> DD-MM-YYYY HH:MM:SS
  const parts = tarih.match(/(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (parts) {
    return new Date(
      parseInt(parts[3]),
      parseInt(parts[2]) - 1,
      parseInt(parts[1]),
      parseInt(parts[4]),
      parseInt(parts[5]),
      parseInt(parts[6])
    );
  }
  return new Date();
}

function getDirection(current: number, closing: number): 'up' | 'down' | 'neutral' {
  const diff = current - closing;
  const pct = closing > 0 ? (diff / closing) * 100 : 0;
  if (pct > 0.01) return 'up';
  if (pct < -0.01) return 'down';
  return 'neutral';
}

function processApiData(data: ApiItem[]) {
  const goldPrices: GoldPrice[] = [];
  const currencyRates: CurrencyRate[] = [];

  for (const item of data) {
    const code = item.code?.toUpperCase?.() ?? '';
    const alis = parseNumber(item.alis);
    const satis = parseNumber(item.satis);
    const dusuk = item.dusuk || alis;
    const yuksek = item.yuksek || satis;
    const kapanis = item.kapanis || alis;
    const tarih = item.tarih || '';

    if (alis <= 0 && satis <= 0) continue;

    const changeAmount = satis - kapanis;
    const changePercent = kapanis > 0 ? ((satis - kapanis) / kapanis) * 100 : 0;
    const direction = getDirection(satis, kapanis);

    // Check if it's a gold item
    const goldMeta = GOLD_CODES[code];
    if (goldMeta) {
      goldPrices.push({
        id: code.toLowerCase(),
        name: goldMeta.name,
        buyPrice: alis,
        sellPrice: satis,
        lowPrice: dusuk,
        highPrice: yuksek,
        closingPrice: kapanis,
        changePercent: Math.round(changePercent * 100) / 100,
        changeAmount: Math.round(changeAmount * 100) / 100,
        direction,
        lastUpdate: parseApiDate(tarih),
        unit: goldMeta.unit,
        rawDate: tarih,
      });
      continue;
    }

    // Check if it's a currency
    const curMeta = CURRENCY_CODES[code];
    if (curMeta) {
      currencyRates.push({
        id: code.toLowerCase(),
        name: curMeta.name,
        symbol: curMeta.symbol,
        buyPrice: alis,
        sellPrice: satis,
        lowPrice: dusuk,
        highPrice: yuksek,
        closingPrice: kapanis,
        changePercent: Math.round(changePercent * 100) / 100,
        direction,
        rawDate: tarih,
      });
    }
  }

  // Sort gold by defined order
  goldPrices.sort((a, b) => {
    const orderA = GOLD_CODES[a.id.toUpperCase()]?.order ?? 99;
    const orderB = GOLD_CODES[b.id.toUpperCase()]?.order ?? 99;
    return orderA - orderB;
  });

  return { goldPrices, currencyRates };
}

// Generate simulated history (for chart, until we have a history API)
function generateHistory(basePrice: number, days: number): PriceHistory[] {
  const history: PriceHistory[] = [];
  const now = new Date();
  let price = basePrice * (1 - days * 0.0003);

  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - i);
    timestamp.setHours(10, 0, 0, 0);
    const change = price * (0.5 / 100) * (Math.random() * 2 - 1);
    price = Math.round((price + change) * 100) / 100;
    history.push({ timestamp, price });
  }

  return history;
}

export function useGoldPrices() {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['kapalicarsi-prices'],
    queryFn: fetchKapalicarsiData,
    refetchInterval: 60_000, // Yedek: socket yoksa 1 dk da bir
    staleTime: 0, // Socket her güncellemede cache güncelliyor, stale sayma
    retry: 2,
    refetchOnWindowFocus: true,
  });

  // anlikaltinfiyatlari.com ile aynı: WebSocket ile sürekli anlık güncelleme
  useEffect(() => {
    const cleanup = connectGoldSocket(queryClient);
    return cleanup;
  }, [queryClient]);

  const processed = useMemo(() => {
    if (!data) return { goldPrices: [], currencyRates: [] };
    return processApiData(data);
  }, [data]);

  const gramPrice = processed.goldPrices.find(
    p => p.id === 'altin'
  );

  const lastUpdate = dataUpdatedAt ? new Date(dataUpdatedAt) : new Date();

  return {
    prices: processed.goldPrices,
    currencies: processed.currencyRates,
    gramPrice,
    lastUpdate,
    isLoading,
    isError,
    error,
    refetch,
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
