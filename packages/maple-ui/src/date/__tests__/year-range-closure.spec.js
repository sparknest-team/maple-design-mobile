import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import YearPanel from '../picker-panels/YearPickerPanel.vue'

for (const pointerType of ['mouse', 'touch']) {
  test(`range ${pointerType} preview does not reschedule native year alignment`, async () => {
    const original = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
    const scroll = vi.fn()
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scroll })
    const wrapper = mount(YearPanel, {
      props: {
        current: '2026-10-20',
        preview: '2026',
        rangePending: true,
        choose: { chooseYear: '', chooseYears: [], chooseMonths: [], chooseDays: [], chooseRangeYear: ['2025'] },
        componentProps: { type: 'year', range: true, showCurrent: true },
      },
      global: { stubs: { MpAffix: { template: '<div><slot /></div>' }, PanelHeader: true } },
    })
    try {
      expect(scroll).not.toHaveBeenCalled()
      const cell = wrapper.findAll('li').find((node) => node.text() === '2027')
      await cell.trigger('pointerenter', { pointerType })
      expect(cell.classes().includes('mp-year-picker__range--preview')).toBe(pointerType === 'mouse')
      await wrapper.get('ul').trigger('pointerleave')
      expect(wrapper.find('.mp-year-picker__range--preview').exists()).toBe(false)
      await nextTick()
      expect(scroll).not.toHaveBeenCalled()
      expect(wrapper.emitted('choose-year')).toBeUndefined()
    } finally {
      wrapper.unmount()
      if (original) {
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', original)
      } else {
        delete HTMLElement.prototype.scrollIntoView
      }
    }
  })
}
