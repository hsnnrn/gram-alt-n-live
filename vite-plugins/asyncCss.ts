import type { Plugin } from "vite";

/** Kritik yoldan çıkarmak için üretim CSS linkini preload+onload ile asenkron yükler (noscript yedeği). */
export function asyncGlobalCssPlugin(): Plugin {
  return {
    name: "async-global-css",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
        (_m, href) =>
          `<link rel="preload" crossorigin as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
      );
    },
  };
}
