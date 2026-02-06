import { formatPrice, formatTime } from '@/hooks/useGoldPrices';

interface HeroSectionProps {
  sellPrice: number;
  buyPrice: number;
  direction: 'up' | 'down' | 'neutral';
  changePercent: number;
  lastUpdate: Date;
}

export default function HeroSection({ sellPrice, buyPrice, direction, changePercent, lastUpdate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8" aria-labelledby="hero-heading">
      {/* Subtle gold accent */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-primary md:text-sm">
          Anlık Piyasa
        </p>
        <h1 id="hero-heading" className="mb-4 text-2xl font-extrabold text-foreground md:mb-6 md:text-4xl">
          Canlı Gram Altın Fiyatları
        </h1>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {/* Sell Price */}
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Satış Fiyatı</p>
            <p className="font-tabular text-3xl font-extrabold text-foreground md:text-5xl">
              {formatPrice(sellPrice)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">₺ / gram</p>
          </div>

          {/* Buy Price */}
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Alış Fiyatı</p>
            <p className="font-tabular text-3xl font-extrabold text-foreground md:text-5xl">
              {formatPrice(buyPrice)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">₺ / gram</p>
          </div>

          {/* Change & Time */}
          <div className="col-span-2 flex items-end justify-between md:col-span-1 md:flex-col md:items-start md:justify-start">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Değişim</p>
              <span
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold ${
                  direction === 'up'
                    ? 'bg-up-bg text-up'
                    : direction === 'down'
                    ? 'bg-down-bg text-down'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {direction === 'up' ? '▲' : direction === 'down' ? '▼' : '—'} %{Math.abs(changePercent).toFixed(2)}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground md:mt-3 md:text-xs">
              Son güncelleme: {formatTime(lastUpdate)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}