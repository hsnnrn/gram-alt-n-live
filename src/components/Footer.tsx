export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="container py-6 md:py-8">
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
    </footer>
  );
}