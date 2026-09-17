import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import assert from 'node:assert/strict'
const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/cedar-ui/src/tabs')
const maple = resolve(workspace, 'maple-design-mobile/packages/maple-ui/src/tabs')
const pairs = [['Tabs.vue', 'Tabs.vue'], ['TabPane.vue', 'TabPane.vue'], ['TabNav.vue', 'TabNav.vue'], ['TabsNavs.vue', 'TabsNavs.vue'], ['TabItem.vue', 'TabItem.vue'], ['TabsItems.vue', 'TabsItems.vue'], ['props.ts', 'props.ts'], ['context.ts', 'context.ts'], ['__tests__/same-source.spec.js', '__tests__/same-source.spec.js']]
const normalizeSource = (source) => source
  .replaceAll('<c-', '<mp-')
  .replaceAll('</c-', '</mp-')
for (const [left, right] of pairs) assert.equal(normalizeSource(readFileSync(resolve(cedar, left), 'utf8')), normalizeSource(readFileSync(resolve(maple, right), 'utf8')), `${left} differs`)
const normalize = (source) => source.replaceAll('mp-tabs', 'PREFIX-tabs').replaceAll('c-tabs', 'PREFIX-tabs')
assert.equal(normalize(readFileSync(resolve(cedar, 'style/index.less'), 'utf8')), normalize(readFileSync(resolve(maple, 'style/index.less'), 'utf8')), 'style rules differ')
const tokens = (root) => [...normalize(readFileSync(resolve(root, 'style/token.less'), 'utf8')).matchAll(/(--PREFIX-tabs-[\w-]+):/g)].map((match) => match[1]).sort()
assert.deepEqual(tokens(cedar), tokens(maple), 'token contracts differ')
const aliases = (root) => [...readFileSync(resolve(root, 'index.ts'), 'utf8').matchAll(/export const (_\w+Component)/g)].map((match) => match[1]).sort()
assert.deepEqual(aliases(cedar), aliases(maple), 'component exports differ')
console.log(`Tabs parity passed: ${pairs.length} source pairs, shared style rules, ${tokens(cedar).length} tokens and six component exports. Allowed differences: platform.ts, registration and token defaults.`)
