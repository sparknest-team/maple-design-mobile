import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = import.meta.dirname
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))

export default {
  root,
  releaseCheck: 'tsconfig.release-check.json',
  name: '@maple-design/ui-vue',
  globalName: 'Maple',
  bundleName: 'maple',
  bundleFormats: ['umd'],
  emitTypes: false,
  vueSfcStyles: false,
  cssVariables: 'style/theme/css-variables.less',
  umdExternal: ['vue', 'vue/server-renderer'],
  external: [
    '@maple-design/ui-vue/trigger/server',
    'vue',
    'vue/server-renderer',
    '@vue/shared',
    ...Object.keys(pkg.dependencies ?? {}),
  ],
  globals: {
    vue: 'Vue',
    '@vue/shared': 'VueShared',
    'vue/server-renderer': 'VueServerRenderer',
  },
}
