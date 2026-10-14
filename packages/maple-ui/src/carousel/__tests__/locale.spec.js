import { h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Carousel, { CarouselItem } from '..'
import { LOCALE_PROVIDER_KEY } from '../../locale-provider/provide'

test('provider locale updates labels and explicit aria props win', async () => {
  const messages = reactive({
    'carousel.label': '轮播',
    'carousel.previous': '上页',
    'carousel.next': '下页',
    'carousel.slide': '{index}/{total}',
    'carousel.goto': '第{index}页',
  })
  const wrapper = mount(Carousel, {
    global: { provide: { [LOCALE_PROVIDER_KEY]: { t: (key) => messages[key] } } },
    slots: { default: () => [h(CarouselItem, { key: 0 }), h(CarouselItem, { key: 1 })] },
  })
  expect(wrapper.attributes('aria-label')).toBe('轮播')
  expect(wrapper.find('[aria-roledescription="slide"]').attributes('aria-label')).toBe('1/2')
  messages['carousel.label'] = 'Gallery'
  messages['carousel.next'] = 'Forward'
  await nextTick()
  expect(wrapper.attributes('aria-label')).toBe('Gallery')
  expect(wrapper.find('[aria-label="Forward"]').exists()).toBe(true)
  await wrapper.setProps({ ariaLabel: 'Explicit', nextButtonAriaLabel: 'Next explicit' })
  expect(wrapper.attributes('aria-label')).toBe('Explicit')
  expect(wrapper.find('[aria-label="Next explicit"]').exists()).toBe(true)
  wrapper.unmount()
})
