import { useState, useMemo, lazy, Suspense } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BarChart3 } from 'lucide-react';
import type { PriceHistory } from '@/hooks/useGoldPrices';
import { formatPrice } from '@/hooks/useGoldPrices';

interface PriceChartProps {
  generateHistory: (basePrice: number, days: number) => PriceHistory[];
  basePrice: number;
}

type Period = '1G' | '1H' | '1A';

const PERIODS: { key: Period; label: string; days: number }[] = [
  { key: '1G', label: '1 Gün', days: 1 },
  { key: '1H', label: '1 Hafta', days: 7 },
  { key: '1A', label: '1 Ay', days: 30 },
];

export default function PriceChart({ generateHistory, basePrice }: PriceChartProps) {
  const [period, setPeriod] = useState<Period>('1H');

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
  const priceRange = maxPrice - minPrice;
  const isUp = data.length > 1 && data[data.length - 1].price >= data[0].price;

  return (
    <section aria-labelledby="chart-heading" className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 id="chart-heading" className="text-lg font-bold text-foreground">
            Gram Altın Grafiği
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

      <div className="h-[250px] md:h-[300px]" role="img" aria-label={`Gram altın ${selectedPeriod.label.toLowerCase()} fiyat grafiği`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isUp ? 'hsl(152, 60%, 40%)' : 'hsl(0, 72%, 51%)'}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={isUp ? 'hsl(152, 60%, 40%)' : 'hsl(0, 72%, 51%)'}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minPrice - priceRange * 0.1, maxPrice + priceRange * 0.1]}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val: number) => formatPrice(val)}
              width={75}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '13px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))', fontSize: '11px' }}
              formatter={(value: number) => [formatPrice(value) + ' ₺', 'Fiyat']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isUp ? 'hsl(152, 60%, 40%)' : 'hsl(0, 72%, 51%)'}
              strokeWidth={2}
              fill="url(#priceGradient)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}