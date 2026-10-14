import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Form, { FormItem } from '..'
import Button from '../../button'
import Checkbox from '../../checkbox'
import Space from '../../space'
import ChineseDemo from '../example/demos/custom-control.vue'
import EnglishDemo from '../example/demos/en-US/custom-control.vue'

vi.mock('@maplejs/maple-ui', async () => ({ Form: (await import('..')).default }))

test.each([ChineseDemo, EnglishDemo])(
  'custom control demo inherits form disabled and item readonly, validates and resets',
  async (Demo) => {
    const wrapper = mount(Demo, {
      global: {
        components: { MpForm: Form, MpFormItem: FormItem, MpButton: Button, MpCheckbox: Checkbox, MpSpace: Space },
        stubs: { MIconCheckboxMarkedCircleFill: true, MIconCloseCircleFill: true },
      },
    })
    try {
      const control = wrapper.get('.mp-custom-form-component button')
      expect(control.attributes('type')).toBe('button')
      expect(control.attributes('role')).toBe('checkbox')
      expect(control.attributes('aria-checked')).toBe('false')
      await control.trigger('click')
      await flushPromises()
      expect(control.attributes('aria-checked')).toBe('true')
      await control.trigger('click')
      await flushPromises()
      expect(wrapper.text()).toMatch(/请先确认|Please confirm/)
      const settings = wrapper.findAll('input[type=checkbox]')
      await settings[0].setValue(true)
      expect(control.element.disabled).toBe(true)
      await settings[0].setValue(false)
      await settings[1].setValue(true)
      expect(control.attributes('aria-readonly')).toBe('true')
      await control.trigger('click')
      expect(control.attributes('aria-checked')).toBe('false')
      await settings[1].setValue(false)
      await control.trigger('click')
      await flushPromises()
      expect(control.attributes('aria-checked')).toBe('true')
      await wrapper.findAll('.mp-button').at(-1).trigger('click')
      await flushPromises()
      expect(control.attributes('aria-checked')).toBe('false')
      expect(wrapper.get('p[role=status]').text()).toContain('false')
    } finally {
      wrapper.unmount()
    }
  },
)
