import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import AutoComplete from '../index'

for (const dir of ['ltr', 'rtl']) {
  test(`${dir}: candidate updates preserve an in-progress native composition`, async () => {
    const host = document.createElement('div')
    host.dir = dir
    document.body.append(host)
    const owner = mount(AutoComplete, {
      attachTo: host,
      props: { editMode: 'direct', defaultValue: 'draft', options: ['draft'] },
    })
    try {
      const input = owner.get('input')
      await input.trigger('compositionstart')
      ;(input.element as HTMLInputElement).value = '组合 العربية'
      await input.trigger('input', { isComposing: true })
      await owner.setProps({ options: ['New option'] })
      await flushPromises()
      expect((input.element as HTMLInputElement).value).toBe('组合 العربية')
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      await input.trigger('compositionend')
      await flushPromises()
      expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe('组合 العربية')
    } finally {
      owner.unmount()
      host.remove()
    }
  })
}

test('an older edit cannot restore its selection over a newer composition buffer', async () => {
  const owner = mount(AutoComplete, {
    attachTo: document.body,
    props: { editMode: 'direct', defaultValue: 'old', options: ['draft'] },
  })
  try {
    const input = owner.get('input').element as HTMLInputElement
    input.value = 'draft'
    input.dispatchEvent(new InputEvent('input', { bubbles: true }))
    input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }))
    input.value = '组合'
    input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }))
    await flushPromises()
    expect(input.value).toBe('组合')
    input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }))
    await flushPromises()
    expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toBe('组合')
  } finally {
    owner.unmount()
  }
})
