import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Trigger from '..'

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

describe('Trigger referenceAttrs', () => {
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
