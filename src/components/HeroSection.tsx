import { formatPrice, formatTime } from '@/hooks/useGoldPrices';
import type { GoldPrice } from '@/hooks/useGoldPrices';
import { Skeleton } from '@/components/ui/skeleton';

interface HeroSectionProps {
  gramPrice?: GoldPrice;
  lastUpdate: Date;
  isLoading?: boolean;
}

export default function HeroSection({ gramPrice, lastUpdate, isLoading }: HeroSectionProps) {
  if (isLoading || !gramPrice) {
    return (
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8">
        <Skeleton className="mb-1 h-4 w-40" />
        <Skeleton className="mb-6 h-8 w-64" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <Skeleton className="mb-2 h-3 w-20" />
              <Skeleton className="h-10 w-32" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const { sellPrice, buyPrice, lowPrice, highPrice, direction, changePercent, changeAmount } = gramPrice;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8" aria-labelledby="hero-heading">
      {/* Subtle gold accent */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-primary md:text-sm">
          Kapalıçarşı Anlık Piyasa
        </p>
        <h1 id="hero-heading" className="mb-4 text-xl font-extrabold text-foreground md:mb-6 md:text-3xl lg:text-4xl">
          Canlı Gr Altın Fiyatları
        </h1>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {/* Sell Price */}
          <div className="min-w-0">
            <p className="mb-1 text-[10px] text-muted-foreground sm:text-xs">Satış Fiyatı</p>
            <p className="font-tabular text-lg font-extrabold text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
              {formatPrice(sellPrice)}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">₺ / gram</p>
          </div>

          {/* Buy Price */}
          <div className="min-w-0">
            <p className="mb-1 text-[10px] text-muted-foreground sm:text-xs">Alış Fiyatı</p>
            <p className="font-tabular text-lg font-extrabold text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
              {formatPrice(buyPrice)}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">₺ / gram</p>
          </div>

          {/* Change */}
          <div className="min-w-0">
            <p className="mb-1 text-[10px] text-muted-foreground sm:text-xs">Değişim</p>
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold sm:px-3 sm:py-1.5 sm:text-sm ${
                direction === 'up'
                  ? 'bg-up-bg text-up'
                  : direction === 'down'
                  ? 'bg-down-bg text-down'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {direction === 'up' ? '▲' : direction === 'down' ? '▼' : '—'} %{Math.abs(changePercent).toFixed(2)}
            </span>
            {changeAmount !== undefined && changeAmount !== 0 && (
              <p className={`mt-1 font-tabular text-[10px] font-medium ${
                direction === 'up' ? 'text-up' : direction === 'down' ? 'text-down' : 'text-muted-foreground'
              }`}>
                {changeAmount > 0 ? '+' : ''}{formatPrice(changeAmount)} ₺
              </p>
            )}
          </div>

          {/* Time */}
          <div className="flex min-w-0 flex-col justify-start">
            <p className="mb-1 text-[10px] text-muted-foreground sm:text-xs">Son Güncelleme</p>
            <p className="font-tabular text-xs font-semibold text-foreground sm:text-sm md:text-base">
              {formatTime(lastUpdate)}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Düşük: {formatPrice(lowPrice)} / Yüksek: {formatPrice(highPrice)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
