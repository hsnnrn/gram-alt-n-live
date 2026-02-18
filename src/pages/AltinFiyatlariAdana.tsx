import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinFiyatlariAdana() {
  return (
    <SEOPageLayout
      title="Adana Altın Fiyatları - Güncel Gram ve Çeyrek Altın"
      description="Adana altın fiyatları canlı takip. Gram altın, çeyrek altın, yarım altın Adana güncel kuyumcu fiyatları."
      keywords="adana altın fiyatları, adana gram altın, adana kuyumcu altın, adana çeyrek altın fiyatı"
      canonical="/altin-fiyatlari-adana"
      breadcrumb="Adana Altın Fiyatları"
    >
      <h2 className="text-lg font-bold mb-3">Adana Altın Fiyatları</h2>
      <p className="mb-4 leading-relaxed">
        Adana, Çukurova Bölgesi'nin en büyük altın pazarına sahip şehridir. Seyhan ve Çukurova ilçelerindeki kuyumcular, İstanbul Kapalıçarşı referans fiyatlarını takip ederek güncel alış-satış fiyatlarını belirler.
      </p>

      <h3 className="text-base font-semibold mb-2">Adana Altın Piyasası</h3>
      <p className="mb-4 leading-relaxed">
        Adana'da altın ticareti tarihsel olarak çok güçlüdür. Özellikle Çakmak Caddesi ve çevresindeki kuyumcu esnafı, bölgenin en büyük altın pazarını oluşturur. Adana'nın düğün kültürü ve altın takma geleneği, çeyrek ve yarım altın talebini yüksek tutar.
      </p>

      <h3 className="text-base font-semibold mb-2">Adana'da Güvenli Altın Alımı İçin İpuçları</h3>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        <li>Adana Kuyumcular Odası'na kayıtlı esnafları tercih edin</li>
        <li>Darphane damgalı ürünleri kontrol edin</li>
        <li>Alış-satış farkını birden fazla kuyumcuda karşılaştırın</li>
        <li>Fatura ve garanti belgesi mutlaka alın</li>
      </ul>
    </SEOPageLayout>
  );
}
