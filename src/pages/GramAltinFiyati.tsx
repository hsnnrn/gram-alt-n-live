import { useParams, Link, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, TrendingDown, Minus, ChevronRight, Home, BarChart2 } from 'lucide-react';
import { useGoldPrices, formatPrice } from '@/hooks/useGoldPrices';
import { useTheme } from '@/hooks/useTheme';
import StickyHeader from '@/components/StickyHeader';
import Footer from '@/components/Footer';
import PriceChart from '@/components/PriceChart';
import {
  generateGramContent,
  GRAM_PAGES_1_TO_100,
  gramAltinPath,
  gramAltinAbsoluteUrl,
} from '@/lib/gramAltinContent';

const GENERAL_LINKS = [
  { href: '/', label: 'Canlı Altın Fiyatları' },
  { href: '/gram-altin-fiyatlari-dizin', label: "1–100 Gram Altın (tüm linkler)" },
  { href: '/gram-altin-nedir', label: 'Gram Altın Nedir?' },
  { href: '/ceyrek-altin-fiyati', label: 'Çeyrek Altın Fiyatı' },
  { href: '/altin-yatirim-rehberi', label: 'Altın Yatırım Rehberi' },
  { href: '/gram-altin-hesaplama', label: 'Gram Altın Hesaplama' },
  { href: '/kapalicarsı-altin-fiyatlari', label: 'Kapalıçarşı Fiyatları' },
  { href: '/altin-cesitleri', label: 'Altın Çeşitleri' },
  { href: '/altin-nasil-alinir', label: 'Altın Nasıl Alınır?' },
];

