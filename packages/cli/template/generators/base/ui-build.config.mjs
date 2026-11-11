import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

export default {
  root,
  name: pkg.name,
  globalName: 'ComponentLibrary',
  bundleName: 'library',
  emitTypes: false,
  vueSfcStyles: false,
  external: ['vue', ...Object.keys(pkg.dependencies ?? {})],
  globals: { vue: 'Vue' },
}
