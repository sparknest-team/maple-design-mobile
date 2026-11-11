import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Space from '../../space'
import Demo from '../example/demos/vertical.vue'
import Slider from '../index'

it('vertical demo writes independent single and non-crossing range values', async () => {
  const wrapper = mount(Demo, { global: { components: { MpSlider: Slider, MpSpace: Space } } })
  const thumbs = wrapper.findAll('[role="slider"]')
  await thumbs[0].trigger('keydown', { key: 'ArrowUp' })
  await thumbs[1].trigger('keydown', { key: 'End' })
  await thumbs[2].trigger('keydown', { key: 'Home' })
  expect(wrapper.find('output').text()).toBe('51 / 64–64')
  expect(thumbs[0].attributes('aria-orientation')).toBe('vertical')
  wrapper.unmount()
})
