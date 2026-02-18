import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinFiyatlariAntalya() {
  return (
    <SEOPageLayout
      title="Antalya Altın Fiyatları - Güncel Gram ve Çeyrek Altın"
      description="Antalya altın fiyatları canlı takip. Gram altın, çeyrek altın, yarım altın Antalya güncel kuyumcu fiyatları."
      keywords="antalya altın fiyatları, antalya gram altın, antalya kuyumcu altın, antalya çeyrek altın"
      canonical="/altin-fiyatlari-antalya"
      breadcrumb="Antalya Altın Fiyatları"
    >
      <h2 className="text-lg font-bold mb-3">Antalya Altın Fiyatları</h2>
      <p className="mb-4 leading-relaxed">
        Antalya, turizm sektörüyle birlikte Akdeniz Bölgesi'nin en aktif altın piyasalarından birine sahiptir. Yerli ve yabancı turistlerin yoğun ilgi gösterdiği Antalya kuyumcuları, altın alış-satış fiyatlarını Kapalıçarşı referanslarına göre belirler.
      </p>

      <h3 className="text-base font-semibold mb-2">Antalya'da Altın Alım Satım</h3>
      <p className="mb-4 leading-relaxed">
        Antalya'da altın ticareti Kaleiçi, Konyaaltı ve Lara bölgelerindeki kuyumcularda yoğun olarak gerçekleşir. Turizm sezonunda yabancı turistlerin talebiyle birlikte altın fiyatlarında küçük farklılıklar gözlenebilir.
      </p>

      <h3 className="text-base font-semibold mb-2">Altın Alırken Dikkat Edilecekler</h3>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        <li>Darphane damgalı ürünleri tercih edin</li>
        <li>Fatura ve garanti belgesi isteyin</li>
        <li>Kuyumcular Odası'na kayıtlı mağazalardan alın</li>
        <li>Alış-satış farkını (spread) karşılaştırın</li>
      </ul>
    </SEOPageLayout>
  );
}
