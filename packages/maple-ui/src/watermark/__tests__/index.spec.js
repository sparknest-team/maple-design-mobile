import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Watermark from '..'
import { mockCanvas } from '../../utils/test'
import VarWatermark from '../Watermark'

global.URL.createObjectURL = vi.fn()
global.URL.revokeObjectURL = vi.fn()

mockCanvas()

test('watermark plugin', () => {
  const app = createApp({}).use(Watermark)
  expect(app.component(Watermark.name)).toBeTruthy()
})

test('watermark content', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      content: 'Maple',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg span').text()).toBe('Maple')
  wrapper.unmount()
})

test('watermark font', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      content: 'Maple',
      font: {
        fontSize: 15,
        fontWeight: 700,
      },
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('watermark z-index', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      zIndex: 100,
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('.mp-watermark__container').attributes('style')).toContain('z-index: 100')
  wrapper.unmount()
})

test('watermark fullscreen', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      fullscreen: true,
    },
  })

  await wrapper.vm.$nextTick()
  expect(document.querySelector('.mp-watermark--fullscreen')).toBeTruthy()
  wrapper.unmount()
})

test('watermark alpha', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      alpha: 1,
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg').attributes('style')).toContain('opacity: 1')
  wrapper.unmount()
})

test('watermark image', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      image: 'https://maplejs.org/maple_icon.png',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('watermark content rotate', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      rotate: 20,
      content: 'Maple',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg div').attributes('style').includes('rotate(20deg)')).toBeTruthy()
  await wrapper.setProps({
    rotate: 30,
  })
  await wrapper.vm.$nextTick()
  expect(wrapper.find('svg div').attributes('style').includes('rotate(30deg)')).toBeTruthy()
  wrapper.unmount()
})

test('watermark image rotate', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      rotate: 20,
      image: 'https://maplejs.org/maple_icon.png',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg image').attributes('style').includes('rotate(20deg)')).toBeTruthy()
  await wrapper.setProps({
    rotate: 30,
  })

  await wrapper.vm.$nextTick()
  expect(wrapper.find('svg image').attributes('style').includes('rotate(30deg)')).toBeTruthy()
  wrapper.unmount()
})

test('watermark width', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      width: 150,
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.html()).toMatchSnapshot()
  await wrapper.setProps({
    width: 200,
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('watermark height', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      height: 150,
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.html()).toMatchSnapshot()
  await wrapper.setProps({
    height: 200,
  })

  await wrapper.vm.$nextTick()
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('watermark gap', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      gap: [20, 0],
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg').attributes('style')).toContain('padding: 0px 20px 0px 0px')
  await wrapper.setProps({
    gap: [30, 20],
  })

  await wrapper.vm.$nextTick()
  expect(wrapper.find('svg').attributes('style')).toContain('padding: 0px 30px 20px 0px')
  wrapper.unmount()
})

test('watermark content offset', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      offset: [20, 0],
      content: 'Maple',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg div').attributes('style')).toContain('transform: translate(20px, 0px)')
  await wrapper.setProps({
    offset: [30, 20],
  })

  await wrapper.vm.$nextTick()
  expect(wrapper.find('svg div').attributes('style')).toContain('transform: translate(30px, 20px)')
  wrapper.unmount()
})

test('watermark image offset', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      offset: [20, 0],
      image: 'https://maplejs.org/maple_icon.png',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.html()).toMatchSnapshot()
  await wrapper.setProps({
    offset: [0, 30],
  })

  await wrapper.vm.$nextTick()
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

test('watermark content slot', async () => {
  const wrapper = mount(VarWatermark, {
    slots: {
      content: () => 'Maple UI',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg div').text()).toBe('Maple UI')
  wrapper.unmount()
})

test('watermark priority between image and content', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      image: 'https://maplejs.org/maple_icon.png',
      content: 'Maple UI',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg image').exists()).toBeTruthy()
  expect(wrapper.find('svg span').exists()).toBe(false)
  wrapper.unmount()
})

test('watermark priority between image and content slot', async () => {
  const wrapper = mount(VarWatermark, {
    props: {
      image: 'https://maplejs.org/maple_icon.png',
    },
    slots: {
      content: () => 'Maple UI',
    },
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.find('svg image').exists()).toBe(false)
  expect(wrapper.find('svg div').text()).toBe('Maple UI')
  wrapper.unmount()
})
