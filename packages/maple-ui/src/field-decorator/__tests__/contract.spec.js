import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'vitest'

test('field decorator keeps the shared field shell contract', () => {
  const source = readFileSync('src/field-decorator/FieldDecorator.vue', 'utf8')
  assert.match(source, /createNamespace\('field-decorator'\)/)
  assert.match(source, /import \{ props \} from '\.\/props'/)
  assert.match(source, /<slot/)
})
