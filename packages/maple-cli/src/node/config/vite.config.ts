import { createRequire } from 'node:module'
import { resolve } from 'path'
import { isArray } from '@maplejs/maple-shared'
import { copy, html, inlineCss, markdown } from '@maplejs/maple-vite-plugins'
import { MapleResolver, MapleStyleImports } from '@maplejs/resolver'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { InlineConfig, Plugin } from 'vite'
import {
  ES_DIR,
  EXTENSION_ENTRY,
  SITE_CONFIG,
  SITE_DIR,
  SITE_MOBILE_ROUTES,
  SITE_OUTPUT_PATH,
  SITE_PC_ROUTES,
  SITE_PUBLIC_PATH,
  SRC_DIR,
  VITE_RESOLVE_EXTENSIONS,
} from '../shared/constant.js'
import { MapleConfig, type MapleConfigHtmlInject, type MapleConfigHtmlInjectPoint } from './maple.config.js'

const uiDocPreviewEntry = createRequire(import.meta.url).resolve('@ui-foundation/ui-doc-preview')

export function getHtmlInject(inject: MapleConfigHtmlInject) {
  const getContent = (injectKey: keyof MapleConfigHtmlInject, position: MapleConfigHtmlInjectPoint['position']) =>
    inject[injectKey]?.filter((point) => point.position === position).map((point) => point.content) ?? []

  return {
    head: {
      start: getContent('head', 'start'),
      end: getContent('head', 'end'),
      scriptStart: getContent('head', 'script-start'),
    },
    body: {
      start: getContent('body', 'start'),
      end: getContent('body', 'end'),
      scriptStart: getContent('body', 'script-start'),
    },
  }
}

export function getPlugins(mapleConfig: Required<MapleConfig>): Plugin[] {
  const { vitePlugins = [] } = mapleConfig
  // Resolve on-demand component styles from source via alias during docs/dev.
  const resolverOptions = { importStyle: true }

  const plugins = [
    MapleStyleImports(resolverOptions),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    jsx(),

    Components({
      resolvers: [MapleResolver(resolverOptions)],
      dts: false,
    }),

    AutoImport({
      resolvers: [MapleResolver({ ...resolverOptions, autoImport: true })],
      dts: false,
    }),

    markdown({ style: mapleConfig?.highlight?.style }),

    copy({ paths: mapleConfig?.copy || [] }),

    html({
      data: {
        logo: mapleConfig?.logo,
        baidu: mapleConfig?.analysis?.baidu,

        pcTitle: mapleConfig?.seo?.title ?? '',
        pcDescription: mapleConfig?.seo?.description ?? '',
        pcKeywords: mapleConfig?.seo?.keywords ?? '',
        pcHtmlInject: getHtmlInject(mapleConfig?.pc?.htmlInject || {}),

        mobileTitle: mapleConfig?.seo?.title ?? '',
        mobileDescription: mapleConfig?.seo?.description ?? '',
        mobileKeywords: mapleConfig?.seo?.keywords ?? '',
        mobileHtmlInject: getHtmlInject(mapleConfig?.mobile?.htmlInject || {}),
      },
    }),
  ]

  if (isArray(vitePlugins)) {
    return [...plugins, ...vitePlugins]
  }

  return vitePlugins(plugins)
}

export function getDevConfig(mapleConfig: Required<MapleConfig>): InlineConfig {
  const { alias = {}, host } = mapleConfig

  const resolveAlias = Object.entries(alias).reduce(
    (resolveAlias, [key, value]) => {
      const isRelative = value.startsWith('.')
      resolveAlias[key] = isRelative ? resolve(SRC_DIR, value) : value
      return resolveAlias
    },
    {} as Record<string, string>,
  )

  return {
    configFile: false,
    root: SITE_DIR,

    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,

      alias: [
        { find: '@ui-foundation/ui-doc-preview', replacement: uiDocPreviewEntry },
        ...Object.entries(resolveAlias).map(([find, replacement]) => ({ find, replacement })),
        { find: '@config', replacement: SITE_CONFIG },
        { find: '@maple-theme', replacement: resolve(SRC_DIR, 'style/theme/css-variables.less') },
        { find: '@maple-foundation', replacement: resolve(SRC_DIR, 'style/index.less') },
        { find: '@pc-routes', replacement: SITE_PC_ROUTES },
        { find: '@mobile-routes', replacement: SITE_MOBILE_ROUTES },
        {
          find: /^@maplejs\/maple-ui$/,
          replacement: resolve(SRC_DIR, 'index.ts'),
        },
        {
          find: /^@maplejs\/maple-ui\/style$/,
          replacement: resolve(SRC_DIR, 'style/index.less'),
        },
        {
          find: /^@maplejs\/maple-ui\/(.+)\/style$/,
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

    server: {
      port: mapleConfig?.port,
      host: host === 'localhost' ? '0.0.0.0' : host,
      proxy: mapleConfig?.proxy || {},
    },

    publicDir: SITE_PUBLIC_PATH,

    plugins: getPlugins(mapleConfig),
  }
}

export function getBuildConfig(mapleConfig: Required<MapleConfig>): InlineConfig {
  const devConfig = getDevConfig(mapleConfig)

  return {
    ...devConfig,

    base: './',

    build: {
      outDir: SITE_OUTPUT_PATH,
      reportCompressedSize: false,
      emptyOutDir: true,
      cssTarget: 'chrome61',
      rollupOptions: {
        input: {
          main: resolve(SITE_DIR, 'index.html'),
          mobile: resolve(SITE_DIR, 'mobile.html'),
        },
      },
    },
  }
}

export interface BundleBuildOptions {
  fileName: string
  cssFileName: string
  output: string
  format: 'es' | 'cjs' | 'umd'
  removeEnv: boolean
  emptyOutDir: boolean
}

export function getBundleConfig(mapleConfig: Required<MapleConfig>, buildOptions: BundleBuildOptions): InlineConfig {
  const plugins = []
  const name = mapleConfig?.name
  const { external = [], globals = {} } = mapleConfig?.bundle || {}
  const { fileName, cssFileName, output, format, emptyOutDir, removeEnv } = buildOptions

  if (format === 'umd') {
    plugins.push(
      inlineCss({
        jsFile: resolve(output, fileName),
        cssFile: resolve(output, `${cssFileName}.css`),
      }),
    )
  }

  return {
    configFile: false,
    logLevel: 'silent',

    define: removeEnv
      ? {
          'process.env.NODE_ENV': JSON.stringify('production'),
        }
      : undefined,

    plugins,

    build: {
      minify: format === 'cjs' ? false : 'esbuild',
      emptyOutDir,
      copyPublicDir: false,
      lib: {
        name,
        formats: [format],
        fileName: () => fileName,
        cssFileName,
        entry: resolve(ES_DIR, 'index.bundle.mjs'),
      },
      rollupOptions: {
        external: ['vue', ...external],
        output: {
          dir: output,
          exports: 'named',
          globals: {
            vue: 'Vue',
            ...globals,
          },
        },
      },
    },
  }
}

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

      rollupOptions: {
        external: ['vscode'],
      },
    },
  }
}
