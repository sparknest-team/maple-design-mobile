import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const uiRoot = fileURLToPath(new URL('../../packages/maple-ui/', import.meta.url))
const require = createRequire(new URL('../../packages/maple-cli/package.json', import.meta.url))
const { resolveConfig } = require('vite')

test('docs and package browser fixtures resolve to independent dependency caches', async () => {
  const previousCwd = process.cwd()
  let getDevConfig
  try {
    process.chdir(uiRoot)
    ;({ getDevConfig } = await import('../../packages/maple-cli/lib/node/config/vite.config.js'))
  } finally {
    process.chdir(previousCwd)
  }
  const docs = await resolveConfig(getDevConfig({ host: 'localhost' }), 'serve')
  const fixture = await resolveConfig({ configFile: false, root: uiRoot }, 'serve')
  assert.notEqual(docs.cacheDir, fixture.cacheDir)
})
