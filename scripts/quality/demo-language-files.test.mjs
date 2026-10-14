import assert from 'node:assert/strict'
import { test } from 'node:test'
import { demoFilesForLanguage } from './demo-language-files.mjs'

test('flat bilingual examples select translation or shared fallback', () => {
  const files = ['basic.vue', 'keyboard.vue', 'keyboard.en-US.vue', 'nested/custom.vue', 'nested/custom.en-US.vue']
  assert.deepEqual(demoFilesForLanguage(files, 'zh-CN'), ['basic.vue', 'keyboard.vue', 'nested/custom.vue'])
  assert.deepEqual(demoFilesForLanguage(files, 'en-US'), ['basic.vue', 'keyboard.en-US.vue', 'nested/custom.en-US.vue'])
})
test('explicit suffixes do not require another language in the same document', () => {
  const files = ['basic.zh-CN.vue', 'basic.en-US.vue', 'english-only.en-US.vue']
  assert.deepEqual(demoFilesForLanguage(files, 'zh-CN'), ['basic.zh-CN.vue'])
  assert.deepEqual(demoFilesForLanguage(files, 'en-US'), ['basic.en-US.vue', 'english-only.en-US.vue'])
})
test('directory translations retain their existing precedence', () => {
  const files = ['basic.vue', 'basic.en-US.vue', 'en-US/basic.vue', 'zh-CN/basic.vue']
  assert.deepEqual(demoFilesForLanguage(files, 'en-US'), ['en-US/basic.vue'])
  assert.deepEqual(demoFilesForLanguage(files, 'zh-CN'), ['zh-CN/basic.vue'])
})
