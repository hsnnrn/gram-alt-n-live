import { useGoldPrices } from '@/hooks/useGoldPrices';
import { useTheme } from '@/hooks/useTheme';
import StickyHeader from '@/components/StickyHeader';
import HeroSection from '@/components/HeroSection';
import GoldPriceTable from '@/components/GoldPriceTable';
import PriceConverter from '@/components/PriceConverter';
import CurrencyConverter from '@/components/CurrencyConverter';
import PriceChart from '@/components/PriceChart';
import GoldPredictions from '@/components/GoldPredictions';
import JsonLdSchema from '@/components/JsonLdSchema';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  const { prices, currencies, gramPrice, lastUpdate, isLoading, isError, refetch, generateHistory } = useGoldPrices();
  const { isDark, toggle } = useTheme();

  return (
    <>
      {gramPrice && (
        <JsonLdSchema
          gramSellPrice={gramPrice.sellPrice}
          gramBuyPrice={gramPrice.buyPrice}
        />
      )}

      <div className="min-h-screen bg-background">
        <StickyHeader
          gramPrice={gramPrice}
          lastUpdate={lastUpdate}
          isDark={isDark}
          onToggleTheme={toggle}
          onRefresh={() => refetch()}
        />

        <main className="container py-4 md:py-6">
          {/* Hero */}
          <HeroSection
            gramPrice={gramPrice}
            lastUpdate={lastUpdate}
            isLoading={isLoading}
          />

          {/* Main Grid: Table + Converters */}
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
              <PriceConverter gramPrice={gramPrice} />
              <CurrencyConverter currencies={currencies} />
              {gramPrice && (
                <GoldPredictions currentPrice={gramPrice.sellPrice} />
              )}
            </div>
          </div>

          {/* Chart */}
          {gramPrice && (
            <div className="mt-4 md:mt-6">
              <PriceChart
                generateHistory={generateHistory}
                basePrice={gramPrice.sellPrice}
              />
            </div>
          )}

          {/* SEO Content */}
          <article className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm md:mt-8 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-foreground">
              Kapalıçarşı Gram Altın Nedir?
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Gram altın (gr altın), 24 ayar saf altının 1 gramlık birim fiyatıdır ve Türkiye'de en yaygın takip edilen yatırım aracıdır.
              Kapalıçarşı gram altın fiyatları, İstanbul Kapalıçarşı'da kuyumcular tarafından belirlenen anlık alış ve satış fiyatlarını yansıtır.
              Altın fiyatları uluslararası piyasalarda ons altın (XAU/USD) referans alınarak belirlenir ve
              dolar/TL kuru ile doğrudan ilişkilidir.
            </p>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Gr Altın Fiyatını Etkileyen Faktörler
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Uluslararası ons altın fiyatı (XAU/USD)</li>
              <li>Dolar/TL kuru ve Euro/TL kuru</li>
              <li>Merkez bankası faiz kararları</li>
              <li>Küresel ekonomik belirsizlikler ve jeopolitik riskler</li>
              <li>Enflasyon beklentileri</li>
              <li>Kapalıçarşı arz ve talep dengesi</li>
            </ul>

            <h3 className="mb-2 mt-4 text-sm font-semibold text-foreground">
              Kapalıçarşı Altın Fiyatları Nasıl Belirlenir?
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Kapalıçarşı altın fiyatları, İstanbul Kapalıçarşı'daki kuyumcu esnafının anlık alış-satış işlemlerine göre belirlenir.
              Bu fiyatlar uluslararası altın piyasası, döviz kurları ve yurtiçi talep dengesine bağlı olarak gün içinde sürekli değişir.
              Gr altın fiyatı yatırımcılar için en önemli referans kaynağıdır.
            </p>
          </article>

          {/* Internal Links for SEO */}
          <nav className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6" aria-label="İlgili Sayfalar">
            <h2 className="mb-3 text-base font-bold text-foreground">İlgili Sayfalar</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SEO_LINKS.map(link => (
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
    </>
  );
};

const SEO_LINKS = [
  { href: '/gram-altin-nedir', label: 'Gram Altın Nedir?' },
  { href: '/ceyrek-altin-fiyati', label: 'Çeyrek Altın Fiyatı' },
  { href: '/yarim-altin-fiyati', label: 'Yarım Altın Fiyatı' },
  { href: '/tam-altin-fiyati', label: 'Tam Altın Fiyatı' },
  { href: '/altin-nasil-alinir', label: 'Altın Nasıl Alınır?' },
  { href: '/altin-yatirim-rehberi', label: 'Altın Yatırım Rehberi' },
  { href: '/altin-cesitleri', label: 'Altın Çeşitleri' },
  { href: '/doviz-kurlari', label: 'Döviz Kurları' },
  { href: '/kapalicarsı-altin-fiyatlari', label: 'Kapalıçarşı Altın Fiyatları' },
];

export default Index;
