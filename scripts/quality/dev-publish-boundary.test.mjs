import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import test from 'node:test'

test('docs and playground do not need development stubs in the published directory', async () => {
  const { getDocumentationViteOptions } = await import('../../packages/cli/lib/node/docs.js')
  const { alias } = getDocumentationViteOptions({}).resolve
  const resolveImport = (id) => {
    const entry = alias.find(({ find }) => (find instanceof RegExp ? find.test(id) : find === id))
    return entry && id.replace(entry.find, entry.replacement)
  }
  assert.equal(resolveImport('@maple-design/ui-vue'), resolve('src/index.ts'))
  assert.equal(resolveImport('@maple-design/ui-vue/icon/style'), resolve('src/icon/style'))
  assert.equal(resolveImport('@pc-routes'), undefined)
  assert.equal(resolveImport('@mobile-routes'), undefined)
})
