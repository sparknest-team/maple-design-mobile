import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Tooltip, { tooltipProps } from '..'
import Popover, { popoverProps } from '../../popover'

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

function create(Component, props) {
  const wrapper = mount(Component, {
    attachTo: document.body,
    props: { animationName: '', popupContainer: false, ...props },
    slots: { default: () => h('button', { class: 'reference' }, 'reference') },
  })
  wrappers.push(wrapper)
  return wrapper
}

describe('Tooltip and Popover same-source contract', () => {
  test('uses the canonical public defaults without compatibility props', () => {
    expect(tooltipProps.trigger.default()).toEqual(['hover', 'focus'])
    expect(tooltipProps.placement.default).toBe('top')
    expect(tooltipProps.size.default).toBe('md')
    expect(tooltipProps.unmountOnClose.default).toBe(true)
    expect('backgroundColor' in tooltipProps).toBe(false)
    expect('xs' in tooltipProps).toBe(false)

    expect(popoverProps.trigger.default).toBe('click')
    expect(popoverProps.placement.default).toBe('bottom')
    expect(popoverProps.unmountOnClose.default).toBe(false)
    expect(popoverProps.closeOnClickReference.default).toBe(true)
    expect('defaultStyle' in popoverProps).toBe(false)
    expect('popoverClass' in popoverProps).toBe(false)
    expect('elevation' in popoverProps).toBe(false)
  })

  test('connects Tooltip and Popover semantics to the actual reference', async () => {
    const tooltip = create(Tooltip, { defaultOpen: true, content: 'description' })
    const popover = create(Popover, { defaultOpen: true, title: 'heading', content: 'body' })
    await nextTick()

    const tooltipPanel = tooltip.get('[role="tooltip"]')
    expect(tooltip.get('.reference').attributes('aria-describedby')).toBe(tooltipPanel.attributes('id'))

    const popoverPanel = popover.get('[role="group"]')
    const popoverReference = popover.get('.reference')
    expect(popoverReference.attributes('aria-controls')).toBe(popoverPanel.attributes('id'))
    expect(popoverReference.attributes('aria-expanded')).toBe('true')
    expect(popoverPanel.attributes('aria-labelledby')).toBe(popover.get('[id$="-title"]').attributes('id'))
  })
})
