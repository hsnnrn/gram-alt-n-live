import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinNasilAlinir() {
  return (
    <SEOPageLayout
      title="Altın Nasıl Alınır? – 2026 Altın Alım Rehberi"
      description="Altın nasıl alınır? Bankadan, kuyumcudan ve online platformlardan altın satın alma yöntemleri, avantajları ve dikkat edilmesi gerekenler."
      breadcrumb="Altın Nasıl Alınır?"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Altın Satın Alma Yöntemleri</h2>
          <p className="leading-relaxed text-muted-foreground">
            Türkiye'de altın satın almanın birçok yolu vardır. Her yöntemin kendine özgü avantajları
            ve dezavantajları bulunur. İşte en yaygın altın alım yöntemleri:
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold">1. Bankadan Altın Almak</h3>
          <p className="leading-relaxed text-muted-foreground">
            Bankalar aracılığıyla altın hesabı açarak veya fiziki altın satın alarak yatırım yapabilirsiniz.
            Banka altın hesapları, gram altın cinsinden işlem yapmanıza olanak tanır. Avantajı güvenli
            olması ve saklama sorunu olmamasıdır. Dezavantajı ise alış-satış arasındaki farkın
            kuyumcuya göre daha yüksek olabilmesidir.
          </p>
          <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm font-semibold text-foreground">✅ Avantajları:</p>
            <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
              <li>• Güvenli saklama (banka kasası)</li>
              <li>• Online alım-satım imkanı</li>
              <li>• Küçük miktarlarla başlayabilme</li>
            </ul>
            <p className="mt-3 text-sm font-semibold text-foreground">❌ Dezavantajları:</p>
            <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
              <li>• Alış-satış farkı yüksek olabilir</li>
              <li>• Hesap altını fiziki altına çevirmek zor</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold">2. Kuyumcudan Altın Almak</h3>
          <p className="leading-relaxed text-muted-foreground">
            Kuyumculardan fiziki altın satın almak en geleneksel yöntemdir. Kapalıçarşı kuyumcuları
            genellikle en rekabetçi fiyatları sunar. Gram altın, çeyrek altın, yarım altın ve tam altın
            olarak çeşitli ağırlıklarda satın alabilirsiniz.
          </p>
          <div className="mt-3 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm font-semibold text-foreground">✅ Avantajları:</p>
            <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
              <li>• Düşük alış-satış farkı</li>
              <li>• Fiziki olarak elinizde</li>
              <li>• Pazarlık imkanı</li>
            </ul>
            <p className="mt-3 text-sm font-semibold text-foreground">❌ Dezavantajları:</p>
            <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
              <li>• Saklama riski</li>
              <li>• Sahte altın riski (güvenilir kuyumcu seçimi önemli)</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-bold">3. Online Platformlardan Altın Almak</h3>
          <p className="leading-relaxed text-muted-foreground">
            Dijital altın platformları ve mobil uygulamalar üzerinden de altın yatırımı yapabilirsiniz.
            Bu platformlar genellikle düşük komisyon oranları sunar ve 7/24 işlem yapabilirsiniz.
            Ancak platformun güvenilirliğini ve BDDK/SPK lisanslarını kontrol etmeniz önemlidir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Altın Alırken Dikkat Edilmesi Gerekenler</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Güvenilir ve lisanslı kuruluşlardan alım yapın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Alış-satış farkını (spread) karşılaştırın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Fiziki altında saklama koşullarını planlayın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Fatura veya belge alın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>Piyasayı takip edin, anlık fiyatları kontrol edin</span>
            </li>
          </ul>
        </div>
      </section>
    </SEOPageLayout>
  );
}
