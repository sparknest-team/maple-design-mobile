import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { MapleResolver, MapleStyleImports } from '@maple-design/resolver-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { SITE_CONFIG, SRC_DIR, VITE_RESOLVE_EXTENSIONS } from '../shared/constant.js'
import type { MapleConfig } from './maple.config.js'
import {
  createSiteImportPlugin,
  createSiteResolver,
  getSiteComponentExcludes,
  getWorkspaceSourceAliases,
} from './site-resolver.js'

const uiDocPreviewEntry = createRequire(import.meta.url).resolve('@sparknest/ui-doc-preview-vue')

export function getDocumentationPlugins() {
  // Resolve on-demand component styles from source via alias during docs/dev.
  const resolverOptions = { importStyle: true }

  return [
    MapleStyleImports(resolverOptions),
    createSiteImportPlugin(SRC_DIR),

    jsx(),

    Components({
      resolvers: [createSiteResolver(SRC_DIR, resolverOptions)],
      exclude: getSiteComponentExcludes(SRC_DIR),
      dts: false,
    }),

    AutoImport({
      exclude: getSiteComponentExcludes(SRC_DIR),
      resolvers: [MapleResolver({ ...resolverOptions, autoImport: true })],
      dts: false,
    }),
  ].flat()
}

export function getDocumentationViteOptions({ alias = {} }: MapleConfig) {
  const resolveAlias = Object.entries(alias).reduce(
    (resolveAlias, [key, value]) => {
      const isRelative = value.startsWith('.')
      resolveAlias[key] = isRelative ? resolve(SRC_DIR, value) : value
      return resolveAlias
    },
    {} as Record<string, string>,
  )

  return {
    resolve: {
      dedupe: ['vue'],
      extensions: VITE_RESOLVE_EXTENSIONS,

      alias: [
        { find: '@sparknest/ui-doc-preview-vue', replacement: uiDocPreviewEntry },
        ...Object.entries(resolveAlias).map(([find, replacement]) => ({ find, replacement })),
        ...getWorkspaceSourceAliases(SRC_DIR),
        { find: '@config', replacement: SITE_CONFIG },
        { find: '@maple-theme', replacement: resolve(SRC_DIR, 'style/theme/css-variables.less') },
        { find: '@maple-foundation', replacement: resolve(SRC_DIR, 'style/index.less') },
        {
          find: /^@maple-design\/ui-vue$/,
          replacement: resolve(SRC_DIR, 'index.ts'),
        },
        {
          find: /^@maple-design\/ui-vue\/style$/,
          replacement: resolve(SRC_DIR, 'style/index.less'),
        },
        {
          find: /^@maple-design\/ui-vue\/(.+)\/style$/,
          replacement: resolve(SRC_DIR, '$1/style'),
        },
      ],
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
}
