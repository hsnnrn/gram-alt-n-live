import { TrendingUp, TrendingDown, Minus, Moon, Sun, RefreshCw } from 'lucide-react';
import Logo from '@/components/Logo';
import type { GoldPrice } from '@/hooks/useGoldPrices';
import { formatPrice, formatTime } from '@/hooks/useGoldPrices';

interface StickyHeaderProps {
  gramPrice: GoldPrice | undefined;
  lastUpdate: Date;
  isDark: boolean;
  onToggleTheme: () => void;
  onRefresh?: () => void;
}

export default function StickyHeader({ gramPrice, lastUpdate, isDark, onToggleTheme, onRefresh }: StickyHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md" role="banner">
      <div className="container flex items-center justify-between py-2 md:py-3">
        {/* Brand */}
        <div className="flex items-center gap-2 md:gap-3">
          <Logo className="h-8 w-8 md:h-9 md:w-9" />
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold text-foreground md:text-base">Gram Altın Kaç Para</h2>
            <p className="text-[10px] text-muted-foreground md:text-xs">gramaltinkacpara.com</p>
          </div>
        </div>

        {/* Live Gram Price */}
        {gramPrice && (
          <div className="flex items-center gap-3 md:gap-5">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
                Gram Altın
              </p>
              <div className="flex items-center gap-1.5">
                <span className="font-tabular text-lg font-bold text-foreground md:text-xl">
                  {formatPrice(gramPrice.sellPrice)}
                </span>
                <span className="text-xs text-muted-foreground">₺</span>
                <PriceDirection direction={gramPrice.direction} changePercent={gramPrice.changePercent} />
              </div>
            </div>
            <div className="hidden text-right text-[10px] text-muted-foreground md:block md:text-xs">
              <p>Son güncelleme</p>
              <p className="font-tabular font-medium">{formatTime(lastUpdate)}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {/* Refresh button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Verileri yenile"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={isDark ? 'Açık moda geç' : 'Koyu moda geç'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function PriceDirection({ direction, changePercent }: { direction: string; changePercent: number }) {
  if (direction === 'up') {
    return (
      <span className="flex items-center gap-0.5 rounded-md bg-up-bg px-1.5 py-0.5 text-xs font-semibold text-up">
        <TrendingUp className="h-3 w-3" />
        %{Math.abs(changePercent).toFixed(2)}
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className="flex items-center gap-0.5 rounded-md bg-down-bg px-1.5 py-0.5 text-xs font-semibold text-down">
        <TrendingDown className="h-3 w-3" />
        %{Math.abs(changePercent).toFixed(2)}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold text-muted-foreground">
      <Minus className="h-3 w-3" />
    </span>
  );
}
