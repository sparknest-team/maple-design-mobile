import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import FieldDecorator from '..'
import AutoComplete from '../../auto-complete'
import Cascader from '../../cascader'
import DateField from '../../date'
import DateRange from '../../date-range'
import Input from '../../input'
import InputNumber from '../../input-number'
import Select from '../../select'
import Textarea from '../../textarea'
import TimeField from '../../time'
import TimeRange from '../../time-range'

const wrappers = []
const render = (component, props = {}, slots = {}) => {
  const w = mount(component, { props, slots })
  wrappers.push(w)
  return w
}
afterEach(() => wrappers.splice(0).forEach((w) => w.unmount()))
describe('Shared field loading', () => {
  it('owns line rendering independently of field decorations and editing', async () => {
    const w = render(
      FieldDecorator,
      { loading: true, loadingMode: 'line', line: false },
      { default: () => h('input', { 'data-editable': '' }) },
    )
    expect(w.attributes('aria-busy')).toBe('true')
    expect(w.find('[class$="__loading-line"]').exists()).toBe(true)
    expect(w.find('[data-editable]').element.disabled).toBe(false)
    expect(w.find('[class$="__loading-icon"]').exists()).toBe(false)
    await w.setProps({ loading: false })
    expect(w.find('[class$="__loading-line"]').exists()).toBe(false)
    expect(w.attributes('aria-busy')).toBeUndefined()
  })
  it.each([
    ['Input', Input],
    ['Textarea', Textarea],
    ['InputNumber', InputNumber],
    ['Select', Select],
    ['Cascader', Cascader],
    ['Date', DateField],
    ['Time', TimeField],
    ['AutoComplete', AutoComplete],
    ['DateRange', DateRange],
    ['TimeRange', TimeRange],
  ])('%s delegates loading to the shared decorator', (_name, component) => {
    const w = render(component, { loading: true, loadingMode: 'line', editMode: 'direct' })
    expect(w.findAll('[class$="__loading-line"]')).toHaveLength(1)
    expect(w.find('[class*="icon--loading"]').exists()).toBe(false)
    expect(w.find('[class$="__loading-icon"]').exists()).toBe(false)
    const control = w.find('input,textarea')
    expect(control.exists()).toBe(true)
    expect(control.element.disabled).toBe(false)
  })
  it('default uses one shared indicator and suppresses duplicate selection spinner', () => {
    const w = render(Select, { loading: true, loadingMode: 'default', editMode: 'direct' })
    expect(w.findAll('[class$="__loading-icon"]')).toHaveLength(1)
    expect(w.find('[data-field-open-trigger]').exists()).toBe(false)
  })
})
