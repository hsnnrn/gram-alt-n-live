import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinFiyatlariIzmir() {
  return (
    <SEOPageLayout
      title="İzmir Altın Fiyatları - Güncel Gram ve Çeyrek Altın"
      description="İzmir altın fiyatları canlı takip. Gram altın, çeyrek altın, tam altın İzmir güncel kuyumcu fiyatları."
      keywords="izmir altın fiyatları, izmir gram altın, izmir kuyumcu altın, izmir çeyrek altın fiyatı"
      canonical="/altin-fiyatlari-izmir"
      breadcrumb="İzmir Altın Fiyatları"
    >
      <h2 className="text-lg font-bold mb-3">İzmir Altın Fiyatları</h2>
      <p className="mb-4 leading-relaxed">
        İzmir, Ege Bölgesi'nin en büyük altın piyasasına sahip şehridir. Kemeraltı Çarşısı başta olmak üzere İzmir'deki kuyumcular, Kapalıçarşı referans fiyatlarını takip ederek alış-satış işlemlerini gerçekleştirir.
      </p>

      <h3 className="text-base font-semibold mb-2">İzmir Altın Piyasası</h3>
      <p className="mb-4 leading-relaxed">
        İzmir'de altın ticareti özellikle Kemeraltı Çarşısı, Konak ve Alsancak bölgelerinde yoğunlaşmıştır. Ege Bölgesi'nin düğün gelenekleri nedeniyle özellikle yaz aylarında altın talebi yükselir. İzmir'deki kuyumcular çeyrek altın ve yarım altın satışlarında Türkiye ortalamasının üzerinde işlem hacmine sahiptir.
      </p>

      <h3 className="text-base font-semibold mb-2">İzmir'de Güvenli Altın Alımı</h3>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        <li>Kemeraltı Çarşısı'ndaki köklü kuyumcular</li>
        <li>İzmir Kuyumcular Odası üyesi mağazalar</li>
        <li>Banka şubeleri ve altın hesapları</li>
        <li>Online güvenli altın platformları</li>
      </ul>

      <h3 className="text-base font-semibold mb-2">Sıkça Sorulan Sorular</h3>
      <div className="space-y-3">
        <div>
          <p className="font-medium">İzmir'de gram altın fiyatı ne kadar?</p>
          <p className="text-muted-foreground">İzmir'de gram altın fiyatı İstanbul Kapalıçarşı referansıyla belirlenir. Güncel fiyatlar için sayfamızdaki tabloyu takip edin.</p>
        </div>
      </div>
    </SEOPageLayout>
  );
}
