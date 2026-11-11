import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import AutoComplete from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'

test('keydown once can prevent reopening the suggestions', async () => {
  const owner = mount(AutoComplete, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: [{ value: 'a', label: 'Alpha' }],
      filterOption: false,
      shouldOpen: () => true,
    },
  })
  try {
    const input = owner.get('input')
    await input.trigger('focus')
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('true')
    await input.trigger('keydown', { key: 'Escape' })
    expect(input.attributes('aria-expanded')).toBe('false')
    const once = vi.fn((event: KeyboardEvent) => event.preventDefault())
    await owner.setProps({ onKeydownOnce: once } as any)
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(once).toHaveBeenCalledTimes(1)
    expect(input.attributes('aria-expanded')).toBe('false')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(once).toHaveBeenCalledTimes(1)
  } finally {
    owner.unmount()
  }
})

test('editor forwards keydown and once through the public instance', async () => {
  const onKeydown = vi.fn()
  const onKeydownOnce = vi.fn()
  const owner = mount(AutoComplete, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      popupContainer: false,
      options: [{ value: 'a', label: 'Alpha' }],
      onKeydown,
      onKeydownOnce,
    },
  })
  try {
    await owner.get('[aria-haspopup="dialog"]').trigger('click')
    await flushPromises()
    const input = owner.getComponent(EditorPanel).get('input:not([readonly])')
    await input.trigger('keydown', { key: 'F8' })
    await input.trigger('keydown', { key: 'F8' })
    expect(onKeydown).toHaveBeenCalledTimes(2)
    expect(onKeydownOnce).toHaveBeenCalledTimes(1)
  } finally {
    owner.unmount()
  }
})

test('Escape closes the editor when its suggestions are embedded', async () => {
  const owner = mount(AutoComplete, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      popupContainer: false,
      options: [{ value: 'a', label: 'Alpha' }],
      shouldOpen: () => true,
    },
  })
  try {
    await owner.get('[aria-haspopup="dialog"]').trigger('click')
    await flushPromises()
    const input = owner.getComponent(EditorPanel).get('input:not([readonly])')
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'Escape', isComposing: true })
    input.element.addEventListener('keydown', (event) => event.preventDefault(), { once: true })
    await input.trigger('keydown', { key: 'Escape' })
    expect(owner.emitted('update:open')).toEqual([[true]])
    await input.trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(owner.emitted('update:open')).toEqual([[true], [false]])
  } finally {
    owner.unmount()
  }
})
