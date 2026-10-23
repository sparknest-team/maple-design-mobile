import { h, nextTick, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import FieldReference from '../../_components/field-presentation/FieldReference.vue'
import AutoComplete from '../../auto-complete'
import RawAutoComplete from '../../auto-complete/auto-complete'
import Cascader from '../../cascader'
import CascaderEditor from '../../cascader/CascaderEditor.vue'
import Checkbox, { CheckboxGroup } from '../../checkbox'
import RawCheckbox from '../../checkbox/Checkbox.vue'
import RawCheckboxGroup from '../../checkbox/CheckboxGroup.vue'
import DateField from '../../date'
import DateRange from '../../date-range'
import DatePanel from '../../date/DatePanel.vue'
import InputNumber from '../../input-number'
import RawNumber from '../../input-number/InputNumber.vue'
import { RadioGroup } from '../../radio'
import RawRadioGroup from '../../radio/RadioGroup.vue'
import Rate from '../../rate'
import RawRate from '../../rate/rate-core'
import Option from '../../select/Option.vue'
import Slider from '../../slider'
import RawSlider from '../../slider/Slider.vue'
import Switch from '../../switch'
import RawSwitch from '../../switch/Switch.vue'
import Textarea from '../../textarea'
import RawTextarea from '../../textarea/Textarea.vue'
import Time from '../../time'
import TimeRange from '../../time-range'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import TimePicker from '../../time/TimePicker.vue'
import Upload from '../../upload'
import RawUpload from '../../upload/Upload.vue'
import VerificationCode from '../../verification-code'
import RawVerificationCode from '../../verification-code/VerificationCode.vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const options = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
]
const cases: any[] = [
  ['Textarea', Textarea, RawTextarea, '原值', '新值', {}],
  ['InputNumber', InputNumber, RawNumber, 1, 5, {}],
  ['Switch', Switch, RawSwitch, false, true, {}],
  ['Checkbox', Checkbox, RawCheckbox, false, true, {}],
  ['CheckboxGroup', CheckboxGroup, RawCheckboxGroup, ['dev'], ['design'], { options }],
  ['RadioGroup', RadioGroup, RawRadioGroup, 'dev', 'design', { options }],
  ['Slider', Slider, RawSlider, 20, 60, {}],
  ['Rate', Rate, RawRate, 2, 4, {}],
  ['Date', DateField, DatePanel, '2026-10-19', '2026-10-21', { valueFormat: 'YYYY-MM-DD', panelType: 'calendar' }],
  [
    'DateRange',
    DateRange,
    DatePanel,
    ['2026-10-19', '2026-10-22'],
    ['2026-11-01', '2026-11-03'],
    { valueFormat: 'YYYY-MM-DD', panelType: 'calendar' },
  ],
  ['Time', Time, TimePicker, '09:30', '10:30', { format: 'HH:mm' }],
  ['TimeRange', TimeRange, TimeRangePicker, ['09:30', '18:00'], ['10:30', '19:00'], { format: 'HH:mm' }],
  ['Cascader', Cascader, CascaderEditor, 'dev', 'design', { options }],
  ['Upload', Upload, RawUpload, [], [{ id: 'a', name: 'report.txt', status: 'success' }], { autoUpload: false }],
  ['AutoComplete', AutoComplete, RawAutoComplete, '原值', '新值', {}],
  ['VerificationCode', VerificationCode, RawVerificationCode, '123456', '654321', {}],
]
const action = (panel: any, text: string[]) =>
  panel.findAll('button').find((button: any) => text.includes(button.text()))!
