import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Select from '..'

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
const render = (props) => {
  const wrapper = mount(Select, { props: { editMode: 'direct', clearable: true, defaultValue: 'a', ...props } })
  wrappers.push(wrapper)
  return wrapper
}
const clear = async (wrapper) => {
  await flushPromises()
  await wrapper.get('button[class*="clear-btn"]').trigger('click')
}

describe('Select 1.x clear-value compatibility', () => {
  test.each([false, true])('preserves the single clear value with empty-string option = %s', async (hasEmpty) => {
    const wrapper = render({
      options: [{ value: 'a', label: 'Alpha' }, ...(hasEmpty ? [{ value: '', label: 'Empty value' }] : [])],
    })
    await clear(wrapper)
    expect(wrapper.emitted('update:modelValue')).toEqual([[hasEmpty ? undefined : '']])
    expect(wrapper.emitted('change')).toEqual([[hasEmpty ? undefined : '']])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })
  test('async options retain the legacy empty-string distinction', async () => {
    const wrapper = render({ options: [{ value: 'a', label: 'Alpha' }] })
    await wrapper.setProps({
      options: [
        { value: 'a', label: 'Alpha' },
        { value: '', label: 'Empty' },
      ],
    })
    await clear(wrapper)
    expect(wrapper.emitted('change')).toEqual([[undefined]])
  })
  test('multiple clear retains disabled selected options', async () => {
    const wrapper = render({
      multiple: true,
      defaultValue: ['a', 'locked'],
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'locked', label: 'Locked', disabled: true },
      ],
    })
    await clear(wrapper)
    expect(wrapper.emitted('change')).toEqual([[['locked']]])
  })
  test.each([false, 0, '', () => undefined])(
    'explicit single clear result %s is independent of option arrival',
    async (emptyValue) => {
      const wrapper = render({ emptyValue, options: [{ value: 'a', label: 'Alpha' }] })
      await wrapper.setProps({
        options: [
          { value: 'a', label: 'Alpha' },
          { value: '', label: 'Empty' },
        ],
      })
      await clear(wrapper)
      expect(wrapper.emitted('change')).toEqual([[typeof emptyValue === 'function' ? emptyValue() : emptyValue]])
    },
  )
  test('multiple clear ignores the single-select override and preserves disabled items', async () => {
    const wrapper = render({
      multiple: true,
      emptyValue: 'ignored',
      defaultValue: ['a', 'locked'],
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'locked', label: 'Locked', disabled: true },
      ],
    })
    await clear(wrapper)
    expect(wrapper.emitted('change')).toEqual([[['locked']]])
  })
  test('controlled parents may reject a clear proposal', async () => {
    const wrapper = render({
      modelValue: 'a',
      options: [
        { value: 'a', label: 'Alpha' },
        { value: '', label: 'Empty' },
      ],
    })
    await clear(wrapper)
    expect(wrapper.props('modelValue')).toBe('a')
    expect(wrapper.text()).toContain('Alpha')
    expect(wrapper.emitted('change')).toEqual([[undefined]])
  })
  test('single clear override cannot remove a disabled selected option', async () => {
    const wrapper = render({ emptyValue: 'replacement', options: [{ value: 'a', label: 'Locked', disabled: true }] })
    await clear(wrapper)
    expect(wrapper.emitted('change')).toEqual([['a']])
    expect(wrapper.emitted('update:modelValue')).toEqual([['a']])
    expect(wrapper.text()).toContain('Locked')
  })
})
