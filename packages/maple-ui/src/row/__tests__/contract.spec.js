import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'vitest'

test('row exposes the canonical row props and context', () => {
  const source = readFileSync('src/row/Row.vue', 'utf8')
  assert.match(source, /rowProps/)
  assert.match(source, /provide/)
})
