import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH } from '@/lib/siteConfig';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  /** Kanonik yol, örn. `/blog`. Verilmezse mevcut route kullanılır (self-canonical). */
  canonical?: string;
  type?: string;
  ogImagePath?: string;
  /** Örn. `noindex, nofollow` — 404 ve tekrarlayan sayfalar için */
  robots?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  type = 'website',
  ogImagePath = DEFAULT_OG_IMAGE_PATH,
  robots,
}: SEOHeadProps) {
  const location = useLocation();
  const path = canonical ?? location.pathname;
  const fullCanonical = absoluteUrl(path);
  const ogImage = absoluteUrl(ogImagePath.startsWith('/') ? ogImagePath : `/${ogImagePath}`);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="tr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {robots ? <meta name="robots" content={robots} /> : null}
      <link rel="canonical" href={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content="Gram Altın Kaç Para" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
