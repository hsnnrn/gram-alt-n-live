import type { Params } from 'react-router-dom';

/** 1–100 arası gram altın detay sayfaları için route parametresi (ör. "36"). */
export const GRAM_PAGE_MIN = 1;
export const GRAM_PAGE_MAX = 100;

/**
 * React Router v6, `/:gram-gr-altin-kac-tl` gibi desenlerde param adını `gram` değil,
 * tireli tam eşleşme olarak verir (`gram-gr-altin-kac-tl`). Aynı şekilde eski `/:gram-gram-altin-fiyati`.
 */
export const GRAM_ROUTE_PARAM_KAC_TL = 'gram-gr-altin-kac-tl';
export const GRAM_ROUTE_PARAM_LEGACY_FIYATI = 'gram-gram-altin-fiyati';

/** useParams() çıktısından sayısal slug parçasını okur (örn. "37"). */
export function gramSlugFromParams(params: Readonly<Params>): string | undefined {
  return params[GRAM_ROUTE_PARAM_KAC_TL] ?? params[GRAM_ROUTE_PARAM_LEGACY_FIYATI];
}

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
