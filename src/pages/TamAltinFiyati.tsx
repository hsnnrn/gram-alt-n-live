import SEOPageLayout from '@/components/SEOPageLayout';

export default function TamAltinFiyati() {
  return (
    <SEOPageLayout
      title="Tam Altın Fiyatı – Kapalıçarşı Tam Altın"
      description="Tam altın fiyatı bugün kaç TL? Kapalıçarşı tam altın alış-satış fiyatları, ağırlığı ve yatırım değerlendirmesi."
      breadcrumb="Tam Altın Fiyatı"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Tam Altın Nedir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Tam altın (Ziynet altın), T.C. Darphane tarafından basılan, 22 ayar altından üretilen ve
            yaklaşık 7,02 gram ağırlığında olan altın paradır. Tam altın, dört çeyrek altın veya iki
            yarım altın değerindedir. Yatırım ve tasarruf aracı olarak yaygın şekilde kullanılır.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Tam Altın Özellikleri</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm" aria-label="Tam altın özellikleri">
              <tbody>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Ağırlık</td>
                  <td className="px-4 py-2.5 text-muted-foreground">7,02 gram (brüt)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Ayar</td>
                  <td className="px-4 py-2.5 text-muted-foreground">22 ayar (916/1000 saflık)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Saf Altın</td>
                  <td className="px-4 py-2.5 text-muted-foreground">6,430 gram</td>
                </tr>
                <tr>
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Çap</td>
                  <td className="px-4 py-2.5 text-muted-foreground">27 mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Tam Altın Yatırımı</h2>
          <p className="leading-relaxed text-muted-foreground">
            Tam altın, fiziki altın yatırımı yapmak isteyenler için popüler bir seçenektir. Çeyrek ve
            yarım altına göre birim başına işçilik maliyeti daha düşüktür, bu da alış-satış farkını
            (spread) azaltır. Büyük miktarda altın yatırımı yapacaklar için tam altın veya gram altın
            daha avantajlıdır.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Kapalıçarşı Tam Altın Fiyatı</h2>
          <p className="leading-relaxed text-muted-foreground">
            Kapalıçarşı tam altın fiyatı, İstanbul Kapalıçarşı kuyumcularının belirlediği anlık
            fiyatlardır. Bu fiyatlar gün içinde uluslararası altın piyasası ve döviz kurlarına bağlı
            olarak sürekli değişir. Anlık tam altın fiyatı için ana sayfamızı ziyaret edebilirsiniz.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
