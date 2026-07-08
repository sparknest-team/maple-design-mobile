import { resolve } from 'path'
import { isArray } from '@maplejs/maple-shared'
import { copy, html, inlineCss, markdown } from '@maplejs/maple-vite-plugins'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
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

export function getHtmlInject(inject) {
  const getContent = (injectKey, position) =>
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
export function getPlugins(mapleConfig) {
  const { vitePlugins = [] } = mapleConfig
  const plugins = [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    jsx(),
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
export function getDevConfig(mapleConfig) {
  const { alias = {}, host } = mapleConfig
  const resolveAlias = Object.entries(alias).reduce((resolveAlias, [key, value]) => {
    const isRelative = value.startsWith('.')
    resolveAlias[key] = isRelative ? resolve(SRC_DIR, value) : value
    return resolveAlias
  }, {})
  return {
    root: SITE_DIR,
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
      alias: {
        ...resolveAlias,
        '@config': SITE_CONFIG,
        '@pc-routes': SITE_PC_ROUTES,
        '@mobile-routes': SITE_MOBILE_ROUTES,
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
export function getBuildConfig(mapleConfig) {
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
export function getBundleConfig(mapleConfig, buildOptions) {
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
export function getExtensionConfig(mode) {
  return {
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
