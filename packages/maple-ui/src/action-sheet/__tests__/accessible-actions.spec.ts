import { h, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import ActionSheet from '../ActionSheet.vue'

test('names the dialog from its title and disables native action buttons', async () => {
  const wrapper = mount(ActionSheet, {
    props: {
      defaultOpen: true,
      title: 'Choose an item',
      popupContainer: false,
      actions: [{ name: 'Available' }, { name: 'Unavailable', disabled: true }],
    },
  })
  try {
    const dialog = wrapper.get('[role=dialog]')
    const title = wrapper.get(`#${dialog.attributes('aria-labelledby')}`)
    expect(title.text()).toBe('Choose an item')
    const buttons = dialog.findAll('button')
    expect(buttons.some((node) => node.text() === 'Available' && !node.element.disabled)).toBe(true)
    expect(buttons.some((node) => node.text() === 'Unavailable' && node.element.disabled)).toBe(true)
    await buttons.find((node) => node.text() === 'Unavailable')!.trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('custom title names the dialog and explicit label takes priority', async () => {
  const wrapper = mount(ActionSheet, {
    props: { defaultOpen: true, popupContainer: false },
    slots: { title: () => h('strong', 'Custom heading') },
  })
  try {
    const dialog = wrapper.get('[role=dialog]')
    expect(wrapper.get(`#${dialog.attributes('aria-labelledby')}`).text()).toBe('Custom heading')
    await wrapper.setProps({ 'aria-label': 'Explicit name' } as any)
    expect(dialog.attributes('aria-label')).toBe('Explicit name')
    expect(dialog.attributes('aria-labelledby')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('visible cancel button uses the popup close guard', async () => {
  const guard = vi.fn(() => false)
  const wrapper = mount(ActionSheet, { props: { defaultOpen: true, beforeClose: guard, popupContainer: false } })
  try {
    const button = wrapper.get('[role=dialog] button')
    await button.trigger('click')
    await flushPromises()
    expect(guard).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:open')).toBeUndefined()
    expect((wrapper.vm as any).open).toBe(true)
    guard.mockReturnValue(true)
    await button.trigger('click')
    await flushPromises()
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  } finally {
    wrapper.unmount()
  }
})

test('service and component dialogs keep separate title IDs', async () => {
  const { default: service } = await import('../index')
  const wrapper = mount(ActionSheet, {
    attachTo: document.body,
    props: { defaultOpen: true, title: 'Component title' },
  })
  try {
    void service({ title: 'Service title', actions: [] })
    await flushPromises()
    const dialogs = Array.from(document.querySelectorAll('[role=dialog]'))
    expect(dialogs).toHaveLength(2)
    const ids = dialogs.map((dialog) => dialog.getAttribute('aria-labelledby')!)
    expect(new Set(ids).size).toBe(2)
    expect(ids.map((id) => document.getElementById(id)?.textContent)).toEqual(['Component title', 'Service title'])
  } finally {
    service.close()
    wrapper.unmount()
    await flushPromises()
  }
})
