import assert from 'node:assert/strict'
import { normalizeBoundImports as normalize } from './normalize-bound-imports.mjs'

const a = "import { B, A } from './lib'\nimport X from './x'\nconst result = A + B + X\n"
const b = "import X from './x'\nimport { A, B } from './lib'\nconst result = A + B + X\n"
assert.equal(normalize(a), normalize(b))
assert.notEqual(normalize(a), normalize(b.replace('A + B + X', 'A - B + X')))
assert.notEqual(normalize(a), normalize(b.replace('{ A, B }', '{ A, C as B }')))
assert.notEqual(normalize("import './first'\nimport './second'\n"), normalize("import './second'\nimport './first'\n"))
assert.notEqual(normalize('export const value = 1'), normalize('export const value = 2'))
assert.equal(
  normalize('<script lang="ts">' + a + '</script><template><div /></template>'),
  normalize('<script lang="ts">' + b + '</script><template><div /></template>'),
)
assert.notEqual(
  normalize('<script>' + a + '</script><template><div /></template>'),
  normalize('<script>' + b + '</script><template><span /></template>'),
)
console.log('Bound-import normalization: aliases/order only; body, side-effect order and Vue templates remain strict.')
