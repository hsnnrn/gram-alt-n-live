import SEOPageLayout from '@/components/SEOPageLayout';

export default function AltinCesitleri() {
  return (
    <SEOPageLayout
      title="Altın Çeşitleri – Gram, Çeyrek, Yarım, Tam Altın"
      description="Türkiye'de satılan altın çeşitleri: Gram altın, çeyrek altın, yarım altın, tam altın, cumhuriyet altını, 22 ayar bilezik ve 14 ayar altın."
      breadcrumb="Altın Çeşitleri"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-bold">Türkiye'de Altın Çeşitleri</h2>
          <p className="leading-relaxed text-muted-foreground">
            Türkiye'de farklı ağırlık ve ayarlarda birçok altın çeşidi bulunmaktadır. Her altın türü
            farklı amaçlar için tercih edilir. İşte en yaygın altın çeşitleri:
          </p>
        </div>

        {ALTIN_CESITLERI.map(altin => (
          <div key={altin.isim} className="rounded-lg border border-border p-4 md:p-5">
            <h3 className="mb-2 text-lg font-bold text-foreground">{altin.isim}</h3>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{altin.aciklama}</p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="rounded-md bg-secondary px-2.5 py-1 font-medium">
                Ağırlık: {altin.agirlik}
              </span>
              <span className="rounded-md bg-secondary px-2.5 py-1 font-medium">
                Ayar: {altin.ayar}
              </span>
              <span className="rounded-md bg-secondary px-2.5 py-1 font-medium">
                {altin.amac}
              </span>
            </div>
          </div>
        ))}
      </section>
    </SEOPageLayout>
  );
}

const ALTIN_CESITLERI = [
  {
    isim: 'Gram Altın (Gr Altın)',
    aciklama: '24 ayar saf altının 1 gramlık birimidir. Yatırım amaçlı en çok tercih edilen altın türüdür. Küçük miktarlarla altın biriktirmek isteyenler için idealdir. Kapalıçarşı gram altın fiyatı anlık olarak güncellenir.',
    agirlik: '1 gram',
    ayar: '24 ayar (995/1000)',
    amac: 'Yatırım',
  },
  {
    isim: 'Çeyrek Altın',
    aciklama: 'T.C. Darphane tarafından basılan 22 ayar altın paradır. Düğün, nişan gibi özel günlerde en çok tercih edilen altın türüdür. Çeyrek altın fiyatı gram altın fiyatına bağlı olarak değişir.',
    agirlik: '1,75 gram',
    ayar: '22 ayar (916/1000)',
    amac: 'Hediye / Yatırım',
  },
  {
    isim: 'Yarım Altın',
    aciklama: 'İki çeyrek altın değerindedir. 22 ayar olarak basılır ve darphane tarafından üretilir. Çeyrek altından daha büyük hediye arayışında olanlar için tercih edilir.',
    agirlik: '3,50 gram',
    ayar: '22 ayar (916/1000)',
    amac: 'Hediye / Yatırım',
  },
  {
    isim: 'Tam Altın (Ziynet)',
    aciklama: 'Dört çeyrek altın değerinde olan tam altın, fiziki altın yatırımı için popüler bir tercihtir. İşçilik maliyeti oransal olarak daha düşüktür.',
    agirlik: '7,02 gram',
    ayar: '22 ayar (916/1000)',
    amac: 'Yatırım',
  },
  {
    isim: 'Cumhuriyet Altını',
    aciklama: 'T.C. Darphane tarafından Atatürk portresi ile basılan altın paradır. Koleksiyoncular ve yatırımcılar tarafından yüksek talep görür. Prim farkı diğer altınlara göre daha yüksek olabilir.',
    agirlik: '7,22 gram',
    ayar: '22 ayar (916/1000)',
    amac: 'Koleksiyon / Yatırım',
  },
  {
    isim: '22 Ayar Bilezik',
    aciklama: 'Takı amaçlı üretilen 22 ayar altın bileziktir. Gram bazında fiyatlandırılır. İşçilik maliyeti gram altına göre daha yüksektir ancak takılabilir olma avantajı vardır.',
    agirlik: 'Değişken (gram bazlı)',
    ayar: '22 ayar (916/1000)',
    amac: 'Takı / Hediye',
  },
  {
    isim: '14 Ayar Altın',
    aciklama: 'Daha dayanıklı ve sert bir altın alaşımıdır. Genellikle takı yapımında kullanılır. 24 ayar altına göre daha uygun fiyatlıdır ancak saf altın oranı daha düşüktür.',
    agirlik: 'Değişken (gram bazlı)',
    ayar: '14 ayar (585/1000)',
    amac: 'Takı',
  },
];
