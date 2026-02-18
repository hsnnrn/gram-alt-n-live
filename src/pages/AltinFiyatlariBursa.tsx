import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinFiyatlariBursa() {
  return (
    <SEOPageLayout
      title="Bursa Altın Fiyatları - Güncel Gram ve Çeyrek Altın"
      description="Bursa altın fiyatları canlı takip. Gram altın, çeyrek altın, yarım altın Bursa güncel kuyumcu fiyatları ve piyasa verileri."
      keywords="bursa altın fiyatları, bursa gram altın, bursa kuyumcu altın, bursa çeyrek altın"
      canonical="/altin-fiyatlari-bursa"
      breadcrumb="Bursa Altın Fiyatları"
    >
      <h2 className="text-lg font-bold mb-3">Bursa Altın Fiyatları</h2>
      <p className="mb-4 leading-relaxed">
        Bursa, Osmanlı'nın ilk başkenti olarak tarihi kuyumculuk geleneğiyle tanınır. Kapalıçarşı ve Uzunçarşı bölgelerindeki kuyumcular, yüzyıllardır altın ticaretinin merkezinde yer almaktadır.
      </p>

      <h3 className="text-base font-semibold mb-2">Bursa Altın Piyasası</h3>
      <p className="mb-4 leading-relaxed">
        Bursa'da altın fiyatları İstanbul Kapalıçarşı referanslarına paralel seyreder. Şehrin köklü kuyumculuk geleneği ve Marmara Bölgesi'ndeki stratejik konumu nedeniyle altın ticareti aktif bir şekilde sürmektedir. Özellikle düğün sezonu ve bayram dönemlerinde çeyrek altın talebi belirgin şekilde artar.
      </p>

      <h3 className="text-base font-semibold mb-2">Bursa'da Altın Nereden Alınır?</h3>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        <li>Bursa Kapalıçarşı ve Uzunçarşı kuyumcuları</li>
        <li>Osmangazi ve Nilüfer ilçelerindeki kuyumcu mağazaları</li>
        <li>Bankalar ve online altın platformları</li>
      </ul>
    </SEOPageLayout>
  );
}
