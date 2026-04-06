import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { formatPrice } from '@/hooks/useGoldPrices';

export interface PriceChartCanvasProps {
  data: { date: string; price: number }[];
  minPrice: number;
  maxPrice: number;
  isUp: boolean;
}

export default function PriceChartCanvas({ data, minPrice, maxPrice, isUp }: PriceChartCanvasProps) {
  const priceRange = maxPrice - minPrice;

  return (
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
  );
}
