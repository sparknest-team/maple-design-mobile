import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Trigger from '..'

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

describe('Trigger referenceAttrs', () => {
  test.each(['[]', '[ ["aria-label", null, "caller"] ]', '[["aria-describedby",null,"original"]]'])(
    'preserves unrelated reference metadata verbatim across reference replacement (%s)',
    async (marker) => {
      const external = document.createElement('button')
      external.setAttribute('data-design-ui-trigger-ssr', marker)
      external.setAttribute('aria-describedby', 'original')
      const wrapper = mount(Trigger, {
        props: { referenceAttrs: { 'aria-describedby': 'hint' } },
        slots: { default: () => h('button', 'Anchor') },
      })
      try {
        wrapper.vm.setReference(external)
        await nextTick()
        expect(external.getAttribute('aria-describedby')).toBe('original hint')
        expect(external.getAttribute('data-design-ui-trigger-ssr')).toBe(marker)
        wrapper.vm.setReference()
        await nextTick()
        expect(external.getAttribute('aria-describedby')).toBe('original')
        expect(external.getAttribute('data-design-ui-trigger-ssr')).toBe(marker)
      } finally {
        wrapper.unmount()
      }
    },
  )

  test.each(['[]', '[ ["aria-label", null, "caller"] ]'])(
    'leaves unclaimed metadata on an internal reference untouched (%s)',
    async (marker) => {
      const wrapper = mount(Trigger, {
        props: { referenceAttrs: { 'aria-describedby': 'hint' } },
        slots: { default: () => h('button', { 'data-design-ui-trigger-ssr': marker }, 'Anchor') },
      })
      wrappers.push(wrapper)
      await nextTick()
      const button = wrapper.get('button')
      expect(button.attributes('aria-describedby')).toBe('hint')
      expect(button.attributes('data-design-ui-trigger-ssr')).toBe(marker)
    },
  )

  test('tracks visibility and restores attributes across reference replacement', async () => {
    const wrapper = mount(Trigger, {
      attachTo: document.body,
      props: {
        defaultOpen: true,
        trigger: 'manual',
        animationName: '',
        popupContainer: false,
        referenceAttrs: (open) => ({
          'aria-controls': 'panel',
          'aria-expanded': open,
        }),
      },
      slots: {
        default: () => h('button', { class: 'slot-reference' }, 'reference'),
        content: () => 'content',
      },
    })
    wrappers.push(wrapper)
    await nextTick()

    const slotReference = wrapper.get('.slot-reference')
    expect(slotReference.attributes('aria-controls')).toBe('panel')
    expect(slotReference.attributes('aria-expanded')).toBe('true')

    wrapper.vm.close()
    await nextTick()
    expect(slotReference.attributes('aria-expanded')).toBe('false')

    const external = document.createElement('button')
    external.setAttribute('aria-controls', 'original')
    document.body.append(external)
    wrapper.vm.setReference(external)
    await nextTick()
    expect(slotReference.attributes('aria-controls')).toBeUndefined()
    expect(external.getAttribute('aria-controls')).toBe('panel')

    wrappers.splice(wrappers.indexOf(wrapper), 1)
    wrapper.unmount()
    expect(external.getAttribute('aria-controls')).toBe('original')
    expect(external.hasAttribute('aria-expanded')).toBe(false)
    external.remove()
  })
})
