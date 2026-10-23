import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeTypeScript } from '../../checks/normalize-source.mjs'

test('formatting, import ordering and optional control-flow braces do not change parity', async () => {
  const left = `import { ref, computed } from "vue";\nconst a = {\nvalue: 1,\n};\nif (a.value) returnValue(a); else stop();`
  const right = `import { computed, ref } from 'vue'\nconst a = { value: 1 }\nif (a.value) { returnValue(a) } else { stop() }`
  assert.equal(await normalizeTypeScript(left), await normalizeTypeScript(right))
})

test('parity still detects executable changes, literal whitespace and array holes', async () => {
  for (const [left, right] of [
    ['if (ready) run()', 'if (!ready) run()'],
    ['let count = 1', 'const count = 1'],
    ['const text = "a b"', 'const text = "ab"'],
    ['const values = [1,,2]', 'const values = [1,2]'],
    ['const delay = 800', 'const delay = 900'],
    ['import "./first"; import "./second"', 'import "./second"; import "./first"'],
  ]) {
    assert.notEqual(await normalizeTypeScript(left), await normalizeTypeScript(right))
  }
})

test('invalid TypeScript fails instead of producing an empty comparison', async () => {
  await assert.rejects(() => normalizeTypeScript('const = '), /invalid TypeScript/)
})
