import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = import.meta.dirname
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))

export default {
  root,
  name: '@maplejs/maple-ui',
  globalName: 'Maple',
  bundleName: 'maple',
  emitTypes: false,
  vueSfcStyles: false,
  cssVariables: 'style/theme/css-variables.less',
  external: ['vue', '@vue/shared', ...Object.keys(pkg.dependencies ?? {})],
  globals: {
    vue: 'Vue',
    '@vue/shared': 'VueShared',
  },
}
