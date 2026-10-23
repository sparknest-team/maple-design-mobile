import { h, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DateRange from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'

const initial = ['2026-10-19', '2026-10-22']
const props = {
  modelValue: initial,
  presentation: 'popup',
  valueFormat: 'YYYY-MM-DD',
  ...('panelType' in DateRange.props ? { panelType: 'calendar' } : {}),
}
const action = (panel, text) => panel.findAll('button').find((button) => text.includes(button.text()))
const day = (panel, text) =>
  panel
    .findAll('button, [role="button"]')
    .find((button) => button.text() === text && button.attributes('disabled') === undefined)

test('reversed ranges block confirmation until the active endpoint is corrected', async () => {
  const wrapper = mount(DateRange, { props: { ...props, modelValue: [], pickerValue: initial } })
  try {
    await wrapper.get('button[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    await day(panel, '25').trigger('click')
    await flushPromises()
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await panel.findAll('.mp-date-range-picker__summary')[1].trigger('click')
    await day(panel, '20').trigger('click')
    await flushPromises()
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeDefined()
    expect(panel.get('[role=alert]').text()).toContain('结束日期不能早于开始日期')
    expect(wrapper.emitted('select').at(-1)[0]).toEqual(['2026-10-25', '2026-10-20'])
    await day(panel, '28').trigger('click')
    await flushPromises()
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await action(panel, ['确定', '确认']).trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[['2026-10-25', '2026-10-28']]])
    expect(wrapper.emitted('change')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})

test('canceling a half-selected range restores the previous complete selection on reopen', async () => {
  const wrapper = mount(DateRange, { props })
  try {
    await wrapper.get('button[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    let panel = wrapper.getComponent(EditorPanel)
    await day(panel, '25').trigger('click')
    await action(panel, ['×']).trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('button[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    panel = wrapper.getComponent(EditorPanel)
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('Form inheritance also blocks confirmation for an incomplete range', async () => {
  const model = reactive({ days: [] })
  const wrapper = mount(Form, {
    props: { model, presentation: 'popup' },
    slots: {
      default: () =>
        h(FormItem, { field: 'days', label: '范围' }, () =>
          h(DateRange, {
            ...props,
            pickerValue: initial,
            presentation: undefined,
            modelValue: model.days,
            'onUpdate:modelValue': (value) => {
              model.days = value
            },
          }),
        ),
    },
  })
  try {
    await wrapper.get('button[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    await day(panel, '25').trigger('click')
    await flushPromises()
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeDefined()
    expect(model.days).toEqual([])
  } finally {
    wrapper.unmount()
  }
})
