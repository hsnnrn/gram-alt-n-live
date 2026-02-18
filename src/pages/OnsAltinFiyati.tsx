import SEOPageLayout from '@/components/SEOPageLayout';

export default function OnsAltinFiyati() {
  return (
    <SEOPageLayout
      title="Ons Altın Fiyatı - Güncel XAU/USD ve TL Fiyatları"
      description="Ons altın fiyatı canlı takip. XAU/USD uluslararası altın fiyatları, ons altın TL karşılığı ve piyasa analizi."
      keywords="ons altın fiyatı, xau usd, uluslararası altın fiyatı, ons altın kaç tl, ons altın kaç dolar"
      canonical="/ons-altin-fiyati"
      breadcrumb="Ons Altın Fiyatı"
    >
      <h2 className="text-lg font-bold mb-3">Ons Altın (XAU/USD) Nedir?</h2>
      <p className="mb-4 leading-relaxed">
        Ons altın, uluslararası altın piyasalarında kullanılan standart ölçü birimidir. 1 troy ons = 31.1035 gram altına eşittir. XAU/USD kodu ile işlem gören ons altın, ABD doları cinsinden fiyatlandırılır ve dünya genelinde altın fiyatlarının referansıdır.
      </p>

      <h3 className="text-base font-semibold mb-2">Ons Altın Fiyatını Etkileyen Faktörler</h3>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        <li>ABD Merkez Bankası (FED) faiz kararları</li>
        <li>ABD doları endeksi (DXY)</li>
        <li>Küresel enflasyon verileri</li>
        <li>Jeopolitik riskler ve savaşlar</li>
        <li>Merkez bankalarının altın alımları</li>
        <li>ABD tahvil getirileri</li>
        <li>Küresel ekonomik büyüme beklentileri</li>
      </ul>

      <h3 className="text-base font-semibold mb-2">Ons Altın ile Gram Altın İlişkisi</h3>
      <p className="mb-4 leading-relaxed">
        Türkiye'deki gram altın fiyatı doğrudan ons altın fiyatından türetilir. Formül: <strong>Gram Altın (TL) = (Ons Altın USD × Dolar/TL Kuru) ÷ 31.1035</strong>. Bu nedenle hem ons altın fiyatındaki hem de dolar kurundaki değişimler gram altın fiyatını etkiler.
      </p>

      <h3 className="text-base font-semibold mb-2">Ons Altın Piyasası İşlem Saatleri</h3>
      <p className="mb-4 leading-relaxed">
        Uluslararası altın piyasası haftanın 5 günü 24 saat açıktır. En yoğun işlem saatleri Londra ve New York borsalarının açık olduğu saatlerdir (TSİ 10:00-23:00). Asya seansı ise TSİ 02:00-10:00 arasında gerçekleşir.
      </p>

      <h3 className="text-base font-semibold mb-2">Sıkça Sorulan Sorular</h3>
      <div className="space-y-3">
        <div>
          <p className="font-medium">1 ons altın kaç gram?</p>
          <p className="text-muted-foreground">1 troy ons = 31.1035 gramdır. Bu, standart bir ons'tan (28.35 gram) farklıdır.</p>
        </div>
        <div>
          <p className="font-medium">Ons altın neden dolar ile fiyatlanır?</p>
          <p className="text-muted-foreground">Altın uluslararası bir emtia olduğu için dünya genelinde ABD doları ile fiyatlandırılır. Bu, tüm ülkelerde ortak bir referans noktası sağlar.</p>
        </div>
      </div>
    </SEOPageLayout>
  );
}
