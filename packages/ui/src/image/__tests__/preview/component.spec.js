import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { delay } from '../../../utils/test'
import { ImagePreview, ImagePreviewGroup } from '../../index'

const images = ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg']
const mountPreview = (props = {}) =>
  mount(ImagePreview, {
    props: { src: images[0], popupContainer: false, open: true, ...props },
  })
const pointer = { button: 0, pointerId: 1, pointerType: 'touch', clientX: 20, clientY: 20 }
async function tap(image) {
  await image.trigger('pointerdown', pointer)
  await image.trigger('pointerup', pointer)
}

test('image preview component plugin', () => {
  const app = createApp({}).use(ImagePreview)
  expect(app.component(ImagePreview.name)).toBeTruthy()
})

describe('single-image preview contract', () => {
  test('controlled open and lifecycle', async () => {
    const wrapper = mountPreview({ open: false })
    try {
      await wrapper.setProps({ open: true })
      expect(wrapper.emitted('open')).toHaveLength(1)
      expect(wrapper.find('[data-image-preview-image]').attributes('src')).toBe(images[0])
      await wrapper.setProps({ open: false })
      expect(wrapper.emitted('close')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('src changes the image without leaking collection props', async () => {
    const wrapper = mountPreview()
    try {
      await wrapper.setProps({ src: images[1] })
      expect(wrapper.findAll('[data-image-preview-image]')).toHaveLength(1)
      expect(wrapper.get('[data-image-preview-image]').attributes('src')).toBe(images[1])
      expect(wrapper.props()).not.toHaveProperty('images')
    } finally {
      wrapper.unmount()
    }
  })
  test('imagePreventDefault and closable affect the rendered controls', async () => {
    const wrapper = mountPreview({ imagePreventDefault: true })
    try {
      expect(wrapper.find('.mp-image-preview--prevent').exists()).toBe(true)
      expect(wrapper.find('[data-image-preview-close]').exists()).toBe(true)
      await wrapper.setProps({ closable: false })
      expect(wrapper.find('[data-image-preview-close]').exists()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  test('double touch toggles zoom without closing', async () => {
    const wrapper = mountPreview()
    try {
      const image = wrapper.get('[data-image-preview-image]')
      await tap(image)
      await tap(image)
      expect(wrapper.vm.scale).toBeGreaterThan(1)
      await tap(image)
      await tap(image)
      expect(wrapper.vm.scale).toBe(1)
      expect(wrapper.emitted('update:open')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  test('pointer drag changes translation at zoomed scale', async () => {
    const wrapper = mountPreview()
    try {
      wrapper.vm.zoomTo(2)
      const image = wrapper.get('[data-image-preview-image]')
      await image.trigger('pointerdown', pointer)
      await image.trigger('pointermove', { ...pointer, clientX: 100, clientY: 40 })
      expect(wrapper.vm.translateX).toBe(80)
      expect(wrapper.vm.translateY).toBe(20)
      await image.trigger('pointerup', { ...pointer, clientX: 100, clientY: 40 })
      expect(wrapper.vm.moving).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  test('image click stays open; overlay click requests closing', async () => {
    const wrapper = mountPreview()
    try {
      await wrapper.get('[data-image-preview-image]').trigger('click')
      expect(wrapper.emitted('update:open')).toBeUndefined()
      await wrapper.get('[data-image-preview-backdrop]').trigger('click')
      expect(wrapper.emitted('update:open')).toEqual([[false]])
    } finally {
      wrapper.unmount()
    }
  })
  test('long press is a notification without a collection index', async () => {
    const onLongPress = vi.fn()
    const wrapper = mountPreview({ onLongPress })
    try {
      const image = wrapper.get('[data-image-preview-image]')
      await image.trigger('pointerdown', pointer)
      await delay(520)
      await image.trigger('pointerup', pointer)
      expect(onLongPress).toHaveBeenCalledTimes(1)
      expect(onLongPress).toHaveBeenCalledWith()
    } finally {
      wrapper.unmount()
    }
  })
  test.each([2, 3, 0.5])('zoomTo(%s) obeys the scale bounds', async (scale) => {
    const wrapper = mountPreview()
    try {
      wrapper.vm.zoomTo(scale)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.scale).toBe(Math.max(0.5, scale))
      expect(wrapper.get('[data-image-preview-image]').attributes('style')).toContain(
        'scale(' + Math.max(0.5, scale) + ')',
      )
    } finally {
      wrapper.unmount()
    }
  })
})

describe('collection state belongs to ImagePreviewGroup', () => {
  test('renders current image and reacts to the images input', async () => {
    const wrapper = mount(ImagePreviewGroup, { props: { images, modelValue: 2, open: true, popupContainer: false } })
    try {
      expect(wrapper.findComponent(ImagePreview).props('src')).toBe(images[1])
      expect(wrapper.get('.mp-image-preview__indicator').text()).toBe('2 / 2')
      await wrapper.setProps({ images: [images[0]], modelValue: 1 })
      expect(wrapper.findComponent(ImagePreview).props('src')).toBe(images[0])
      expect(wrapper.find('.mp-image-preview__indicator').exists()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  test('to, prev and next update the group, not the single preview', async () => {
    const wrapper = mount(ImagePreviewGroup, { props: { images, open: true, popupContainer: false } })
    try {
      for (const [action, expected] of [
        [() => wrapper.vm.to(2), '2 / 2'],
        [() => wrapper.vm.prev(), '1 / 2'],
        [() => wrapper.vm.next(), '2 / 2'],
        [() => wrapper.vm.to(1), '1 / 2'],
      ]) {
        action()
        await wrapper.vm.$nextTick()
        expect(wrapper.get('.mp-image-preview__indicator').text()).toBe(expected)
      }
    } finally {
      wrapper.unmount()
    }
  })
})
