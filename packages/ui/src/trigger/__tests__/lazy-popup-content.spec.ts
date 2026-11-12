import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '../trigger'

test.each([false, true])('unmounted closed popup defers its content (hideEmpty=%s)', async (hideEmpty) => {
  const content = vi.fn(() => [h('span', 'Content')])
  const wrapper = mount(Trigger, {
    props: { open: false, hideEmpty, popupContainer: false },
    slots: { default: () => h('button', 'Reference'), content },
  })
  try {
    expect(content).not.toHaveBeenCalled()
    await wrapper.setProps({ open: true })
    await nextTick()
    expect(content).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Content')
  } finally {
    wrapper.unmount()
  }
})

test('retained closed popup still renders its content', () => {
  const content = vi.fn(() => [h('span', 'Retained')])
  const wrapper = mount(Trigger, {
    props: { open: false, unmountOnClose: false, popupContainer: false },
    slots: { default: () => h('button', 'Reference'), content },
  })
  try {
    expect(content).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Retained')
  } finally {
    wrapper.unmount()
  }
})

test('server rendering a closed unmounted popup does not invoke its content', async () => {
  const content = vi.fn(() => {
    throw new Error('should remain unrendered')
  })
  const app = createSSRApp({
    render: () =>
      h(
        Trigger,
        { open: false, popupContainer: false },
        {
          default: () => h('button', 'Reference'),
          content,
        },
      ),
  })
  const html = await renderToString(app)
  expect(content).not.toHaveBeenCalled()
  expect(html).toContain('Reference')
})

test('changing hideEmpty preserves the rendered content node and its draft', async () => {
  const wrapper = mount(Trigger, {
    props: { open: true, hideEmpty: false, popupContainer: false },
    slots: { default: () => h('button', 'Reference'), content: () => h('input') },
  })
  try {
    const input = wrapper.get('input').element as HTMLInputElement
    input.value = 'draft'
    await wrapper.setProps({ hideEmpty: true })
    expect(wrapper.get('input').element).toBe(input)
    expect(input.value).toBe('draft')
    await wrapper.setProps({ hideEmpty: false })
    expect(wrapper.get('input').element).toBe(input)
    expect(input.value).toBe('draft')
  } finally {
    wrapper.unmount()
  }
})

test('hideEmpty distinguishes an empty slot from a component vnode', () => {
  const Empty = { render: () => null }
  const options = { props: { open: true, hideEmpty: true, popupContainer: false as const, popupClass: 'empty-probe' } }
  const direct = mount(Trigger, { ...options, slots: { default: () => h('button', 'Reference'), content: () => [] } })
  const wrapped = mount(Trigger, {
    ...options,
    slots: { default: () => h('button', 'Reference'), content: () => h(Empty) },
  })
  try {
    expect(direct.find('.empty-probe').exists()).toBe(false)
    expect(wrapped.find('.empty-probe').exists()).toBe(true)
  } finally {
    direct.unmount()
    wrapped.unmount()
  }
})
