import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'vitest'

test('field decorator keeps the shared field shell contract', () => {
  const source = readFileSync('src/field-decorator/FieldDecorator.vue', 'utf8')
  assert.match(source, /createNamespace\('field-decorator'\)/)
  assert.match(source, /import \{ fieldDecoratorProps \} from '\.\/props'/)
  assert.match(source, /<slot/)
})

test('filled field interaction surfaces match Cedar and preserve focus precedence', () => {
  const tokens = readFileSync('src/field-decorator/style/token.less', 'utf8')
  const styles = readFileSync('src/field-decorator/style/field-decorator.less', 'utf8')

  assert.match(tokens, /--mp-field-variant-filled-background: var\(--mp-sys-color-surface-muted\);/)
  assert.match(tokens, /--mp-field-variant-filled-background-hover: var\(--mp-sys-color-state-hover\);/)
  assert.match(tokens, /--mp-field-variant-filled-background-focus: var\(--mp-color-fill-3\);/)
  assert.match(styles, /&--variant-filled:where\(:hover\):not\(&--disabled\)/)
})

test('field color roles consume system semantics', () => {
  const tokens = readFileSync('src/field-decorator/style/token.less', 'utf8')

  assert.match(tokens, /--mp-field-control-text-color: var\(--mp-sys-color-content-primary\);/)
  assert.match(tokens, /--mp-field-focus-color: var\(--mp-sys-color-action-primary\);/)
  assert.match(tokens, /--mp-field-error-color: var\(--mp-sys-color-status-danger\);/)
  assert.match(tokens, /--mp-field-variant-outline-border-color: var\(--mp-sys-color-border-default\);/)
  assert.match(tokens, /--mp-field-variant-outline-border-color-focus: var\(--mp-sys-color-action-primary\);/)
})
