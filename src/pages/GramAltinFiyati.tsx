import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';
import { useGoldPrices, formatPrice } from '@/hooks/useGoldPrices';
import { gramSlugFromParams, resolveGramWithDefault } from '@/lib/gramAltinSlug';
import { formatTryLira } from '@/lib/formatTryLira';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from '@/hooks/useTheme';
import StickyHeader from '@/components/StickyHeader';
import HeroSection from '@/components/HeroSection';
import GoldPriceTable from '@/components/GoldPriceTable';
import PriceConverter from '@/components/PriceConverter';
import CurrencyConverter from '@/components/CurrencyConverter';
import PriceChart from '@/components/PriceChart';
import GoldPredictions from '@/components/GoldPredictions';
import Footer from '@/components/Footer';
import {
  generateGramContent,
  GRAM_PAGES_1_TO_100,
  gramAltinPath,
  gramAltinAbsoluteUrl,
} from '@/lib/gramAltinContent';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { SITE_BASE_URL, absoluteUrl } from '@/lib/siteConfig';

const GENERAL_LINKS = [
  { href: '/', label: 'Canlı Altın Fiyatları' },
  { href: '/gram-altin-fiyatlari-dizin', label: '1–100 Gram Altın (tüm linkler)' },
  { href: '/gram-altin-nedir', label: 'Gram Altın Nedir?' },
  { href: '/ceyrek-altin-fiyati', label: 'Çeyrek Altın Fiyatı' },
  { href: '/altin-yatirim-rehberi', label: 'Altın Yatırım Rehberi' },
  { href: '/gram-altin-hesaplama', label: 'Gram Altın Hesaplama' },
  { href: '/kapalicarsi-altin-fiyatlari', label: 'Kapalıçarşı Fiyatları' },
  { href: '/altin-cesitleri', label: 'Altın Çeşitleri' },
  { href: '/altin-nasil-alinir', label: 'Altın Nasıl Alınır?' },
];

