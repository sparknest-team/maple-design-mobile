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
