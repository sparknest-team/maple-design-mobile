import { defineComponent, h, nextTick, reactive } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import EmptyAutoComplete from '../../../auto-complete'
import EmptyCascader from '../../../cascader'
import EmptyCheckbox from '../../../checkbox'
import EmptyDate from '../../../date'
import EmptyDateRange from '../../../date-range'
import Form from '../../../form'
import FormItem from '../../../form/FormItem.vue'
import Input from '../../../input'
import InputNumber from '../../../input-number'
import EmptyPeopleSelect from '../../../people-select'
import EmptyRadio from '../../../radio'
import EmptyRate from '../../../rate'
import EmptySearch from '../../../search'
import Select from '../../../select'
import EmptySlider from '../../../slider'
import EmptySwitch from '../../../switch'
import Textarea from '../../../textarea'
import EmptyTime from '../../../time'
import EmptyTimeRange from '../../../time-range'
import EmptyUpload from '../../../upload'
import { isEmptyValue, resolveEmptyValue } from '../../../utils/empty-value'
import EmptyVerificationCode from '../../../verification-code'

const owners: ReturnType<typeof mount>[] = []
const own = (component: any, options: any = {}): VueWrapper<any> => {
  const owner = mount(component, options)
  owners.push(owner)
  return owner
}
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))

test('recognition preserves falsy data, empty containers, identity and clear output', () => {
  for (const value of [null, undefined, '', []]) {
    expect(isEmptyValue(value)).toBe(true)
  }
  for (const value of [0, false, [null], [undefined]]) {
    expect(isEmptyValue(value)).toBe(false)
  }
  expect(isEmptyValue('', [null, undefined])).toBe(false)
  expect(isEmptyValue(-1, [null, undefined, -1])).toBe(true)
  const marker = {}
  expect(isEmptyValue(marker, [marker])).toBe(true)
  expect(isEmptyValue({}, [marker])).toBe(false)
  expect(resolveEmptyValue({ emptyValue: () => undefined }, 'fallback')).toBeUndefined()
  expect(resolveEmptyValue({ emptyValue: 0 }, 12)).toBe(0)
})

test('readPretty emptyText is display only, supports an empty override and does not call clear factories', async () => {
  const factory = vi.fn(() => null)
  const owner = own(Input, { props: { modelValue: null, readPretty: true, emptyValue: factory } })
  expect(owner.text()).toBe('-')
  expect(factory).not.toHaveBeenCalled()
  expect(owner.find('input').exists()).toBe(false)
  await owner.setProps({ emptyText: '暂无' })
  expect(owner.text()).toBe('暂无')
  await owner.setProps({ emptyText: '' })
  expect(owner.text()).toBe('')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  expect(owner.emitted('change')).toBeUndefined()
})

test('read slot wins even for an empty model', () => {
  const owner = own(Input, { props: { modelValue: null, readPretty: true }, slots: { read: () => '自定义阅读' } })
  expect(owner.text()).toBe('自定义阅读')
})

test('explicit empty markers are reactive without rewriting a controlled Input', async () => {
  const owner = own(Input, {
    props: { modelValue: 'NONE', emptyValues: [null, undefined, 'NONE'], editMode: 'direct' },
  })
  expect((owner.get('input').element as HTMLInputElement).value).toBe('')
  expect(owner.props('modelValue')).toBe('NONE')
  await owner.setProps({ readPretty: true })
  expect(owner.text()).toBe('-')
  await owner.setProps({ emptyValues: [null, undefined] })
  expect(owner.text()).toBe('NONE')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('zero and a legitimate empty-string option retain their labels', async () => {
  const number = own(InputNumber, { props: { modelValue: 0, readPretty: true } })
  expect(number.text()).toBe('0')
  const select = own(Select, { props: { modelValue: '', options: [{ value: '', label: '全部' }], readPretty: true } })
  expect(select.text()).toBe('全部')
  await select.setProps({ emptyValues: ['', null, undefined] })
  expect(select.text()).toBe('-')
  expect(select.emitted('update:modelValue')).toBeUndefined()
})

test('Select recognizes a sentinel both in its editor and its reading view', async () => {
  const owner = own(Select, {
    props: {
      modelValue: -1,
      emptyValues: [null, undefined, -1],
      editMode: 'direct',
      clearable: true,
      options: [
        { value: -1, label: '哨兵' },
        { value: 0, label: '零' },
      ],
      placeholder: '选择',
    },
  })
  expect(owner.findAll('.mp-selection-field__label')).toHaveLength(0)
  await owner.setProps({ readPretty: true })
  expect(owner.text()).toBe('-')
  await owner.setProps({ emptyValues: [null, undefined] })
  expect(owner.text()).toBe('哨兵')
  await owner.setProps({ modelValue: 0 })
  expect(owner.text()).toBe('零')
})

test('emptyText resolves field > Item > Form and tracks changes without model events', async () => {
  const state = reactive<{ form: string; item?: string; field?: string }>({ form: '表单空', item: '项空' })
  const owner = own(
    defineComponent({
      setup: () => () =>
        h(
          Form,
          {
            model: { value: null },
            readPretty: true,
            emptyText: state.form,
          },
          () =>
            h(FormItem, { field: 'value', emptyText: state.item }, () =>
              h(Textarea, {
                modelValue: null,
                emptyText: state.field,
              }),
            ),
        ),
    }),
  )
  expect(owner.text()).toContain('项空')
  state.field = '字段空'
  await nextTick()
  expect(owner.text()).toContain('字段空')
  state.field = undefined
  state.item = undefined
  await nextTick()
  expect(owner.text()).toContain('表单空')
  state.form = '新空文案'
  await nextTick()
  expect(owner.text()).toContain('新空文案')
  expect(owner.getComponent(Textarea).emitted('update:modelValue')).toBeUndefined()
})

test('built-in required uses the primary field empty policy', async () => {
  const model = reactive({ value: '-1' })
  const owner = own(Form, {
    props: { model },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', required: true }, () =>
          h(Select, {
            modelValue: model.value,
            emptyValues: [null, undefined, '-1'],
            editMode: 'direct',
            options: [
              { value: '-1', label: '未选' },
              { value: '', label: '全部' },
            ],
          }),
        ),
    },
  })
  await (owner.vm as any).validate()
  await flushPromises()
  expect(owner.text()).toMatch(/必填|不能为空|required/)
  model.value = ''
  await nextTick()
  await (owner.vm as any).validate()
  await flushPromises()
  expect(owner.text()).not.toMatch(/必填|不能为空|required/)
  expect(model.value).toBe('')
})

