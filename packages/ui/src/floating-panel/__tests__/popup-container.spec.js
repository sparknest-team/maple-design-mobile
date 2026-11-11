import { h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import FloatingPanel from '../FloatingPanel.vue'

test('default mount resolves body and target changes preserve a single panel', async () => {
  const target = document.createElement('section')
  target.id = 'floating-panel-target'
  document.body.appendChild(target)
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = mount(FloatingPanel, { slots: { default: 'Panel' } })
  try {
    await nextTick()
    const panel = document.body.querySelector('.mp-floating-panel')
    expect(panel).not.toBeNull()
    expect(panel.parentElement).toBe(document.body)
    await wrapper.setProps({ popupContainer: '#floating-panel-target' })
    expect(panel.parentElement).toBe(target)
    await wrapper.setProps({ popupContainer: false })
    expect(target.querySelector('.mp-floating-panel')).toBeNull()
    expect(wrapper.find('.mp-floating-panel').exists()).toBe(true)
    await wrapper.setProps({ popupContainer: target })
    expect(panel.parentElement).toBe(target)
    await wrapper.setProps({ popupContainer: '#missing-floating-panel' })
    expect(panel.parentElement).toBe(document.body)
    await wrapper.setProps({ popupContainer: '[' })
    expect(panel.parentElement).toBe(document.body)
    expect(document.querySelectorAll('.mp-floating-panel')).toHaveLength(1)
  } finally {
    wrapper.unmount()
    target.remove()
    warn.mockRestore()
  }
})

test('SSR renders a stable body teleport without resolving browser selectors', async () => {
  const context = {}
  await renderToString(h(FloatingPanel), context)
  expect(context.teleports.body).toContain('mp-floating-panel')
})

test('native identity, accessible name, class, style and listeners belong to the actual panel', async () => {
  const click = vi.fn(),
    once = vi.fn()
  const wrapper = mount(FloatingPanel, {
    props: { popupContainer: false, anchors: [100, 200] },
    attrs: {
      id: 'named-panel',
      'aria-label': 'Details',
      class: 'business-panel',
      style: { outline: '3px solid red' },
      onClick: click,
      onClickOnce: once,
    },
  })
  try {
    const panel = wrapper.get('.mp-floating-panel')
    expect(panel.attributes('id')).toBe('named-panel')
    expect(panel.attributes('aria-label')).toBe('Details')
    expect(panel.classes()).toContain('business-panel')
    expect(panel.element.style.outline).toBe('3px solid red')
    expect(panel.element.style.transform).toContain('100px')
    await panel.trigger('click')
    await panel.trigger('click')
    expect(click).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledTimes(1)
  } finally {
    wrapper.unmount()
  }
})
