import { useParams, Link, Navigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useGoldPrices, formatPrice, formatTime } from '@/hooks/useGoldPrices';
import { useTheme } from '@/hooks/useTheme';
import StickyHeader from '@/components/StickyHeader';
import Footer from '@/components/Footer';
import {
  generateGramContent,
  GRAM_PAGES_1_TO_100,
  gramAltinPath,
  gramAltinAbsoluteUrl,
} from '@/lib/gramAltinContent';

const GENERAL_LINKS = [
  { href: '/', label: 'Canlı Altın Fiyatları' },
  { href: '/gram-altin-fiyatlari-dizin', label: '1–100 Gram Altın (tüm linkler)' },
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
  const { gramPrice, prices, lastUpdate, isLoading } = useGoldPrices();
  const { isDark, toggle } = useTheme();
  const [calcGram, setCalcGram] = useState<number | null>(null);

  const parsed = parseInt(gramParam ?? '', 10);
  const isValidGram = Number.isInteger(parsed) && parsed >= 1 && parsed <= 100;
  const gram = isValidGram ? parsed : 0;

  // Use calcGram for calculator, default to page gram
  const displayGram = calcGram ?? gram;

  const sellTotal = gramPrice ? gramPrice.sellPrice * displayGram : 0;
  const buyTotal = gramPrice ? gramPrice.buyPrice * displayGram : 0;
  const changePercent = gramPrice?.changePercent ?? 0;
  const direction = gramPrice?.direction ?? 'neutral';

  const content = isValidGram ? generateGramContent(gram) : null;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${gram} Gram Altın`,
    description: `${gram} gram altın güncel Kapalıçarşı alış ve satış fiyatları.`,
    offers: {
      '@type': 'Offer',
      price: sellTotal > 0 ? sellTotal.toFixed(2) : '0',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Kapalıçarşı' },
    },
  };

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
          content={`${gram} gram altın fiyatı, ${gram} gram altın kaç para, ${gram} gram altın fiyatı bugün, kapalıçarşı ${gram} gram altın`}
        />
        <link rel="canonical" href={gramAltinAbsoluteUrl(gram)} />
        <meta property="og:title" content={`${gram} Gram Altın Fiyatı 2026 (Canlı)`} />
        <meta property="og:description" content={`${gram} gram altın fiyatı bugün ne kadar?`} />
        <meta property="og:url" content={gramAltinAbsoluteUrl(gram)} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="Gram Altın Kaç Para" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${gram} Gram Altın Fiyatı 2026 (Canlı)`} />
        <meta name="twitter:description" content={`${gram} gram altın fiyatı bugün ne kadar?`} />
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

      <main className="container py-6 md:py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm"
        >
          <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            Anasayfa
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/gram-altin-fiyatlari-dizin" className="hover:text-foreground transition-colors">
            Altın Fiyatları
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{gram} Gram Altın</span>
        </nav>

        {/* Page Title - Midas style centered */}
        <h1 className="text-center text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl mb-8">
          {gram} Gram Altın Ne Kadar?
        </h1>

        {/* Hero Price Card - Midas style */}
        <section className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8 max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Fiyat yükleniyor...</span>
            </div>
          ) : (
            <>
              {/* Sale price headline */}
              <p className="text-sm text-muted-foreground mb-1">
                {displayGram} Gram Altın Satış Fiyatı:{' '}
                <strong className="text-foreground text-lg">{formatPrice(sellTotal)}₺</strong>
              </p>

              {/* Calculator Row */}
              <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-3">
                <div className="flex items-center rounded-lg border border-border bg-secondary/30 px-4 py-3 flex-1">
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={displayGram}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      setCalcGram(Number.isNaN(v) || v < 1 ? null : v);
                    }}
                    className="w-16 bg-transparent text-center text-lg font-bold text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-label="Gram miktarı"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">Gram</span>
                </div>

                <button
                  onClick={() => setCalcGram(displayGram)}
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Hesapla
                </button>

                <div className="flex items-center justify-center rounded-lg bg-primary px-6 py-3 flex-1 sm:flex-[1.5]">
                  <span className="text-lg font-bold text-primary-foreground tabular-nums">
                    {formatPrice(sellTotal)} TL
                  </span>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Content - "X Gram Altın Kaç TL?" */}
        {gramPrice && (
          <section className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8 max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-foreground mb-3">
              {gram} Gram Altın Kaç TL?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gram altın fiyatları anlık olarak değişkenlik gösterir. Ancak {gram} Gram altın kaç TL
              diye hesaplayacak olursak; anlık gram altın fiyatına göre {gram} Gram altının alış
              fiyatı{' '}
              <strong className="text-foreground">{formatPrice(buyTotal)} TL</strong>, satış fiyatı ise{' '}
              <strong className="text-foreground">{formatPrice(sellTotal)} TL</strong>{' '}
              seviyelerindedir. Alış-satış fiyatları en son{' '}
              {lastUpdate.toLocaleDateString('tr-TR')} tarihinde saat{' '}
              {formatTime(lastUpdate)} itibarıyla güncellenmiştir.
            </p>
          </section>
        )}

        {/* Serbest Piyasada Altın Table - Midas style */}
        {prices.length > 0 && (
          <section className="mb-8 rounded-xl border border-border bg-card shadow-sm max-w-3xl mx-auto overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h2 className="text-base font-bold text-primary-foreground md:text-lg">
                Serbest Piyasada Altın
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Serbest piyasa altın fiyatları">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Altın</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Alış</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Satış</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Değişim</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Saat</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((p) => {
                    const dirColor =
                      p.direction === 'up'
                        ? 'text-up'
                        : p.direction === 'down'
                          ? 'text-down'
                          : 'text-muted-foreground';
                    const DirIcon =
                      p.direction === 'up'
                        ? TrendingUp
                        : p.direction === 'down'
                          ? TrendingDown
                          : Minus;
                    return (
                      <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <DirIcon className={`h-4 w-4 shrink-0 ${dirColor}`} />
                            {p.name}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-foreground">
                          {formatPrice(p.buyPrice)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-foreground">
                          {formatPrice(p.sellPrice)}
                        </td>
                        <td className={`px-4 py-3 text-right tabular-nums font-medium ${dirColor}`}>
                          {p.changePercent > 0 ? '+' : ''}
                          {p.changePercent.toFixed(2)}%
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground tabular-nums">
                          {formatTime(p.lastUpdate)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Content Article */}
        <article className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8 max-w-3xl mx-auto">
          <div className="space-y-6 text-foreground">
            <div>
              <h2 className="mb-2 text-lg font-bold">{gram} Gram Altın Nedir?</h2>
              <p className="leading-relaxed text-sm text-muted-foreground">{content.whatIs}</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">{gram} Gram Altın Yatırım İçin Uygun mu?</h2>
              <p className="leading-relaxed text-sm text-muted-foreground">{content.investment}</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Kapalı Çarşı Fiyat Farkı</h2>
              <p className="leading-relaxed text-sm text-muted-foreground">{content.priceSpread}</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">{gram} Gram Altın Kullanım Senaryoları</h2>
              <p className="leading-relaxed text-sm text-muted-foreground">{content.useCases}</p>
            </div>
          </div>
        </article>

        {/* 1-100 gram links */}
        <nav
          aria-label="1 ile 100 gram arası tüm altın fiyatı sayfaları"
          className="mb-8 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6 max-w-3xl mx-auto"
        >
          <h2 className="mb-1 text-base font-bold text-foreground">
            1–100 Gram Altın Fiyatı Sayfaları
          </h2>
          <p className="mb-3 text-xs text-muted-foreground md:text-sm">
            Tüm URL listesi için{' '}
            <Link
              to="/gram-altin-fiyatlari-dizin"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
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
                className={`flex items-center justify-center rounded-lg border px-1 py-2 text-center text-xs font-medium transition-colors sm:text-sm ${
                  g === gram
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-foreground hover:border-primary/50 hover:bg-secondary/50'
                }`}
              >
                {g} g
              </Link>
            ))}
          </div>
        </nav>

        {/* General Internal Links */}
        <nav
          aria-label="İlgili sayfalar"
          className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6 max-w-3xl mx-auto"
        >
          <h2 className="mb-3 text-base font-bold text-foreground">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