describe('all field presentation adapters', () => {
  test('AutoComplete candidate clicks stay in the draft and commit the full selected label', async () => {
    const wrapper = mount(AutoComplete, {
      props: { modelValue: '研发', presentation: 'popup', options: ['研发', '设计', '运营'] },
    })
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    await panel.get('[role=combobox]').setValue('设')
    await flushPromises()
    const option = wrapper.findAllComponents(Option).find((item) => item.text() === '设计')!
    expect(option).toBeTruthy()
    await option.trigger('mousedown')
    await option.trigger('click')
    await flushPromises()
    expect((panel.get('[role=combobox]').element as HTMLInputElement).value).toBe('设计')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await action(panel, ['确定', '确认']).trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([['设计']])
    wrapper.unmount()
  })

  for (const [name, Field, Editor, initial, next, extra] of cases) {
    test(name + ' inherits read and refreshes external values without mounting an editor', async () => {
      const model = reactive({ value: initial })
      const wrapper = mount(Form, {
        props: { readPretty: true, model },
        slots: {
          default: () =>
            h(FormItem, { field: 'value', label: name }, () => h(Field, { modelValue: model.value, ...extra })),
        },
      })
      expect(wrapper.findComponent(EditorPanel).exists()).toBe(false)
      expect(wrapper.find('input, textarea, [aria-haspopup=dialog]').exists()).toBe(false)
      if (name === 'CheckboxGroup' || name === 'RadioGroup' || name === 'Cascader') {
        expect(wrapper.text()).toContain('研发')
      }
      const previous = wrapper.text()
      model.value = next
      await nextTick()
      expect(wrapper.text()).not.toBe(previous)
      expect(wrapper.find('input, textarea, [aria-haspopup=dialog]').exists()).toBe(false)
      if (name === 'Upload') {
        expect(wrapper.text()).toContain('report.txt')
      }
      if (name === 'CheckboxGroup' || name === 'RadioGroup' || name === 'Cascader') {
        expect(wrapper.text()).toContain('设计')
      }
      wrapper.unmount()
    })
    test(name + ' has one confirmation boundary and cancels drafts', async () => {
      const wrapper = mount(Field, { props: { modelValue: initial, presentation: 'popup', ...extra } })
      await wrapper.get('[aria-haspopup=dialog]').trigger('click')
      await flushPromises()
      let panel = wrapper.getComponent(EditorPanel)
      expect(panel.findAll('button').filter((button: any) => ['确定', '确认'].includes(button.text()))).toHaveLength(1)
      expect(panel.findAll('button').filter((button: any) => button.text() === '×')).toHaveLength(1)
      const event = name.startsWith('Date') || name.startsWith('Time') ? 'select' : 'update:modelValue'
      ;(panel.findComponent(Editor).exists()
        ? panel.getComponent(Editor)
        : panel.getComponent((Field as any).__fieldControl)
      ).vm.$emit(event, next)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await action(panel, ['×']).trigger('click')
      await flushPromises()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper.get('[aria-haspopup=dialog]').trigger('click')
      await flushPromises()
      panel = wrapper.getComponent(EditorPanel)
      ;(panel.findComponent(Editor).exists()
        ? panel.getComponent(Editor)
        : panel.getComponent((Field as any).__fieldControl)
      ).vm.$emit(event, next)
      await action(panel, ['确定', '确认']).trigger('click')
      await flushPromises()
      expect(wrapper.emitted('update:modelValue')).toEqual([[next]])
      expect(wrapper.emitted('change')).toHaveLength(1)
      wrapper.unmount()
    })
  }
  test('native draft input does not validate committed data; confirmation validates once', async () => {
    const model = reactive({ value: '原值' })
    const rule = vi.fn(() => true)
    const rules = [rule]
    const wrapper = mount(Form, {
      props: { model, presentation: 'popup' },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: '备注', rules }, () =>
            h(Textarea, {
              modelValue: model.value,
              'onUpdate:modelValue': (value: string) => {
                model.value = value
              },
            }),
          ),
      },
    })
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = wrapper.getComponent(EditorPanel)
    await panel.get('textarea').setValue('新值')
    expect(model.value).toBe('原值')
    expect(rule).not.toHaveBeenCalled()
    await action(panel, ['确定', '确认']).trigger('click')
    await flushPromises()
    expect(model.value).toBe('新值')
    expect(rule).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  test('readPretty inherits and an explicit false keeps the original control', () => {
    const wrapper = mount(Form, {
      props: { readPretty: true, model: {} },
      slots: { default: () => h(FormItem, {}, () => h(Textarea, { readPretty: false })) },
    })
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.findComponent(FieldReference).exists()).toBe(false)
    wrapper.unmount()
  })
  test('an explicit inline field keeps nested editors inline under a read Form', () => {
    const wrapper = mount(Form, {
      props: { readPretty: true, model: {} },
      slots: {
        default: () => [
          h(FormItem, {}, () =>
            h(CheckboxGroup, { presentation: 'inline', readPretty: false, options, modelValue: ['dev'] }),
          ),
          h(FormItem, {}, () =>
            h(AutoComplete, { presentation: 'inline', readPretty: false, options: ['研发'], modelValue: '研发' }),
          ),
        ],
      },
    })
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(2)
    expect(wrapper.find('input[role="combobox"]').exists()).toBe(true)
    expect(wrapper.findComponent(FieldReference).exists()).toBe(false)
    wrapper.unmount()
  })
})
