import { h, nextTick, ref, type Component as VueComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import AutoComplete from '../../auto-complete'
import Cascader from '../../cascader'
import DateField from '../../date'
import DateRange from '../../date-range'
import Input, { InputPassword } from '../../input'
import InputNumber from '../../input-number'
import Select from '../../select'
import Textarea from '../../textarea'
import TimeField from '../../time'
import TimeRange from '../../time-range'

test.each([
  ['Input', Input],
  ['InputPassword', InputPassword],
  ['InputNumber', InputNumber],
  ['Textarea', Textarea],
  ['AutoComplete', AutoComplete],
  ['Select', Select],
  ['Cascader', Cascader],
  ['DateField', DateField],
  ['DateRange', DateRange],
  ['TimeField', TimeField],
  ['TimeRange', TimeRange],
] as const)('%s defaults to a native placeholder and permits explicit hint opt-in', async (_name, Component) => {
  const hint = ref<boolean | undefined>()
  const owner = mount({
    setup: () => () =>
      h(Component as VueComponent, {
        hint: hint.value,
        editMode: 'direct',
        placeholder: 'Account',
      }),
  })
  try {
    expect(owner.find('.mp-field-decorator--hint').exists()).toBe(false)
    hint.value = true
    await nextTick()
    expect(owner.find('.mp-field-decorator--hint').exists()).toBe(true)
    hint.value = false
    await nextTick()
    expect(owner.find('.mp-field-decorator--hint').exists()).toBe(false)
  } finally {
    owner.unmount()
  }
})
