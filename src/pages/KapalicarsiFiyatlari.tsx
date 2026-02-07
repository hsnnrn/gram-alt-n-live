import SEOPageLayout from '@/components/SEOPageLayout';

export default function KapalicarsiFiyatlari() {
  return (
    <SEOPageLayout
      title="Kapalıçarşı Altın Fiyatları – Canlı Kapalıçarşı Gr Altın"
      description="Kapalıçarşı altın fiyatları canlı takip. Kapalıçarşı gram altın, çeyrek altın, yarım altın ve tam altın fiyatları anlık olarak güncellenir."
      breadcrumb="Kapalıçarşı Altın Fiyatları"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Kapalıçarşı Nedir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            İstanbul Kapalıçarşı, 1461 yılında Fatih Sultan Mehmet döneminde kurulan ve dünyanın en
            eski ve en büyük kapalı çarşılarından biridir. 61 sokak ve 3.000'den fazla dükkanıyla
            tarihi bir ticaret merkezidir. Kapalıçarşı'daki kuyumcular, Türkiye'nin altın piyasasının
            belirleyicisi konumundadır.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Kapalıçarşı Altın Fiyatları Nasıl Belirlenir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Kapalıçarşı altın fiyatları, kuyumcu esnafının anlık alış-satış işlemlerine göre belirlenir.
            Bu fiyatlar uluslararası altın piyasası (LBMA, COMEX), döviz kurları ve yurtiçi talep
            dengesine bağlı olarak gün içinde sürekli değişir. Kapalıçarşı gr altın fiyatı, online
            altın fiyatlarından küçük farklılıklar gösterebilir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Kapalıçarşı Gram Altın Fiyatı</h2>
          <p className="leading-relaxed text-muted-foreground">
            Kapalıçarşı gram altın fiyatı, Türkiye'deki yatırımcılar için en önemli referans noktasıdır.
            24 ayar saf altının 1 gramlık birim fiyatı olarak hesaplanan gr altın fiyatı, uluslararası
            piyasaların yanı sıra yurtiçi dinamikleri de yansıtır. Kapalıçarşı gr altın fiyatını
            sitemizden anlık olarak takip edebilirsiniz.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Kapalıçarşı Çalışma Saatleri</h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm" aria-label="Kapalıçarşı çalışma saatleri">
              <tbody>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Pazartesi - Cuma</td>
                  <td className="px-4 py-2.5 text-muted-foreground">09:30 - 17:30</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Cumartesi</td>
                  <td className="px-4 py-2.5 text-muted-foreground">09:30 - 17:00</td>
                </tr>
                <tr>
                  <td className="bg-secondary/50 px-4 py-2.5 font-medium text-foreground">Pazar</td>
                  <td className="px-4 py-2.5 text-muted-foreground">Kapalı</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Kapalıçarşı Fiyatları ve Online Fiyatlar</h2>
          <p className="leading-relaxed text-muted-foreground">
            Kapalıçarşı altın fiyatları ile banka ve online platform fiyatları arasında küçük farklılıklar
            olabilir. Bu fark genellikle yurtiçi arz-talep dengesi, kuyumcu marjları ve işçilik
            maliyetlerinden kaynaklanır. Yatırımcıların fiyat karşılaştırması yapması önerilir.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
