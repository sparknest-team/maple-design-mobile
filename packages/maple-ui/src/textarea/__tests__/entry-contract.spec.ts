import { expect, test } from 'vitest'
import DefaultTextarea, { _TextareaComponent, Textarea, textareaProps } from '..'

test('named, default and install component references identify the same Textarea', () => {
  expect(Textarea).toBe(DefaultTextarea)
  expect(_TextareaComponent).toBe(DefaultTextarea)
  expect(textareaProps.autoSize.default).toBe(false)
})
