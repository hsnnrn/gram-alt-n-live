import SEOPageLayout from '@/components/SEOPageLayout';

export default function DovizKurlari() {
  return (
    <SEOPageLayout
      title="Canlı Döviz Kurları – Dolar ve Euro Fiyatları"
      description="Dolar kuru ve Euro kuru canlı takip. Anlık USD/TRY ve EUR/TRY döviz kurları, döviz çevirici ve döviz fiyatları."
      breadcrumb="Döviz Kurları"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Döviz Kurları ve Altın Fiyatı İlişkisi</h2>
          <p className="leading-relaxed text-muted-foreground">
            Döviz kurları, özellikle Amerikan Doları (USD/TRY), gram altın fiyatını doğrudan etkileyen
            en önemli faktörlerden biridir. Gram altın fiyatı, uluslararası ons altın fiyatının dolar
            kuru ile çarpılarak hesaplanmasından dolayı, dolar kurundaki her artış altın fiyatını da
            TL bazında yükseltir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Dolar/TL Kuru (USD/TRY)</h2>
          <p className="leading-relaxed text-muted-foreground">
            Amerikan Doları, dünya genelinde en çok işlem gören rezerv para birimidir. Türkiye'de
            dolar kuru birçok sektörü doğrudan etkiler: ithalat-ihracat, enerji fiyatları, altın
            fiyatları ve genel enflasyon. Dolar/TL kuru TCMB'nin para politikası, ABD Merkez
            Bankası (Fed) faiz kararları ve küresel risk iştahına bağlı olarak değişir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Euro/TL Kuru (EUR/TRY)</h2>
          <p className="leading-relaxed text-muted-foreground">
            Euro, Avrupa Birliği'nin ortak para birimidir ve Türkiye'nin en büyük ticaret ortağı olan
            AB ülkeleri ile yapılan ticarette kullanılır. Euro kuru, Avrupa Merkez Bankası (ECB)
            politikaları ve AB ekonomik verileriyle şekillenir. Altın fiyatları Euro bazında da
            takip edilebilir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Döviz Kurları Altını Nasıl Etkiler?</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Doğrudan Etki:</strong> Gram altın = (Ons × USD/TRY) ÷ 31,1 formülüyle hesaplanır. Dolar yükselince gram altın da yükselir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Ters Korelasyon:</strong> Dolar global olarak zayıfladığında, ons altın fiyatı yükselme eğilimi gösterir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Çift Yönlü Etki:</strong> TL değer kaybederken hem dolar hem altın TL bazında yükselir, yatırımcıya çift yönlü kazanç sağlar.</span>
            </li>
          </ul>
        </div>
      </section>
    </SEOPageLayout>
  );
}
