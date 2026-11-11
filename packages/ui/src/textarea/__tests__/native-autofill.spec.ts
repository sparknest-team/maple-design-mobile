import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Textarea from '..'

test('Textarea keeps the shared native autofill policy while forwarding native metadata', () => {
  const owner = mount(Textarea, {
    props: { editMode: 'direct', textareaAttrs: { autocomplete: 'on', name: 'notes' } },
    attrs: { autocomplete: 'on', 'data-test-native': 'field' },
  })
  const input = owner.get('textarea')
  expect(input.attributes('autocomplete')).toBe('off')
  expect(input.attributes('name')).toBe('notes')
  expect(input.attributes('data-test-native')).toBe('field')
  owner.unmount()
})
