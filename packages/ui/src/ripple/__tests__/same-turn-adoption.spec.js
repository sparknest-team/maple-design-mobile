import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Ripple from '../index'

const Host = { directives: { Ripple }, template: '<button v-ripple>Wave</button>' }

test.each([0, 60])('same-turn adoption and outside release cleans active work after %s ms', async (elapsed) => {
  vi.useFakeTimers()
  const wrapper = mount(Host, { attachTo: document.body })
  const target = document.implementation.createHTMLDocument()
  try {
    wrapper.element.dispatchEvent(new MouseEvent('mousedown', { button: 0 }))
    vi.advanceTimersByTime(elapsed)
    target.body.append(wrapper.element)
    target.dispatchEvent(new MouseEvent('mouseup'))
    await Promise.resolve()
    vi.runAllTimers()
    expect(wrapper.findAll('.mp-ripple')).toHaveLength(0)
    expect(wrapper.element._ripple.document).toBe(target)
    expect(wrapper.element._ripple.migrationObserver).toBeUndefined()
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})
