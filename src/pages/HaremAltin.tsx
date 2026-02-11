import SEOPageLayout from '@/components/SEOPageLayout';

export default function HaremAltin() {
  return (
    <SEOPageLayout
      title="Harem Altın Fiyatları – Canlı Harem Altın Takip 2026"
      description="Harem altın fiyatları canlı takip. Harem gram altın, çeyrek altın, yarım altın ve tam altın fiyatları anlık güncel. Harem altın alış satış fiyatları."
      keywords="harem altın, harem altın fiyatları, harem gram altın, harem altın fiyatı bugün, harem altın alış satış"
      canonical="/harem-altin"
      breadcrumb="Harem Altın Fiyatları"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Harem Altın Nedir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Harem Altın, Türkiye'nin önde gelen altın rafinerilerinden biridir. İstanbul merkezli şirket,
            uluslararası standartlarda altın üretimi ve ticareti yapmaktadır. Harem Altın fiyatları,
            Kapalıçarşı fiyatlarına paralel olarak belirlenir ve yatırımcılar tarafından referans alınır.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Harem Altın Fiyatları Nasıl Belirlenir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Harem altın fiyatları, uluslararası altın piyasaları (LBMA, COMEX), USD/TRY kuru ve yurtiçi
            arz-talep dengesine göre anlık olarak güncellenir. Harem Altın, kendi rafinerisi sayesinde
            rekabetçi fiyatlar sunabilmektedir. Harem gram altın fiyatı, Kapalıçarşı gram altın fiyatıyla
            büyük ölçüde örtüşür.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Harem Altın Ürünleri</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Gram Altın:</strong> 1 gram, 2.5 gram, 5 gram, 10 gram, 20 gram, 50 gram ve 100 gram külçe altın.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Çeyrek Altın:</strong> 22 ayar, yaklaşık 1,75 gram darphane basımı altın.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Yarım Altın:</strong> 22 ayar, yaklaşık 3,5 gram darphane basımı altın.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Tam Altın:</strong> 22 ayar, yaklaşık 7,02 gram darphane basımı altın.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Harem Altın ile Kapalıçarşı Fiyat Karşılaştırması</h2>
          <p className="leading-relaxed text-muted-foreground">
            Harem altın fiyatları genellikle Kapalıçarşı fiyatlarıyla aynı seviyede veya çok yakın
            seviyelerde seyreder. Her iki kaynak da uluslararası piyasaları referans aldığından, fark
            genellikle birkaç kuruş ile sınırlı kalır. Yatırımcılar her iki kaynağı da karşılaştırarak
            en uygun fiyatı bulabilir.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
