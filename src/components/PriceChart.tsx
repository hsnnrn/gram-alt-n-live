import { useState, useMemo, useEffect, useRef, type ComponentType } from 'react';
import { BarChart3 } from 'lucide-react';
import type { PriceHistory } from '@/hooks/useGoldPrices';
import type { PriceChartCanvasProps } from './PriceChartCanvas';

interface PriceChartProps {
  generateHistory: (basePrice: number, days: number) => PriceHistory[];
  basePrice: number;
  title?: string;
  /** aria-labelledby için benzersiz id (ör. gram sayfaları) */
  sectionId?: string;
}

type Period = '1G' | '1H' | '1A';

const PERIODS: { key: Period; label: string; days: number }[] = [
  { key: '1G', label: '1 Gün', days: 1 },
  { key: '1H', label: '1 Hafta', days: 7 },
  { key: '1A', label: '1 Ay', days: 30 },
];

function ChartFallback() {
  return (
    <div
      className="flex h-full min-h-[220px] items-center justify-center rounded-lg bg-secondary/30"
      aria-hidden="true"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export default function PriceChart({
  generateHistory,
  basePrice,
  title = 'Gram Altın Grafiği',
  sectionId = 'chart-heading',
}: PriceChartProps) {
  const [period, setPeriod] = useState<Period>('1H');
  const [chartVisible, setChartVisible] = useState(false);
  const [Chart, setChart] = useState<ComponentType<PriceChartCanvasProps> | null>(null);
  const chartMountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartMountRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChartVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!chartVisible || Chart) return;
    let cancelled = false;
    const run = () => {
      import('./PriceChartCanvas')
        .then((m) => {
          if (!cancelled) setChart(() => m.default);
        })
        .catch(() => {});
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const id = w.requestIdleCallback?.(run, { timeout: 6000 });
    if (id === undefined) run();
    return () => {
      cancelled = true;
      if (id !== undefined) w.cancelIdleCallback?.(id);
    };
  }, [chartVisible, Chart]);

  const selectedPeriod = PERIODS.find(p => p.key === period)!;

  const data = useMemo(() => {
    const history = generateHistory(basePrice, selectedPeriod.days);
    return history.map(item => ({
      date: item.timestamp.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        ...(selectedPeriod.days <= 1 ? { hour: '2-digit', minute: '2-digit' } : {}),
      }),
      price: item.price,
    }));
  }, [basePrice, selectedPeriod.days, generateHistory]);

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const isUp = data.length > 1 && data[data.length - 1].price >= data[0].price;

  const canvasProps: PriceChartCanvasProps = { data, minPrice, maxPrice, isUp };

  return (
    <section aria-labelledby={sectionId} className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 id={sectionId} className="text-lg font-bold text-foreground">
            {title}
          </h2>
        </div>
        <div className="flex rounded-lg bg-secondary p-1">
          {PERIODS.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-all md:px-3 ${
                period === p.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chartMountRef}
        className="h-[250px] md:h-[300px]"
        role="img"
        aria-label={`Gram altın ${selectedPeriod.label.toLowerCase()} fiyat grafiği`}
      >
        {Chart ? <Chart {...canvasProps} /> : <ChartFallback />}
      </div>
    </section>
  );
}
