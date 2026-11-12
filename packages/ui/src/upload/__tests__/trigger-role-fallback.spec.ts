import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Upload from '..'

it.each([
  ['BUTTON', true],
  ['searchbox', true],
  ['menu', true],
  ['menubar', true],
  ['grid', true],
  ['tree', true],
  ['treegrid', true],
  ['radiogroup', true],
  ['tablist', true],
  ['scrollbar', true],
  ['tab', true],
  ['note button', false],
  ['unknown button', true],
  ['presentation button', false],
  ['presentation\u00a0button button', true],
  ['lin\u212A', false],
] as const)('recognizes the effective custom trigger role %s', async (role, interactive) => {
  const wrapper = mount(Upload, {
    props: { editMode: 'direct', ripple: false },
    slots: { trigger: () => h('span', { role, tabindex: -1 }, 'Custom') },
  })
  try {
    await flushPromises()
    const trigger = wrapper.get('[class*="upload__trigger"]')
    expect(trigger.attributes('role')).toBe(interactive ? undefined : 'button')
    expect(trigger.attributes('tabindex')).toBe(interactive ? undefined : '0')
  } finally {
    wrapper.unmount()
  }
})

it('updates trigger semantics when the role changes in place', async () => {
  const role = ref('presentation button')
  const wrapper = mount({
    setup: () => () =>
      h(
        Upload,
        { editMode: 'direct', ripple: false },
        { trigger: () => h('span', { role: role.value, tabindex: -1 }, 'Custom') },
      ),
  })
  try {
    await flushPromises()
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    expect(trigger().attributes('role')).toBe('button')
    role.value = 'UNKNOWN BUTTON'
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
    role.value = 'presentation button'
    await nextTick()
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
  } finally {
    wrapper.unmount()
  }
})
