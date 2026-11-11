import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const packageRoot = resolve(process.argv[2] ?? 'packages/ui')
const esm = await import(pathToFileURL(resolve(packageRoot, 'es/index.mjs')).href)
const cjs = createRequire(import.meta.url)(resolve(packageRoot, 'lib/index.js'))
for (const entry of [esm, cjs]) {
  assert.ok(entry.Date)
  assert.ok(entry.Fab)
  assert.ok(entry.LoadingBar)
}
console.log('Maple native ESM and CJS entries verified')
