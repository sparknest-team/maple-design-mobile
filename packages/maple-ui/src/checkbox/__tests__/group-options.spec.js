import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Radio, { RadioGroup } from '../../radio'
import { normalizeChoiceOptions } from '../choice-options'
import Checkbox, { CheckboxGroup } from '../index'

function checked(item, kind) {
  const input = item.find('input')
  return input.exists() ? input.element.checked : item.vm.checked
}
async function activate(item, kind) {
  const input = item.find('input')
  if (input.exists()) {
    if (input.element.disabled) {
      return
    }
    input.element.checked = kind === 'checkbox' ? !input.element.checked : true
    await input.trigger('change')
  } else {
    await item.find('.mp-' + kind).trigger('click')
  }
}

it('normalizes copies and preserves typed identity, business fields and mapped guards', () => {
  const item = Object.freeze({ id: false, name: 'False', locked: true, half: true, extra: 42 })
  const options = Object.freeze([item, 0, '', false, '0', null, {}, { value: {} }, NaN])
  const result = normalizeChoiceOptions(options, {
    value: 'id',
    label: 'name',
    readonly: 'locked',
    indeterminate: 'half',
  })
  expect(result.map((option) => option.value)).toEqual([false, 0, '', '0'])
  expect(result[0]).toMatchObject({ value: false, label: 'False', readonly: true, indeterminate: true, extra: 42 })
  expect(result[0]).not.toBe(item)
  expect(item).not.toHaveProperty('value')
})

for (const [kind, Group, Item] of [
  ['checkbox', CheckboxGroup, Checkbox],
  ['radio', RadioGroup, Radio],
]) {
  describe(kind + ' group option contract', () => {
    it('supports primitives and does not implicitly select empty string', async () => {
      const wrapper = mount(Group, { props: { options: [false, 0, '', '0'] } })
      await nextTick()
      const items = wrapper.findAllComponents(Item)
      expect(items).toHaveLength(4)
      expect(items.map((item) => checked(item, kind))).toEqual([false, false, false, false])
      await activate(items[2], kind)
      expect(wrapper.emitted('change')[0][0]).toEqual(kind === 'checkbox' ? [''] : '')
      wrapper.unmount()
    })

    it('renders VNode arrays, numeric labels and missing-label fallbacks', async () => {
      const wrapper = mount(Group, {
        props: { options: [{ value: 'a', label: [h('b', 'A'), ' text'] }, { value: 'b', label: 42 }, { value: 0 }] },
      })
      await nextTick()
      expect(wrapper.find('b').text()).toBe('A')
      expect(wrapper.text()).toBe('A text420')
      wrapper.unmount()
    })

    it('reacts to field mapping and data changes without emitting', async () => {
      const wrapper = mount(Group, {
        props: {
          modelValue: kind === 'checkbox' ? [0] : 0,
          options: [{ id: 0, name: 'Old', title: 'New' }],
          fieldNames: { value: 'id', label: 'name' },
        },
      })
      await nextTick()
      expect(wrapper.text()).toBe('Old')
      expect(checked(wrapper.findComponent(Item), kind)).toBe(true)
      await wrapper.setProps({ fieldNames: { value: 'id', label: 'title' } })
      expect(wrapper.text()).toBe('New')
      await wrapper.setProps({ options: [] })
      expect(wrapper.findAllComponents(Item)).toHaveLength(0)
      await wrapper.setProps({ options: [{ id: 0, title: 'Restored' }] })
      expect(checked(wrapper.findComponent(Item), kind)).toBe(true)
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      wrapper.unmount()
    })

    it('maps disabled and readonly guards and blocks component methods', async () => {
      const wrapper = mount(Group, {
        props: {
          options: [{ id: 'a', locked: true }, { id: 'b', stopped: true }, { id: 'c' }],
          fieldNames: { value: 'id', readonly: 'locked', disabled: 'stopped' },
        },
      })
      await nextTick()
      const items = wrapper.findAllComponents(Item)
      for (const item of items.slice(0, 2)) {
        await activate(item, kind)
        const methods = item.vm.$.exposed ?? item.vm
        if (kind === 'checkbox') {
          methods.toggle()
        } else {
          methods.select()
        }
      }
      await nextTick()
      expect(wrapper.emitted('change')).toBeUndefined()
      await activate(items[2], kind)
      expect(wrapper.emitted('change')).toHaveLength(1)
      wrapper.unmount()
    })

    it('passes normalized data and checked to labels with slot precedence', async () => {
      const render = vi.fn((option, selected) => h('b', option.code + ':' + selected))
      const props = {
        defaultValue: kind === 'checkbox' ? [false] : false,
        options: [{ id: false, name: render, code: 'X' }],
        fieldNames: { value: 'id', label: 'name' },
      }
      const wrapper = mount(Group, { props })
      await nextTick()
      expect(wrapper.text()).toBe('X:true')
      expect(render.mock.calls.at(-1)[0]).toMatchObject({ value: false, code: 'X' })
      wrapper.unmount()
      render.mockClear()
      const slotWrapper = mount(Group, {
        props,
        slots: {
          label: ({ data, checked: selected }) => h('i', data.code + ':' + selected),
        },
      })
      await nextTick()
      expect(slotWrapper.find('i').text()).toBe('X:true')
      expect(render).not.toHaveBeenCalled()
      slotWrapper.unmount()
    })

    it('lets explicit options replace the default slot even when empty', async () => {
      const wrapper = mount(Group, { props: { options: [] }, slots: { default: () => h(Item, { value: 'fallback' }) } })
      await nextTick()
      expect(wrapper.findAllComponents(Item)).toHaveLength(0)
      await wrapper.setProps({ options: ['a'] })
      expect(wrapper.findAllComponents(Item)).toHaveLength(1)
      expect(wrapper.text()).toBe('a')
      await wrapper.setProps({ options: undefined })
      expect(wrapper.findComponent(Item).props('value')).toBe('fallback')
      wrapper.unmount()
    })
  })
}

it('radio null clears selection silently without treating it as uncontrolled', async () => {
  const wrapper = mount(RadioGroup, { props: { options: ['', false], defaultValue: false, modelValue: '' } })
  await nextTick()
  expect(checked(wrapper.findAllComponents(Radio)[0], 'radio')).toBe(true)
  await wrapper.setProps({ modelValue: null })
  expect(wrapper.findAllComponents(Radio).every((item) => !checked(item, 'radio'))).toBe(true)
  expect(wrapper.emitted('change')).toBeUndefined()
  await activate(wrapper.findAllComponents(Radio)[1], 'radio')
  expect(wrapper.emitted('change')[0][0]).toBe(false)
  expect(checked(wrapper.findAllComponents(Radio)[1], 'radio')).toBe(false)
  wrapper.unmount()
})

it('checkbox option indeterminate is presentation only', async () => {
  const wrapper = mount(CheckboxGroup, { props: { options: [{ value: 'a', indeterminate: true }] } })
  await nextTick()
  const item = wrapper.findComponent(Checkbox)
  expect(item.props('indeterminate')).toBe(true)
  expect(checked(item, 'checkbox')).toBe(false)
  await activate(item, 'checkbox')
  expect(wrapper.emitted('change')[0][0]).toEqual(['a'])
  expect(item.props('indeterminate')).toBe(true)
  expect(item.emitted('update:indeterminate')).toBeUndefined()
  wrapper.unmount()
})
