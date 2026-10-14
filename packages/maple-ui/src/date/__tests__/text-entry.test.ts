import { nextTick } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DateRange from '../../date-range/DateRange.vue'
import DateInput from '../Date.vue'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
function setup(range: false, props?: Record<string, unknown>): VueWrapper<InstanceType<typeof DateInput>>
function setup(range: true, props?: Record<string, unknown>): VueWrapper<InstanceType<typeof DateRange>>
function setup(
  range: boolean,
  props?: Record<string, unknown>,
): VueWrapper<InstanceType<typeof DateInput>> | VueWrapper<InstanceType<typeof DateRange>>
function setup(range: boolean, props: Record<string, unknown> = {}) {
  const wrapper = range
    ? mount(DateRange, { props: { modelValue: ['2025-01-15', '2025-01-20'], format: 'DD/MM/YYYY', ...props } })
    : mount(DateInput, { props: { modelValue: '2025-01-15', format: 'DD/MM/YYYY', ...props } })
  wrappers.push(wrapper)
  return wrapper
}

describe('date native text entry', () => {
  for (const range of [false, true]) {
    it(`commits once and reconciles rejected controlled updates (range=${range})`, async () => {
      const wrapper = setup(range)
      const input = wrapper.get('input')
      expect(input.element.readOnly).toBe(false)
      await input.setValue('18/01/2025')
      await input.trigger('keydown', { key: 'Enter' })
      await nextTick()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([range ? ['2025-01-18', '2025-01-20'] : '2025-01-18'])
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(input.element.value).toBe('15/01/2025')
      await input.trigger('blur')
      expect(wrapper.emitted('change')).toHaveLength(1)
    })
    it(`rejects invalid dates and discards drafts when editing is disabled (range=${range})`, async () => {
      const wrapper = setup(range)
      const input = wrapper.get('input')
      await input.setValue('31/02/2025')
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(input.element.value).toBe('15/01/2025')
      await input.setValue('18/01/2025')
      await wrapper.setProps({ inputEditable: false })
      expect(input.element.readOnly).toBe(true)
      await wrapper.setProps({ inputEditable: true })
      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('change')).toBeUndefined()
    })
    it(`does not submit composing, disabled or readonly inputs (range=${range})`, async () => {
      const wrapper = setup(range)
      const input = wrapper.get('input')
      await input.trigger('compositionstart')
      await input.setValue('18/01/2025')
      await input.trigger('keydown', { key: 'Enter', isComposing: true })
      expect(wrapper.emitted('change')).toBeUndefined()
      await input.trigger('compositionend')
      await wrapper.setProps({ readonly: true })
      await input.trigger('keydown', { key: 'Enter' })
      await wrapper.setProps({ readonly: false, disabled: true })
      await input.setValue('18/01/2025')
      await input.trigger('blur')
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  }
  it('accepts parent updates and applies the same bounds and disabled dates', async () => {
    const wrapper = setup(false, {
      min: '2025-01-10',
      max: '2025-01-20',
      disabledDate: (date: Date) => date.getDate() === 17,
    })
    const input = wrapper.get('input')
    for (const text of ['09/01/2025', '21/01/2025', '17/01/2025']) {
      await input.setValue(text)
      await input.trigger('keydown', { key: 'Enter' })
    }
    expect(wrapper.emitted('change')).toBeUndefined()
    await input.setValue('18/01/2025')
    await input.trigger('blur')
    await wrapper.setProps({ modelValue: '2025-01-18' })
    expect(input.element.value).toBe('18/01/2025')
    expect(wrapper.emitted('change')?.[0]).toEqual(['2025-01-18', new Date(2025, 0, 18), '18/01/2025'])
  })
  it('keeps reversed ranges invalid and disabled endpoints unchanged', async () => {
    const wrapper = setup(true)
    const input = wrapper.get('input')
    await input.setValue('21/01/2025')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper.setProps({ disabled: [true, false] })
    const end = wrapper.findAll('input')[1]
    expect(input.element.disabled).toBe(true)
    await end.setValue('22/01/2025')
    await end.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['2025-01-15', '2025-01-22']])
  })
  it('does not edit function-formatted text without an inverse protocol', () => {
    const wrapper = setup(false, { format: () => '自定义日期' })
    expect(wrapper.get('input').element.readOnly).toBe(true)
    expect(wrapper.get('input').element.value).toBe('自定义日期')
  })
})
