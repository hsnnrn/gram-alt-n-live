import SEOPageLayout from '@/components/SEOPageLayout';

export default function CumhuriyetAltiniFiyati() {
  return (
    <SEOPageLayout
      title="Cumhuriyet Altını Fiyatı - Güncel Alış Satış"
      description="Cumhuriyet altını fiyatı canlı takip. Ata altın, Reşat altın güncel alış satış fiyatları, Kapalıçarşı ve Harem verileri."
      keywords="cumhuriyet altını fiyatı, ata altın fiyatı, reşat altın fiyatı, cumhuriyet altını alış satış"
      canonical="/cumhuriyet-altini-fiyati"
      breadcrumb="Cumhuriyet Altını Fiyatı"
    >
      <h2 className="text-lg font-bold mb-3">Cumhuriyet Altını Nedir?</h2>
      <p className="mb-4 leading-relaxed">
        Cumhuriyet altını, Türkiye Cumhuriyeti Darphane ve Damga Matbaası tarafından basılan resmi altın paradır. Halk arasında "Ata altın" veya eski basımlara "Reşat altın" olarak da bilinir. 22 ayar olan Cumhuriyet altını, 7.216 gram ağırlığındadır ve 6.613 gram saf altın içerir.
      </p>

      <h3 className="text-base font-semibold mb-2">Cumhuriyet Altını Özellikleri</h3>
      <ul className="list-disc list-inside space-y-1.5 mb-4">
        <li><strong>Ayar:</strong> 22 ayar (916/1000 saflık)</li>
        <li><strong>Ağırlık:</strong> 7.216 gram</li>
        <li><strong>Saf altın:</strong> 6.613 gram</li>
        <li><strong>Çap:</strong> 22 mm</li>
        <li><strong>Basım:</strong> TC Darphane ve Damga Matbaası</li>
      </ul>

      <h3 className="text-base font-semibold mb-2">Ata Altın ve Reşat Altın Farkı</h3>
      <p className="mb-4 leading-relaxed">
        Ata altın (yeni basım Cumhuriyet altını) ve Reşat altın (eski basım) arasında fiziksel olarak fark yoktur. Ancak eski basım Reşat altınlar koleksiyoncular tarafından daha fazla talep gördüğü için genellikle daha yüksek fiyattan işlem görür.
      </p>

      <h3 className="text-base font-semibold mb-2">Cumhuriyet Altını Yatırımı</h3>
      <p className="mb-4 leading-relaxed">
        Cumhuriyet altını, Türkiye'de en çok tercih edilen fiziksel altın yatırım araçlarından biridir. Darphane garantisi ile güvenilirliği yüksektir ve her kuyumcuda kolayca alınıp satılabilir. Düğün, nişan ve özel günlerde hediye olarak da yaygın şekilde kullanılır.
      </p>

      <h3 className="text-base font-semibold mb-2">Sıkça Sorulan Sorular</h3>
      <div className="space-y-3">
        <div>
          <p className="font-medium">Cumhuriyet altını kaç gram?</p>
          <p className="text-muted-foreground">Cumhuriyet altını toplam 7.216 gram ağırlığında olup 6.613 gram saf altın içerir.</p>
        </div>
        <div>
          <p className="font-medium">Cumhuriyet altını ile çeyrek altın arasındaki fark nedir?</p>
          <p className="text-muted-foreground">Cumhuriyet altını (tam altın) 7.216 gram iken çeyrek altın 1.804 gramdır. Cumhuriyet altını, 4 çeyrek altın değerindedir.</p>
        </div>
      </div>
    </SEOPageLayout>
  );
}
