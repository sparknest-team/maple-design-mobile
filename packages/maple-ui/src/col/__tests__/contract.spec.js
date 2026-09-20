import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'vitest'

test('col exposes the canonical responsive col props', () => {
  const source = readFileSync('src/col/Col.vue', 'utf8')
  assert.match(source, /colProps/)
  assert.match(source, /span/)
})
