import { defineComponent, h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { formHost } from '../../input-number/__tests__/form-host'
import Checkbox, { CheckboxGroup } from '../index'

const methods = (wrapper) => wrapper.vm.$.exposed ?? wrapper.vm
const children = (values) => values.map((value) => h(Checkbox, { editMode: 'direct', value, key: String(value) }))

describe('checkbox group methods', () => {
  it('preserves locked and unloaded values and uses slots as candidates', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { editMode: 'direct', defaultValue: ['remote', 'locked', 'a'], max: 4 },
      slots: {
        default: () => [
          h(Checkbox, { editMode: 'direct', value: 'locked', disabled: true }),
          h(Checkbox, { editMode: 'direct', value: 'a' }),
          h(Checkbox, { editMode: 'direct', value: 'b' }),
          h(Checkbox, { editMode: 'direct', value: 'readonly', readonly: true }),
          h(Checkbox, { editMode: 'direct', value: 'd' }),
        ],
      },
    })
    await nextTick()
    expect(methods(wrapper).inverseAll()).toEqual(['remote', 'locked', 'b', 'd'])
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['remote', 'locked', 'b', 'd'])
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })

  it('frees max capacity before inverse selection rather than locking capped items', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { editMode: 'direct', defaultValue: ['a'], max: 1, options: ['a', 'b'] },
    })
    await nextTick()
    expect(methods(wrapper).inverseAll()).toEqual(['b'])
    await nextTick()
    expect(methods(wrapper).inverseAll()).toEqual(['a'])
    wrapper.unmount()
  })

  it('retains model order and emits nothing for an already complete selection', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        editMode: 'direct',
        defaultValue: ['b', 'a', 'locked'],
        options: ['a', 'b', { value: 'locked', readonly: true }],
      },
    })
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['b', 'a', 'locked'])
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })

  it('never stores rejected proposals, clones results and observes readonly/disabled', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { editMode: 'direct', modelValue: [], options: [false, 0, ''], max: 2 },
    })
    await nextTick()
    const result = methods(wrapper).checkAll()
    expect(result).toEqual([false, 0])
    result.push('outside')
    expect(methods(wrapper).inverseAll()).toEqual([false, 0])
    await wrapper.setProps({ readonly: true })
    expect(methods(wrapper).checkAll()).toEqual([])
    await wrapper.setProps({ readonly: false, disabled: true })
    expect(methods(wrapper).inverseAll()).toEqual([])
    expect(wrapper.emitted('change')).toHaveLength(2)
    wrapper.unmount()
  })

  it('appends newly loaded candidates without deleting or mutating existing selections', async () => {
    const wrapper = mount(CheckboxGroup, { props: { editMode: 'direct', defaultValue: ['remote'], options: [] } })
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['remote'])
    await wrapper.setProps({ options: ['b', 'a'] })
    const result = methods(wrapper).checkAll()
    expect(result).toEqual(['remote', 'b', 'a'])
    result.push('outside')
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['remote', 'b', 'a'])
    await wrapper.setProps({ options: [] })
    expect(methods(wrapper).inverseAll()).toEqual(['remote', 'b', 'a'])
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })

  it('uses live DOM order after keyed reordering, not registration order', async () => {
    const order = ref(['a', 'b'])
    const wrapper = mount(CheckboxGroup, {
      props: { editMode: 'direct', modelValue: [], max: 1 },
      slots: { default: () => children(order.value) },
    })
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['a'])
    order.value = ['b', 'a']
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['b'])
    wrapper.unmount()
  })

  it('reads current item values and removes unmounted registrations', async () => {
    const item = ref('a')
    const visible = ref(true)
    const wrapper = mount(CheckboxGroup, {
      props: { editMode: 'direct', modelValue: [] },
      slots: {
        default: () => (visible.value ? h(Checkbox, { editMode: 'direct', value: item.value }) : null),
      },
    })
    await nextTick()
    item.value = 'b'
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['b'])
    visible.value = false
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual([])
    wrapper.unmount()
  })

  it('removes and restores KeepAlive children without stale or duplicate candidates', async () => {
    const visible = ref(true)
    const Child = defineComponent({ setup: () => () => h(Checkbox, { editMode: 'direct', value: 'a' }) })
    const wrapper = mount(CheckboxGroup, {
      props: { editMode: 'direct', modelValue: [] },
      slots: {
        default: () => h(KeepAlive, null, { default: () => (visible.value ? h(Child) : null) }),
      },
    })
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['a'])
    visible.value = false
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual([])
    visible.value = true
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['a'])
    wrapper.unmount()
  })

  it('respects locked duplicate values and isolates nested groups', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { editMode: 'direct' },
      slots: {
        default: () => [
          h(Checkbox, { editMode: 'direct', value: 'a' }),
          h(Checkbox, { editMode: 'direct', value: 'a', readonly: true }),
          h(Checkbox, { editMode: 'direct', value: 'b' }),
          h(CheckboxGroup, null, { default: () => h(Checkbox, { editMode: 'direct', value: 'nested' }) }),
        ],
      },
    })
    await nextTick()
    expect(methods(wrapper).checkAll()).toEqual(['b'])
    const nested = wrapper.findAllComponents(CheckboxGroup).find((item) => item.vm.$ !== wrapper.vm.$)
    expect(methods(nested).checkAll()).toEqual(['nested'])
    wrapper.unmount()
  })

  it('notifies update, change and form once; readonly form blocks methods', async () => {
    const order = []
    const state = reactive({ disabled: false, readonly: false })
    const wrapper = mount(
      formHost(state, { onChange: () => order.push('form') }, () =>
        h(CheckboxGroup, {
          editMode: 'direct',
          options: ['a', 'b'],
          'onUpdate:modelValue': () => order.push('update'),
          onChange: (_value, event) => {
            expect(event).toBeUndefined()
            order.push('change')
          },
        }),
      ),
    )
    await nextTick()
    const group = wrapper.findComponent(CheckboxGroup)
    methods(group).checkAll()
    await nextTick()
    expect(order).toEqual(['update', 'change', 'form'])
    state.readonly = true
    await nextTick()
    expect(methods(group).inverseAll()).toEqual(['a', 'b'])
    expect(order).toHaveLength(3)
    wrapper.unmount()
  })

  it('ignores retained methods after disposal and does not affect another instance', async () => {
    const changed = vi.fn()
    const left = mount(CheckboxGroup, { props: { editMode: 'direct', options: ['a'], onChange: changed } })
    const right = mount(CheckboxGroup, { props: { editMode: 'direct', options: ['b'] } })
    await nextTick()
    const retained = methods(left)
    left.unmount()
    expect(retained.checkAll()).toEqual([])
    expect(changed).not.toHaveBeenCalled()
    expect(methods(right).checkAll()).toEqual(['b'])
    right.unmount()
  })
})
