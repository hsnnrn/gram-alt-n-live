import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinYatirimRehberi() {
  return (
    <SEOPageLayout
      title="Altın Yatırım Rehberi 2026 – Gram Altın Yatırımı"
      description="2026 altın yatırım rehberi. Gram altın yatırımı nasıl yapılır? Altın yatırımının avantajları, riskleri ve stratejileri."
      breadcrumb="Altın Yatırım Rehberi"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Neden Altın Yatırımı?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Altın, binlerce yıldır değer saklama aracı olarak kullanılan en güvenilir yatırım enstrümanlarından
            biridir. Enflasyona karşı koruma sağlar, küresel belirsizliklerde güvenli liman özelliği taşır
            ve portföy çeşitlendirmesi için idealdir. Türkiye'de gram altın yatırımı, en erişilebilir
            altın yatırım yöntemidir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Altın Yatırım Araçları</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-bold text-foreground">Fiziki Altın</h3>
              <p className="text-sm text-muted-foreground">
                Gram altın, çeyrek altın, tam altın ve cumhuriyet altını gibi fiziki formlarıdır.
                Dokunabilir, saklanabilir ve istendiğinde kolayca nakde çevrilebilir.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-bold text-foreground">Banka Altın Hesabı</h3>
              <p className="text-sm text-muted-foreground">
                Bankalar üzerinden açılan ve gram altın cinsinden işlem yapılan hesaplardır.
                Saklama sorunu yoktur ancak fiziki teslimat sınırlı olabilir.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-2 font-bold text-foreground">Altın Fonları (ETF)</h3>
              <p className="text-sm text-muted-foreground">
                Borsa İstanbul'da işlem gören altın fonları ile borsadan altına yatırım yapabilirsiniz.
                Düşük maliyetli ve likit bir yatırım aracıdır.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Altın Yatırım Stratejileri</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Düzenli Alım (DCA):</strong> Her ay belirli bir miktarda altın alarak maliyeti ortalama. Piyasa zamanlamasını ortadan kaldırır.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Destek-Direnç Takibi:</strong> Teknik analiz seviyelerinde alım-satım yaparak kısa vadeli kazanç hedefleme.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Uzun Vadeli Biriktirme:</strong> Altını en az 3-5 yıllık perspektifle biriktirmek, tarihsel olarak en başarılı stratejidir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Portföy Oranı:</strong> Uzmanlar toplam portföyün %5-15'inin altına ayrılmasını önerir.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Altın Yatırımının Riskleri</h2>
          <p className="leading-relaxed text-muted-foreground">
            Altın güvenli bir yatırım aracı olsa da risksiz değildir. Fiyatlar kısa vadede dalgalanabilir,
            fiziki altında saklama riski vardır ve altın, hisse senedinden farklı olarak temettü veya faiz
            geliri sağlamaz. Yatırım kararlarınızı bilinçli şekilde almalı ve portföyünüzü çeşitlendirmelisiniz.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
