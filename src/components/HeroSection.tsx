import { useRef, useEffect } from 'react';
import { formatPrice, formatTime } from '@/hooks/useGoldPrices';
import type { GoldPrice } from '@/hooks/useGoldPrices';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
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

  const dirColor = direction === 'up' ? 'text-up' : direction === 'down' ? 'text-down' : 'text-foreground';
  const dirBg = direction === 'up' ? 'bg-up/10' : direction === 'down' ? 'bg-down/10' : 'bg-muted';
  const DirIcon = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm" aria-labelledby="hero-heading">
      {/* Background accents */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

      {/* Header */}
      <div className="relative border-b border-border px-5 py-4 md:px-8 md:py-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary md:text-sm">
              Kapalıçarşı Anlık Piyasa
            </p>
            <h1 id="hero-heading" className="text-lg font-extrabold text-foreground md:text-2xl lg:text-3xl">
              Canlı Gram Altın
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-tabular font-medium">{formatTime(lastUpdate)}</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="relative grid grid-cols-2 divide-x divide-border md:grid-cols-4">
        {/* Satış */}
        <MetricCell
          label="Satış"
          value={sellPrice}
          direction={direction}
          unit="₺"
          isPrimary
        />

        {/* Alış */}
        <MetricCell
          label="Alış"
          value={buyPrice}
          direction={direction}
          unit="₺"
        />

        {/* Değişim */}
        <div className="flex flex-col justify-center px-4 py-4 md:px-6 md:py-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Değişim
          </p>
          <div className="flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full ${dirBg}`}>
              <DirIcon className={`h-3.5 w-3.5 ${dirColor}`} />
            </span>
            <div>
              <p className={`font-tabular text-lg font-extrabold leading-tight md:text-xl ${dirColor}`}>
                %{Math.abs(changePercent).toFixed(2)}
              </p>
              {changeAmount !== undefined && changeAmount !== 0 && (
                <p className={`font-tabular text-[11px] font-semibold leading-tight ${dirColor}`}>
                  {changeAmount > 0 ? '+' : ''}{formatPrice(changeAmount)} ₺
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Gün Aralığı */}
        <div className="flex flex-col justify-center px-4 py-4 md:px-6 md:py-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Gün Aralığı
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-tabular font-semibold text-down">{formatPrice(lowPrice)}</span>
              <span className="font-tabular font-semibold text-up">{formatPrice(highPrice)}</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-down/60 via-primary to-up/60 transition-all duration-500"
                style={{
                  width: highPrice > lowPrice
                    ? `${Math.min(100, Math.max(8, ((sellPrice - lowPrice) / (highPrice - lowPrice)) * 100))}%`
                    : '50%'
                }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-card bg-primary shadow-sm transition-all duration-500"
                style={{
                  left: highPrice > lowPrice
                    ? `${Math.max(4, Math.min(96, ((sellPrice - lowPrice) / (highPrice - lowPrice)) * 100))}%`
                    : '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>En Düşük</span>
              <span>En Yüksek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Metric Cell ─── */
function MetricCell({
  label,
  value,
  direction,
  unit,
  isPrimary,
}: {
  label: string;
  value: number;
  direction: 'up' | 'down' | 'neutral';
  unit: string;
  isPrimary?: boolean;
}) {
  const prevRef = useRef(value);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevRef.current !== value && cellRef.current) {
      const el = cellRef.current;
      const cls = value > prevRef.current ? 'animate-flash-green' : 'animate-flash-red';
      el.classList.remove('animate-flash-green', 'animate-flash-red');
      void el.offsetWidth;
      el.classList.add(cls);
      prevRef.current = value;
    }
  }, [value]);

  const dirColor = direction === 'up' ? 'text-up' : direction === 'down' ? 'text-down' : 'text-foreground';
  const showInlineUnit = unit === '₺';

  return (
    <div
      ref={cellRef}
      className={`flex flex-col justify-center px-4 py-4 md:px-6 md:py-5 ${isPrimary ? 'bg-primary/[0.03]' : ''}`}
    >
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`font-tabular text-xl font-extrabold leading-tight md:text-2xl lg:text-3xl ${dirColor}`}>
        {formatPrice(value)}
        {showInlineUnit && <span className="ml-1 align-baseline text-[0.7em] font-bold">{unit}</span>}
      </p>
      {!showInlineUnit && <p className="mt-0.5 text-[10px] text-muted-foreground">{unit}</p>}
    </div>
  );
}
