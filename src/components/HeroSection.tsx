import { formatPrice, formatTime } from '@/hooks/useGoldPrices';

interface HeroSectionProps {
  sellPrice: number;
  buyPrice: number;
  kapaliSellPrice: number;
  kapaliBuyPrice: number;
  direction: 'up' | 'down' | 'neutral';
  changePercent: number;
  lastUpdate: Date;
}

export default function HeroSection({ sellPrice, buyPrice, kapaliSellPrice, kapaliBuyPrice, direction, changePercent, lastUpdate }: HeroSectionProps) {
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
          Kapalıçarşı Gram Altın Fiyatları – Canlı Gr Altın
        </h1>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {/* Sell Price */}
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Satış Fiyatı</p>
            <p className="font-tabular text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl">
              {formatPrice(sellPrice)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">₺ / gram</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              kapalıçarşı: {formatPrice(kapaliSellPrice)} ₺
            </p>
          </div>

          {/* Buy Price */}
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Alış Fiyatı</p>
            <p className="font-tabular text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl">
              {formatPrice(buyPrice)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">₺ / gram</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              kapalıçarşı: {formatPrice(kapaliBuyPrice)} ₺
            </p>
          </div>

          {/* Change */}
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

          {/* Time */}
          <div className="flex flex-col justify-start">
            <p className="mb-1 text-xs text-muted-foreground">Son Güncelleme</p>
            <p className="font-tabular text-sm font-semibold text-foreground md:text-base">
              {formatTime(lastUpdate)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
