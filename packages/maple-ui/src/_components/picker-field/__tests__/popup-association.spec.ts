import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateField from '../../../date'
import TimeField from '../../../time'

describe('temporal field popup association', () => {
  for (const [name, Component] of [
    ['Date', DateField],
    ['Time', TimeField],
  ] as const) {
    it(name + ' connects the native combobox to its own named popup', async () => {
      const wrapper = mount(Component as typeof DateField, {
        attachTo: document.body,
        props: { open: true, popupContainer: false },
        attrs: { 'aria-label': name + ' field', 'aria-describedby': 'help-' + name },
      })
      await nextTick()
      const input = wrapper.get('input[role="combobox"]')
      expect(input.attributes('aria-label')).toBe(name + ' field')
      expect(input.attributes('aria-describedby')).toBe('help-' + name)
      expect(input.attributes('aria-expanded')).toBe('true')
      const id = input.attributes('aria-controls')
      expect(id).toBeTruthy()
      const popup = document.getElementById(id!)
      expect(popup?.getAttribute('role')).toBe('dialog')
      expect(popup?.getAttribute('aria-label')).toBeTruthy()
      await wrapper.setProps({ open: false })
      expect(input.attributes('aria-expanded')).toBe('false')
      expect(input.attributes('aria-controls')).toBeUndefined()
      wrapper.unmount()
    })
  }
})
