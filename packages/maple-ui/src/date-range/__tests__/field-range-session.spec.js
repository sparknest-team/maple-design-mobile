import { h, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DateRange from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import { rangeControls } from '../../date/__tests__/range-controls'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'

const initial = ['2026-10-19', '2026-10-22']
const props = {
  modelValue: initial,
  editMode: 'popup',
  valueFormat: 'YYYY-MM-DD',
  ...('panelType' in DateRange.props ? { panelType: 'calendar' } : {}),
}
const action = (panel, text) => panel.findAll('button').find((button) => text.includes(button.text()))
const day = (panel, text) =>
  panel
    .findAll('button, [role="button"]')
    .find((button) => button.text() === text && button.attributes('disabled') === undefined)

test('reversed ranges block confirmation until the active endpoint is corrected', async () => {
  const wrapper = mount(DateRange, {
    props: { ...props, modelValue: [], dateRangePickerProps: { defaultPickerValue: initial } },
  })
  try {
    await wrapper.get('input[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    await day(panel, '25').trigger('click')
    await flushPromises()
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeDefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.findAll('input[role=combobox]')[1].trigger('click')
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
    await wrapper.get('input[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    let panel = wrapper.getComponent(EditorPanel)
    await day(panel, '25').trigger('click')
    await action(panel, ['×']).trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.get('input[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    panel = wrapper.getComponent(EditorPanel)
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('Form inheritance requires both endpoints before confirmation', async () => {
  const model = reactive({ days: [] })
  const wrapper = mount(Form, {
    props: { model, editMode: 'popup' },
    slots: {
      default: () =>
        h(FormItem, { field: 'days', label: '范围' }, () =>
          h(DateRange, {
            ...props,
            dateRangePickerProps: { defaultPickerValue: initial },
            editMode: undefined,
            modelValue: model.days,
            'onUpdate:modelValue': (value) => {
              model.days = value
            },
          }),
        ),
    },
  })
  try {
    await wrapper.get('input[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    await day(panel, '25').trigger('click')
    await flushPromises()
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeDefined()
    expect(model.days).toEqual([])
    await action(panel, ['确定', '确认']).trigger('click')
    await flushPromises()
    expect(model.days).toEqual([])
    await rangeControls(wrapper)[1].trigger('click')
    await day(panel, '28').trigger('click')
    await flushPromises()
    expect(action(panel, ['确定', '确认']).attributes('disabled')).toBeUndefined()
    await action(panel, ['确定', '确认']).trigger('click')
    await flushPromises()
    expect(model.days).toEqual(['2026-10-25', '2026-10-28'])
  } finally {
    wrapper.unmount()
  }
})

for (const editMode of ['direct', 'popup']) {
  for (const showTime of [false, true]) {
    for (const endpoint of [0, 1]) {
      test(`${editMode} time=${showTime} first endpoint=${endpoint} requires a complete range`, async () => {
        const wrapper = mount(DateRange, {
          props: {
            ...props,
            modelValue: [],
            dateRangePickerProps: { defaultPickerValue: initial },
            editMode,
            showTime,
            disableConfirm: false,
            open: editMode === 'direct' ? true : undefined,
          },
          global: { stubs: { MpTrigger: { template: '<div><slot /><slot name="content" /></div>' }, teleport: true } },
        })
        try {
          await wrapper.get('input[aria-haspopup=dialog]').trigger('click')
          await flushPromises()
          await rangeControls(wrapper)[endpoint].trigger('click')
          const dayText = endpoint === 0 ? '20' : '25'
          await day(wrapper, dayText).trigger('click')
          await flushPromises()
          const confirm = () => action(wrapper, ['确定', '确认'])
          expect(confirm().attributes('disabled')).toBeDefined()
          await confirm().trigger('click')
          await flushPromises()
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          expect(wrapper.emitted('change')).toBeUndefined()
          await rangeControls(wrapper)[endpoint ^ 1].trigger('click')
          await day(wrapper, endpoint === 0 ? '25' : '20').trigger('click')
          await flushPromises()
          expect(confirm().attributes('disabled')).toBeUndefined()
          await confirm().trigger('click')
          await flushPromises()
          const value = wrapper.emitted('update:modelValue').at(-1)[0]
          expect(value.map((part) => part.slice(0, 10))).toEqual(['2026-10-20', '2026-10-25'])
          expect(wrapper.emitted('change')).toHaveLength(1)
        } finally {
          wrapper.unmount()
        }
      })
    }
  }
}
