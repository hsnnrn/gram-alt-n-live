import SEOPageLayout from '@/components/SEOPageLayout';

export default function GramAltinNedir() {
  return (
    <SEOPageLayout
      title="Gram Altın Nedir? – Gr Altın Hakkında Her Şey"
      description="Gram altın (gr altın), 24 ayar saf altının 1 gramlık birim fiyatıdır. Türkiye'de en yaygın yatırım aracı olan gram altın hakkında detaylı bilgi."
      breadcrumb="Gram Altın Nedir?"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Gram Altın (Gr Altın) Tanımı</h2>
          <p className="leading-relaxed text-muted-foreground">
            Gram altın, uluslararası piyasalarda işlem gören 24 ayar saf altının 1 gram karşılığıdır.
            Türkiye'de "gr altın" olarak da bilinen bu yatırım aracı, küçük miktarlarda altın biriktirmek
            isteyen yatırımcılar için idealdir. Kapalıçarşı gram altın fiyatı, İstanbul Kapalıçarşı'daki
            kuyumcuların anlık alış-satış işlemlerine göre belirlenir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Gram Altın Fiyatı Nasıl Belirlenir?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Gr altın fiyatı temel olarak iki faktöre bağlıdır: uluslararası ons altın fiyatı (XAU/USD) ve
            Amerikan Doları / Türk Lirası (USD/TRY) kuru. Bu iki değişkenin çarpımından gram altın fiyatı
            hesaplanır. Kapalıçarşı gr altın fiyatı ise bu hesaplamaya ek olarak yurtiçi arz-talep dengesini
            de yansıtır.
          </p>
          <div className="mt-3 rounded-lg bg-secondary/50 p-4">
            <p className="text-sm font-semibold text-foreground">Formül:</p>
            <p className="mt-1 font-tabular text-sm text-muted-foreground">
              Gram Altın (₺) = (Ons Altın × USD/TRY) ÷ 31,1035
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Gram Altın Fiyatını Etkileyen Faktörler</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Uluslararası Ons Altın Fiyatı:</strong> XAU/USD paritesindeki değişimler doğrudan gram altın fiyatını etkiler.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Dolar/TL Kuru:</strong> Döviz kurundaki artışlar gram altın fiyatını TL bazında yükseltir.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Merkez Bankası Faiz Kararları:</strong> Faiz oranları altın talebini doğrudan etkiler.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Jeopolitik Riskler:</strong> Küresel belirsizliklerde altın güvenli liman olarak talep görür.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Enflasyon Beklentileri:</strong> Yüksek enflasyon dönemlerinde altın talebi artar.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Gram Altın ile Çeyrek Altın Arasındaki Fark</h2>
          <p className="leading-relaxed text-muted-foreground">
            Gram altın 24 ayar saf altının 1 gramlık birimidir. Çeyrek altın ise yaklaşık 1,75 gram ağırlığında,
            22 ayar altından üretilen bir darphane ürünüdür. Çeyrek altın fiyatı, gram altın fiyatının yaklaşık
            1,63 katıdır (ağırlık ve işçilik farkı nedeniyle). Gr altın yatırım için, çeyrek altın ise hediye
            amaçlı daha çok tercih edilir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Kapalıçarşı Gram Altın Fiyatı</h2>
          <p className="leading-relaxed text-muted-foreground">
            Kapalıçarşı gram altın fiyatı, İstanbul Kapalıçarşı'daki kuyumcu esnafının belirlediği fiyattır.
            Bu fiyat uluslararası piyasalardan farklılık gösterebilir çünkü yurtiçi talep, arz dengesi ve
            kuyumcu marjları da fiyatlamaya dahil edilir. Kapalıçarşı gr altın fiyatları hafta içi 09:30-17:30
            saatleri arasında aktif olarak güncellenir.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Gram Altın Nasıl Alınır?</h2>
          <p className="leading-relaxed text-muted-foreground">
            Gram altın satın almanın birçok yolu vardır: bankalardan fiziki veya hesap altın olarak,
            kuyumculardan fiziki olarak veya online altın platformlarından dijital olarak alınabilir.
            Her yöntemin avantajları ve dezavantajları vardır. Detaylı bilgi için
            altın nasıl alınır rehberimize göz atabilirsiniz.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
