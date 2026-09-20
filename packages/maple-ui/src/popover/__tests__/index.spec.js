import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Popover, { popoverProps } from '..'

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

function mountPopover(props = {}, slots = {}) {
  const wrapper = mount(Popover, {
    attachTo: document.body,
    props: { animationName: '', popupContainer: false, ...props },
    slots: {
      default: '<button class="reference">reference</button>',
      ...slots,
    },
  })
  wrappers.push(wrapper)
  return wrapper
}

describe('Popover', () => {
  test('installs and exposes the canonical defaults', () => {
    const app = createApp({}).use(Popover)
    expect(app.component(Popover.name)).toBeTruthy()
    expect(popoverProps.trigger.default).toBe('click')
    expect(popoverProps.placement.default).toBe('bottom')
    expect(popoverProps.showArrow.default).toBe(true)
    expect(popoverProps.popupOffset.default).toBe(10)
    expect(popoverProps.unmountOnClose.default).toBe(false)
    expect(popoverProps.closeOnClickReference.default).toBe(true)
    expect('defaultStyle' in popoverProps).toBe(false)
    expect('popoverClass' in popoverProps).toBe(false)
    expect('elevation' in popoverProps).toBe(false)
  })

  test('renders title and body in one semantic panel', async () => {
    const wrapper = mountPopover({ defaultOpen: true, title: 'Heading', content: 'Body' })
    await nextTick()
    const panel = wrapper.get('[role="group"]')
    const title = wrapper.get('.mp-popover__title')
    expect(panel.attributes('aria-labelledby')).toBe(title.attributes('id'))
    expect(title.text()).toBe('Heading')
    expect(wrapper.get('.mp-popover__body').text()).toBe('Body')
  })

  test('connects aria state and toggles from the reference', async () => {
    const wrapper = mountPopover({ content: 'Body' })
    const reference = wrapper.get('.reference')
    await nextTick()
    expect(reference.attributes('aria-expanded')).toBe('false')
    await reference.trigger('click')
    await nextTick()
    const panel = wrapper.get('[role="group"]')
    expect(reference.attributes('aria-controls')).toBe(panel.attributes('id'))
    expect(reference.attributes('aria-expanded')).toBe('true')
    await reference.trigger('click')
    await nextTick()
    expect(reference.attributes('aria-expanded')).toBe('false')
  })

  test('retains interactive content while closed by default', async () => {
    const wrapper = mountPopover({ defaultOpen: true }, { content: '<input class="draft">' })
    await nextTick()
    const input = wrapper.get('.draft').element
    input.value = 'edited'
    wrapper.vm.close()
    await nextTick()
    expect(wrapper.get('.draft').element).toBe(input)
    expect(wrapper.get('.draft').element.value).toBe('edited')
  })
})
