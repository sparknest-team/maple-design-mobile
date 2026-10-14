import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveDemoLanguage } from '../../packages/maple-cli/lib/client/language.js'

test('standalone middle demos read desktop language on initial load and route changes', () => {
  assert.equal(resolveDemoLanguage('#/en-US/split-button'), 'en-US')
  assert.equal(resolveDemoLanguage('#/zh-CN/split-button#controlled'), 'zh-CN')
  assert.equal(resolveDemoLanguage('#/en-US/input?theme=dark'), 'en-US')
})

test('mobile collections and iframe demos read the same language from the query', () => {
  assert.equal(resolveDemoLanguage('#/split-button?language=en-US&platform=pc'), 'en-US')
  assert.equal(resolveDemoLanguage('#/input?language=zh-CN'), 'zh-CN')
  assert.equal(resolveDemoLanguage('#/input'), 'zh-CN')
})

test('explicit platform selection remains deterministic and empty routes use the default', () => {
  assert.equal(resolveDemoLanguage('#/en-US/input', 'pc'), 'en-US')
  assert.equal(resolveDemoLanguage('#/en-US/input', 'mobile'), 'zh-CN')
  assert.equal(resolveDemoLanguage('#/input?language=en-US', 'mobile'), 'en-US')
  assert.equal(resolveDemoLanguage(''), 'zh-CN')
  assert.equal(resolveDemoLanguage('#/input?language='), 'zh-CN')
})
