import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeLessSource, normalizeTypeScript, normalizeVueSource } from '../../checks/normalize-source.mjs'

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

test('loop body braces normalize without hiding control-flow changes', async () => {
  for (const [left, right] of [
    ['for (const item of items) consume(item)', 'for (const item of items) { consume(item) }'],
    ['for (const key in object) consume(key)', 'for (const key in object) { consume(key) }'],
    ['for (let i = 0; i < 2; i++) consume(i)', 'for (let i = 0; i < 2; i++) { consume(i) }'],
  ]) {
    assert.equal(await normalizeTypeScript(left), await normalizeTypeScript(right))
    assert.notEqual(await normalizeTypeScript(left), await normalizeTypeScript(right.replace('consume(', 'other(')))
  }
})

test('invalid TypeScript fails instead of producing an empty comparison', async () => {
  await assert.rejects(() => normalizeTypeScript('const = '), /invalid TypeScript/)
})

test('import grouping and type-only syntax preserve the same bound imports', async () => {
  const split = `import { ref } from 'vue'; import { computed } from 'vue'; import type { Ref } from 'vue';`
  const merged = `import { computed, ref, type Ref } from 'vue';`
  assert.equal(await normalizeTypeScript(split), await normalizeTypeScript(merged))
  for (const [left, right] of [
    [`import { ref as local } from 'vue'`, `import { ref as other } from 'vue'`],
    [`import { ref } from 'vue'`, `import { computed as ref } from 'vue'`],
    [`import type { Ref } from 'vue'`, `import { Ref } from 'vue'`],
    [`import {} from './effects'`, ``],
  ]) {
    assert.notEqual(await normalizeTypeScript(left), await normalizeTypeScript(right))
  }
})

test('Vue formatting stays equivalent while changed events and literal values remain detectable', async () => {
  const left = `<template>\n<button @click="save">Save</button>\n</template><script setup>import {ref} from 'vue'; const a=ref(1)</script>`
  const right = `<template>\n  <button @click="save">Save</button>\n</template>\n<script setup>\nimport { ref } from "vue";\nconst a = ref(1);\n</script>`
  assert.equal(await normalizeVueSource(left), await normalizeVueSource(right))
  assert.notEqual(
    await normalizeVueSource(left),
    await normalizeVueSource(right.replace('click="save"', 'click="cancel"')),
  )
  assert.notEqual(await normalizeVueSource(left), await normalizeVueSource(right.replace('ref(1)', 'ref(2)')))
})

test('Vue typed object wrapping is formatting-only and changed values still fail parity', async () => {
  const multiline = `<template><input /></template><script setup lang="ts">const attrs = ({\n  autocomplete: 'off',\n}) as Record<string, unknown></script>`
  const inline = `<template><input /></template><script setup lang="ts">const attrs = ({ autocomplete: 'off' }) as Record<string, unknown></script>`
  assert.equal(await normalizeVueSource(multiline), await normalizeVueSource(inline))
  assert.notEqual(await normalizeVueSource(multiline), await normalizeVueSource(inline.replace("'off'", "'on'")))
})

test('Less formatting preserves CSS values, selectors and literal spaces', async () => {
  const left = `.field { width: var(
 --width,
 calc(100% - 2px)
); content: "a b"; }`
  const right = `.field { width: var(--width, calc(100% - 2px)); content: 'a b'; }`
  assert.equal(await normalizeLessSource(left), await normalizeLessSource(right))
  for (const changed of [right.replace('2px', '3px'), right.replace('.field', '.other'), right.replace('a b', 'ab')]) {
    assert.notEqual(await normalizeLessSource(left), await normalizeLessSource(changed))
  }
})

test('generic TypeScript arrows and TSX both parse while changed bodies remain significant', async () => {
  assert.equal(
    await normalizeTypeScript('const identity = <T>(value: T) => value'),
    await normalizeTypeScript('const identity=<T>(value:T)=>value;'),
  )
  assert.notEqual(
    await normalizeTypeScript('const identity = <T>(value: T) => value'),
    await normalizeTypeScript('const identity = <T>(value: T) => null'),
  )
  assert.match(await normalizeTypeScript('const render = () => <div />'), /<div/)
})

test('Vue parity ignores optional braces but retains types, literals and execution changes', async () => {
  const left = `<template><button @click="run">Save</button></template><script setup lang="ts">function run(value: number) { if (value) save('a b') }</script>`
  const right = left.replace("if (value) save('a b')", "if (value) { save('a b') }")
  assert.equal(await normalizeVueSource(left), await normalizeVueSource(right))
  for (const changed of [
    right.replace('number', 'string'),
    right.replace('a b', 'ab'),
    right.replace('if (value)', 'if (!value)'),
    right.replace('click="run"', 'click="other"'),
  ]) {
    assert.notEqual(await normalizeVueSource(left), await normalizeVueSource(changed))
  }
})

test('static ref formatting is equivalent while bound ref precedence and ref identity are retained', async () => {
  const left = '<template><div ref="panel" :id="name" /></template>'
  const right = '<template><div :id="name" ref="panel" /></template>'
  assert.equal(await normalizeVueSource(left), await normalizeVueSource(right))
  assert.notEqual(await normalizeVueSource(left), await normalizeVueSource(right.replace('ref="panel"', 'ref="other"')))
  assert.notEqual(
    await normalizeVueSource('<template><div ref="panel" v-bind="attrs" /></template>'),
    await normalizeVueSource('<template><div v-bind="attrs" ref="panel" /></template>'),
  )
  assert.notEqual(
    await normalizeVueSource('<template><div ref="panel" :[name]="value" /></template>'),
    await normalizeVueSource('<template><div :[name]="value" ref="panel" /></template>'),
  )
})
