import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Trigger from '..'

it('updates popup geometry without rendering the business slot again', async () => {
  const label = ref('Initial')
  const content = vi.fn(() => h('input', { 'aria-label': label.value }))
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, popupContainer: false, autoFitPosition: false },
    slots: { default: () => h('button', 'Reference'), content },
  })
  try {
    await flushPromises()
    const reference = wrapper.get('button').element
    const editor = wrapper.get('input').element
    const rect = reference.getBoundingClientRect().toJSON?.() ?? { top: 0, bottom: 0, width: 0, height: 0 }
    vi.spyOn(reference, 'getBoundingClientRect').mockReturnValue({ ...rect, x: 120, left: 120, right: 120 })
    const popup = editor.closest('[trigger-placement]')
    const previousLeft = popup.style.left
    content.mockClear()
    wrapper.vm.resize()
    await nextTick()
    expect(popup.style.left).not.toBe(previousLeft)
    expect(content).not.toHaveBeenCalled()
    label.value = 'Updated'
    await nextTick()
    expect(wrapper.get('input').element).toBe(editor)
    expect(editor.getAttribute('aria-label')).toBe('Updated')
  } finally {
    wrapper.unmount()
    vi.restoreAllMocks()
  }
})
