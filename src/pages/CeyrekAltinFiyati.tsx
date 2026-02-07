import SEOPageLayout from '@/components/SEOPageLayout';

export default function CeyrekAltinFiyati() {
  return (
    <SEOPageLayout
      title="Çeyrek Altın Fiyatı – Kapalıçarşı Çeyrek Altın"
      description="Çeyrek altın fiyatı bugün kaç TL? Kapalıçarşı çeyrek altın alış ve satış fiyatları, çeyrek altın ağırlığı ve özellikleri hakkında detaylı bilgi."
      breadcrumb="Çeyrek Altın Fiyatı"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Çeyrek Altın Nedir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Çeyrek altın, Türkiye Cumhuriyeti Darphane ve Damga Matbaası tarafından basılan, 22 ayar
            altından üretilen bir yatırım ve hediye aracıdır. Çeyrek altının ağırlığı yaklaşık 1,75
            gramdır ve Türk kültüründe düğün, nişan gibi özel günlerde en çok tercih edilen altın türüdür.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Çeyrek Altın Ağırlığı ve Özellikleri</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm" aria-label="Çeyrek altın özellikleri">
              <tbody>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Ağırlık</td>
                  <td className="px-4 py-2.5 text-muted-foreground">1,75 gram (brüt)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Ayar</td>
                  <td className="px-4 py-2.5 text-muted-foreground">22 ayar (916/1000 saflık)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Saf Altın</td>
                  <td className="px-4 py-2.5 text-muted-foreground">1,604 gram</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Çap</td>
                  <td className="px-4 py-2.5 text-muted-foreground">18 mm</td>
                </tr>
                <tr>
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Basım</td>
                  <td className="px-4 py-2.5 text-muted-foreground">T.C. Darphane</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Çeyrek Altın Fiyatı Nasıl Hesaplanır?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Çeyrek altın fiyatı, gram altın fiyatı baz alınarak hesaplanır. Çeyrek altın 1,75 gram ağırlığında
            olduğu için yaklaşık olarak gram altın fiyatının 1,63 katıdır. Bu farka işçilik maliyeti ve
            kuyumcu marjı da eklenir. Kapalıçarşı çeyrek altın fiyatı, yurtiçi talebe göre farklılık gösterebilir.
          </p>
          <div className="mt-3 rounded-lg bg-secondary/50 p-4">
            <p className="text-sm font-semibold text-foreground">Yaklaşık Formül:</p>
            <p className="mt-1 font-tabular text-sm text-muted-foreground">
              Çeyrek Altın ≈ Gram Altın × 1,63 (+ işçilik)
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Çeyrek Altın Yatırım Aracı mı?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Çeyrek altın her ne kadar popüler olsa da, yatırım amacıyla gram altın veya tam altın daha
            avantajlıdır. Çeyrek altında alış-satış arasındaki fark (spread) daha yüksektir ve işçilik
            maliyeti gram altına göre oransal olarak daha fazladır. Yatırım yapmak isteyenler için
            gram altın veya cumhuriyet altını daha uygun olabilir.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
