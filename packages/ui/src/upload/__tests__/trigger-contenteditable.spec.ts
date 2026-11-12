import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Upload from '..'

it('keeps wrapper keyboard access for non-editable content and updates when it becomes editable', async () => {
  const value = ref('FALSE')
  const wrapper = mount({
    setup: () => () =>
      h(
        Upload,
        { editMode: 'direct', ripple: false },
        { trigger: () => h('span', { contenteditable: value.value }, 'Choose') },
      ),
  })
  try {
    await flushPromises()
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    expect(trigger().attributes('role')).toBe('button')
    expect(trigger().attributes('tabindex')).toBe('0')
    value.value = 'inherit'
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
    value.value = 'true'
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
    expect(trigger().attributes('tabindex')).toBeUndefined()
    value.value = 'FaLsE'
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
  } finally {
    wrapper.unmount()
  }
})

it.each([
  ['plaintext-only', undefined, true],
  ['', undefined, true],
  ['FALSE', 0, true],
  ['false', -1, false],
] as const)('recognizes editable=%s and tabindex=%s', async (contenteditable, tabindex, interactive) => {
  const wrapper = mount(Upload, {
    props: { editMode: 'direct', ripple: false },
    slots: { trigger: () => h('span', { contenteditable, tabindex }, 'Choose') },
  })
  try {
    await flushPromises()
    expect(wrapper.get('[class*="upload__trigger"]').attributes('role')).toBe(interactive ? undefined : 'button')
  } finally {
    wrapper.unmount()
  }
})