export default function GramAltinFiyati() {
  const params = useParams();
  const { gramPrice, prices, currencies, lastUpdate, isLoading, isError, refetch, generateHistory } =
    useGoldPrices();
  const { isDark, toggle } = useTheme();

  const gram = resolveGramWithDefault(gramSlugFromParams(params));
  const content = generateGramContent(gram);

  const sellTotal = gramPrice ? gramPrice.sellPrice * gram : 0;
  const buyTotal = gramPrice ? gramPrice.buyPrice * gram : 0;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${gram} Gram Altın`,
    description: `${gram} gram altın güncel Kapalıçarşı alış ve satış fiyatları.`,
    brand: { '@type': 'Brand', name: 'Gram Altın Kaç Para' },
    offers: {
      '@type': 'Offer',
      price: sellTotal > 0 ? sellTotal.toFixed(2) : '0',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: gramAltinAbsoluteUrl(gram),
      seller: { '@type': 'Organization', name: 'Gram Altın Kaç Para', url: SITE_BASE_URL },
    },
  };

  const heroHeadingId = `hero-gram-${gram}`;
  const headlineId = `gram-kac-tl-${gram}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${gram} Gram Altın Kaç TL - Güncel Altın Fiyatları`}</title>
        <meta
          name="description"
          content={`${gram} gram altın bugün ne kadar? Anlık hesaplama ve güncel fiyatlar.`}
        />
        <meta
          name="keywords"
          content={`${gram} gram altın kaç tl, ${gram} gram altın fiyatı, ${gram} gr altın, kapalıçarşı ${gram} gram altın, gram altın güncel`}
        />
        <link rel="canonical" href={gramAltinAbsoluteUrl(gram)} />
        <meta property="og:title" content={`${gram} Gram Altın Kaç TL - Güncel Altın Fiyatları`} />
        <meta property="og:description" content={`${gram} gram altın bugün ne kadar? Anlık hesaplama ve güncel fiyatlar.`} />
        <meta property="og:url" content={gramAltinAbsoluteUrl(gram)} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="Gram Altın Kaç Para" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${gram} Gram Altın Kaç TL - Güncel Altın Fiyatları`} />
        <meta name="twitter:description" content={`${gram} gram altın bugün ne kadar? Anlık hesaplama ve güncel fiyatlar.`} />
        <meta property="og:image" content={absoluteUrl('/placeholder.svg')} />
        <meta property="og:image:alt" content={`${gram} gram altın güncel fiyat`} />
        <meta name="twitter:image" content={absoluteUrl('/placeholder.svg')} />
        {gram > 1 ? <link rel="prev" href={gramAltinAbsoluteUrl(gram - 1)} /> : null}
        {gram < 100 ? <link rel="next" href={gramAltinAbsoluteUrl(gram + 1)} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Helmet>
      <BreadcrumbJsonLd
        items={[
          { name: 'Ana Sayfa', path: '/' },
          { name: 'Gram Altın Fiyatları', path: '/gram-altin-fiyatlari-dizin' },
          { name: `${gram} Gram Altın`, path: gramAltinPath(gram) },
        ]}
      />

      <StickyHeader
        gramPrice={gramPrice}
        lastUpdate={lastUpdate}
        isDark={isDark}
        onToggleTheme={toggle}
        onRefresh={() => refetch()}
        gramMultiplier={gram}
      />

      <main className="container py-4 md:py-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground md:mb-6 md:text-sm"
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

        <section
          className="mb-4 rounded-2xl border border-border bg-card px-4 py-6 shadow-sm md:mb-6 md:px-8 md:py-8"
          aria-labelledby={headlineId}
        >
          <h1
            id={headlineId}
            className="text-center text-2xl font-extrabold tracking-tight text-foreground md:text-4xl"
          >
            {gram} Gram Altın Kaç TL?
          </h1>
          {isLoading ? (
            <div className="mt-6 flex justify-center">
              <Skeleton className="h-14 w-56 max-w-full md:h-16 md:w-72" />
            </div>
          ) : gramPrice ? (
            <p
              className="mt-4 text-center font-tabular text-3xl font-extrabold text-foreground md:mt-6 md:text-5xl"
              aria-live="polite"
            >
              {formatTryLira(gramPrice.sellPrice * gram)}
            </p>
          ) : (
            <p className="mt-4 text-center text-lg text-muted-foreground md:mt-6">Fiyat yüklenemedi.</p>
          )}
          <p className="mt-3 text-center text-xs text-muted-foreground md:text-sm">
            Kapalıçarşı gram altın satış tutarı: {gram} × birim satış (tek veri kaynağı, anlık güncellenir).
          </p>
        </section>

        {/* Anasayfadaki ile aynı düzen: N gram toplam satış / alış / değişim / gün aralığı (useGoldPrices cache) */}
        <HeroSection
          gramPrice={gramPrice}
          lastUpdate={lastUpdate}
          isLoading={isLoading}
          gramMultiplier={gram}
          heroTitle={`${gram} Gram Altın — piyasa özeti`}
          headingId={heroHeadingId}
          titleTag="h2"
        />

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 md:mt-6 md:gap-6">
          <div className="lg:col-span-2">
            <GoldPriceTable
              prices={prices}
              currencies={currencies}
              isLoading={isLoading}
              isError={isError}
              onRefresh={() => refetch()}
            />
          </div>
          <div className="space-y-4 md:space-y-6">
            <PriceConverter key={gram} gramPrice={gramPrice} initialGrams={String(gram)} />
            <CurrencyConverter currencies={currencies} />
            {gramPrice ? <GoldPredictions currentPrice={gramPrice.sellPrice} /> : null}
          </div>
        </div>

        {gramPrice ? (
          <div className="mt-4 md:mt-6">
            <PriceChart
              generateHistory={generateHistory}
              basePrice={gramPrice.sellPrice * gram}
              title={`${gram} Gram Altın Grafiği`}
              sectionId={`chart-gram-${gram}`}
            />
          </div>
        ) : null}

        {gramPrice ? (
          <article className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm md:mt-8 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-foreground">{gram} Gram Altın Kaç TL?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Anlık gram altın birim fiyatına göre {gram} gram altının tahmini alış tutarı{' '}
              <strong className="text-foreground tabular-nums">{formatPrice(buyTotal)} TL</strong>
              , satış tutarı ise{' '}
              <strong className="text-foreground tabular-nums">{formatPrice(sellTotal)} TL</strong>{' '}
              civarındadır. Üstteki kart, anasayfadaki 1 gram göstergesiyle aynı düzende toplam değerleri
              gösterir; fiyatlar piyasaya göre sürekli güncellenir.
            </p>
          </article>
        ) : null}

        <article className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm md:mt-8 md:p-8">
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

        <nav
          aria-label="1 ile 100 gram arası tüm altın fiyatı sayfaları"
          className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm md:mt-8 md:p-6"
        >
          <h2 className="mb-1 text-base font-bold text-foreground">1–100 Gram Altın Fiyatı Sayfaları</h2>
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

        <nav
          aria-label="İlgili sayfalar"
          className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6"
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
