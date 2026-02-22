import { formatPrice, formatTime } from '@/hooks/useGoldPrices';
import type { GoldPrice } from '@/hooks/useGoldPrices';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

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

  const sellDir = getHeroDirection(sellPrice, gramPrice.closingPrice);
  const buyDir = getHeroDirection(buyPrice, gramPrice.closingPrice);

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
            <p className="mb-1 text-[11px] text-muted-foreground sm:text-xs">Satış Fiyatı</p>
            <div className="flex items-baseline gap-2">
              <p className={`font-tabular text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl ${
                sellDir === 'up' ? 'text-up' : sellDir === 'down' ? 'text-down' : 'text-foreground'
              }`}>
                {formatPrice(sellPrice)}
              </p>
              <ModernIndicator direction={sellDir} size="sm" />
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">₺ / gram</p>
          </div>

          {/* Buy Price */}
          <div className="min-w-0">
            <p className="mb-1 text-[11px] text-muted-foreground sm:text-xs">Alış Fiyatı</p>
            <div className="flex items-baseline gap-2">
              <p className={`font-tabular text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl ${
                buyDir === 'up' ? 'text-up' : buyDir === 'down' ? 'text-down' : 'text-foreground'
              }`}>
                {formatPrice(buyPrice)}
              </p>
              <ModernIndicator direction={buyDir} size="sm" />
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">₺ / gram</p>
          </div>

          {/* Change */}
          <div className="min-w-0">
            <p className="mb-1 text-[11px] text-muted-foreground sm:text-xs">Değişim</p>
            <ModernIndicator direction={direction} percent={changePercent} size="lg" />
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
            <p className="mb-1 text-[11px] text-muted-foreground sm:text-xs">Son Güncelleme</p>
            <p className="font-tabular text-sm font-semibold text-foreground sm:text-sm md:text-base">
              {formatTime(lastUpdate)}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Düşük: {formatPrice(lowPrice)} / Yüksek: {formatPrice(highPrice)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function getHeroDirection(current: number, closing: number): 'up' | 'down' | 'neutral' {
  if (closing <= 0) return 'neutral';
  const pct = ((current - closing) / closing) * 100;
  if (pct > 0.01) return 'up';
  if (pct < -0.01) return 'down';
  return 'neutral';
}

function ModernIndicator({ direction, percent, size = 'sm' }: { direction: string; percent?: number; size?: 'sm' | 'lg' }) {
  const isLg = size === 'lg';
  const iconSize = isLg ? 'h-3.5 w-3.5' : 'h-3 w-3';

  if (direction === 'up') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-up/10 backdrop-blur-sm border border-up/20 text-up font-semibold ${
        isLg ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'
      }`}>
        <TrendingUp className={iconSize} />
        {percent !== undefined && `%${Math.abs(percent).toFixed(2)}`}
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-down/10 backdrop-blur-sm border border-down/20 text-down font-semibold ${
        isLg ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'
      }`}>
        <TrendingDown className={iconSize} />
        {percent !== undefined && `%${Math.abs(percent).toFixed(2)}`}
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-secondary border border-border text-muted-foreground font-semibold ${
      isLg ? 'px-3 py-1.5 text-sm' : 'px-2 py-0.5 text-xs'
    }`}>
      <Minus className={iconSize} />
      {percent !== undefined && '%0.00'}
    </span>
  );
}
