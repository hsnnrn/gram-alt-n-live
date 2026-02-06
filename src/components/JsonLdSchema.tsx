export default function JsonLdSchema({ gramSellPrice, gramBuyPrice }: { gramSellPrice: number; gramBuyPrice: number }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Gram Altın - Kapalıçarşı Gr Altın Fiyatı',
    description: 'Kapalıçarşı gram altın fiyatı canlı takip - anlık gr altın alış ve satış fiyatları',
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
    about: 'Kapalıçarşı canlı altın fiyatları tablosu - Gram Altın, Çeyrek Altın, Yarım Altın, Tam Altın, Kapalıçarşı gr altın',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gram Altın Kaç Para',
    url: 'https://gramaltinkacpara.com',
    description: 'Kapalıçarşı gram altın fiyatı, çeyrek altın ve canlı piyasa takibi. Gr altın anlık fiyatlar.',
    inLanguage: 'tr',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Gram altın bugün kaç para?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Gram altın bugünkü satış fiyatı ${gramSellPrice.toFixed(2)} TL, alış fiyatı ${gramBuyPrice.toFixed(2)} TL'dir. Kapalıçarşı gr altın fiyatları anlık olarak güncellenmektedir.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Kapalıçarşı gram altın fiyatı nedir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kapalıçarşı gram altın fiyatı, İstanbul Kapalıçarşı kuyumcularının belirlediği anlık alış-satış fiyatıdır. Bu fiyat uluslararası altın piyasası ve döviz kurlarına bağlı olarak değişir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gr altın ile gram altın arasında fark var mı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hayır, "gr altın" ve "gram altın" aynı anlama gelir. Gr, gramın kısaltmasıdır. Her ikisi de 24 ayar saf altının 1 gramlık birim fiyatını ifade eder.',
        },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