export default function GramAltinFiyati() {
  const { gram: gramParam } = useParams<{ gram: string }>();
  const { gramPrice, lastUpdate, isLoading, generateHistory } = useGoldPrices();
  const { isDark, toggle } = useTheme();

  const parsed = parseInt(gramParam ?? '', 10);
  const isValidGram = Number.isInteger(parsed) && parsed >= 1 && parsed <= 100;
  const gram = isValidGram ? parsed : 0;

  const sellTotal = gramPrice && gram >= 1 ? gramPrice.sellPrice * gram : 0;
  const buyTotal = gramPrice && gram >= 1 ? gramPrice.buyPrice * gram : 0;
  const closingTotal = gramPrice && gram >= 1 ? gramPrice.closingPrice * gram : 0;
  const lowTotal = gramPrice && gram >= 1 ? gramPrice.lowPrice * gram : 0;
  const highTotal = gramPrice && gram >= 1 ? gramPrice.highPrice * gram : 0;
  const changePercent = gramPrice?.changePercent ?? 0;
  const direction = gramPrice?.direction ?? 'neutral';
  const dailyChange = sellTotal - closingTotal;

  const weeklyHistory = useMemo(() => {
    if (!gramPrice || gram < 1) return [];
    return generateHistory(gramPrice.sellPrice * gram, 7);
  }, [gramPrice, gram, generateHistory]);

  const weeklyChange =
    weeklyHistory.length >= 2 ? sellTotal - weeklyHistory[0].price : 0;
  const weeklyChangePct =
    weeklyHistory.length >= 2 && weeklyHistory[0].price > 0
      ? ((sellTotal - weeklyHistory[0].price) / weeklyHistory[0].price) * 100
      : 0;

  const content = isValidGram ? generateGramContent(gram) : null;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${gram} Gram Altın`,
    description: `${gram} gram altın güncel Kapalıçarşı alış ve satış fiyatları. Canlı ${gram} gram altın fiyatı.`,
    offers: {
      '@type': 'Offer',
      price: sellTotal > 0 ? sellTotal.toFixed(2) : '0',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Kapalıçarşı',
      },
    },
  };

  const directionIcon =
    direction === 'up' ? (
      <TrendingUp className="h-4 w-4" />
    ) : direction === 'down' ? (
      <TrendingDown className="h-4 w-4" />
    ) : (
      <Minus className="h-4 w-4" />
    );

  const directionClass =
    direction === 'up'
      ? 'text-green-600 dark:text-green-500'
      : direction === 'down'
        ? 'text-red-500'
        : 'text-muted-foreground';

  if (!isValidGram || !content) {
    return <Navigate to="/gram-altin-fiyatlari-dizin" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${gram} Gram Altın Fiyatı 2026 (Canlı) – Kapalı Çarşı`}</title>
        <meta
          name="description"
          content={`${gram} gram altın fiyatı bugün ne kadar? Kapalı Çarşı canlı altın fiyatları ve anlık değişimler burada.`}
        />
        <meta
          name="keywords"
          content={`${gram} gram altın fiyatı, ${gram} gram altın kaç para, ${gram} gram altın fiyatı bugün, kapalıçarşı ${gram} gram altın, ${gram} gram altın 2026`}
        />
        <link
          rel="canonical"
          href={`https://gramaltinkacpara.com/${gram}-gram-altin-fiyati`}
        />
        <meta
          property="og:title"
          content={`${gram} Gram Altın Fiyatı 2026 (Canlı) – Kapalı Çarşı`}
        />
        <meta
          property="og:description"
          content={`${gram} gram altın fiyatı bugün ne kadar? Kapalı Çarşı canlı altın fiyatları.`}
        />
        <meta
          property="og:url"
          content={`https://gramaltinkacpara.com/${gram}-gram-altin-fiyati`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="Gram Altın Kaç Para" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${gram} Gram Altın Fiyatı 2026 (Canlı) – Kapalı Çarşı`}
        />
        <meta
          name="twitter:description"
          content={`${gram} gram altın fiyatı bugün ne kadar? Kapalı Çarşı canlı altın fiyatları.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Helmet>

      <StickyHeader
        gramPrice={gramPrice}
        lastUpdate={lastUpdate}
        isDark={isDark}
        onToggleTheme={toggle}
      />

      <main className="container py-4 md:py-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm"
        >
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to="/gram-altin-fiyatlari-dizin"
            className="hover:text-foreground transition-colors"
          >
            1–100 Gram
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{gram} Gram Altın Fiyatı</span>
        </nav>

        {/* Hero Price Card */}
        <section
          aria-labelledby="gram-price-heading"
          className="mb-5 rounded-xl border border-border bg-card p-5 shadow-sm md:p-8"
        >
          <h1
            id="gram-price-heading"
            className="mb-2 text-2xl font-extrabold text-foreground md:text-3xl lg:text-4xl"
          >
            {gram} Gram Altın Fiyatı (Canlı)
          </h1>
          <p className="mb-5 text-sm text-muted-foreground">
            Kapalıçarşı anlık {gram} gram altın alış ve satış fiyatları. Son güncelleme:{' '}
            {lastUpdate.toLocaleTimeString('tr-TR')}
          </p>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Fiyat yükleniyor...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Anlık Satış */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Anlık Satış
                </p>
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {formatPrice(sellTotal)} ₺
                </p>
                <div className={`mt-1.5 flex items-center gap-1 text-sm font-medium ${directionClass}`}>
                  {directionIcon}
                  <span>
                    {changePercent > 0 ? '+' : ''}
                    {changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Kapalıçarşı Alış */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Kapalıçarşı Alış
                </p>
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {formatPrice(buyTotal)} ₺
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">Kuyumcu alış fiyatı</p>
              </div>

              {/* Dün Kapanış */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Dün Kapanış
                </p>
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {formatPrice(closingTotal)} ₺
                </p>
                <p
                  className={`mt-1.5 text-xs font-medium ${dailyChange >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-500'}`}
                >
                  {dailyChange >= 0 ? '+' : ''}
                  {formatPrice(dailyChange)} ₺ bugün
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Stats Row */}
        {gramPrice && (
          <section
            aria-label="Fiyat istatistikleri"
            className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">Günlük Düşük</p>
              <p className="mt-1 text-base font-bold tabular-nums text-foreground">
                {formatPrice(lowTotal)} ₺
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">Günlük Yüksek</p>
              <p className="mt-1 text-base font-bold tabular-nums text-foreground">
                {formatPrice(highTotal)} ₺
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">Son 7 Gün</p>
              <p
                className={`mt-1 text-base font-bold tabular-nums ${weeklyChange >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-500'}`}
              >
                {weeklyChange >= 0 ? '+' : ''}
                {weeklyChangePct.toFixed(2)}%
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground">Alış–Satış Farkı</p>
              <p className="mt-1 text-base font-bold tabular-nums text-foreground">
                {formatPrice((gramPrice.sellPrice - gramPrice.buyPrice) * gram)} ₺
              </p>
            </div>
          </section>
        )}

        {/* 7-Day Table */}
        {weeklyHistory.length > 0 && gramPrice && (
          <section
            aria-labelledby="weekly-heading"
            className="mb-5 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <h2 id="weekly-heading" className="text-base font-bold text-foreground">
                Son 7 Gün – {gram} Gram Altın Fiyat Değişimi
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label={`${gram} gram altın son 7 günlük fiyatlar`}>
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Tarih</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Fiyat (₺)</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Değişim</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyHistory.map((item, idx) => {
                    const prev = idx > 0 ? weeklyHistory[idx - 1].price : item.price;
                    const chg = item.price - prev;
                    const chgPct = prev > 0 ? (chg / prev) * 100 : 0;
                    return (
                      <tr key={idx} className="border-b border-border/50 last:border-0">
                        <td className="py-2 text-muted-foreground">
                          {item.timestamp.toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </td>
                        <td className="py-2 text-right font-medium tabular-nums text-foreground">
                          {formatPrice(item.price)} ₺
                        </td>
                        <td
                          className={`py-2 text-right tabular-nums text-xs ${idx === 0 ? 'text-muted-foreground' : chg >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-500'}`}
                        >
                          {idx === 0
                            ? '–'
                            : `${chg >= 0 ? '+' : ''}${chgPct.toFixed(2)}%`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Chart */}
        {gramPrice && (
          <div className="mb-5">
            <PriceChart
              generateHistory={generateHistory}
              basePrice={gramPrice.sellPrice * gram}
            />
          </div>
        )}

        {/* Content Article */}
        <article className="mb-5 rounded-xl border border-border bg-card p-5 shadow-sm md:p-8">
          <div className="space-y-7 text-foreground">
            <div>
              <h2 className="mb-3 text-xl font-bold">{gram} Gram Altın Nedir?</h2>
              <p className="leading-relaxed text-muted-foreground">{content.whatIs}</p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold">
                {gram} Gram Altın Yatırım İçin Uygun mu?
              </h2>
              <p className="leading-relaxed text-muted-foreground">{content.investment}</p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold">Kapalı Çarşı Fiyat Farkı</h2>
              <p className="leading-relaxed text-muted-foreground">{content.priceSpread}</p>
              {gramPrice && (
                <div className="mt-3 rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Anlık Kapalıçarşı Fiyat Bilgisi:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                    <span>
                      Alış:{' '}
                      <strong className="text-foreground tabular-nums">
                        {formatPrice(buyTotal)} ₺
                      </strong>
                    </span>
                    <span>
                      Satış:{' '}
                      <strong className="text-foreground tabular-nums">
                        {formatPrice(sellTotal)} ₺
                      </strong>
                    </span>
                    <span>
                      Fark:{' '}
                      <strong className="text-foreground tabular-nums">
                        {formatPrice((gramPrice.sellPrice - gramPrice.buyPrice) * gram)} ₺
                      </strong>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold">
                {gram} Gram Altın Kullanım Senaryoları
              </h2>
              <p className="leading-relaxed text-muted-foreground">{content.useCases}</p>
            </div>
          </div>
        </article>

        {/* Tüm 1–100 gram linkleri */}
        <nav
          aria-label="1 ile 100 gram arası tüm altın fiyatı sayfaları"
          className="mb-5 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6"
        >
          <h2 className="mb-1 text-base font-bold text-foreground">
            1–100 Gram Altın Fiyatı Sayfaları
          </h2>
          <p className="mb-3 text-xs text-muted-foreground md:text-sm">
            Her kutuda kısa yol ve tam adres. Mevcut sayfa vurguludur. Tüm URL listesi için{' '}
            <Link to="/gram-altin-fiyatlari-dizin" className="font-medium text-primary underline-offset-2 hover:underline">
              dizin sayfası
            </Link>
            .
          </p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {GRAM_PAGES_1_TO_100.map((g) => (
              <Link
                key={g}
                to={gramAltinPath(g)}
                aria-current={g === gram ? 'page' : undefined}
                className={`flex flex-col items-center justify-center rounded-lg border px-1 py-2 text-center text-xs font-medium transition-colors sm:text-sm ${
                  g === gram
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-foreground hover:border-primary/50 hover:bg-secondary/50'
                }`}
              >
                <span>{g} g</span>
                <span className="mt-0.5 hidden font-mono text-[9px] text-muted-foreground sm:block">
                  {gramAltinPath(g)}
                </span>
              </Link>
            ))}
          </div>
          <details className="mt-4 rounded-lg border border-border bg-secondary/20 p-3">
            <summary className="cursor-pointer text-xs font-semibold text-foreground md:text-sm">
              Bu sayfanın tam URL’si
            </summary>
            <p className="mt-2 break-all font-mono text-[11px] text-muted-foreground">
              {gramAltinAbsoluteUrl(gram)}
            </p>
          </details>
        </nav>

        {/* General Internal Links */}
        <nav
          aria-label="İlgili sayfalar"
          className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6"
        >
          <h2 className="mb-3 text-base font-bold text-foreground">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {GENERAL_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50"
              >
                <ChevronRight className="h-4 w-4 shrink-0 text-primary" />
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
