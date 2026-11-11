import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Select from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'

test('keydown and keydown.once run before the internal keyboard action', async () => {
  const onKeydown = vi.fn()
  const onKeydownOnce = vi.fn((event: KeyboardEvent) => event.preventDefault())
  const wrapper = mount(Select, {
    attachTo: document.body,
    props: { editMode: 'direct', open: false, options: [{ label: 'One', value: 'one' }], onKeydown, onKeydownOnce },
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

test('editor search forwards keydown and once only once per public Select', async () => {
  const onKeydown = vi.fn()
  const onKeydownOnce = vi.fn()
  const wrapper = mount(Select, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      popupContainer: false,
      filterable: true,
      options: [{ label: 'One', value: 'one' }],
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
