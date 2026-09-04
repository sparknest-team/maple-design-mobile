import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { imagePreviewGroupProps } from '../groupProps'
import Image from '../Image.vue'
import ImagePreview from '../ImagePreview.vue'
import ImagePreviewGroup from '../ImagePreviewGroup.vue'
import { imagePreview, ImagePreviewAction, previewImage } from '../index'
import { imagePreviewProps } from '../previewProps'
import { props as imageProps } from '../props'
import { normalizePreviewOptions } from '../utils/previewUtils'

describe('image api contract', () => {
  it('exports the unified family API', () => {
    expect(imagePreview).toBe(previewImage)
    expect(ImagePreviewAction).toBeTruthy()
  })
  it('uses only canonical Image props', () => {
    for (const key of ['objectFit', 'objectPosition', 'fallbackSrc', 'previewDisabled', 'previewProps']) {
      expect(imageProps).toHaveProperty(key)
    }
    for (const key of ['fit', 'position', 'preview', 'loadingSrc', 'errorSrc', 'renderToBody']) {
      expect(imageProps).not.toHaveProperty(key)
    }
  })

  it('keeps collection state exclusively on ImagePreviewGroup', () => {
    for (const key of ['images', 'current', 'defaultCurrent', 'loop']) {
      expect(imagePreviewProps).not.toHaveProperty(key)
      expect(imagePreviewGroupProps).toHaveProperty(key)
    }
    expect(imagePreviewGroupProps).not.toHaveProperty('previewProps')
  })

  it('supports single-image transforms', async () => {
    const wrapper = mount(ImagePreview, { props: { src: 'a.jpg', defaultOpen: true, popupContainer: false } })
    wrapper.vm.zoomTo(2)
    wrapper.vm.rotateRight()
    expect([wrapper.vm.scale, wrapper.vm.rotate]).toEqual([2, 90])
    expect(wrapper.vm.mergedActions).not.toContain('prev')
    expect(wrapper.vm.mergedActions).not.toContain('next')
    wrapper.vm.close()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    wrapper.unmount()
  })

  it('closes the preview when the image is clicked by default', async () => {
    const wrapper = mount(ImagePreview, { props: { src: 'a.jpg', defaultOpen: true, popupContainer: false } })
    const image = wrapper.find('[data-image-preview-image]')
    await image.trigger('pointerdown', {
      button: 0,
      pointerId: 3,
      pointerType: 'mouse',
      clientX: 20,
      clientY: 20,
    })
    await image.trigger('pointerup', {
      button: 0,
      pointerId: 3,
      pointerType: 'mouse',
      clientX: 20,
      clientY: 20,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mergedOpen).toBe(false)
    wrapper.unmount()
  })

  it('lets ImagePreviewGroup own navigation', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ImagePreviewGroup, {
      props: { images: ['a.jpg', 'b.jpg'], defaultOpen: true, popupContainer: false },
    })
    expect(wrapper.findComponent(ImagePreview).props('src')).toBe('a.jpg')
    expect(wrapper.find('.mp-image-preview__indicators').element.parentElement).toBe(
      wrapper.find('[data-image-preview-overlay]').element,
    )
    expect(wrapper.find('.mp-image-preview__arrow--left').attributes('disabled')).toBeDefined()
    const nextArrow = wrapper.find('.mp-image-preview__arrow--right')
    await nextArrow.trigger('pointerdown', {
      button: 0,
      pointerId: 1,
      pointerType: 'touch',
      clientX: 0,
      clientY: 0,
    })
    await nextArrow.trigger('pointerup', {
      button: 0,
      pointerId: 1,
      pointerType: 'touch',
      clientX: 0,
      clientY: 0,
    })
    await nextArrow.trigger('click')
    await wrapper.vm.$nextTick()
    vi.advanceTimersByTime(321)
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ImagePreview).props('src')).toBe('b.jpg')
    expect(wrapper.findAll('.mp-image-preview__slide')).toHaveLength(2)
    expect(wrapper.find('.mp-image-preview__track').attributes('style')).toContain('calc(-100% + 0px)')
    expect(wrapper.vm.mergedOpen).toBe(true)
    expect(wrapper.findComponent(ImagePreview).vm.mergedOpen).toBe(true)
    expect(wrapper.emitted('change')?.at(-1)).toEqual([1, 0])

    const stage = wrapper.find('[data-image-preview-stage]')
    await stage.trigger('pointerdown', {
      button: 0,
      pointerId: 2,
      pointerType: 'touch',
      clientX: 100,
      clientY: 20,
    })
    await stage.trigger('pointermove', {
      button: 0,
      pointerId: 2,
      pointerType: 'touch',
      clientX: 164,
      clientY: 20,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ImagePreview).vm.translateX).toBe(64)
    expect(wrapper.findComponent(ImagePreview).vm.moving).toBe(true)
    expect(wrapper.find('.mp-image-preview__track').attributes('style')).toContain('calc(-100% + 64px)')
    await stage.trigger('pointerup', {
      button: 0,
      pointerId: 2,
      pointerType: 'touch',
      clientX: 164,
      clientY: 20,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ImagePreview).props('src')).toBe('a.jpg')
    expect(wrapper.find('.mp-image-preview__track').attributes('style')).toContain('calc(0% + 0px)')
    expect(wrapper.findComponent(ImagePreview).vm.translateX).toBe(0)
    expect(wrapper.findComponent(ImagePreview).vm.moving).toBe(false)
    expect(wrapper.emitted('change')?.at(-1)).toEqual([0, 1])
    wrapper.vm.zoomTo(2)
    expect(wrapper.findComponent(ImagePreview).vm.scale).toBe(2)
    wrapper.vm.rotateRight()
    expect(wrapper.findComponent(ImagePreview).vm.rotate).toBe(90)
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('recenters loop clones without an animated jump', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ImagePreviewGroup, {
      props: {
        images: ['a.jpg', 'b.jpg'],
        defaultCurrent: 1,
        defaultOpen: true,
        defaultScale: 1.25,
        loop: true,
        popupContainer: false,
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.mp-image-preview__slide')).toHaveLength(6)
    expect(
      wrapper.findAll('[data-image-preview-image]').every((image) => image.attributes('style').includes('scale(1.25)')),
    ).toBe(true)
    wrapper.vm.next()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.mp-image-preview__track').attributes('style')).toContain('calc(-400% + 0px)')
    await wrapper.find('.mp-image-preview__track').trigger('transitionend', { propertyName: 'transform' })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.mp-image-preview__track').attributes('style')).toContain('calc(-200% + 0px)')
    expect(wrapper.find('.mp-image-preview__track').classes()).toContain('mp-image-preview__track-instant')
    expect(
      wrapper.findAll('[data-image-preview-image]').every((image) => image.attributes('style').includes('scale(1.25)')),
    ).toBe(true)
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('opens embedded preview from Image', async () => {
    const wrapper = mount(Image, { props: { src: 'a.jpg', popupContainer: false } })
    await wrapper.find('img').trigger('load')
    await wrapper.find('img').trigger('click')
    expect(wrapper.emitted('update:previewOpen')?.at(-1)).toEqual([true])
    wrapper.unmount()
  })

  it('normalizes imperative inputs', () => {
    expect(normalizePreviewOptions('a.jpg')).toEqual({ images: ['a.jpg'] })
    expect(normalizePreviewOptions(['a.jpg', 'b.jpg'])).toEqual({ images: ['a.jpg', 'b.jpg'] })
  })
})
