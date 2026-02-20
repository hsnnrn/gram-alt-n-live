import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import type { GoldPrice, CurrencyRate } from '@/hooks/useGoldPrices';
import { formatPrice } from '@/hooks/useGoldPrices';
import { Skeleton } from '@/components/ui/skeleton';

interface GoldPriceTableProps {
  prices: GoldPrice[];
  currencies: CurrencyRate[];
  isLoading?: boolean;
  isError?: boolean;
  onRefresh?: () => void;
}

export default function GoldPriceTable({ prices, currencies, isLoading, isError, onRefresh }: GoldPriceTableProps) {
  if (isLoading) return <TableSkeleton />;

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="text-sm font-medium text-destructive">Veriler yüklenemedi</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Sunucu yanıt vermiyor veya ağ bağlantısı kurulamıyor. Birkaç dakika sonra yenile butonuna tıklayın.
        </p>
        {onRefresh && (
          <button
            onClick={() => onRefresh()}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Tekrar Dene
          </button>
        )}
      </div>
    );
  }

  return (
    <section aria-labelledby="gold-prices-heading">
      {/* Currency Rates */}
      {currencies.length > 0 && (
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
      )}

      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 id="gold-prices-heading" className="text-lg font-bold text-foreground md:text-xl">
            Kapalıçarşı Altın Fiyatları
          </h2>
          <p className="text-[11px] text-muted-foreground">Anlık güncellenen canlı kapalıçarşı verileri</p>
        </div>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={() => onRefresh()}
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Verileri yenile"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Yenile</span>
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-up" />
            </span>
            Canlı
          </div>
        </div>
      </div>

      {/* Gold Prices Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed" role="table" aria-label="Kapalıçarşı altın fiyatları tablosu">
            <colgroup>
              <col className="w-[28%] sm:w-[22%]" />
              <col className="w-[24%] sm:w-[18%]" />
              <col className="w-[24%] sm:w-[18%]" />
              <col className="hidden sm:table-column sm:w-[14%]" />
              <col className="hidden sm:table-column sm:w-[14%]" />
              <col className="w-[24%] sm:w-[14%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-2 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:px-3 sm:py-2.5 sm:text-xs md:px-4 md:py-3">
                  Altın Türü
                </th>
                <th className="px-1.5 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:px-3 sm:py-2.5 sm:text-xs md:px-4 md:py-3">
                  Alış
                </th>
                <th className="px-1.5 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:px-3 sm:py-2.5 sm:text-xs md:px-4 md:py-3">
                  Satış
                </th>
                <th className="hidden px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell md:px-4 md:py-3">
                  En Düşük
                </th>
                <th className="hidden px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell md:px-4 md:py-3">
                  En Yüksek
                </th>
                <th className="px-1.5 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:px-3 sm:py-2.5 sm:text-xs md:px-4 md:py-3">
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
  const buyDir = getDirection(price.buyPrice, price.closingPrice);
  const sellDir = getDirection(price.sellPrice, price.closingPrice);

  return (
    <tr
      className={`border-b border-border transition-colors last:border-0 ${
        isHero ? 'bg-gold-light/50' : 'hover:bg-secondary/30'
      }`}
      role="row"
    >
      {/* Altın Türü - with arrow indicator like reference site */}
      <td className="px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3.5">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className={`text-xs sm:text-sm ${
            price.direction === 'up' ? 'text-up' : price.direction === 'down' ? 'text-down' : 'text-muted-foreground'
          }`} aria-hidden="true">
            {price.direction === 'up' ? '▲' : price.direction === 'down' ? '▼' : '■'}
          </span>
          <div className="min-w-0">
            <span className={`block truncate font-medium ${isHero ? 'text-[13px] font-bold text-foreground sm:text-sm md:text-base' : 'text-[13px] text-foreground sm:text-sm'}`}>
              {price.name}
            </span>
            <span className="text-[10px] text-muted-foreground sm:text-[11px]">{price.unit}</span>
          </div>
        </div>
      </td>

      {/* Alış - colored background cell like reference site */}
      <td className={`px-1 py-2.5 text-right sm:px-3 sm:py-3 md:px-4 ${
        buyDir === 'up' ? 'bg-up-bg' : buyDir === 'down' ? 'bg-down-bg' : ''
      }`}>
        <span className={`font-tabular text-[13px] font-bold sm:text-sm ${isHero ? 'sm:text-base' : ''} ${
          buyDir === 'up' ? 'text-up' : buyDir === 'down' ? 'text-down' : 'text-foreground'
        }`}>
          {formatPrice(price.buyPrice)}
        </span>
      </td>

      {/* Satış - colored background cell like reference site */}
      <td className={`px-1 py-2.5 text-right sm:px-3 sm:py-3 md:px-4 ${
        sellDir === 'up' ? 'bg-up-bg' : sellDir === 'down' ? 'bg-down-bg' : ''
      }`}>
        <span className={`font-tabular text-[13px] font-bold sm:text-sm ${isHero ? 'sm:text-base' : ''} ${
          sellDir === 'up' ? 'text-up' : sellDir === 'down' ? 'text-down' : 'text-foreground'
        }`}>
          {formatPrice(price.sellPrice)}
        </span>
      </td>

      {/* En Düşük */}
      <td className="hidden px-3 py-3 text-right sm:table-cell md:px-4">
        <span className="font-tabular text-sm text-muted-foreground">
          {formatPrice(price.lowPrice)}
        </span>
      </td>

      {/* En Yüksek */}
      <td className="hidden px-3 py-3 text-right sm:table-cell md:px-4">
        <span className="font-tabular text-sm text-muted-foreground">
          {formatPrice(price.highPrice)}
        </span>
      </td>

      {/* Değişim */}
      <td className="px-1.5 py-2.5 text-right sm:px-3 sm:py-3 md:px-4">
        <DirectionBadge direction={price.direction} changePercent={price.changePercent} changeAmount={price.changeAmount} />
      </td>
    </tr>
  );
}

