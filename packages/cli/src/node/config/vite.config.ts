import type { InlineConfig } from 'vite'
import { EXTENSION_ENTRY } from '../shared/constant.js'

export type ExtensionMode = 'dev' | 'build'

export function getExtensionConfig(mode: ExtensionMode): InlineConfig {
  return {
    configFile: false,
    build: {
      sourcemap: mode === 'dev' ? 'inline' : false,

      watch: mode === 'dev' ? {} : null,

      lib: {
        entry: EXTENSION_ENTRY,
        fileName: 'extension',
        formats: ['cjs'],
      },

      rolldownOptions: {
        external: ['vscode'],
      },
    },
  }
}
