import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Slider from '..'

test.each([false, true])(
  'forwards and updates plain descriptions to every slider control (range=%s)',
  async (range) => {
    const wrapper = mount(Slider, {
      props: { modelValue: range ? [10, 30] : 20, range, showInput: true, showTooltip: false },
      attrs: { 'aria-description': 'Initial description', 'aria-describedby': 'business-hint' },
    })
    try {
      const controls = () => wrapper.findAll('[role=slider], input[role=spinbutton]')
      expect(controls()).toHaveLength(range ? 4 : 2)
      for (const control of controls()) {
        expect(control.attributes('aria-description')).toBe('Initial description')
        expect(control.attributes('aria-describedby')).toContain('business-hint')
      }
      await wrapper.setProps({ 'aria-description': 'Updated description' } as any)
      for (const control of controls()) {
        expect(control.attributes('aria-description')).toBe('Updated description')
      }
      await wrapper.setProps({ 'aria-description': undefined } as any)
      for (const control of controls()) {
        expect(control.attributes('aria-description')).toBeUndefined()
      }
    } finally {
      wrapper.unmount()
    }
  },
)
