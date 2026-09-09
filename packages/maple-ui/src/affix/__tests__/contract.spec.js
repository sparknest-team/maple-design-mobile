import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Affix from '../Affix.vue'

describe('Affix shared contract', () => {
  test('bottom has priority and disabled turns off CSS mode', async () => {
    const wrapper = mount(Affix, { props: { cssMode: true, offsetTop: 12, offsetBottom: 0 } })
    expect(wrapper.element.style.top).toBe('')
    expect(wrapper.element.style.bottom).toBe('0px')
    expect(wrapper.classes()).toContain('mp-affix--css-mode')
    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes()).not.toContain('mp-affix--css-mode')
    expect(wrapper.element.style.bottom).toBe('')
    expect(typeof wrapper.vm.updatePosition).toBe('function')
    wrapper.unmount()
  })
  test('instances own their offsets', async () => {
    const a = mount(Affix, { props: { cssMode: true, offsetTop: 12 } })
    const b = mount(Affix, { props: { cssMode: true, offsetTop: 24 } })
    await a.setProps({ offsetTop: 48 })
    expect(b.element.style.top).toBe('24px')
    a.unmount()
    b.unmount()
  })
})
