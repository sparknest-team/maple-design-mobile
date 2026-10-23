import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { codeToHtml as fullCodeToHtml } from 'shiki'
import { afterEach, expect, test, vi } from 'vitest'
import { codeToHtml } from '../example/highlighter'

const require = createRequire(import.meta.url)

afterEach(() => vi.unstubAllGlobals())

test('the demo loads its WASM asset once and preserves highlighting across both languages and all themes', async () => {
  const wasm = readFileSync(require.resolve('shiki/onig.wasm'))
  const fetchAsset = vi.fn(
    async (_url: RequestInfo | URL) =>
      new Response(new Uint8Array(wasm).buffer, { headers: { 'Content-Type': 'application/wasm' } }),
  )
  vi.stubGlobal('fetch', fetchAsset)

  for (const [lang, code] of [
    ['javascript', "console.log('Hello Maple UI')"],
    ['python', "print('Hello Maple UI')"],
  ]) {
    for (const theme of ['vitesse-light', 'vitesse-dark', 'github-light', 'github-dark']) {
      expect(await codeToHtml(code, { lang, theme })).toBe(await fullCodeToHtml(code, { lang, theme }))
    }
  }
  expect(fetchAsset).toHaveBeenCalledOnce()
  expect(fetchAsset.mock.calls[0][0]).toMatch(/onig\.wasm/)
})
