import { useState, useMemo } from 'react';
import { ArrowRightLeft, Calculator } from 'lucide-react';
import type { GoldPrice } from '@/hooks/useGoldPrices';
import { formatPrice } from '@/hooks/useGoldPrices';

interface PriceConverterProps {
  gramPrice: GoldPrice | undefined;
}

export default function PriceConverter({ gramPrice }: PriceConverterProps) {
  const [grams, setGrams] = useState<string>('1');
  const [mode, setMode] = useState<'goldToTl' | 'tlToGold'>('goldToTl');
  const [amount, setAmount] = useState<string>('');

  const result = useMemo(() => {
    if (!gramPrice) return null;
    const price = gramPrice.sellPrice;

    if (mode === 'goldToTl') {
      const g = parseFloat(grams);
      if (isNaN(g) || g <= 0) return null;
      return { value: g * price, label: '₺', inputLabel: 'gram altın' };
    } else {
      const tl = parseFloat(amount);
      if (isNaN(tl) || tl <= 0) return null;
      return { value: tl / price, label: 'gram', inputLabel: '₺' };
    }
  }, [grams, amount, mode, gramPrice]);

  if (!gramPrice) return null;

  return (
    <section aria-labelledby="converter-heading" className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id="converter-heading" className="text-lg font-bold text-foreground">
          Altın Çevirici
        </h2>
      </div>

      {/* Mode Toggle */}
      <div className="mb-4 flex rounded-lg bg-secondary p-1">
        <button
          onClick={() => setMode('goldToTl')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all md:text-sm ${
            mode === 'goldToTl'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Altın → TL
        </button>
        <button
          onClick={() => setMode('tlToGold')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all md:text-sm ${
            mode === 'tlToGold'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          TL → Altın
        </button>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {mode === 'goldToTl' ? 'Gram Miktarı' : 'TL Miktarı'}
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={mode === 'goldToTl' ? grams : amount}
              onChange={e => mode === 'goldToTl' ? setGrams(e.target.value) : setAmount(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 font-tabular text-lg font-semibold text-foreground outline-none ring-ring transition-shadow focus:ring-2"
              placeholder={mode === 'goldToTl' ? '1' : '10000'}
              min="0"
              step="any"
              aria-label={mode === 'goldToTl' ? 'Gram altın miktarı girin' : 'TL miktarı girin'}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {mode === 'goldToTl' ? 'gram' : '₺'}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <button
            onClick={() => setMode(mode === 'goldToTl' ? 'tlToGold' : 'goldToTl')}
            className="rounded-full border border-border bg-secondary p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Çevirme yönünü değiştir"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Result */}
        <div className="rounded-lg bg-gold-light p-4">
          <p className="mb-1 text-xs text-muted-foreground">Sonuç</p>
          <p className="font-tabular text-2xl font-bold text-foreground md:text-3xl">
            {result ? (
              <>
                {mode === 'goldToTl' ? formatPrice(result.value) : result.value.toFixed(4)}
                <span className="ml-1 text-base font-medium text-muted-foreground">{result.label}</span>
              </>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground md:text-xs">
            Satış fiyatı üzerinden: {formatPrice(gramPrice.sellPrice)} ₺/gram
          </p>
        </div>
      </div>

      {/* Quick amounts */}
      {mode === 'goldToTl' && (
        <div className="mt-3 flex flex-wrap gap-2">
          {['1', '5', '10', '50', '100'].map(val => (
            <button
              key={val}
              onClick={() => setGrams(val)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                grams === val
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {val} gr
            </button>
          ))}
        </div>
      )}
      {mode === 'tlToGold' && (
        <div className="mt-3 flex flex-wrap gap-2">
          {['1000', '5000', '10000', '50000', '100000'].map(val => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                amount === val
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {parseInt(val).toLocaleString('tr-TR')} ₺
            </button>
          ))}
        </div>
      )}
    </section>
  );
}