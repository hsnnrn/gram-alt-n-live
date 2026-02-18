import SEOPageLayout from '@/components/SEOPageLayout';
import PriceConverter from '@/components/PriceConverter';
import { useGoldPrices } from '@/hooks/useGoldPrices';

export default function GramAltinHesaplama() {
  const { gramPrice } = useGoldPrices();

  return (
    <SEOPageLayout
      title="Gram Altın Hesaplama – Altın Çevirici 2026"
      description="Gram altın hesaplama aracı ile TL'den altına, altından TL'ye kolayca çevirin. Kapalıçarşı güncel fiyatlarıyla anlık altın hesaplayıcı."
      keywords="gram altın hesaplama, altın hesaplama, altın çevirici, kaç gram altın alınır, altın hesaplayıcı, gram altın kaç TL"
      canonical="/gram-altin-hesaplama"
      breadcrumb="Gram Altın Hesaplama"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Altın Hesaplama Aracı</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Aşağıdaki altın çevirici aracını kullanarak gram cinsinden altın miktarını TL&apos;ye, veya TL
            tutarını gram altına kolayca çevirebilirsiniz. Hesaplama Kapalıçarşı canlı satış fiyatı üzerinden
            yapılmaktadır.
          </p>
          <PriceConverter gramPrice={gramPrice} />
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Gram Altın Nasıl Hesaplanır?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Gram altın fiyatı hesaplaması basit bir formüle dayanır. Uluslararası piyasalarda ons altın fiyatı
            (XAU/USD) dolar bazında belirlenir. Bu fiyat, dolar/TL kuru ile çarpılıp 31,1035&apos;e (1 troy ons =
            31,1035 gram) bölünerek TL cinsinden gram altın fiyatı elde edilir.
          </p>
          <div className="mt-3 rounded-lg bg-secondary/50 p-4">
            <p className="text-sm font-semibold text-foreground">Formül:</p>
            <p className="mt-1 font-tabular text-sm text-muted-foreground">
              Gram Altın (₺) = (Ons Altın × USD/TRY) ÷ 31,1035
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Altın Hesaplama Örnekleri</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm" aria-label="Altın hesaplama örnekleri">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">Miktar</th>
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">1 gram</td>
                  <td className="px-4 py-2.5 text-muted-foreground">En küçük yatırım birimi</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">5 gram</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Küçük yatırımcılar için popüler</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">10 gram</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Orta seviye yatırım miktarı</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2.5 font-medium text-foreground">50 gram</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Büyük yatırımcılar için ideal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-foreground">100 gram</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Standart külçe altın birimi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-1 font-semibold text-foreground">10.000 TL&apos;ye kaç gram altın alınır?</h3>
              <p className="text-sm text-muted-foreground">
                10.000 TL&apos;ye alınabilecek gram altın miktarı, güncel Kapalıçarşı satış fiyatına göre değişir.
                Yukarıdaki hesaplama aracını kullanarak anlık sonucu görebilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Altın alırken alış mı satış fiyatı mı geçerli?</h3>
              <p className="text-sm text-muted-foreground">
                Altın satın alırken kuyumcunun &quot;satış&quot; fiyatını ödersiniz. Altın satarken ise kuyumcunun
                &quot;alış&quot; fiyatı geçerlidir. Aradaki fark (spread) kuyumcunun marjıdır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
