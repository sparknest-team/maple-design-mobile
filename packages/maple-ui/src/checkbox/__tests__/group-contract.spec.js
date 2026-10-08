import { h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { formHost } from '../../input-number/__tests__/form-host'
import Radio, { RadioGroup } from '../../radio'
import Checkbox, { CheckboxGroup } from '../index'

const variants = [
  { label: 'checkbox', Item: Checkbox, Group: CheckboxGroup, empty: [], initial: ['a'], next: ['b'] },
  { label: 'radio', Item: Radio, Group: RadioGroup, empty: '', initial: 'a', next: 'b' },
]

async function activate(item, label) {
  const input = item.find('input')
  if (input.exists()) {
    if (input.element.disabled) {
      return
    }
    input.element.checked = label === 'checkbox' ? !input.element.checked : true
    await input.trigger('change')
  } else {
    await item.find('.mp-' + label).trigger('click')
  }
}

function isChecked(item, label) {
  const input = item.find('input')
  return input.exists()
    ? input.element.checked
    : item
        .find('.mp-' + label + '__action')
        .classes()
        .includes('mp-' + label + '--checked')
}

for (const { label, Item, Group, empty, initial, next } of variants) {
  describe(label + ' group state contract', () => {
    const children = () => ['a', 'b', 'c'].map((value) => h(Item, { value }, () => value))
    function group(props = {}) {
      return mount(Group, { props, slots: { default: children } })
    }

    it('uses defaultValue once and edits without a model listener', async () => {
      const wrapper = group({ defaultValue: initial })
      await nextTick()
      let items = wrapper.findAllComponents(Item)
      expect(isChecked(items[0], label)).toBe(true)
      await activate(items[1], label)
      expect(isChecked(items[1], label)).toBe(true)
      await wrapper.setProps({ defaultValue: empty })
      items = wrapper.findAllComponents(Item)
      expect(isChecked(items[1], label)).toBe(true)
      wrapper.unmount()
    })

    it('keeps rejected proposals out of both group and children', async () => {
      const wrapper = group({ modelValue: empty })
      await nextTick()
      const items = wrapper.findAllComponents(Item)
      await activate(items[0], label)
      expect(isChecked(items[0], label)).toBe(false)
      await activate(items[1], label)
      expect(wrapper.emitted('update:modelValue').map((args) => args[0])).toEqual(
        label === 'checkbox' ? [['a'], ['b']] : ['a', 'b'],
      )
      expect(isChecked(items[1], label)).toBe(false)
      wrapper.unmount()
    })

    it('syncs external changes silently and emits only at the group boundary', async () => {
      const wrapper = group({ modelValue: initial })
      await nextTick()
      await wrapper.setProps({ modelValue: next })
      const items = wrapper.findAllComponents(Item)
      expect(isChecked(items[1], label)).toBe(true)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      for (const item of items) {
        expect(item.emitted('update:modelValue')).toBeUndefined()
        expect(item.emitted('change')).toBeUndefined()
      }
      await activate(items[2], label)
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(items[2].emitted('change')).toBeUndefined()
      wrapper.unmount()
    })

    it('notifies update, change, and form exactly once in order', async () => {
      const order = []
      const state = reactive({ disabled: false, readonly: false })
      const wrapper = mount(
        formHost(state, { onChange: () => order.push('form') }, () =>
          h(
            Group,
            {
              defaultValue: empty,
              'onUpdate:modelValue': () => order.push('update'),
              onChange: () => order.push('change'),
            },
            children,
          ),
        ),
      )
      await nextTick()
      await activate(wrapper.findAllComponents(Item)[0], label)
      expect(order).toEqual(['update', 'change', 'form'])
      wrapper.unmount()
    })

    it('inherits form guards, allows an explicit group override, and blocks child overrides', async () => {
      const state = reactive({ disabled: true, readonly: false })
      const groupProps = reactive({})
      const changed = vi.fn()
      const wrapper = mount(
        formHost(state, { onChange: changed }, () =>
          h(Group, { ...groupProps, defaultValue: empty }, () => h(Item, { value: 'a' })),
        ),
      )
      await nextTick()
      await activate(wrapper.findComponent(Item), label)
      expect(changed).not.toHaveBeenCalled()
      groupProps.disabled = false
      await nextTick()
      await activate(wrapper.findComponent(Item), label)
      expect(changed).toHaveBeenCalledTimes(1)
      groupProps.readonly = true
      await nextTick()
      await activate(wrapper.findComponent(Item), label)
      expect(changed).toHaveBeenCalledTimes(1)
      wrapper.unmount()

      const locked = mount(Group, {
        props: { readonly: true },
        slots: { default: () => h(Item, { value: 'a', readonly: false }) },
      })
      await nextTick()
      await activate(locked.findComponent(Item), label)
      expect(locked.emitted('change')).toBeUndefined()
      locked.unmount()
    })

    it('keeps async options and unmounted selected values without reverse writes', async () => {
      const wrapper = mount(Group, { props: { modelValue: initial, options: [] } })
      await wrapper.setProps({ options: [{ label: 'A', value: 'a' }] })
      expect(isChecked(wrapper.findComponent(Item), label)).toBe(true)
      await wrapper.setProps({ options: [{ label: 'B', value: 'b' }] })
      expect(isChecked(wrapper.findComponent(Item), label)).toBe(false)
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      wrapper.unmount()
    })

    it('supports boolean false and number zero option identity', async () => {
      const wrapper = mount(Group, {
        props: {
          defaultValue: label === 'checkbox' ? [false] : false,
          options: [
            { label: 'False', value: false },
            { label: 'Zero', value: 0 },
          ],
        },
      })
      await nextTick()
      const items = wrapper.findAllComponents(Item)
      expect(isChecked(items[0], label)).toBe(true)
      expect(isChecked(items[1], label)).toBe(false)
      await activate(items[1], label)
      expect(wrapper.emitted('change')[0][0]).toEqual(label === 'checkbox' ? [false, 0] : 0)
      wrapper.unmount()
    })
  })
}

it('checkbox max blocks additions but permits removing an existing selection', async () => {
  const wrapper = mount(CheckboxGroup, {
    props: { defaultValue: ['a'], max: 1 },
    slots: { default: () => ['a', 'b'].map((value) => h(Checkbox, { value })) },
  })
  await nextTick()
  const items = wrapper.findAllComponents(Checkbox)
  await activate(items[1], 'checkbox')
  expect(wrapper.emitted('change')).toBeUndefined()
  await activate(items[0], 'checkbox')
  expect(wrapper.emitted('change')[0][0]).toEqual([])
  await activate(items[1], 'checkbox')
  expect(wrapper.emitted('change')[1][0]).toEqual(['b'])
  wrapper.unmount()
})

it('radio repeated selection does not emit another change', async () => {
  const wrapper = mount(RadioGroup, {
    props: { defaultValue: 'a' },
    slots: { default: () => h(Radio, { value: 'a' }) },
  })
  await nextTick()
  await activate(wrapper.findComponent(Radio), 'radio')
  expect(wrapper.emitted('change')).toBeUndefined()
  wrapper.unmount()
})
