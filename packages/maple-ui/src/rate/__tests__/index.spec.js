import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Rate from '..'
import { createRegisteredIconComponents, delay, trigger } from '../../utils/test'
import VarRate from '../rate-core'

test('rate use', () => {
  const app = createApp({}).use(Rate)
  expect(app.component(Rate.name)).toBeTruthy()
})

describe('test rate component props', () => {
  test('rate modelValue', async () => {
    const wrapper = mount(VarRate, {
      props: {
        modelValue: 3,
      },
    })

    expect(wrapper.findAll('.mp-rate--primary').length).toBe(3)
    expect(wrapper.props('modelValue')).toBe(3)

    await wrapper.setProps({
      modelValue: 4,
    })
    expect(wrapper.findAll('.mp-rate--primary').length).toBe(4)
    expect(wrapper.props('modelValue')).toBe(4)

    wrapper.unmount()
  })

  test('rate icon', async () => {
    const iconComponents = createRegisteredIconComponents(['thumb-up-fill'])
    const wrapper = mount(VarRate, {
      props: {
        modelValue: 1,
      },
      global: {
        components: iconComponents,
      },
    })

    expect(wrapper.findAll('.mp-rate--primary').length).toBe(1)
    expect(wrapper.findAll('.mp-rate__content-icon svg').length).toBe(5)

    await wrapper.setProps({
      icon: 'thumb-up-fill',
    })
    expect(wrapper.findAll('.mp-icon-thumb-up-fill').length).toBe(1)

    wrapper.unmount()
  })

  test('rate color', async () => {
    const wrapper = mount(VarRate, {
      props: {
        modelValue: 1,
        color: 'red',
      },
    })

    expect(wrapper.find('.mp-rate__content').attributes('style')).toContain('color: red')

    await wrapper.setProps({
      color: 'green',
    })
    expect(wrapper.find('.mp-rate__content').attributes('style')).toContain('color: green')

    wrapper.unmount()
  })

  test('rate emptyIcon', async () => {
    const iconComponents = createRegisteredIconComponents(['thumb-up'])
    const wrapper = mount(VarRate, {
      global: {
        components: iconComponents,
      },
    })

    expect(wrapper.findAll('.mp-rate__content-icon svg').length).toBe(5)
    expect(wrapper.findAll('.mp-rate--primary').length).toBe(0)

    await wrapper.setProps({
      emptyIcon: 'thumb-up',
    })
    expect(wrapper.findAll('.mp-icon-thumb-up').length).toBe(5)

    wrapper.unmount()
  })

  test('rate emptyColor', async () => {
    const wrapper = mount(VarRate, {
      props: {
        emptyColor: 'red',
      },
    })

    expect(wrapper.find('.mp-rate__content').attributes('style')).toContain('color: red')

    await wrapper.setProps({
      emptyColor: 'green',
    })
    expect(wrapper.find('.mp-rate__content').attributes('style')).toContain('color: green')

    wrapper.unmount()
  })

  test('rate count', async () => {
    const wrapper = mount(VarRate)

    expect(wrapper.findAll('.mp-rate__content').length).toBe(5)

    await wrapper.setProps({
      count: 10,
    })
    expect(wrapper.findAll('.mp-rate__content').length).toBe(10)

    wrapper.unmount()
  })

  test('rate gap', async () => {
    const wrapper = mount(VarRate, {
      props: {
        gap: 10,
      },
    })

    expect(wrapper.find('.mp-rate__content').attributes('style')).toMatch(/(margin-right: 10px)(.*)/)

    await wrapper.setProps({
      gap: 20,
    })
    expect(wrapper.find('.mp-rate__content').attributes('style')).toMatch(/(margin-right: 20px)(.*)/)

    wrapper.unmount()
  })

  test('rate size', async () => {
    const wrapper = mount(VarRate, {
      props: {
        size: 13,
      },
    })

    expect(wrapper.find('.mp-rate__content-icon').attributes('style')).toContain('font-size: 13px')

    await wrapper.setProps({
      size: 15,
    })
    expect(wrapper.find('.mp-rate__content-icon').attributes('style')).toContain('font-size: 15px')

    wrapper.unmount()
  })

  test('rate allowHalf', async () => {
    const onChange = vi.fn()
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

    const wrapper = mount(VarRate, {
      props: {
        allowHalf: true,
        modelValue: 0,
        onChange,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await trigger(wrapper.find('.mp-rate__content'), 'click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onUpdateModelValue).toHaveBeenCalledTimes(1)
    expect(wrapper.props('modelValue')).toBe(0.5)
    expect(wrapper.findAll('.mp-rate__content-icon svg').length).toBe(5)

    wrapper.unmount()
  })

  test('rate halfIcon', async () => {
    const iconComponents = createRegisteredIconComponents(['heart-half-full'])
    const wrapper = mount(VarRate, {
      props: {
        modelValue: 1.5,
        allowHalf: true,
      },
      global: {
        components: iconComponents,
      },
    })

    expect(wrapper.findAll('.mp-rate__content-icon svg').length).toBe(5)

    await wrapper.setProps({
      halfIcon: 'heart-half-full',
    })
    expect(wrapper.findAll('.mp-icon-heart-half-full').length).toBe(1)

    wrapper.unmount()
  })

  test('rate disabled', async () => {
    const onChange = vi.fn()

    const wrapper = mount(VarRate, {
      props: {
        disabled: true,
        onChange,
      },
    })

    expect(wrapper.find('.mp-rate--disabled').exists()).toBe(true)
    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onChange).toBeCalledTimes(0)

    await wrapper.setProps({ disabled: false })
    expect(wrapper.find('.mp-rate--disabled').exists()).toBe(false)
    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onChange).toBeCalledTimes(1)

    wrapper.unmount()
  })

  test('rate disabledColor', async () => {
    const wrapper = mount(VarRate, {
      props: {
        disabled: true,
        disabledColor: 'red',
      },
    })

    expect(wrapper.find('.mp-rate__content').attributes('style')).toContain('color: red')

    await wrapper.setProps({
      disabledColor: 'green',
    })
    expect(wrapper.find('.mp-rate__content').attributes('style')).toContain('color: green')

    wrapper.unmount()
  })

  test('rate readonly', async () => {
    const onChange = vi.fn()

    const wrapper = mount(VarRate, {
      props: {
        readonly: true,
        onChange,
      },
    })

    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onChange).toBeCalledTimes(0)

    await wrapper.setProps({ readonly: false })
    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onChange).toBeCalledTimes(1)

    wrapper.unmount()
  })

  test('rate clearable', async () => {
    const onChange = vi.fn()
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

    const wrapper = mount(VarRate, {
      props: {
        modelValue: 1,
        onChange,
        clearable: true,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onUpdateModelValue).toHaveBeenCalledTimes(1)
    expect(wrapper.props('modelValue')).toBe(0)

    wrapper.unmount()
  })

  test('rate allowHalf clearable', async () => {
    const onChange = vi.fn()
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

    const wrapper = mount(VarRate, {
      props: {
        allowHalf: true,
        clearable: true,
        modelValue: 0,
        onChange,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await trigger(wrapper.find('.mp-rate__content'), 'click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onUpdateModelValue).toHaveBeenCalledTimes(1)
    expect(wrapper.props('modelValue')).toBe(0.5)

    await trigger(wrapper.find('.mp-rate__content'), 'click')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onUpdateModelValue).toHaveBeenCalledTimes(2)
    expect(wrapper.props('modelValue')).toBe(0)

    wrapper.unmount()
  })
})

describe('test rate component events', () => {
  test('rate component onUpdateModelValue event', async () => {
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

    const wrapper = mount(VarRate, {
      props: {
        modelValue: 0,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onUpdateModelValue).toHaveBeenCalledTimes(1)
    expect(wrapper.props('modelValue')).toBe(1)

    wrapper.unmount()
  })

  test('rate component onChange event', async () => {
    const onChange = vi.fn()
    const onUpdateModelValue = vi.fn((value) => wrapper.setProps({ modelValue: value }))

    const wrapper = mount(VarRate, {
      props: {
        modelValue: 0,
        onChange,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('.mp-rate--primary').length).toBe(1)

    await wrapper.find('.mp-rate__content').trigger('click')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('.mp-rate--primary').length).toBe(1)

    wrapper.unmount()
  })
})
