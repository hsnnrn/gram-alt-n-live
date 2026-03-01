import { useRef, useEffect } from 'react';
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
          <HeroPriceCard
            label="Satış Fiyatı"
            price={sellPrice}
            direction={direction}
            unit="₺ / gram"
          />

          {/* Buy Price */}
          <HeroPriceCard
            label="Alış Fiyatı"
            price={buyPrice}
            direction={direction}
            unit="₺ / gram"
          />

          {/* Change */}
          <div className="metric-card min-w-0 rounded-xl border border-border bg-secondary/30 p-3 sm:p-4">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
              Değişim
            </p>
            <div className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${
                direction === 'up' ? 'bg-up-bg text-up' : direction === 'down' ? 'bg-down-bg text-down' : 'bg-secondary text-muted-foreground'
              }`}>
                {direction === 'up' ? <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" /> : direction === 'down' ? <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" /> : <Minus className="h-4 w-4 sm:h-5 sm:w-5" />}
              </span>
              <div>
                <p className={`font-tabular text-lg font-extrabold sm:text-xl md:text-2xl ${
                  direction === 'up' ? 'text-up' : direction === 'down' ? 'text-down' : 'text-foreground'
                }`}>
                  %{Math.abs(changePercent).toFixed(2)}
                </p>
                {changeAmount !== undefined && changeAmount !== 0 && (
                  <p className={`font-tabular text-[11px] font-semibold sm:text-xs ${
                    direction === 'up' ? 'text-up' : direction === 'down' ? 'text-down' : 'text-muted-foreground'
                  }`}>
                    {changeAmount > 0 ? '+' : ''}{formatPrice(changeAmount)} ₺
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Time & Range */}
          <div className="metric-card flex min-w-0 flex-col rounded-xl border border-border bg-secondary/30 p-3 sm:p-4">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
              Son Güncelleme
            </p>
            <p className="font-tabular text-base font-bold text-foreground sm:text-lg md:text-xl">
              {formatTime(lastUpdate)}
            </p>
            <div className="mt-auto flex items-center gap-2 pt-2">
              <span className="text-[10px] text-muted-foreground sm:text-[11px]">
                ↓ {formatPrice(lowPrice)}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary/60"
                  style={{
                    width: highPrice > lowPrice
                      ? `${((sellPrice - lowPrice) / (highPrice - lowPrice)) * 100}%`
                      : '50%'
                  }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground sm:text-[11px]">
                ↑ {formatPrice(highPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPriceCard({
  label,
  price,
  direction,
  unit,
}: {
  label: string;
  price: number;
  direction: 'up' | 'down' | 'neutral';
  unit: string;
}) {
  const prevPriceRef = useRef(price);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevPriceRef.current !== price && cardRef.current) {
      const el = cardRef.current;
      const cls = price > prevPriceRef.current ? 'animate-flash-green' : 'animate-flash-red';
      el.classList.remove('animate-flash-green', 'animate-flash-red');
      void el.offsetWidth;
      el.classList.add(cls);
      prevPriceRef.current = price;
    }
  }, [price]);

  return (
    <div ref={cardRef} className="metric-card min-w-0 rounded-xl border border-border bg-secondary/30 p-3 sm:p-4">
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
        {label}
      </p>
      <div className="flex items-center gap-1.5">
        <span className={`indicator-diamond text-base sm:text-lg ${
          direction === 'up' ? 'is-up text-up' : direction === 'down' ? 'is-down text-down' : 'text-muted-foreground'
        }`} aria-hidden="true">
          ◆
        </span>
        <p className={`price-value font-tabular text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl ${
          direction === 'up' ? 'text-up' : direction === 'down' ? 'text-down' : 'text-foreground'
        }`}>
          {formatPrice(price)}
        </p>
      </div>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{unit}</p>
    </div>
  );
}
