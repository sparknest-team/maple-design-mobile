import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = import.meta.dirname
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))

export default {
  root,
  name: '@maple-design/ui-vue',
  globalName: 'Maple',
  bundleName: 'maple',
  emitTypes: false,
  vueSfcStyles: false,
  cssVariables: 'style/theme/css-variables.less',
  umdExternal: ['vue', 'vue/server-renderer'],
  external: ['vue', 'vue/server-renderer', '@vue/shared', ...Object.keys(pkg.dependencies ?? {})],
  globals: {
    vue: 'Vue',
    '@vue/shared': 'VueShared',
  },
}
