/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface CustomMetaEnv {
  readonly ACCOUNT_TOKEN: string
}

interface ImportMetaEnv extends CustomMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
