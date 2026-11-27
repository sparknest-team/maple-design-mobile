import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const entry = readFileSync(new URL('../../packages/ui/public/mobile.html', import.meta.url), 'utf8')
const script = entry.match(/<script>([\s\S]*?)<\/script>/)[1]

for (const [hash, page] of [
  ['#/en-US/button', 'en-US/button/'],
  ['#/input?language=en-US&platform=mobile&theme=dark#basic', 'en-US/input/?theme=dark#basic'],
  ['#/zh-CN/input#controlled', 'zh-CN/input/#controlled'],
  ['#/button', 'zh-CN/button/'],
  ['', 'zh-CN/'],
]) {
  test(`mobile.html resolves ${hash || 'the empty route'} under the deployment base`, () => {
    const base = 'https://example.test/docs/'
    let target
    const location = {
      href: base + 'mobile.html' + hash,
      hash,
      replace(url) {
        target = url
      },
    }
    runInNewContext(script, { location, URL, URLSearchParams })
    assert.equal(target, base + page)
  })
}
