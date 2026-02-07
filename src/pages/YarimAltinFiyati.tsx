import SEOPageLayout from '@/components/SEOPageLayout';

export default function YarimAltinFiyati() {
  return (
    <SEOPageLayout
      title="Yarım Altın Fiyatı – Kapalıçarşı Yarım Altın"
      description="Yarım altın fiyatı bugün kaç TL? Kapalıçarşı yarım altın alış-satış fiyatları, ağırlığı ve özellikleri."
      breadcrumb="Yarım Altın Fiyatı"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Yarım Altın Nedir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Yarım altın, T.C. Darphane tarafından basılan, 22 ayar altından üretilen bir yatırım aracıdır.
            Ağırlığı yaklaşık 3,5 gramdır ve iki çeyrek altın değerindedir. Düğün ve nişan gibi özel günlerde
            çeyrek altından sonra en çok tercih edilen altın türüdür.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Yarım Altın Özellikleri</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm" aria-label="Yarım altın özellikleri">
              <tbody>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Ağırlık</td>
                  <td className="px-4 py-2.5 text-muted-foreground">3,50 gram (brüt)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Ayar</td>
                  <td className="px-4 py-2.5 text-muted-foreground">22 ayar (916/1000 saflık)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Saf Altın</td>
                  <td className="px-4 py-2.5 text-muted-foreground">3,208 gram</td>
                </tr>
                <tr>
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Çap</td>
                  <td className="px-4 py-2.5 text-muted-foreground">23 mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Yarım Altın Fiyatı Hesaplama</h2>
          <p className="leading-relaxed text-muted-foreground">
            Yarım altın fiyatı, gram altın fiyatının yaklaşık 3,26 katıdır. Bu oran, altının ağırlığı,
            işçilik maliyeti ve darphane katkısı ile belirlenir. Kapalıçarşı yarım altın fiyatı
            yurtiçi talep ve arz dengesine göre de değişkenlik gösterir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Yarım Altın mı Gram Altın mı?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Yatırım amacıyla altın almak isteyenler için gram altın, yarım altına göre daha avantajlıdır.
            Gram altında alış-satış farkı daha düşüktür ve daha esnek miktarlarda alım satım yapılabilir.
            Ancak hediye amaçlı kullanımda yarım altın çeyrek altına göre daha prestijli bir tercih olabilir.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