function MiniIndicator({ direction }: { direction: 'up' | 'down' | 'neutral' }) {
  return (
    <span className={`text-xs ${
      direction === 'up' ? 'text-up' : direction === 'down' ? 'text-down' : 'text-muted-foreground'
    }`}>
      {direction === 'up' ? '▲' : direction === 'down' ? '▼' : '■'}
    </span>
  );
}

function getDirection(current: number, closing: number): 'up' | 'down' | 'neutral' {
  if (closing <= 0) return 'neutral';
  const pct = ((current - closing) / closing) * 100;
  if (pct > 0.01) return 'up';
  if (pct < -0.01) return 'down';
  return 'neutral';
}

function DirectionBadge({ direction, changePercent, changeAmount }: { direction: string; changePercent: number; changeAmount?: number }) {
  if (direction === 'up') {
    return (
      <div className="text-right">
        <span className="inline-flex items-center gap-0.5 rounded-full bg-up-bg px-1.5 py-0.5 text-[10px] font-semibold text-up sm:gap-1 sm:px-2 sm:text-xs">
          <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          %{Math.abs(changePercent).toFixed(2)}
        </span>
        {changeAmount !== undefined && (
          <p className="mt-0.5 hidden font-tabular text-[10px] font-medium text-up sm:block">+{formatPrice(Math.abs(changeAmount))} ₺</p>
        )}
      </div>
    );
  }
  if (direction === 'down') {
    return (
      <div className="text-right">
        <span className="inline-flex items-center gap-0.5 rounded-full bg-down-bg px-1.5 py-0.5 text-[10px] font-semibold text-down sm:gap-1 sm:px-2 sm:text-xs">
          <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          %{Math.abs(changePercent).toFixed(2)}
        </span>
        {changeAmount !== undefined && (
          <p className="mt-0.5 hidden font-tabular text-[10px] font-medium text-down sm:block">-{formatPrice(Math.abs(changeAmount))} ₺</p>
        )}
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:gap-1 sm:px-2 sm:text-xs">
      <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
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
        <div className="flex items-center justify-end gap-1.5">
          <div>
            <p className="font-tabular text-[10px] text-muted-foreground">Alış: {formatPrice(rate.buyPrice)}</p>
            <p className="font-tabular text-sm font-semibold text-foreground">Satış: {formatPrice(rate.sellPrice)}</p>
          </div>
          <MiniIndicator direction={rate.direction} />
        </div>
        <DirectionBadge direction={rate.direction} changePercent={rate.changePercent} />
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <section>
      <div className="mb-4">
        <Skeleton className="mb-3 h-5 w-40" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[1, 2].map(i => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
      <Skeleton className="mb-3 h-6 w-52" />
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-secondary/50 px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-border px-4 py-3.5 last:border-0">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="hidden h-4 w-16 sm:block" />
          </div>
        ))}
      </div>
    </section>
  );
}
