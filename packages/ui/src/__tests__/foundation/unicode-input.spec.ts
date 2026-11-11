import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '../../input'
import Textarea from '../../textarea'

describe('Unicode length boundaries in text controls', () => {
  for (const [name, component, selector] of [
    ['Input', Input, 'input'],
    ['Textarea', Textarea, 'textarea'],
  ] as const) {
    it(`${name} keeps complete surrogate pairs and emits the safe value`, async () => {
      const wrapper = mount(component, { props: { editMode: 'direct', maxLength: 10 } })
      try {
        await wrapper.get(selector).setValue('123456789😀Z')
        expect((wrapper.get(selector).element as HTMLInputElement).value).toBe('123456789')
        expect(wrapper.emitted('update:modelValue')?.slice(-1)[0]?.[0]).toBe('123456789')
        await wrapper.get(selector).setValue('12345678😀Z')
        expect((wrapper.get(selector).element as HTMLInputElement).value).toBe('12345678😀')
        expect(wrapper.emitted('update:modelValue')?.slice(-1)[0]?.[0]).toBe('12345678😀')
      } finally {
        wrapper.unmount()
      }
    })
  }
})
