import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Image, { ImagePreview, imagePreview, ImagePreviewAction, ImagePreviewGroup, previewImage } from '..'
import Overlay from '../../overlay'
import { createNamespace } from '../../utils/components'
import { imagePreviewGroupProps } from '../groupProps'
import { imagePreviewProps } from '../previewProps'
import { imageProps } from '../props'
import { normalizePreviewOptions } from '../utils/normalizePreviewOptions'

const { n } = createNamespace('image')
const preview = createNamespace('image-preview')

describe('Image same source', () => {
  it('exports the unified family API and setPropsDefaults', () => {
    expect(imagePreview).toBe(previewImage)
    expect(ImagePreviewAction).toBeTruthy()
    expect(typeof Image.setPropsDefaults).toBe('function')
    expect(typeof ImagePreview.setPropsDefaults).toBe('function')
    expect(typeof ImagePreviewGroup.setPropsDefaults).toBe('function')
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
    for (const key of ['images', 'modelValue', 'defaultValue', 'loop']) {
      expect(imagePreviewProps).not.toHaveProperty(key)
      expect(imagePreviewGroupProps).toHaveProperty(key)
    }
    expect(imagePreviewGroupProps).not.toHaveProperty('previewProps')
    expect(imagePreviewProps).not.toHaveProperty('maskClosable')
    expect(imagePreviewProps).toHaveProperty('overlayClosable')
  })

  it('supports single-image transforms', async () => {
    const wrapper = mount(ImagePreview, {
      props: { src: 'a.jpg', defaultOpen: true, popupContainer: false },
    })
    expect(wrapper.findComponent(Overlay).props()).toMatchObject({
      overlayClosable: true,
      unmountOnClose: false,
    })
    wrapper.vm.zoomTo(2)
    wrapper.vm.rotateRight()
    expect([wrapper.vm.scale, wrapper.vm.rotate]).toEqual([2, 90])
    expect(wrapper.vm.mergedActions).not.toContain('prev')
    expect(wrapper.vm.mergedActions).not.toContain('next')
    await wrapper.find('[data-image-preview-close]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    wrapper.unmount()
  })

  it('keeps the preview open on image click and closes outside the image', async () => {
    const wrapper = mount(ImagePreview, {
      props: { src: 'a.jpg', defaultOpen: true, popupContainer: false, imagePreventDefault: true },
    })
    const image = wrapper.find('[data-image-preview-image]')
    const stage = wrapper.find('[data-image-preview-stage]')
    await image.trigger('pointerdown', { button: 0, pointerId: 1, pointerType: 'mouse', clientX: 20, clientY: 20 })
    await image.trigger('pointerup', { button: 0, pointerId: 1, pointerType: 'mouse', clientX: 20, clientY: 20 })
    await stage.trigger('click')
    expect(wrapper.vm.mergedOpen).toBe(true)
    await stage.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mergedOpen).toBe(false)
    wrapper.unmount()
  })

  it('honors Image previewProps.overlayClosable', async () => {
    const closableWrapper = mount(Image, {
      props: {
        src: 'a.jpg',
        defaultOpen: true,
        previewProps: { overlayClosable: true },
        popupContainer: false,
      },
    })
    await closableWrapper.find('[data-image-preview-image]').trigger('click')
    await closableWrapper.vm.$nextTick()
    expect(closableWrapper.emitted('update:open')).toBeUndefined()
    expect(closableWrapper.findComponent(ImagePreview).vm.mergedOpen).toBe(true)
    await closableWrapper.find('[data-image-preview-container]').trigger('click')
    await closableWrapper.vm.$nextTick()
    expect(closableWrapper.emitted('update:open')?.at(-1)).toEqual([false])
    closableWrapper.unmount()

    const persistentWrapper = mount(Image, {
      props: {
        src: 'a.jpg',
        defaultOpen: true,
        previewProps: { overlayClosable: false },
        popupContainer: false,
      },
    })
    await persistentWrapper.find('[data-image-preview-container]').trigger('click')
    await persistentWrapper.vm.$nextTick()
    expect(persistentWrapper.findComponent(Overlay).props('overlayClosable')).toBe(false)
    expect(persistentWrapper.emitted('update:open')).toBeUndefined()
    expect(persistentWrapper.findComponent(ImagePreview).vm.mergedOpen).toBe(true)
    persistentWrapper.unmount()
  })

  it('delegates Escape closing to Overlay exactly once', async () => {
    const wrapper = mount(ImagePreview, {
      props: { src: 'a.jpg', defaultOpen: true, popupContainer: false },
    })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('key-escape')?.length).toBeGreaterThan(0)
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    wrapper.unmount()
  })

  it('closes a group only when clicking outside its images', async () => {
    const wrapper = mount(ImagePreviewGroup, {
      props: { images: ['a.jpg', 'b.jpg'], defaultOpen: true, popupContainer: false, imagePreventDefault: true },
    })
    await wrapper.find('[data-image-preview-image]').trigger('click')
    expect(wrapper.vm.mergedOpen).toBe(true)
    await wrapper.find('[data-image-preview-container]').trigger('click')
    expect(wrapper.vm.mergedOpen).toBe(false)
    wrapper.unmount()
  })

  it('lets ImagePreviewGroup own navigation', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ImagePreviewGroup, {
      props: { images: ['a.jpg', 'b.jpg'], defaultOpen: true, popupContainer: false },
    })
    expect(wrapper.findComponent(ImagePreview).props('src')).toBe('a.jpg')
    expect(wrapper.find('[data-image-preview-arrow-left]').attributes('disabled')).toBeDefined()
    const nextArrow = wrapper.find('[data-image-preview-arrow-right]')
    await nextArrow.trigger('pointerdown', { button: 0, pointerId: 1, pointerType: 'touch', clientX: 0, clientY: 0 })
    await nextArrow.trigger('pointerup', { button: 0, pointerId: 1, pointerType: 'touch', clientX: 0, clientY: 0 })
    await nextArrow.trigger('click')
    await wrapper.vm.$nextTick()
    vi.advanceTimersByTime(321)
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ImagePreview).props('src')).toBe('b.jpg')
    expect(wrapper.findAll('[data-image-preview-slide]')).toHaveLength(2)
    expect(wrapper.find('[data-image-preview-track]').attributes('style')).toContain('calc(-100% + 0px)')
    expect(wrapper.emitted('change')?.at(-1)).toEqual([2, 1])

    const stage = wrapper.find('[data-image-preview-stage]')
    await stage.trigger('pointerdown', { button: 0, pointerId: 2, pointerType: 'touch', clientX: 100, clientY: 20 })
    await stage.trigger('pointermove', { button: 0, pointerId: 2, pointerType: 'touch', clientX: 164, clientY: 20 })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ImagePreview).vm.translateX).toBe(64)
    expect(wrapper.find('[data-image-preview-track]').attributes('style')).toContain('calc(-100% + 64px)')
    await stage.trigger('pointerup', { button: 0, pointerId: 2, pointerType: 'touch', clientX: 164, clientY: 20 })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ImagePreview).props('src')).toBe('a.jpg')
    expect(wrapper.emitted('change')?.at(-1)).toEqual([1, 2])
    wrapper.vm.zoomTo(2)
    expect(wrapper.findComponent(ImagePreview).vm.scale).toBe(2)
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('recenters loop clones without an animated jump', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ImagePreviewGroup, {
      props: {
        images: ['a.jpg', 'b.jpg'],
        defaultValue: 2,
        defaultOpen: true,
        loop: true,
        defaultScale: 1.25,
        popupContainer: false,
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('[data-image-preview-slide]')).toHaveLength(6)
    wrapper.vm.next()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-image-preview-track]').attributes('style')).toContain('calc(-400% + 0px)')
    await wrapper.find('[data-image-preview-track]').trigger('transitionend', { propertyName: 'transform' })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-image-preview-track]').attributes('style')).toContain('calc(-200% + 0px)')
    expect(wrapper.find('[data-image-preview-track]').classes()).toContain(preview.n('track-instant'))
    wrapper.unmount()
    vi.useRealTimers()
  })

  it('opens embedded preview from Image', async () => {
    const wrapper = mount(Image, { props: { src: 'a.jpg', popupContainer: false } })
    await wrapper.find('img').trigger('load')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.vm.mergePreview).toBe(true)
    await wrapper.find('img').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([true])
    await wrapper.find('[data-image-preview-close]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    wrapper.unmount()
  })

  it('uses native lazy loading', () => {
    const wrapper = mount(Image, { props: { src: 'a.jpg', lazy: true, previewDisabled: true } })
    expect(wrapper.find('img').attributes('loading')).toBe('lazy')
    expect(wrapper.find('img').attributes('src')).toContain('a.jpg')
    wrapper.unmount()
  })

  it('renders footer BEM and error overlay', async () => {
    const wrapper = mount(Image, {
      props: { src: 'a.jpg', title: 'Title', description: 'Desc' },
      slots: { extra: () => 'extra' },
    })
    await wrapper.find('img').trigger('load')
    expect(wrapper.classes()).toContain(n('--with-footer-inner'))
    expect(wrapper.find('.' + n('footer')).exists()).toBe(true)
    wrapper.unmount()
  })

  it('normalizes imperative inputs', () => {
    expect(normalizePreviewOptions('a.jpg')).toEqual(expect.objectContaining({ images: ['a.jpg'] }))
    expect(normalizePreviewOptions(['a.jpg', 'b.jpg'])).toEqual(expect.objectContaining({ images: ['a.jpg', 'b.jpg'] }))
  })
})
