import { useGoldPrices } from '@/hooks/useGoldPrices';
import { useTheme } from '@/hooks/useTheme';
import StickyHeader from '@/components/StickyHeader';
import HeroSection from '@/components/HeroSection';
import GoldPriceTable from '@/components/GoldPriceTable';
import PriceConverter from '@/components/PriceConverter';
import PriceChart from '@/components/PriceChart';
import JsonLdSchema from '@/components/JsonLdSchema';
import Footer from '@/components/Footer';

const Index = () => {
  const { prices, currencies, gramPrice, lastUpdate, generateHistory } = useGoldPrices();
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
        />

        <main className="container py-4 md:py-6">
          {/* Hero */}
          {gramPrice && (
            <HeroSection
              sellPrice={gramPrice.sellPrice}
              buyPrice={gramPrice.buyPrice}
              direction={gramPrice.direction}
              changePercent={gramPrice.changePercent}
              lastUpdate={lastUpdate}
            />
          )}

          {/* Main Grid: Table + Converter */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 md:mt-6 md:gap-6">
            <div className="lg:col-span-2">
              <GoldPriceTable prices={prices} currencies={currencies} />
            </div>
            <div className="space-y-4 md:space-y-6">
              <PriceConverter gramPrice={gramPrice} />
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
              Gram Altın Nedir?
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Gram altın, 24 ayar saf altının 1 gramlık birim fiyatıdır ve Türkiye'de en yaygın takip edilen yatırım aracıdır.
              Altın fiyatları uluslararası piyasalarda ons altın (XAU/USD) referans alınarak belirlenir ve
              dolar/TL kuru ile doğrudan ilişkilidir.
            </p>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Altın Fiyatını Etkileyen Faktörler
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Uluslararası ons altın fiyatı (XAU/USD)</li>
              <li>Dolar/TL kuru</li>
              <li>Merkez bankası faiz kararları</li>
              <li>Küresel ekonomik belirsizlikler ve jeopolitik riskler</li>
              <li>Enflasyon beklentileri</li>
            </ul>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;