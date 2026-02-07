import { useState, useMemo } from 'react';
import { ArrowRightLeft, DollarSign } from 'lucide-react';
import type { CurrencyRate } from '@/hooks/useGoldPrices';
import { formatPrice } from '@/hooks/useGoldPrices';

interface CurrencyConverterProps {
  currencies: CurrencyRate[];
}

export default function CurrencyConverter({ currencies }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<'usd' | 'eur'>('usd');
  const [mode, setMode] = useState<'toTl' | 'fromTl'>('toTl');

  const selectedRate = currencies.find(c => c.id === fromCurrency);

  const result = useMemo(() => {
    if (!selectedRate) return null;
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return null;

    if (mode === 'toTl') {
      return { value: val * selectedRate.sellPrice, label: '₺' };
    } else {
      return { value: val / selectedRate.sellPrice, label: fromCurrency.toUpperCase() };
    }
  }, [amount, fromCurrency, mode, selectedRate]);

  if (!currencies.length) return null;

  return (
    <section aria-labelledby="currency-converter-heading" className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id="currency-converter-heading" className="text-lg font-bold text-foreground">
          Döviz Çevirici
        </h2>
      </div>

      {/* Mode Toggle */}
      <div className="mb-4 flex rounded-lg bg-secondary p-1">
        <button
          onClick={() => setMode('toTl')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all md:text-sm ${
            mode === 'toTl'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Döviz → TL
        </button>
        <button
          onClick={() => setMode('fromTl')}
          className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all md:text-sm ${
            mode === 'fromTl'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          TL → Döviz
        </button>
      </div>

      {/* Currency Select */}
      <div className="mb-3 flex gap-2">
        {(['usd', 'eur'] as const).map(cur => (
          <button
            key={cur}
            onClick={() => setFromCurrency(cur)}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              fromCurrency === cur
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {cur === 'usd' ? '🇺🇸 USD' : '🇪🇺 EUR'}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {mode === 'toTl' ? `${fromCurrency.toUpperCase()} Miktarı` : 'TL Miktarı'}
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 font-tabular text-lg font-semibold text-foreground outline-none ring-ring transition-shadow focus:ring-2"
              placeholder={mode === 'toTl' ? '100' : '10000'}
              min="0"
              step="any"
              aria-label={mode === 'toTl' ? `${fromCurrency.toUpperCase()} miktarı girin` : 'TL miktarı girin'}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {mode === 'toTl' ? fromCurrency.toUpperCase() : '₺'}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <button
            onClick={() => setMode(mode === 'toTl' ? 'fromTl' : 'toTl')}
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
                {mode === 'toTl' ? formatPrice(result.value) : result.value.toFixed(4)}
                <span className="ml-1 text-base font-medium text-muted-foreground">{result.label}</span>
              </>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </p>
          {selectedRate && (
            <p className="mt-1 text-[10px] text-muted-foreground md:text-xs">
              Kur: 1 {fromCurrency.toUpperCase()} = {formatPrice(selectedRate.sellPrice)} ₺
            </p>
          )}
        </div>
      </div>

      {/* Quick amounts */}
      <div className="mt-3 flex flex-wrap gap-2">
        {(mode === 'toTl'
          ? ['1', '10', '100', '500', '1000']
          : ['1000', '5000', '10000', '50000', '100000']
        ).map(val => (
          <button
            key={val}
            onClick={() => setAmount(val)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              amount === val
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {mode === 'toTl'
              ? `${parseInt(val).toLocaleString('tr-TR')} ${fromCurrency.toUpperCase()}`
              : `${parseInt(val).toLocaleString('tr-TR')} ₺`}
          </button>
        ))}
      </div>
    </section>
  );
}
