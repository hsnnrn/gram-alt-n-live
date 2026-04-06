import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/SEOPageLayout';
import { GRAM_PAGES_1_TO_100, gramAltinPath, gramAltinAbsoluteUrl, SITE_BASE_URL } from '@/lib/gramAltinContent';

export default function GramAltinFiyatlariDizin() {
  const allUrls = GRAM_PAGES_1_TO_100.map((g) => gramAltinAbsoluteUrl(g)).join('\n');

  return (
    <SEOPageLayout
      title="1'den 100'e Gram Altın Fiyatı – Tüm Sayfa Linkleri"
      description="1 gramdan 100 grama kadar her gram için canlı Kapalıçarşı altın fiyatı sayfalarının tam listesi ve adresleri."
      keywords="1 gram altın fiyatı, 100 gram altın fiyatı, gram altın fiyatları listesi, kapalıçarşı gram altın"
      canonical="/gram-altin-fiyatlari-dizin"
      breadcrumb="1–100 Gram Altın Fiyatları"
    >
      <section className="space-y-6">
        <p className="leading-relaxed text-muted-foreground">
          Aşağıda <strong className="text-foreground">1 ile 100 gram</strong> arasındaki her değer için
          ayrı bir sayfa bulunmaktadır. Tıklayarak canlı fiyatları görebilir veya tam URL’leri kopyalamak
          için alttaki listeyi kullanabilirsiniz. Site kök adresi:{' '}
          <span className="font-mono text-sm text-foreground">{SITE_BASE_URL}</span>
        </p>

        <div>
          <h2 className="mb-3 text-xl font-bold text-foreground">Sayfa linkleri (1–100 g)</h2>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {GRAM_PAGES_1_TO_100.map((g) => (
              <Link
                key={g}
                to={gramAltinPath(g)}
                className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary/20 px-1 py-2 text-center text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-secondary/50 sm:text-sm"
              >
                <span>{g} g</span>
                <span className="mt-0.5 hidden font-mono text-[10px] text-muted-foreground sm:block">
                  /{g}-gr-altin-kac-tl
                </span>
              </Link>
            ))}
          </div>
        </div>

        <details className="rounded-lg border border-border bg-secondary/20 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-foreground">
            Tüm tam URL’leri göster (kopyalamak için)
          </summary>
          <pre className="mt-3 max-h-[320px] overflow-auto rounded-md border border-border bg-background p-3 text-[11px] leading-relaxed text-muted-foreground">
            {allUrls}
          </pre>
        </details>
      </section>
    </SEOPageLayout>
  );
}
