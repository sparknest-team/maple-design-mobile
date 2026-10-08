import { createApp, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Select, { Option } from '..'
import SelectMenu from '../SelectMenu'
import { getKeyFromValue } from '../utils'

const wrappers = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})
const settle = async () => {
  await nextTick()
  await nextTick()
}
const options = [
  { value: 0, label: 'Zero' },
  { value: 1, label: 'One' },
  { value: 2, label: 'Two', disabled: true },
]
const mountSelect = (props = {}, slots = {}) => {
  const wrapper = mount(Select, { props: { options, ...props }, slots, attachTo: document.body })
  wrappers.push(wrapper)
  return wrapper
}
const controller = (wrapper) => wrapper.findComponent(SelectMenu).props('controller')
const choose = (wrapper, value) => controller(wrapper).handleSelect(getKeyFromValue(value), new Event('click'))

describe('Select public contract', () => {
  test('keeps slot options registered in virtual mode', async () => {
    const wrapper = mountSelect(
      { options: [], virtualListProps: { height: 160 } },
      {
        default: () => h(Option, { value: 7, label: 'Virtual slot' }),
      },
    )
    await settle()
    expect(controller(wrapper).validOptionInfos.some((option) => option.value === 7)).toBe(true)
    choose(wrapper, 7)
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([7])
  })

  test('installs Select and Option', () => {
    const app = createApp({}).use(Select)
    expect(app.component(Select.name)).toBeTruthy()
    expect(app.component(Option.name)).toBeTruthy()
  })
  for (const variant of ['filled', 'outline', 'standard']) {
    test('variant ' + variant, () => {
      const wrapper = mountSelect({ variant })
      expect(wrapper.find('[class*="field-decorator--variant-' + variant + '"]').exists()).toBe(true)
    })
  }
  for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
    test('size ' + size, () => {
      expect(
        mountSelect({ size })
          .find('[class*="field-decorator--size-' + size + '"]')
          .exists(),
      ).toBe(true)
    })
  }
  test('single selection publishes once and closes the menu', async () => {
    const wrapper = mountSelect({ defaultOpen: true })
    const option = wrapper.findComponent(SelectMenu).findAll('[role="option"]')[1]
    await option.trigger('click')
    expect(wrapper.emitted('change')).toEqual([[1]])
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  })
  test('multiple values support zero and preserve disabled selections on clear', async () => {
    const wrapper = mountSelect({ multiple: true, defaultValue: [2], clearable: true })
    choose(wrapper, 0)
    expect(wrapper.emitted('change')).toEqual([[[2, 0]]])
    controller(wrapper).handleClear(new Event('click'))
    expect(wrapper.emitted('change').at(-1)).toEqual([[2]])
  })
  for (const state of ['disabled', 'readonly']) {
    test(state + ' blocks open, select, clear and removal', () => {
      const wrapper = mountSelect({ [state]: true, multiple: true, defaultValue: [1], clearable: true })
      const c = controller(wrapper)
      c.handleOpenChange(true)
      choose(wrapper, 0)
      c.handleClear(new Event('click'))
      c.handleRemove(getKeyFromValue(1))
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(wrapper.emitted('update:open')).toBeUndefined()
    })
  }
  test('disabled options cannot be selected or toggled out', () => {
    const wrapper = mountSelect({ multiple: true, defaultValue: [2] })
    choose(wrapper, 2)
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  test('limit applies before publication', () => {
    const wrapper = mountSelect({ multiple: true, defaultValue: [0], limit: 1 })
    choose(wrapper, 1)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('exceed-limit')).toHaveLength(1)
  })
  test('clear is an Event and publishes the canonical empty scalar', async () => {
    const wrapper = mountSelect({ defaultValue: 1, clearable: true })
    await settle()
    await wrapper.get('button[class*="clear-btn"]').trigger('click')
    expect(wrapper.emitted('change')).toEqual([['']])
    expect(wrapper.emitted('clear')[0][0]).toBeInstanceOf(Event)
  })
  test('slot options register before opening and retain selection slot scope', async () => {
    const wrapper = mountSelect(
      { options: [], modelValue: 'a' },
      {
        default: () => [
          h(
            Option,
            { label: 'Alpha', value: 'a' },
            { default: ({ selected }) => h('span', { 'data-slot-option': true }, String(selected)) },
          ),
          h(Option, { label: 'Beta', value: 'b' }),
        ],
      },
    )
    await settle()
    expect(wrapper.find('input').element.value).toBe('')
    expect(wrapper.text()).toContain('Alpha')
    expect(wrapper.findComponent(SelectMenu).get('[data-slot-option]').text()).toBe('true')
    choose(wrapper, 'b')
    expect(wrapper.emitted('change')).toEqual([['b']])
  })
  test('custom field names and asynchronous label replacement', async () => {
    const wrapper = mountSelect({ modelValue: 1, fieldNames: { value: 'id', label: 'name' }, options: [] })
    await settle()
    await wrapper.setProps({ options: [{ id: 1, name: 'First' }] })
    await settle()
    expect(wrapper.text()).toContain('First')
    await wrapper.setProps({ options: [{ id: 1, name: 'Updated' }] })
    expect(wrapper.text()).toContain('Updated')
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  test('object identities use the configured value field, not label', async () => {
    const wrapper = mountSelect({
      fieldNames: { value: 'id' },
      modelValue: { id: 7 },
      options: [{ id: { id: 7 }, label: 'Device' }],
    })
    await settle()
    expect(wrapper.text()).toContain('Device')
  })
  test('focus and blur are native input events and expose methods', async () => {
    const wrapper = mountSelect()
    wrapper.vm.focus()
    await settle()
    expect(document.activeElement).toBe(wrapper.get('input').element)
    expect(wrapper.emitted('focus')).toHaveLength(1)
    wrapper.vm.blur()
    await settle()
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })
  test('keyboard opens, selects and escapes at the input, not window', async () => {
    const wrapper = mountSelect()
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    await settle()
    expect(controller(wrapper).computedOpen).toBe(true)
    await wrapper.get('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('change')).toEqual([[0]])
    controller(wrapper).handleOpenChange(true)
    await settle()
    await wrapper.get('input').trigger('keydown', { key: 'Escape' })
    expect(controller(wrapper).computedOpen).toBe(false)
  })
  test('search is controlled separately from the selected value', async () => {
    const wrapper = mountSelect({ filterable: true, defaultInputValue: 'On' })
    expect(controller(wrapper).computedInputValue).toBe('On')
    await wrapper.get('input').setValue('Two')
    expect(wrapper.emitted('update:inputValue').at(-1)).toEqual(['Two'])
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  test('trigger customization is passed to the menu', () => {
    const wrapper = mountSelect({ triggerProps: { popupTranslate: [0, 40] } })
    expect(
      wrapper.findComponent({ name: Select.name.startsWith('Mp') ? 'MpTrigger' : 'CTrigger' }).props('popupTranslate'),
    ).toEqual([0, 40])
  })
  test('custom label, prefix, suffix and clear slots', async () => {
    const wrapper = mountSelect(
      { modelValue: 1, clearable: true },
      {
        label: ({ data }) => 'Selected: ' + data.label,
        prefix: () => 'Prefix',
        suffix: () => 'Suffix',
        'clear-icon': ({ clear }) => h('button', { class: 'custom-clear', onClick: clear }, 'Clear'),
      },
    )
    await settle()
    expect(wrapper.text()).toContain('Selected: One')
    expect(wrapper.text()).toContain('Prefix')
    expect(wrapper.text()).toContain('Suffix')
    await wrapper.get('.custom-clear').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })
  test('unresolved values remain clearable through fallback labels', async () => {
    const wrapper = mountSelect({ modelValue: 'remote', options: [], clearable: true })
    await settle()
    expect(wrapper.text()).toContain('remote')
    expect(wrapper.find('button[class*="clear-btn"]').exists()).toBe(true)
  })
})
