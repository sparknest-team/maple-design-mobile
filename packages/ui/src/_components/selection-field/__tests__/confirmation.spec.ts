import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import AutoComplete from '../../../auto-complete'
import Cascader from '../../../cascader'
import PeopleSelect from '../../../people-select'
import Select, { Option } from '../../../select'
import FieldPresentation from '../../field-presentation/FieldPresentation.vue'
import SelectedOptions from '../../selected-options/SelectedOptions.vue'
import SelectionField from '../SelectionField.vue'

test('a new confirmation attempt clears an earlier exception while preserving the draft', async () => {
  let resolve!: (value: boolean) => void
  const wrapper = await mountEditor(Select, {
    modelValue: 'a',
    needConfirm: true,
    beforeCommit: () => {
      throw new Error('Old error')
    },
  })
  await choose(wrapper)
  wrapper.findComponent(FieldPresentation).vm.$emit('confirm')
  await flushPromises()
  expect(wrapper.findComponent(FieldPresentation).props('error')).toBe('Old error')
  await wrapper.setProps({
    beforeCommit: () =>
      new Promise<boolean>((done) => {
        resolve = done
      }),
  })
  wrapper.findComponent(FieldPresentation).vm.$emit('confirm')
  await flushPromises()
  expect(wrapper.findComponent(FieldPresentation).props('error')).toBeFalsy()
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  resolve(false)
  await flushPromises()
  expect(wrapper.findComponent(FieldPresentation).props('error')).toBeFalsy()
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.setProps({ beforeCommit: () => Promise.reject(new Error('New error')) })
  wrapper.findComponent(FieldPresentation).vm.$emit('confirm')
  await flushPromises()
  expect(wrapper.findComponent(FieldPresentation).props('error')).toBe('New error')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
const mountEditor = async (component: any, props: Record<string, any> = {}) => {
  const wrapper = mount(component, {
    attachTo: document.body,
    props: {
      editMode: Select.name?.startsWith('Mp') ? 'popup' : 'click',
      defaultOpen: true,
      popupContainer: false,
      options,
      ...props,
    },
  })
  wrappers.push(wrapper)
  await flushPromises()
  return wrapper
}
const choose = async (wrapper: ReturnType<typeof mount>, label = 'Beta') => {
  const combobox = wrapper.find('[role="combobox"]')
  if (combobox.exists() && combobox.attributes('aria-expanded') !== 'true') {
    await combobox.trigger('keydown', { key: 'ArrowDown' })
    await new Promise((resolve) => setTimeout(resolve, 30))
    await flushPromises()
  }
  const targetValue = options.find((option) => option.label === label)!.value
  // Desktop PeopleSelect delegates to a native Select. Its menu is covered by
  // Select tests; exercise the public selection event at this ownership boundary.
  if (Select.name?.startsWith('C') && wrapper.vm.$options.name?.includes('PeopleSelect')) {
    const select = wrapper.findComponent(Select)
    const props = wrapper.vm.$props as { multiple?: boolean; modelValue?: string[] }
    const value = props.multiple ? [...(props.modelValue ?? []), targetValue] : targetValue
    select.vm.$emit('change', value)
    await flushPromises()
    return
  }
  const findOption = () => wrapper.findAllComponents(Option).find((option) => option.props('value') === targetValue)
  let option = findOption()
  if (!option && wrapper.find('[role="combobox"]').exists()) {
    await wrapper.get('[role="combobox"]').trigger('click')
    await flushPromises()
    option = findOption()
  }
  if (option) {
    await option.trigger('click')
  } else {
    const node = Array.from(document.querySelectorAll('[role="menuitemradio"], li[data-cascader-key]')).find((row) =>
      row.textContent?.includes(label),
    )
    expect(node).toBeDefined()
    await new DOMWrapper(node!).trigger('click')
  }
  await flushPromises()
}

for (const [name, component] of [
  ['Select', Select],
  ['Cascader', Cascader],
  ['PeopleSelect', PeopleSelect],
] as const) {
  test(`${name} single selection defaults to immediate guarded completion`, async () => {
    const wrapper = await mountEditor(component, { modelValue: 'a' })
    expect(wrapper.findComponent(FieldPresentation).props('needConfirm')).toBe(false)
    expect(wrapper.find('[class*="confirm-icon"]').exists()).toBe(false)
    await choose(wrapper)
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.findComponent(FieldPresentation).props('open')).toBe(false)
  })
  test(`${name} explicit confirmation keeps the draft until accepted`, async () => {
    const wrapper = await mountEditor(component, { modelValue: 'a', needConfirm: true })
    await choose(wrapper)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findComponent(FieldPresentation).props('needConfirm')).toBe(true)
    wrapper.findComponent(FieldPresentation).vm.$emit('confirm')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })
  test(`${name} rejected auto-completion stays open and can be retried`, async () => {
    const wrapper = await mountEditor(component, { modelValue: 'a', beforeCommit: () => false })
    await choose(wrapper)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findComponent(FieldPresentation).props('open')).toBe(true)
    await wrapper.setProps({ beforeCommit: () => true })
    await choose(wrapper)
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })
  test(`${name} immediate clear still commits its configured empty value`, async () => {
    const wrapper = await mountEditor(component, { modelValue: 'a', clearable: true, emptyValue: null })
    if (name === 'Select') {
      const summary = wrapper.findComponent(SelectedOptions)
      if (summary.exists()) {
        summary.vm.$emit('clear', new MouseEvent('click'))
      } else {
        wrapper.findComponent(SelectionField).vm.$emit('clear', new MouseEvent('click'))
      }
    } else {
      wrapper.findComponent(FieldPresentation).vm.$emit('clear')
    }
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]])
    expect(wrapper.findComponent(FieldPresentation).props('open')).toBe(false)
  })
  test(`${name} closing during an automatic guard prevents late publication`, async () => {
    let resolve!: (allowed: boolean) => void
    const wrapper = await mountEditor(component, {
      modelValue: 'a',
      beforeCommit: () =>
        new Promise<boolean>((done) => {
          resolve = done
        }),
    })
    await choose(wrapper)
    expect(resolve).toBeDefined()
    await wrapper.setProps({ open: false })
    resolve(true)
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
  test(`${name} multiple selection still defaults to confirmation`, async () => {
    const wrapper = await mountEditor(component, { multiple: true, modelValue: ['a'] })
    expect(wrapper.findComponent(FieldPresentation).props('needConfirm')).toBe(true)
    await choose(wrapper)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.findComponent(FieldPresentation).vm.$emit('confirm')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toEqual([[['a', 'b']]])
  })
}

test('AutoComplete keeps typing as a draft and completes only a selected suggestion', async () => {
  const wrapper = await mountEditor(AutoComplete, { modelValue: 'a' })
  const input = wrapper.get('input')
  await input.setValue('typed')
  await flushPromises()
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  expect(wrapper.findComponent(FieldPresentation).props('open')).toBe(true)
  await input.setValue('b')
  await input.trigger('focus')
  await flushPromises()
  await choose(wrapper)
  expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  expect(wrapper.findComponent(FieldPresentation).props('open')).toBe(false)
})
