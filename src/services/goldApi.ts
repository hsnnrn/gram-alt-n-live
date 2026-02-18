// Altın & Döviz API Service
// Kaynak: https://anlikaltinfiyatlari.com/ — Kapalıçarşı verileri

// Geliştirmede Vite proxy kullan (CORS yok); production'da doğrudan veya CORS proxy
const KAPALICARSI_API_URL =
  typeof import.meta !== 'undefined' && import.meta.env?.DEV
    ? '/api/anlik/js/fetch/kapalicarsi.php'
    : 'https://anlikaltinfiyatlari.com/js/fetch/kapalicarsi.php';

// Production'da CORS engeli için yedek proxy listesi
const CORS_PROXIES: ((url: string) => string)[] = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

export interface ApiItem {
  code: string;
  alis: string | number;
  satis: string | number;
  dusuk: number;
  yuksek: number;
  kapanis: number;
  tarih: string;
}

// anlikaltinfiyatlari.com yanıt formatı: { GRAM: { alis, satis, zaman, percent }, ... }
export interface AnlikApiRow {
  alis: string;
  satis: string;
  zaman: string;
  percent?: string;
}

// Altın türü eşlemesi (uygulama içi kod -> ad, birim, sıra)
export const GOLD_CODES: Record<string, { name: string; unit: string; order: number }> = {
  ALTIN: { name: 'Gram Altın', unit: '₺/gr', order: 1 },
  CEYREK_YENI: { name: 'Çeyrek Altın', unit: '₺', order: 2 },
  YARIM_YENI: { name: 'Yarım Altın', unit: '₺', order: 3 },
  TAM_YENI: { name: 'Tam Altın', unit: '₺', order: 4 },
  CUMHURIYET: { name: 'Cumhuriyet Altını', unit: '₺', order: 5 },
  GREMSE: { name: 'Gremse Altın', unit: '₺', order: 6 },
  ATA_YENI: { name: 'Ata Altın', unit: '₺', order: 7 },
  RESAT: { name: 'Reşat Altın', unit: '₺', order: 8 },
  HAMIT: { name: 'Hamit Altın', unit: '₺', order: 9 },
  BILEZIK: { name: '22 Ayar Bilezik', unit: '₺/gr', order: 10 },
  IKIYUZELLI: { name: '2.5 Altın', unit: '₺', order: 11 },
  ONS: { name: 'Ons Altın', unit: '$/oz', order: 12 },
  AYAR22: { name: '22 Ayar Altın', unit: '₺/gr', order: 13 },
  AYAR14: { name: '14 Ayar Altın', unit: '₺/gr', order: 14 },
  GUMUS: { name: 'Gümüş', unit: '₺/gr', order: 15 },
  GUMUS_ONS: { name: 'Gümüş Ons', unit: '$/oz', order: 16 },
};

// Döviz eşlemesi
export const CURRENCY_CODES: Record<string, { name: string; symbol: string }> = {
  USD: { name: 'Amerikan Doları', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' },
  GBP: { name: 'İngiliz Sterlini', symbol: '£' },
  CHF: { name: 'İsviçre Frangı', symbol: 'CHF' },
};

// anlikaltinfiyatlari.com anahtar -> uygulama içi code (altın/döviz)
const API_KEY_TO_CODE: Record<string, string> = {
  GRAM: 'ALTIN',
  CEYREK: 'CEYREK_YENI',
  YARIM: 'YARIM_YENI',
  TEK: 'TAM_YENI',
  ATA: 'CUMHURIYET',
  ATA5: 'IKIYUZELLI',
  GREMSE: 'GREMSE',
  ONS: 'ONS',
  AYAR22: 'AYAR22',
  AYAR14: 'AYAR14',
  GUMUSTRY: 'GUMUS',
  XAGUSD: 'GUMUS_ONS',
  USDTRY: 'USD',
  EURTRY: 'EUR',
  GBPTRY: 'GBP',
  CHFTRY: 'CHF',
};

function toNum(v: string | number): number {
  if (typeof v === 'number') return v;
  return parseFloat(String(v).replace(/,/g, '')) || 0;
}

/** Kapanış: percent değişimden türet (satis = kapanis * (1 + percent/100) => kapanis = satis / (1 + percent/100)) */
function kapanisFromPercent(satis: number, percentStr: string | undefined): number {
  if (percentStr == null || percentStr === '') return satis;
  const p = parseFloat(percentStr);
  if (!Number.isFinite(p)) return satis;
  return satis * 100 / (100 + p);
}

async function fetchJsonFromUrl(url: string, signal: AbortSignal): Promise<Record<string, AnlikApiRow>> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const raw = await res.json();
  if (!raw || typeof raw !== 'object') throw new Error('Geçersiz yanıt');
  return raw as Record<string, AnlikApiRow>;
}

function rawToItems(raw: Record<string, AnlikApiRow>): ApiItem[] {
  const items: ApiItem[] = [];
  for (const [apiKey, row] of Object.entries(raw)) {
    if (apiKey === 'SOURCE' || !row || typeof row !== 'object') continue;

    const code = API_KEY_TO_CODE[apiKey];
    if (!code) continue;

    const alis = toNum(row.alis);
    const satis = toNum(row.satis);
    if (alis <= 0 && satis <= 0) continue;

    const kapanis = kapanisFromPercent(satis, row.percent);
    const dusuk = Math.min(alis, satis, kapanis);
    const yuksek = Math.max(alis, satis, kapanis);

    items.push({
      code,
      alis: row.alis,
      satis: row.satis,
      dusuk,
      yuksek,
      kapanis,
      tarih: row.zaman || '',
    });
  }
  return items;
}

/** WebSocket 'kapalicarsi' event payload'unu ApiItem[]e çevirir (anlikaltinfiyatlari ile aynı yapı). */
export function parseKapalicarsiPayload(payload: unknown): ApiItem[] {
  if (!payload || typeof payload !== 'object') return [];
  return rawToItems(payload as Record<string, AnlikApiRow>);
}

export async function fetchKapalicarsiData(): Promise<ApiItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const signal = controller.signal;

  try {
    // 1) Doğrudan istek (dev'de Vite proxy, prod'da CORS varsa çalışır)
    const raw = await fetchJsonFromUrl(KAPALICARSI_API_URL, signal);
    const items = rawToItems(raw);
    if (items.length > 0) return items;
  } catch {
    // CORS veya ağ hatası; proxy dene
  } finally {
    clearTimeout(timeout);
  }

  // 2) Production'da CORS proxy üzerinden dene
  for (const proxy of CORS_PROXIES) {
    const controller2 = new AbortController();
    const t = setTimeout(() => controller2.abort(), 15000);
    try {
      const url = proxy('https://anlikaltinfiyatlari.com/js/fetch/kapalicarsi.php');
      const raw = await fetchJsonFromUrl(url, controller2.signal);
      const items = rawToItems(raw);
      if (items.length > 0) return items;
    } catch {
      // Sonraki proxy
    } finally {
      clearTimeout(t);
    }
  }

  throw new Error('API\'ye ulaşılamadı (CORS/ağ). Lütfen birkaç dakika sonra tekrar deneyin.');
}

export function parseNumber(val: string | number): number {
  return toNum(val);
}
