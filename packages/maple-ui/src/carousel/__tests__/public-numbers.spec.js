import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Carousel, { CarouselItem } from '..'

test('public slide numbers start at one across model, commands, change and indicator scope', async () => {
  let scope
  const wrapper = mount(Carousel, {
    slots: {
      default: () => [1, 2, 3].map((number) => h(CarouselItem, { key: number }, () => String(number))),
      indicator: (value) => {
        scope = value
        return h('span', String(value.slideNumber))
      },
    },
  })
  try {
    expect(scope.slideNumber).toBe(1)
    expect(scope.index).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.vm.to(3)
    await wrapper.vm.$nextTick()
    expect(scope.slideNumber).toBe(3)
    expect(wrapper.emitted('change')).toEqual([[3, 1, true]])
    wrapper.vm.next()
    await wrapper.vm.$nextTick()
    expect(scope.slideNumber).toBe(1)
    expect(wrapper.emitted('change').at(-1)).toEqual([1, 3, true])
  } finally {
    wrapper.unmount()
  }
})

test('fractional public page numbers are truncated before wrapping or clamping', async () => {
  let scope
  const wrapper = mount(Carousel, {
    props: { loop: true, moveSpeed: 0 },
    slots: {
      default: () => [1, 2, 3].map((number) => h(CarouselItem, { key: number }, () => String(number))),
      indicator: (value) => {
        scope = value
        return h('span', String(value.slideNumber))
      },
    },
  })
  try {
    wrapper.vm.to(2.9)
    await wrapper.vm.$nextTick()
    expect(scope.slideNumber).toBe(2)
    wrapper.vm.to(0.5)
    await wrapper.vm.$nextTick()
    expect(scope.slideNumber).toBe(3)
    await wrapper.setProps({ loop: false, modelValue: 2.9 })
    expect(scope.slideNumber).toBe(2)
    await wrapper.setProps({ modelValue: 0.5 })
    expect(scope.slideNumber).toBe(1)
  } finally {
    wrapper.unmount()
  }
})
