export default function JsonLdSchema({ gramSellPrice, gramBuyPrice }: { gramSellPrice: number; gramBuyPrice: number }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Gram Altın',
    description: 'Türkiye canlı gram altın fiyatı - anlık alış ve satış fiyatları',
    url: 'https://gramaltinkacpara.com',
    provider: {
      '@type': 'Organization',
      name: 'Gram Altın Kaç Para',
      url: 'https://gramaltinkacpara.com',
    },
    offers: {
      '@type': 'Offer',
      price: gramSellPrice.toFixed(2),
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
    },
  };

  const tableSchema = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    about: 'Canlı altın fiyatları tablosu - Gram Altın, Çeyrek Altın, Yarım Altın, Tam Altın',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gram Altın Kaç Para',
    url: 'https://gramaltinkacpara.com',
    description: 'Türkiye\'nin en güncel gram altın fiyatı, çeyrek altın ve canlı piyasa takibi.',
    inLanguage: 'tr',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}