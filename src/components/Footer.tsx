import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="container py-6 md:py-8">
        {/* SEO Links */}
        <nav aria-label="Site haritası" className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Hızlı Erişim</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-4">
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-border pt-4">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="text-sm font-semibold text-foreground">gramaltinkacpara.com</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Türkiye'nin en hızlı altın fiyatı takip sitesi
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>© {year} Gram Altın Kaç Para. Tüm hakları saklıdır.</p>
              <p className="mt-0.5">
                Fiyatlar bilgi amaçlıdır, yatırım tavsiyesi değildir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FOOTER_LINKS = [
  { href: '/', label: 'Canlı Altın Fiyatları' },
  { href: '/gram-altin-nedir', label: 'Gram Altın Nedir?' },
  { href: '/ceyrek-altin-fiyati', label: 'Çeyrek Altın Fiyatı' },
  { href: '/yarim-altin-fiyati', label: 'Yarım Altın Fiyatı' },
  { href: '/tam-altin-fiyati', label: 'Tam Altın Fiyatı' },
  { href: '/cumhuriyet-altini-fiyati', label: 'Cumhuriyet Altını' },
  { href: '/ons-altin-fiyati', label: 'Ons Altın Fiyatı' },
  { href: '/22-ayar-bilezik-fiyati', label: '22 Ayar Bilezik' },
  { href: '/altin-nasil-alinir', label: 'Altın Nasıl Alınır?' },
  { href: '/altin-yatirim-rehberi', label: 'Altın Yatırım Rehberi' },
  { href: '/altin-cesitleri', label: 'Altın Çeşitleri' },
  { href: '/doviz-kurlari', label: 'Döviz Kurları' },
  { href: '/kapalicarsı-altin-fiyatlari', label: 'Kapalıçarşı Fiyatları' },
  { href: '/harem-altin', label: 'Harem Altın' },
  { href: '/gram-altin-hesaplama', label: 'Gram Altın Hesaplama' },
  { href: '/altin-fiyatlari-istanbul', label: 'İstanbul Altın Fiyatları' },
  { href: '/altin-fiyatlari-ankara', label: 'Ankara Altın Fiyatları' },
  { href: '/altin-fiyatlari-izmir', label: 'İzmir Altın Fiyatları' },
  { href: '/altin-fiyatlari-antalya', label: 'Antalya Altın Fiyatları' },
  { href: '/altin-fiyatlari-bursa', label: 'Bursa Altın Fiyatları' },
  { href: '/altin-fiyatlari-diyarbakir', label: 'Diyarbakır Altın Fiyatları' },
  { href: '/altin-fiyatlari-gaziantep', label: 'Gaziantep Altın Fiyatları' },
  { href: '/altin-fiyatlari-adana', label: 'Adana Altın Fiyatları' },
  { href: '/altin-fiyatlari-batman', label: 'Batman Altın Fiyatları' },
  { href: '/blog', label: 'Altın Blog' },
];
