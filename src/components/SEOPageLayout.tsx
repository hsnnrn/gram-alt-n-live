import { useGoldPrices } from '@/hooks/useGoldPrices';
import { useTheme } from '@/hooks/useTheme';
import StickyHeader from '@/components/StickyHeader';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface SEOPageLayoutProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  children: React.ReactNode;
  breadcrumb: string;
}

export default function SEOPageLayout({ title, description, keywords, canonical, children, breadcrumb }: SEOPageLayoutProps) {
  const { prices, currencies, gramPrice, lastUpdate } = useGoldPrices();
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={title} description={description} keywords={keywords} canonical={canonical} />
      <StickyHeader
        gramPrice={gramPrice}
        lastUpdate={lastUpdate}
        isDark={isDark}
        onToggleTheme={toggle}
      />

      <main className="container py-4 md:py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm">
          <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{breadcrumb}</span>
        </nav>

        <article className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-8">
          <h1 className="mb-4 text-2xl font-extrabold text-foreground md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
          <div className="prose-sm max-w-none text-foreground">
            {children}
          </div>
        </article>

        {/* Internal Links */}
        <nav className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm md:p-6" aria-label="İlgili Sayfalar">
          <h2 className="mb-3 text-base font-bold text-foreground">İlgili Sayfalar</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {INTERNAL_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50"
              >
                <ChevronRight className="h-4 w-4 shrink-0 text-primary" />
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}

const INTERNAL_LINKS = [
  { href: '/', label: 'Canlı Altın Fiyatları' },
  { href: '/gram-altin-nedir', label: 'Gram Altın Nedir?' },
  { href: '/ceyrek-altin-fiyati', label: 'Çeyrek Altın Fiyatı' },
  { href: '/yarim-altin-fiyati', label: 'Yarım Altın Fiyatı' },
  { href: '/tam-altin-fiyati', label: 'Tam Altın Fiyatı' },
  { href: '/altin-nasil-alinir', label: 'Altın Nasıl Alınır?' },
  { href: '/altin-yatirim-rehberi', label: 'Altın Yatırım Rehberi' },
  { href: '/altin-cesitleri', label: 'Altın Çeşitleri' },
  { href: '/doviz-kurlari', label: 'Döviz Kurları' },
  { href: '/kapalicarsı-altin-fiyatlari', label: 'Kapalıçarşı Altın Fiyatları' },
  { href: '/harem-altin', label: 'Harem Altın Fiyatları' },
  { href: '/gram-altin-hesaplama', label: 'Gram Altın Hesaplama' },
  { href: '/altin-fiyatlari-batman', label: 'Batman Altın Fiyatları' },
  { href: '/blog', label: 'Altın Blog' },
];
