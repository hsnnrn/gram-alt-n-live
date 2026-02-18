import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinFiyatlariAnkara() {
  return (
    <SEOPageLayout
      title="Ankara Altın Fiyatları - Güncel Gram ve Çeyrek Altın"
      description="Ankara altın fiyatları canlı takip. Gram altın, çeyrek altın, yarım altın Ankara güncel kuyumcu fiyatları ve Kapalıçarşı verileri."
      keywords="ankara altın fiyatları, ankara gram altın, ankara kuyumcu altın fiyatları, ankara çeyrek altın"
      canonical="/altin-fiyatlari-ankara"
      breadcrumb="Ankara Altın Fiyatları"
    >
      <h2 className="text-lg font-bold mb-3">Ankara Altın Fiyatları</h2>
      <p className="mb-4 leading-relaxed">
        Ankara'da altın fiyatları İstanbul Kapalıçarşı referans fiyatları baz alınarak belirlenir. Başkentin kuyumcuları günlük olarak alış-satış fiyatlarını uluslararası piyasalara ve döviz kurlarına göre günceller. Ankara'da altın alım satımı Kızılay, Ulus ve Çankaya bölgelerindeki kuyumcularda yoğun olarak gerçekleşir.
      </p>

      <h3 className="text-base font-semibold mb-2">Ankara'da Altın Piyasası</h3>
      <p className="mb-4 leading-relaxed">
        Ankara, Türkiye'nin ikinci büyük altın pazarına sahiptir. Özellikle düğün sezonlarında ve bayram dönemlerinde altın talebi önemli ölçüde artar. Ankara kuyumcular odası, fiyatların şeffaf belirlenmesi için düzenli piyasa takibi yapmaktadır.
      </p>

      <h3 className="text-base font-semibold mb-2">Ankara'da Altın Nereden Alınır?</h3>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        <li>Kızılay ve Ulus bölgesindeki tarihi kuyumcular</li>
        <li>AVM'lerdeki zincir kuyumcu mağazaları</li>
        <li>Bankalar üzerinden altın hesabı</li>
        <li>Online altın alım-satım platformları</li>
      </ul>

      <h3 className="text-base font-semibold mb-2">Sıkça Sorulan Sorular</h3>
      <div className="space-y-3">
        <div>
          <p className="font-medium">Ankara'da altın fiyatları İstanbul'dan farklı mı?</p>
          <p className="text-muted-foreground">Ankara'daki altın fiyatları İstanbul Kapalıçarşı fiyatlarıyla büyük ölçüde paralel seyreder. Küçük farklılıklar kuyumcu komisyonlarından kaynaklanabilir.</p>
        </div>
        <div>
          <p className="font-medium">Ankara'da en güvenilir altın nereden alınır?</p>
          <p className="text-muted-foreground">Ankara Kuyumcular Odası'na kayıtlı, fatura veren ve darphane damgalı ürün satan kuyumcular tercih edilmelidir.</p>
        </div>
      </div>
    </SEOPageLayout>
  );
}
