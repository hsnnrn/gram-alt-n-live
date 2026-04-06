/** 1–100 arası gram altın detay sayfaları için route parametresi (ör. "36"). */
export const GRAM_PAGE_MIN = 1;
export const GRAM_PAGE_MAX = 100;

/**
 * URL’deki `:gram` parçasını okur (örn. /36-gr-altin-kac-tl → "36").
 * Geçersiz veya aralık dışı ise null döner.
 */
export function parseGramFromRouteParam(param: string | undefined): number | null {
  if (param == null || param === '') return null;
  const n = parseInt(param, 10);
  if (!Number.isInteger(n) || n < GRAM_PAGE_MIN || n > GRAM_PAGE_MAX) return null;
  return n;
}

/**
 * Bonus: parse edilemezse 1 gram varsayılır (ek fetch yok; yalnızca gösterim miktarı).
 */
export function resolveGramWithDefault(param: string | undefined): number {
  return parseGramFromRouteParam(param) ?? 1;
}
