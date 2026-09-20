import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Tooltip, { tooltipProps } from '..'

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

function mountTooltip(props = {}) {
  const wrapper = mount(Tooltip, {
    attachTo: document.body,
    props: { animationName: '', popupContainer: false, ...props },
    slots: { default: '<button class="reference">reference</button>' },
  })
  wrappers.push(wrapper)
  return wrapper
}

describe('Tooltip', () => {
  test('installs and exposes the canonical defaults', () => {
    const app = createApp({}).use(Tooltip)
    expect(app.component(Tooltip.name)).toBeTruthy()
    expect(tooltipProps.trigger.default()).toEqual(['hover', 'focus'])
    expect(tooltipProps.placement.default).toBe('top')
    expect(tooltipProps.size.default).toBe('md')
    expect(tooltipProps.showArrow.default).toBe(true)
    expect(tooltipProps.unmountOnClose.default).toBe(true)
    expect('backgroundColor' in tooltipProps).toBe(false)
    expect('xs' in tooltipProps).toBe(false)
  })

  test('renders status, size and custom colors on the semantic content', async () => {
    const wrapper = mountTooltip({
      defaultOpen: true,
      content: 'Helpful text',
      status: 'warning',
      size: 'xs',
      color: 'rgb(1, 2, 3)',
      textColor: 'rgb(4, 5, 6)',
    })
    await nextTick()
    const content = wrapper.get('[role="tooltip"]')
    expect(content.classes()).toEqual(
      expect.arrayContaining(['mp-tooltip__content', 'mp-tooltip--status-warning', 'mp-tooltip--size-xs']),
    )
    expect(content.attributes('style')).toContain('background-color: rgb(1, 2, 3)')
    expect(content.attributes('style')).toContain('color: rgb(4, 5, 6)')
  })

  test('connects and clears aria-describedby with visibility', async () => {
    const wrapper = mountTooltip({ trigger: 'manual', content: 'Helpful text' })
    const reference = wrapper.get('.reference')
    expect(reference.attributes('aria-describedby')).toBeUndefined()
    wrapper.vm.open()
    await nextTick()
    const tooltip = wrapper.get('[role="tooltip"]')
    expect(reference.attributes('aria-describedby')).toBe(tooltip.attributes('id'))
    wrapper.vm.close()
    await nextTick()
    expect(reference.attributes('aria-describedby')).toBeUndefined()
  })
})
