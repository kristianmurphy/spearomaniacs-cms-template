/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SANITY_STUDIO_STOREFRONT_URL?: string
  readonly SANITY_STUDIO_FRONTEND_URL?: string
  readonly SANITY_STUDIO_TITLE?: string
  readonly SANITY_STUDIO_PROJECT_ID?: string
  readonly SANITY_STUDIO_DATASET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
