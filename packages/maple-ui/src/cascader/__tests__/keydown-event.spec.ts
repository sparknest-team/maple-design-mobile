import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Component from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'

test('keydown once can prevent the first internal action', async () => {
  const onKeydown = vi.fn()
  const onKeydownOnce = vi.fn((event: KeyboardEvent) => event.preventDefault())
  const wrapper = mount(Component, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      open: false,
      options: [{ label: 'One', value: 'one' }],
      filterable: true,
      onKeydown,
      onKeydownOnce,
    },
  })
  try {
    const input = wrapper.get('input')
    await input.trigger('keydown', { key: 'Enter' })
    expect(onKeydown).toHaveBeenCalledTimes(1)
    expect(onKeydownOnce).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await input.trigger('keydown', { key: 'Enter' })
    expect(onKeydown).toHaveBeenCalledTimes(2)
    expect(onKeydownOnce).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  } finally {
    wrapper.unmount()
  }
})

test('editor forwards keydown and once per public component', async () => {
  const onKeydown = vi.fn()
  const onKeydownOnce = vi.fn()
  const wrapper = mount(Component, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      popupContainer: false,
      options: [{ label: 'One', value: 'one' }],
      filterable: true,
      onKeydown,
      onKeydownOnce,
    },
  })
  try {
    await wrapper.get('[aria-haspopup="dialog"]').trigger('click')
    await flushPromises()
    const input = wrapper.getComponent(EditorPanel).get('input:not([readonly])')
    await input.trigger('keydown', { key: 'F8' })
    await input.trigger('keydown', { key: 'F8' })
    expect(onKeydown).toHaveBeenCalledTimes(2)
    expect(onKeydownOnce).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
  }
})
