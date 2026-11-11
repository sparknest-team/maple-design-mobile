import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Carousel, { CarouselItem } from '..'

test('Carousel keeps one-based public slide numbers and reads defaultValue only once', async () => {
  const wrapper = mount(Carousel, {
    props: { defaultValue: 2 },
    slots: { default: () => [0, 1, 2].map((i) => h(CarouselItem, { key: `slide-${i}` }, () => String(i))) },
  })
  expect(wrapper.find('[aria-roledescription="slide"][aria-hidden="false"]').text()).toBe('1')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.setProps({ defaultValue: 3 })
  expect(wrapper.find('[aria-roledescription="slide"][aria-hidden="false"]').text()).toBe('1')
  wrapper.vm.next()
  await wrapper.vm.$nextTick()
  expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
  wrapper.unmount()
})
