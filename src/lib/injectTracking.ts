/**
 * Mülk kurulumları (Search Console, Analytics, GTM, Clarity) — ortam değişkenleri doluysa enjekte edilir.
 * .env: VITE_GOOGLE_SITE_VERIFICATION, VITE_GA_MEASUREMENT_ID, VITE_GTM_CONTAINER_ID, VITE_CLARITY_PROJECT_ID
 */
export function injectTrackingTags(): void {
  const gsc = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
  if (gsc) {
    const m = document.createElement('meta');
    m.name = 'google-site-verification';
    m.content = gsc;
    document.head.appendChild(m);
  }

  const gtmId = import.meta.env.VITE_GTM_CONTAINER_ID;
  if (gtmId) {
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
    document.head.appendChild(gtmScript);
    const nos = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    nos.appendChild(iframe);
    document.body.insertBefore(nos, document.body.firstChild);
  }

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (gaId && !gtmId) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    s.onload = () => {
      const inline = document.createElement('script');
      inline.innerHTML = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`;
      document.head.appendChild(inline);
    };
  }

  const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;
  if (clarityId) {
    const c = document.createElement('script');
    c.innerHTML = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`;
    document.head.appendChild(c);
  }
}
