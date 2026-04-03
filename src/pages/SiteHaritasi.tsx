import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/SEOPageLayout';
import { SITE_HTML_SITEMAP_LINKS } from '@/lib/siteNavLinks';

export default function SiteHaritasi() {
  const links = SITE_HTML_SITEMAP_LINKS.filter((l) => l.path !== '/site-haritasi');

  return (
    <SEOPageLayout
      title="HTML Site Haritası – Tüm Sayfalar ve Kategoriler"
      description="Gram altın, çeyrek altın, şehir sayfaları ve rehber içeriklerine tek listeden ulaşın. Arama motorları ve kullanıcılar için site mimarisi özeti."
      keywords="gram altın site haritası, altın fiyatları sayfaları, kapalıçarşı altın linkleri"
      canonical="/site-haritasi"
      breadcrumb="Site Haritası"
    >
      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          1–100 gram arası her miktar için ayrı URL listesi{' '}
          <Link to="/gram-altin-fiyatlari-dizin" className="font-medium text-primary underline-offset-2 hover:underline">
            gram altın fiyatları dizin
          </Link>{' '}
          sayfasındadır.
        </p>
        <ul className="list-none space-y-2 p-0">
          {links.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-sm font-medium text-primary underline-offset-2 hover:underline md:text-base"
              >
                {item.label}
              </Link>
              <span className="ml-2 font-mono text-xs text-muted-foreground">{item.path}</span>
            </li>
          ))}
        </ul>
      </section>
    </SEOPageLayout>
  );
}
