import { TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';
import type { GoldPrice, CurrencyRate } from '@/hooks/useGoldPrices';
import { formatPrice } from '@/hooks/useGoldPrices';
import { useState, useEffect } from 'react';

interface GoldPriceTableProps {
  prices: GoldPrice[];
  currencies: CurrencyRate[];
}

export default function GoldPriceTable({ prices, currencies }: GoldPriceTableProps) {
  return (
    <section aria-labelledby="gold-prices-heading">
      {/* Currency Rates - Visible at top */}
      <div className="mb-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground md:text-base">
          Canlı Döviz Kurları
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {currencies.map(rate => (
            <CurrencyCard key={rate.id} rate={rate} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 id="gold-prices-heading" className="text-lg font-bold text-foreground md:text-xl">
          Kapalıçarşı Altın Fiyatları
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-up" />
          </span>
          Canlı
        </div>
      </div>

      {/* Gold Prices Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Kapalıçarşı altın fiyatları tablosu">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:px-4 md:py-3">
                  Altın Türü
                </th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground md:px-4 md:py-3">
                  Alış
                </th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground md:px-4 md:py-3">
                  Satış
                </th>
                <th className="hidden px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell md:px-4 md:py-3">
                  Değişim
                </th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <PriceRow key={price.id} price={price} isHero={index === 0} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PriceRow({ price, isHero }: { price: GoldPrice; isHero: boolean }) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (price.direction !== 'neutral') {
      setFlash(price.direction);
      const timer = setTimeout(() => setFlash(null), 500);
      return () => clearTimeout(timer);
    }
  }, [price.buyPrice, price.direction]);

  return (
    <tr
      className={`border-b border-border transition-colors last:border-0 ${
        isHero ? 'bg-gold-light/50' : 'hover:bg-secondary/30'
      } ${flash === 'up' ? 'animate-flash-green' : flash === 'down' ? 'animate-flash-red' : ''}`}
      role="row"
    >
      <td className="px-3 py-3 md:px-4 md:py-3.5">
        <div className="flex items-center gap-2">
          {isHero && <Star className="h-4 w-4 shrink-0 fill-primary text-primary" aria-hidden="true" />}
          <div>
            <span className={`font-medium ${isHero ? 'text-sm font-bold text-foreground md:text-base' : 'text-sm text-foreground'}`}>
              {price.name}
            </span>
            <span className="ml-1.5 text-[10px] text-muted-foreground">{price.unit}</span>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-right md:px-4">
        <div>
          <span className={`font-tabular text-sm font-semibold ${isHero ? 'text-base text-foreground' : 'text-foreground'}`}>
            {formatPrice(price.buyPrice)}
          </span>
          <p className="font-tabular text-[10px] text-muted-foreground">
            kapalıçarşı: {formatPrice(price.kapaliBuyPrice)}
          </p>
        </div>
      </td>
      <td className="px-3 py-3 text-right md:px-4">
        <div>
          <span className={`font-tabular text-sm font-semibold ${isHero ? 'text-base text-foreground' : 'text-foreground'}`}>
            {formatPrice(price.sellPrice)}
          </span>
          <p className="font-tabular text-[10px] text-muted-foreground">
            kapalıçarşı: {formatPrice(price.kapaliSellPrice)}
          </p>
        </div>
      </td>
      <td className="hidden px-3 py-3 text-right sm:table-cell md:px-4">
        <DirectionBadge direction={price.direction} changePercent={price.changePercent} />
      </td>
    </tr>
  );
}

function DirectionBadge({ direction, changePercent }: { direction: string; changePercent: number }) {
  if (direction === 'up') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-up-bg px-2 py-0.5 text-xs font-semibold text-up">
        <TrendingUp className="h-3 w-3" />
        %{Math.abs(changePercent).toFixed(2)}
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-down-bg px-2 py-0.5 text-xs font-semibold text-down">
        <TrendingDown className="h-3 w-3" />
        %{Math.abs(changePercent).toFixed(2)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
      <Minus className="h-3 w-3" />
      %0.00
    </span>
  );
}

function CurrencyCard({ rate }: { rate: CurrencyRate }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm md:p-4">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground sm:h-9 sm:w-9">
          {rate.symbol}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-foreground sm:text-sm">{rate.name}</p>
          <p className="text-[10px] text-muted-foreground sm:text-xs">{rate.id.toUpperCase()}/TRY</p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-tabular text-sm font-semibold text-foreground">{formatPrice(rate.sellPrice)}</p>
        <DirectionBadge direction={rate.direction} changePercent={rate.changePercent} />
      </div>
    </div>
  );
}
