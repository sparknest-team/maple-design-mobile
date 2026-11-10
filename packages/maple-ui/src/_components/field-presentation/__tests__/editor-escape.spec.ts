import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import EditorPanel from '../EditorPanel.vue'

test('Escape respects composition, consumed keys and pending work', async () => {
  const wrapper = mount(EditorPanel, { slots: { default: '<input />' } })
  try {
    const input = wrapper.get('input')
    await input.trigger('keydown', { key: 'Escape', isComposing: true })
    await input.trigger('keydown', { key: 'Escape', keyCode: 229 })
    expect(wrapper.emitted('cancel')).toBeUndefined()
    const element = input.element
    element.addEventListener('keydown', (event) => event.preventDefault(), { once: true })
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('cancel')).toBeUndefined()
    await wrapper.setProps({ pending: true })
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('cancel')).toBeUndefined()
    await wrapper.setProps({ pending: false })
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})

test('deferred Escape reaches the owning editor without bypassing composition', async () => {
  const onKeydown = vi.fn()
  document.addEventListener('keydown', onKeydown)
  const wrapper = mount(EditorPanel, {
    attachTo: document.body,
    props: { deferEscape: true },
    slots: { default: '<input />' },
  })
  try {
    const input = wrapper.get('input')
    await input.trigger('keydown', { key: 'Escape', isComposing: true })
    expect(onKeydown).not.toHaveBeenCalled()
    await input.trigger('keydown', { key: 'Escape' })
    expect(onKeydown).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('cancel')).toBeUndefined()
  } finally {
    wrapper.unmount()
    document.removeEventListener('keydown', onKeydown)
  }
})
