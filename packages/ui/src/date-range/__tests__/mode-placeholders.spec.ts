import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it } from 'vitest'
import DateRange from '..'
import DatePanelContent from '../../date/presentation/DatePanelContent.vue'
import Locale from '../../locale'
import enUS from '../../locale/en-US'
import zhCN from '../../locale/zh-CN'
import DateRangePicker from '../DateRangePicker.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const stubs = { MpTrigger: Surface, Dialog: Surface, teleport: true }
Locale.add('en-US', enUS)
Locale.add('zh-CN', zhCN)
afterEach(() => Locale.use('zh-CN'))

for (const editMode of ['standalone', 'direct', 'popup'] as const) {
  for (const showTime of [false, true]) {
    it(`${editMode} time=${showTime} shows endpoint prompts and preserves drafts when changing modes`, async () => {
      const wrapper = mount(editMode === 'standalone' ? DateRangePicker : DateRange, {
        props: {
          modelValue: [],
          showTime,
          disableConfirm: false,
          ...(editMode === 'standalone'
            ? {
                defaultPickerValue: showTime
                  ? ['2026-10-01 00:00:00', '2026-11-01 00:00:00']
                  : ['2026-10-01', '2026-11-01'],
              }
            : {
                dateRangePickerProps: {
                  defaultPickerValue: showTime
                    ? ['2026-10-01 00:00:00', '2026-11-01 00:00:00']
                    : ['2026-10-01', '2026-11-01'],
                },
              }),
          ...(editMode === 'standalone' ? { presentation: 'calendar' } : { editMode, open: true }),
        },
        global: { stubs },
      })
      try {
        await flushPromises()
        const summaries = () => wrapper.findAll('.mp-date-range-picker__summary-date').map((part) => part.text())
        expect(summaries()).toEqual(['选择开始', '选择结束'])
        expect(wrapper.findAll('.mp-date-range-picker__summary-time')).toHaveLength(0)
        expect(wrapper.getComponent(DatePanelContent).text()).not.toContain('—')
        const choose = wrapper.findAll('.mp-day-picker__body button').find((button) => button.text() === '20')!
        await choose.trigger('click')
        expect(summaries()[0]).toBe('2026-10-20')
        expect(summaries()[1]).toBe('选择结束')
        const draft = wrapper.getComponent(DatePanelContent).props('value') as string[]
        for (const mode of ['picker', 'calendar'] as const) {
          await wrapper.setProps(editMode === 'standalone' ? { presentation: mode } : { panelType: mode })
          await flushPromises()
          expect(wrapper.find('.mp-date-range-picker__date-wheel').exists()).toBe(mode === 'picker')
          expect(wrapper.find('.mp-day-picker__body').exists()).toBe(mode === 'calendar')
          const current = wrapper.getComponent(DatePanelContent).props('value') as string[]
          expect(current[0]).toBe(draft[0])
          expect(current[1]).toBe(draft[0])
          expect(summaries()).toEqual(['2026-10-20', '2026-10-20'])
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        }
      } finally {
        wrapper.unmount()
      }
    })
  }
}

it('translates empty date-time endpoint prompts when the locale changes', async () => {
  const wrapper = mount(DateRangePicker, { props: { modelValue: [], showTime: true } })
  try {
    Locale.use('en-US')
    await nextTick()
    expect(wrapper.findAll('.mp-date-range-picker__summary-date').map((part) => part.text())).toEqual([
      'Select start',
      'Select end',
    ])
    expect(wrapper.findAll('.mp-date-range-picker__summary-time')).toHaveLength(0)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
