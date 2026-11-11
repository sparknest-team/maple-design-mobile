import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tooltip from '../../tooltip'
import Ellipsis from '../index'

describe('Ellipsis copied contract', () => {
  test('controlled expansion only changes after parent updates', async () => {
    const wrapper = mount(Ellipsis, {
      props: { expand: false, expandTrigger: 'click', tooltip: false, lineClamp: 2 },
      slots: { default: () => 'Long text' },
    })
    const text = wrapper.get<HTMLElement>('[role="button"]')
    await text.trigger('click')
    expect(wrapper.emitted('update:expand')).toEqual([[true]])
    expect(text.attributes('aria-expanded')).toBe('false')
    await wrapper.setProps({ expand: true })
    expect(text.attributes('aria-expanded')).toBe('true')
    expect(text.element.style.webkitLineClamp).toBe('')
    await text.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:expand')).toEqual([[true], [false]])
    wrapper.unmount()
  })
  test('uncontrolled click and keyboard toggles with instance isolation', async () => {
    const first = mount(Ellipsis, { props: { defaultExpand: true, expandTrigger: 'click', tooltip: false } })
    const second = mount(Ellipsis, { props: { expandTrigger: 'click', tooltip: false } })
    await first.get('[role="button"]').trigger('keydown', { key: ' ' })
    expect(first.get('[role="button"]').attributes('aria-expanded')).toBe('false')
    await first.get('[role="button"]').trigger('click')
    expect(first.get('[role="button"]').attributes('aria-expanded')).toBe('true')
    expect(second.get('[role="button"]').attributes('aria-expanded')).toBe('false')
    first.unmount()
    second.unmount()
  })
  test('noninteractive text has no button semantics or expansion event', async () => {
    const wrapper = mount(Ellipsis, { props: { tooltip: false, lineClamp: '2' }, slots: { default: () => 'Text' } })
    expect(wrapper.find('[role="button"]').exists()).toBe(false)
    await wrapper.get('div').trigger('click')
    expect(wrapper.emitted('update:expand')).toBeUndefined()
    expect(wrapper.get('div').element.style.webkitLineClamp).toBe('2')
    await wrapper.setProps({ lineClamp: 'invalid' })
    expect(wrapper.get('div').element.style.webkitLineClamp).toBe('')
    wrapper.unmount()
  })
  test('false disables tooltip; options forwarded without default width override', async () => {
    const wrapper = mount(Ellipsis, { props: { tooltip: false } })
    expect(wrapper.getComponent(Tooltip).props('disabled')).toBe(true)
    expect(wrapper.getComponent(Tooltip).props('open')).toBe(false)
    await wrapper.setProps({ tooltip: { status: 'primary', autoFitPopupWidth: false } })
    expect(wrapper.getComponent(Tooltip).props('status')).toBe('primary')
    expect(wrapper.getComponent(Tooltip).props('autoFitPopupWidth')).toBe(false)
    wrapper.unmount()
  })
  test('content appears once and tooltip-content overrides it', async () => {
    const host = document.createElement('div')
    const wrapper = mount(Ellipsis, {
      props: { tooltip: { open: true, popupContainer: host, content: 'Only tooltip' } },
      slots: { default: () => 'Source text' },
    })
    expect(host.querySelector('[role="tooltip"]')?.textContent).toBe('Only tooltip')
    wrapper.unmount()
    const custom = mount(Ellipsis, {
      props: { tooltip: { open: true, popupContainer: host, content: 'Ignored' } },
      slots: { default: () => 'Source', 'tooltip-content': () => 'Custom' },
    })
    expect(host.querySelector('[role="tooltip"]')?.textContent).toBe('Custom')
    custom.unmount()
  })
})
