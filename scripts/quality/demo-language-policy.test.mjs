import assert from 'node:assert/strict'
import { globSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { checkDemoLanguage } from './demo-language-policy.mjs'

test('rejects local language subscriptions, snapshots, comparisons, props and route inference', () => {
  for (const code of [
    "import { watchLang as subscribe } from '@maple-design/cli-vue/client'",
    "const local = ref('zh-CN'); const english = computed(() => local.value === 'en-US')",
    'const local = shallowRef(Locale.currentMessage.value.lang)',
    "import { demoEnglish as active } from './demo-language'; watchEffect(() => { cached.value = active.value })",
    "import { ref as state } from 'vue'; const cached = state('zh-CN')",
    "'en-US' === next",
    'defineProps<{ english?: boolean }>()',
    'route.query.language',
    "route.path.startsWith('/en-US/')",
    'const selected = getSavedLanguage()',
    'document.documentElement.lang',
  ]) {
    assert.throws(() => checkDemoLanguage(code), /demoEnglish/, code)
  }
})

test('allows reactive translated data, ordinary demo state and LocaleProvider messages', () => {
  for (const code of [
    'const copy = computed(() => demoEnglish.value ? enUS : zhCN)',
    'const options = ref([]); const active = ref(false)',
    "const messages = { 'zh-CN': zhCN, 'en-US': enUS }",
  ]) {
    assert.doesNotThrow(() => checkDemoLanguage(code))
  }
})

test('shipped demo scaffolds follow the same language policy', () => {
  const cwd = new URL('../../packages/cli/template/', import.meta.url)
  const files = globSync('**/example/**/*.{vue,ts,ejs}', { cwd: fileURLToPath(cwd) })
  assert.ok(files.length > 0)
  for (const file of files) {
    const source = readFileSync(new URL(file, cwd), 'utf8')
    const script = file.endsWith('.ts') ? source : source.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1]
    if (script) {
      assert.doesNotThrow(() => checkDemoLanguage(script.replace(/<%[\s\S]*?%>/g, '')), file)
    }
  }
})
