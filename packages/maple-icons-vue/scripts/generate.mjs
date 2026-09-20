import { resolve } from 'node:path'
import { generateVueIcons } from '@ui-foundation/ui-icons'

const root = resolve(import.meta.dirname, '..')
const result = await generateVueIcons({
  svgRoot: resolve(root, 'svg'),
  sourceRoot: resolve(root, 'src'),
  exportPrefix: 'Icon',
  runtimePrefix: 'M',
  classPrefix: 'mp-svg-icon',
  check: process.argv.includes('--check'),
})

console.log(`${process.argv.includes('--check') ? 'Checked' : 'Generated'} ${result.iconCount} Maple icons.`)
