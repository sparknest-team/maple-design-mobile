import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Carousel, { CarouselItem } from '..'

test('moves focus from a hidden slide to the carousel and leaves outside focus alone', async () => {
  const outside = document.createElement('button')
  document.body.appendChild(outside)
  const wrapper = mount(Carousel, {
    props: { loop: false, moveSpeed: 0, indicator: false, showArrow: 'never' },
    slots: {
      default: () =>
        ['A', 'B', 'C'].map((label) => h(CarouselItem, { key: label }, () => h('input', { value: label }))),
    },
    attachTo: document.body,
  })
  const inputs = wrapper.findAll('input')
  inputs[0].element.focus()
  wrapper.vm.to(2)
  await nextTick()
  expect(document.activeElement).toBe(wrapper.element)
  expect(wrapper.attributes('tabindex')).toBe('-1')
  outside.focus()
  wrapper.vm.to(3)
  await nextTick()
  expect(document.activeElement).toBe(outside)
  wrapper.unmount()
  outside.remove()
})