for (const [name, Field, value] of [
  ['auto-complete', EmptyAutoComplete, null],
  ['cascader', EmptyCascader, null],
  ['checkbox', EmptyCheckbox, null],
  ['date', EmptyDate, null],
  ['date-range', EmptyDateRange, null],
  ['input-number', InputNumber, null],
  ['people-select', EmptyPeopleSelect, null],
  ['radio', EmptyRadio, null],
  ['rate', EmptyRate, null],
  ['search', EmptySearch, null],
  ['slider', EmptySlider, null],
  ['switch', EmptySwitch, null],
  ['textarea', Textarea, null],
  ['time', EmptyTime, null],
  ['time-range', EmptyTimeRange, null],
  ['upload', EmptyUpload, []],
  ['verification-code', EmptyVerificationCode, null],
] as const) {
  test(`${name} readPretty recognizes empty data without emitting or mounting editors`, () => {
    const owner = own(Field, { props: { modelValue: value, readPretty: true, emptyText: '无数据' } })
    expect(owner.text()).toBe('无数据')
    expect(owner.find('input, textarea').exists()).toBe(false)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('change')).toBeUndefined()
  })
}

test('custom validators receive the original sentinel instead of display text or null', async () => {
  const seen: unknown[] = []
  const model = reactive({ value: '-1' })
  const owner = own(Form, {
    props: { model },
    slots: {
      default: () =>
        h(
          FormItem,
          {
            field: 'value',
            rules: [
              (value: unknown) => {
                seen.push(value)
                return true
              },
            ],
          },
          () =>
            h(Select, {
              modelValue: model.value,
              emptyValues: [undefined, null, '-1'],
              editMode: 'direct',
              options: [{ value: '-1', label: '未选择' }],
            }),
        ),
    },
  })
  await (owner.vm as any).validate()
  await flushPromises()
  expect(seen).toContain('-1')
  expect(model.value).toBe('-1')
})

test('false remains a valid option unless explicitly configured empty', async () => {
  const owner = own(Select, {
    props: { modelValue: false, readPretty: true, options: [{ value: false, label: '否' }] },
  })
  expect(owner.text()).toBe('否')
  await owner.setProps({ emptyValues: [null, undefined, false] })
  expect(owner.text()).toBe('-')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('a numeric sentinel renders blank without replacing the model', async () => {
  const owner = own(InputNumber, { props: { modelValue: -1, editMode: 'direct', emptyValues: [null, undefined, -1] } })
  expect((owner.get('input').element as HTMLInputElement).value).toBe('')
  expect(owner.props('modelValue')).toBe(-1)
  await owner.setProps({ emptyValues: [null, undefined] })
  expect((owner.get('input').element as HTMLInputElement).value).toBe('-1')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

for (const [Component, marker, format] of [
  [EmptyDate, '2026-10-29', 'YYYY-MM-DD'],
  [EmptyTime, '12:34:56', 'HH:mm:ss'],
] as const) {
  test(`temporal sentinel ${format} only changes the input projection`, async () => {
    const owner = own(Component, {
      props: {
        modelValue: marker,
        format,
        valueFormat: format,
        editMode: 'direct',
        emptyValues: [null, undefined, marker],
      },
    })
    await flushPromises()
    expect((owner.get('input').element as HTMLInputElement).value).toBe('')
    await owner.setProps({ emptyValues: [null, undefined] })
    await flushPromises()
    expect((owner.get('input').element as HTMLInputElement).value).toBe(marker)
    expect(owner.props('modelValue')).toBe(marker)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('change')).toBeUndefined()
  })
}
