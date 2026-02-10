// Kapalıçarşı Gold API Service
// Source: https://kapalicarsi.apiluna.org/

const API_URL = 'https://kapalicarsi.apiluna.org/';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export interface ApiItem {
  code: string;
  alis: string | number;
  satis: string | number;
  dusuk: number;
  yuksek: number;
  kapanis: number;
  tarih: string;
}

// Gold type mappings
export const GOLD_CODES: Record<string, { name: string; unit: string; order: number }> = {
  ALTIN: { name: 'Gram Altın', unit: '₺/gr', order: 1 },
  CEYREK_YENI: { name: 'Çeyrek Altın', unit: '₺', order: 2 },
  YARIM_YENI: { name: 'Yarım Altın', unit: '₺', order: 3 },
  TAM_YENI: { name: 'Tam Altın', unit: '₺', order: 4 },
  CUMHURIYET: { name: 'Cumhuriyet Altını', unit: '₺', order: 5 },
  ATA_YENI: { name: 'Ata Altın', unit: '₺', order: 6 },
  RESAT: { name: 'Reşat Altın', unit: '₺', order: 7 },
  HAMIT: { name: 'Hamit Altın', unit: '₺', order: 8 },
  BILEZIK: { name: '22 Ayar Bilezik', unit: '₺/gr', order: 9 },
  IKIYUZELLI: { name: '2.5 Altın', unit: '₺', order: 10 },
  ONS: { name: 'Ons Altın', unit: '$/oz', order: 11 },
  AYAR22: { name: '22 Ayar Altın', unit: '₺/gr', order: 12 },
  AYAR14: { name: '14 Ayar Altın', unit: '₺/gr', order: 13 },
  GUMUS: { name: 'Gümüş', unit: '₺/gr', order: 14 },
};

// Currency mappings
export const CURRENCY_CODES: Record<string, { name: string; symbol: string }> = {
  USD: { name: 'Amerikan Doları', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' },
  GBP: { name: 'İngiliz Sterlini', symbol: '£' },
  CHF: { name: 'İsviçre Frangı', symbol: 'CHF' },
};

export async function fetchKapalicarsiData(): Promise<ApiItem[]> {
  // Try direct fetch first
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // CORS or network error, try proxy
  }

  // Fallback: CORS proxy
  try {
    const res = await fetch(`${CORS_PROXY}${encodeURIComponent(API_URL)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {
    // Proxy also failed
  }

  throw new Error('API erişilemedi');
}

export function parseNumber(val: string | number): number {
  if (typeof val === 'number') return val;
  return parseFloat(val) || 0;
}
