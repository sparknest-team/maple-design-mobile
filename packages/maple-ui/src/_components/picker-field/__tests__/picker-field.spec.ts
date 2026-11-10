import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PickerField from '../PickerField.vue'

describe('PickerField', () => {
  test('can notify focus again after a focused field is disabled and enabled', async () => {
    const wrapper = mount(PickerField)
    await wrapper.get('input').trigger('focus')
    await wrapper.setProps({ disabled: true })
    await wrapper.setProps({ disabled: false })
    await wrapper.get('input').trigger('focus')
    expect(wrapper.emitted('focus')).toHaveLength(2)
    wrapper.unmount()
  })
  test('moving between range inputs keeps one field focus and one draft', async () => {
    const wrapper = mount(PickerField, {
      props: { range: true, editable: true, texts: ['09:00', '10:00'] },
    })
    const [start, end] = wrapper.findAll('input')
    await start.trigger('focus')
    await start.setValue('11:00')
    await start.trigger('blur', { relatedTarget: end.element })
    await end.trigger('focus', { relatedTarget: start.element })
    expect(wrapper.emitted('focus')).toHaveLength(1)
    expect(wrapper.emitted('blur')).toBeUndefined()
    expect(wrapper.emitted('commit')).toBeUndefined()
    await end.setValue('12:00')
    await end.trigger('blur')
    expect(wrapper.emitted('blur')).toHaveLength(1)
    expect(wrapper.emitted('commit')![0][0]).toEqual(['11:00', '12:00'])
    wrapper.unmount()
  })
  test('Escape discards the entire range draft without an intermediate commit', async () => {
    const wrapper = mount(PickerField, {
      props: { range: true, editable: true, texts: ['09:00', '10:00'] },
    })
    const [start, end] = wrapper.findAll('input')
    await start.setValue('11:00')
    await start.trigger('blur', { relatedTarget: end.element })
    await end.setValue('12:00')
    await end.trigger('keydown', { key: 'Escape' })
    await end.trigger('blur')
    expect(wrapper.emitted('commit')).toBeUndefined()
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['09:00', '10:00'])
    wrapper.unmount()
  })
  test('focus skips a disabled endpoint and removed inputs are not retained', async () => {
    const wrapper = mount(PickerField, {
      attachTo: document.body,
      props: { range: true, texts: ['a', 'b'], disabledParts: [true, false] },
    })
    wrapper.vm.focus(0)
    expect(document.activeElement).toBe(wrapper.findAll('input')[1].element)
    await wrapper.setProps({ range: false, disabledParts: [] })
    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.get('input').element)
    wrapper.unmount()
  })
  test('renders single and range values with accessible native inputs', async () => {
    const wrapper = mount(PickerField, {
      props: { texts: ['2026-09-22'], placeholders: ['开始'], hint: true },
    })
    expect(wrapper.get('input').element.value).toBe('2026-09-22')
    expect(wrapper.find('[aria-hidden="true"].mp-field-decorator__placeholder').exists()).toBe(true)
    expect(wrapper.get('input').attributes('placeholder')).toBeTruthy()
    await wrapper.setProps({
      range: true,
      texts: ['09:00', '10:00'],
      disabledParts: [false, true],
    })
    expect(wrapper.findAll('input')).toHaveLength(2)
    expect(wrapper.findAll('input')[1].element.disabled).toBe(true)
    wrapper.unmount()
  })
  test('commits keyboard edits once, not again on blur', async () => {
    const wrapper = mount(PickerField, {
      props: { editable: true, texts: ['old'] },
    })
    await wrapper.get('input').setValue('new')
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    await wrapper.get('input').trigger('blur')
    expect(wrapper.emitted('commit')).toHaveLength(1)
    expect(wrapper.emitted('commit')![0][0]).toEqual(['new'])
    wrapper.unmount()
  })
  test('composition does not prematurely commit', async () => {
    const wrapper = mount(PickerField, {
      props: { editable: true, texts: [''] },
    })
    const input = wrapper.get('input')
    await input.trigger('compositionstart')
    await input.setValue('中文')
    await input.trigger('keydown', { key: 'Enter', isComposing: true })
    expect(wrapper.emitted('commit')).toBeUndefined()
    await input.trigger('compositionend')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('commit')).toHaveLength(1)
    wrapper.unmount()
  })
  test('Escape cancels input edits and mobile readonly input never edits', async () => {
    const wrapper = mount(PickerField, {
      props: { editable: true, texts: ['old'] },
    })
    await wrapper.get('input').setValue('new')
    await wrapper.get('input').trigger('keydown', { key: 'Escape' })
    await wrapper.get('input').trigger('blur')
    expect(wrapper.get('input').element.value).toBe('old')
    expect(wrapper.emitted('commit')).toBeUndefined()
    await wrapper.setProps({ editable: false })
    expect(wrapper.get('input').element.readOnly).toBe(true)
    await wrapper.get('input').setValue('ignored')
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('commit')).toBeUndefined()
    wrapper.unmount()
  })
  test('clear uses FieldDecorator and never opens the field', async () => {
    const wrapper = mount(PickerField, {
      props: { texts: ['value'], clearable: true },
    })
    await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('click')).toBeUndefined()
    wrapper.unmount()
  })
})
