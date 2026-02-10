import { TrendingUp, TrendingDown, Bot, Building2, Landmark } from 'lucide-react';
import { formatPrice } from '@/hooks/useGoldPrices';

interface Prediction {
  source: string;
  icon: 'bank' | 'gov' | 'ai';
  prediction: number;
  note: string;
}

const PREDICTIONS: Prediction[] = [
  { source: 'Goldman Sachs', icon: 'bank', prediction: 4200, note: 'Küresel belirsizlik ve merkez bankası alımları' },
  { source: 'JP Morgan', icon: 'bank', prediction: 3950, note: 'Faiz indirim beklentileri ve güvenli liman talebi' },
  { source: 'UBS', icon: 'bank', prediction: 4050, note: 'Dolar zayıflığı ve enflasyon koruması' },
  { source: 'TCMB', icon: 'gov', prediction: 3800, note: 'Sıkı para politikası ve TL değerlenmesi' },
  { source: 'AI Tahmini', icon: 'ai', prediction: 4100, note: 'Makine öğrenmesi modeli - tarihsel veri analizi' },
];

interface GoldPredictionsProps {
  currentPrice: number;
}

export default function GoldPredictions({ currentPrice }: GoldPredictionsProps) {
  const year = new Date().getFullYear();

  return (
    <section aria-labelledby="predictions-heading" className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id="predictions-heading" className="text-lg font-bold text-foreground">
          {year} Yıl Sonu Tahminleri
        </h2>
      </div>

      <p className="mb-4 text-xs text-muted-foreground">
        Büyük kuruluşların ve yapay zekanın {year} yıl sonu gram altın fiyat tahminleri
      </p>

      <div className="space-y-3">
        {PREDICTIONS.map((pred) => {
          const diff = ((pred.prediction - currentPrice) / currentPrice) * 100;
          const isUp = diff > 0;

          return (
            <div
              key={pred.source}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:bg-secondary/30 md:p-4"
            >
              {/* Icon */}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                pred.icon === 'ai' ? 'bg-accent/20 text-accent' : pred.icon === 'gov' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
              }`}>
                {pred.icon === 'bank' && <Building2 className="h-5 w-5" />}
                {pred.icon === 'gov' && <Landmark className="h-5 w-5" />}
                {pred.icon === 'ai' && <Bot className="h-5 w-5" />}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{pred.source}</p>
                  {pred.icon === 'ai' && (
                    <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                      AI
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground line-clamp-1">
                  {pred.note}
                </p>
              </div>

              {/* Prediction */}
              <div className="shrink-0 text-right">
                <p className="font-tabular text-base font-bold text-foreground md:text-lg">
                  {formatPrice(pred.prediction)} ₺
                </p>
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isUp ? 'text-up' : 'text-down'}`}>
                  {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  %{Math.abs(diff).toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[10px] text-muted-foreground md:text-xs">
        * Tahminler kamuya açık raporlardan derlenmiştir. Yatırım tavsiyesi niteliği taşımaz.
      </p>
    </section>
  );
}
