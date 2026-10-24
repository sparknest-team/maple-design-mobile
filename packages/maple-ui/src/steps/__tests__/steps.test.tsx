import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Steps, { Step } from '../index'

describe('Steps', () => {
  test('render', async () => {
    const wrapper = mount(Steps)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('current status derivation', async () => {
    const wrapper = mount({
      setup() {
        return () =>
          h(Steps, { modelValue: 2 }, () => [
            h(Step, null, () => 'A'),
            h(Step, null, () => 'B'),
            h(Step, null, () => 'C'),
          ])
      },
    })
    await nextTick()
    const items = wrapper.findAll('.mp-steps-item')
    expect(items[0].classes()).toContain('mp-steps-item-finish')
    expect(items[1].classes()).toContain('mp-steps-item-process')
    expect(items[1].classes()).toContain('mp-steps-item-active')
    expect(items[2].classes()).toContain('mp-steps-item-wait')
  })

  test('changeable triggers onChange', async () => {
    const onChange = vi.fn()
    const current = ref(1)
    const wrapper = mount({
      setup() {
        return () =>
          h(
            Steps,
            {
              changeable: true,
              modelValue: current.value,
              'onUpdate:modelValue': (v: number) => {
                current.value = v
              },
              onChange,
            },
            () => [h(Step, null, () => 'A'), h(Step, null, () => 'B')],
          )
      },
    })
    await nextTick()
    await wrapper.findAll('.mp-steps-item')[1].trigger('click')
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toBe(2)
    expect(onChange.mock.calls[0][1]).toBe(1)
  })

  test('uses the shared size and content placement API', async () => {
    const wrapper = mount(Steps, {
      props: { size: 'sm', contentPlacement: 'bottom' },
      slots: { default: () => [h(Step, null, () => 'A')] },
    })

    expect(wrapper.classes()).toContain('mp-steps-size-sm')
    expect(wrapper.classes()).toContain('mp-steps-label-vertical')
    expect(wrapper.find('.mp-steps-item-tail').exists()).toBe(true)
  })

  test('supports shared status icon slots', () => {
    const wrapper = mount(Steps, {
      props: { modelValue: 2 },
      slots: {
        default: () => [h(Step, null, () => 'A'), h(Step, null, () => 'B')],
        'finish-icon': () => h('span', { class: 'finish-icon' }),
      },
    })

    expect(wrapper.find('.finish-icon').exists()).toBe(true)
  })

  test('does not select a disabled step', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Steps, {
      props: { modelValue: 1, changeable: true, onChange },
      slots: {
        default: () => [h(Step, null, () => 'A'), h(Step, { disabled: true }, () => 'B')],
      },
    })

    await wrapper.findAll('.mp-steps-item')[1].trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })

  test('status error on current step', async () => {
    const wrapper = mount({
      setup() {
        return () =>
          h(Steps, { modelValue: 2, status: 'error' }, () => [h(Step, null, () => 'A'), h(Step, null, () => 'B')])
      },
    })
    await nextTick()
    expect(wrapper.findAll('.mp-steps-item')[1].classes()).toContain('mp-steps-item-error')
  })
})
