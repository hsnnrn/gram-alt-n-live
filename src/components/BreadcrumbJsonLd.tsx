import { absoluteUrl } from '@/lib/siteConfig';

export interface BreadcrumbJsonLdItem {
  name: string;
  path: string;
}

/**
 * Breadcrumb yapısal verisi (rehber: tüm sayfalarda Breadcrumb schema).
 */
export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbJsonLdItem[] }) {
  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
