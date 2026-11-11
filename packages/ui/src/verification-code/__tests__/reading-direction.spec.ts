import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VerificationCode from '..'

describe('verification code reading direction', () => {
  it('keeps string and arrow order in its LTR code island while the group is RTL', async () => {
    const host = document.createElement('div')
    host.dir = 'rtl'
    document.body.append(host)
    const wrapper = mount(VerificationCode, { attachTo: host, props: { modelValue: '1234', length: 4 } })
    try {
      const cells = wrapper.get('.mp-verification-code__cells')
      expect(cells.attributes('dir')).toBe('ltr')
      const inputs = wrapper.findAll('input')
      expect(inputs.map((input) => input.element.value)).toEqual(['1', '2', '3', '4'])
      inputs[1].element.focus()
      await inputs[1].trigger('keydown', { key: 'ArrowRight' })
      await nextTick()
      expect(document.activeElement).toBe(inputs[2].element)
      host.dir = 'ltr'
      await nextTick()
      expect(inputs.map((input) => input.element.value)).toEqual(['1', '2', '3', '4'])
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
      host.remove()
    }
  })
})
