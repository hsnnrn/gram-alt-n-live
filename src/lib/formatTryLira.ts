const tryCurrency = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Kapalı gösterimler için (₺ ile, tr-TR gruplama ve ondalık). */
export function formatTryLira(amount: number): string {
  return tryCurrency.format(amount);
}
