/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GTM_CONTAINER_ID?: string;
  readonly VITE_CLARITY_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
