import SEOPageLayout from '@/components/SEOPageLayout';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    slug: 'altin-yatirim-rehberi',
    title: 'Altın Yatırımı Nasıl Yapılır? – 2026 Rehberi',
    summary:
      "Altın yatırımının tüm yönleri: fiziki altın, altın hesabı, altın ETF ve altın fonları hakkında kapsamlı rehber.",
    href: '/altin-yatirim-rehberi',
  },
  {
    slug: 'gram-altin-vs-ceyrek',
    title: 'Gram Altın mı Çeyrek Altın mı? Hangisi Daha Avantajlı?',
    summary:
      'Yatırım açısından gram altın ve çeyrek altın karşılaştırması. Hangi altın türü daha düşük maliyetli?',
    href: '/gram-altin-nedir',
  },
  {
    slug: 'kapalicarsi-farki',
    title: 'Kapalıçarşı Altın Fiyatları Neden Farklı?',
    summary: 'Kapalıçarşı fiyatlarının banka ve online fiyatlardan neden farklılık gösterdiğini öğrenin.',
    href: '/kapalicarsı-altin-fiyatlari',
  },
  {
    slug: 'altin-alis-rehberi',
    title: 'Altın Nasıl Alınır? – Adım Adım Kılavuz',
    summary:
      'İlk defa altın alacaklar için banka, kuyumcu ve online platformlardan altın alma rehberi.',
    href: '/altin-nasil-alinir',
  },
  {
    slug: 'altin-cesitleri-karsilastirma',
    title: 'Altın Çeşitleri ve Ayar Farkları',
    summary: '14 ayar, 18 ayar, 22 ayar ve 24 ayar altın arasındaki farkları keşfedin.',
    href: '/altin-cesitleri',
  },
  {
    slug: 'doviz-ve-altin',
    title: 'Döviz Kurları ve Altın Fiyatı İlişkisi',
    summary: 'Dolar/TL kuru ile gram altın fiyatı arasındaki ilişkiyi ve korelasyonu anlayın.',
    href: '/doviz-kurlari',
  },
];

export default function Blog() {
  return (
    <SEOPageLayout
      title="Altın Blog – Altın Yatırım Rehberi ve Piyasa Analizleri"
      description="Altın yatırımı, gram altın, çeyrek altın ve Kapalıçarşı hakkında güncel blog yazıları. Altın piyasası analizleri ve yatırım ipuçları."
      keywords="altın blog, altın yatırım, altın analiz, gram altın blog, kapalıçarşı blog, altın rehber"
      canonical="/blog"
      breadcrumb="Blog"
    >
      <section className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">Altın Rehberi &amp; Blog Yazıları</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            Altın yatırımı, Kapalıçarşı piyasası ve döviz kurları hakkında kapsamlı rehberler ve güncel analizler.
            Yatırım kararlarınızda size yol gösterecek içerikler.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BLOG_POSTS.map(post => (
            <Link
              key={post.slug}
              to={post.href}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <h3 className="mb-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Devamını Oku <ChevronRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SEOPageLayout>
  );
}
