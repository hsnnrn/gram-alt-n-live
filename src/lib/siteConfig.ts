/** Tek domain ve sosyal önizleme için tek kaynak (Batuhan Durmaz e-ticaret SEO: canonical, OG, sitemap). */
export const SITE_BASE_URL = 'https://gramaltinkacpara.com';

/** Türkçe karakter içermeyen tercih edilen Kapalıçarşı sayfası yolu (URL yapısı). */
export const KAPALICARSI_CANONICAL_PATH = '/kapalicarsi-altin-fiyatlari';

export const DEFAULT_OG_IMAGE_PATH = '/placeholder.svg';

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_BASE_URL}${p}`;
}
