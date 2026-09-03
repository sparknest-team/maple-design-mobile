import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { imagePreviewGroupProps } from '../groupProps'
import Image from '../Image.vue'
import ImagePreview from '../ImagePreview.vue'
import ImagePreviewGroup from '../ImagePreviewGroup.vue'
import ImagePlugin, {
  ImagePreview as ExportedImagePreview,
  imagePreview,
  Image as NamedImage,
  ImagePreviewGroup as NamedImagePreviewGroup,
} from '../index'
import { imagePlatformConfig } from '../platform.config'
import { props as imagePreviewProps } from '../previewProps'
import { props as imageProps } from '../props'
import { normalizePreviewOptions } from '../utils/previewUtils'

describe('image api contract', () => {
  it('aligns the image entry exports', () => {
    expect(NamedImage).toBe(ImagePlugin)
    expect(ExportedImagePreview).toBe(ImagePreview)
    expect(NamedImagePreviewGroup).toBe(ImagePreviewGroup)
    expect(ImagePlugin.Preview).toBe(ImagePreview)
    expect(ImagePlugin.PreviewGroup).toBe(ImagePreviewGroup)
    expect(ImagePlugin.preview).toBe(imagePreview)
    expect(typeof ExportedImagePreview.install).toBe('function')
    expect(imagePreview.install).toBeUndefined()
    expect(imagePreview.Component).toBeUndefined()
    expect(imagePreview.Group).toBeUndefined()
  })

  it('registers preview components through Image.install', () => {
    expect(typeof ImagePlugin.install).toBe('function')
    expect(ImagePlugin.Preview).toBe(ExportedImagePreview)
    expect(ImagePlugin.PreviewGroup).toBe(NamedImagePreviewGroup)
  })

  it('returns the common imperative preview handle', async () => {
    const onUpdateOpen = vi.fn()
    const onUpdateCurrent = vi.fn()
    const handle = imagePreview({
      images: ['a.jpg', 'b.jpg'],
      current: 0,
      popupContainer: false,
      'onUpdate:open': onUpdateOpen,
      'onUpdate:current': onUpdateCurrent,
    })
    expect(handle).toEqual(
      expect.objectContaining({
        close: expect.any(Function),
        prev: expect.any(Function),
        next: expect.any(Function),
        to: expect.any(Function),
        zoom: expect.any(Function),
      }),
    )
    handle.to(1)
    await Promise.resolve()
    expect(onUpdateCurrent).toHaveBeenCalledWith(1)
    handle.close()
    await Promise.resolve()
    expect(onUpdateOpen).toHaveBeenCalledWith(false)
  })

  it('preview defaults to true on Image', () => {
    expect(imageProps.preview.default).toBe(true)
  })

  it('keeps previewOpen uncontrolled when omitted', () => {
    expect(imageProps.previewOpen.default).toBeUndefined()
  })

  it('emits the previewOpen model update in uncontrolled mode', async () => {
    const wrapper = mount(Image, { props: { src: 'a.jpg', popupContainer: false } })
    await wrapper.find('img').trigger('load')
    await wrapper.find('img').trigger('click')
    expect(wrapper.emitted('update:previewOpen')?.at(-1)).toEqual([true])
    wrapper.unmount()
  })

  it('uses canonical Image prop names', () => {
    expect(imageProps).toHaveProperty('popupContainer')
    expect(imageProps).toHaveProperty('loadingSrc')
    expect(imageProps).toHaveProperty('errorSrc')
    expect(imageProps).toHaveProperty('referrerPolicy')
    expect(imageProps).not.toHaveProperty('renderToBody')
    expect(imageProps).not.toHaveProperty('loading')
    expect(imageProps).not.toHaveProperty('error')
    expect(imageProps).not.toHaveProperty('referrerpolicy')
  })

  it('aligns ImagePreview controlled and uncontrolled props', () => {
    expect(imagePreviewProps.open.default).toBeUndefined()
    expect(imagePreviewProps.defaultOpen.default).toBe(false)
    expect(imagePreviewProps.closable.default).toBeUndefined()
    expect(imagePreviewProps.maskClosable.default).toBeUndefined()
    expect(imagePreviewProps.current.default).toBeUndefined()
    expect(imagePreviewProps.defaultCurrent.default).toBe(0)
    expect(ImagePreview.emits).toEqual(
      expect.arrayContaining(['open', 'opened', 'close', 'closed', 'keyEscape', 'longPress']),
    )
    expect(ImagePreview.emits).not.toContain('long-press')
  })

  it('supports ImagePreview uncontrolled current and canonical change events', async () => {
    const wrapper = mount(ImagePreview, {
      props: {
        images: ['a.jpg', 'b.jpg'],
        defaultCurrent: 1,
        defaultOpen: true,
        popupContainer: false,
      },
    })
    expect(wrapper.vm.mergedCurrent).toBe(1)

    wrapper.vm.onChange(0)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.mergedCurrent).toBe(0)
    expect(wrapper.emitted('update:current')?.[0]).toEqual([0])
    expect(wrapper.emitted('change')?.[0]).toEqual([0])
    wrapper.unmount()
  })

  it('supports ImagePreview defaultOpen and canonical openChange event', async () => {
    const wrapper = mount(ImagePreview, {
      props: { defaultOpen: true, popupContainer: false },
    })
    expect(wrapper.vm.mergedOpen).toBe(true)

    wrapper.vm.mergedOpen = false
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('openChange')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('keeps preview actions distinct from extra content', async () => {
    const preview = mount(ImagePreview, {
      props: { src: 'a.jpg', defaultOpen: true, popupContainer: false },
      slots: {
        actions: '<span class="preview-actions" />',
        extra: '<span class="preview-extra" />',
      },
    })
    expect(preview.find('.mp-image-preview__actions .preview-actions').exists()).toBe(true)
    expect(preview.find('.mp-image-preview__extra .preview-extra').exists()).toBe(true)
    preview.unmount()

    const image = mount(Image, {
      props: { src: 'a.jpg', popupContainer: false },
      slots: { 'preview-actions': '<span class="image-preview-actions" />' },
    })
    await image.find('img').trigger('load')
    await image.find('img').trigger('click')
    expect(image.find('.mp-image-preview__actions .image-preview-actions').exists()).toBe(true)
    expect(image.find('.mp-image-preview__extra .image-preview-actions').exists()).toBe(false)
    image.unmount()
  })

  it('normalizes string preview options', () => {
    expect(normalizePreviewOptions('a.jpg')).toEqual({
      images: ['a.jpg'],
    })
  })

  it('normalizes array preview options', () => {
    expect(normalizePreviewOptions(['a.jpg', 'b.jpg'])).toEqual({
      images: ['a.jpg', 'b.jpg'],
    })
  })

  it('normalizes object preview options with src', () => {
    expect(normalizePreviewOptions({ src: 'a.jpg', current: 1 })).toEqual({
      src: 'a.jpg',
      current: 1,
      images: ['a.jpg'],
    })
  })

  it('uses maple mobile platform defaults', () => {
    expect(imagePlatformConfig.defaultPreview).toBe(true)
    expect(imagePlatformConfig.defaultClosable).toBe(true)
    expect(imagePlatformConfig.defaultMaskClosable).toBe(true)
    expect(imagePlatformConfig.defaultLoop).toBe(false)
  })

  it('aligns ImagePreviewGroup props, defaults, and events', async () => {
    expect(imagePreviewGroupProps.loop.default).toBeUndefined()
    expect(imagePreviewGroupProps.closable.default).toBeUndefined()
    expect(imagePreviewGroupProps.maskClosable.default).toBeUndefined()
    expect(imagePreviewGroupProps).toHaveProperty('previewProps')
    expect(imagePreviewGroupProps).toHaveProperty('escToClose')

    const wrapper = mount(ImagePreviewGroup, {
      props: {
        images: ['a.jpg', 'b.jpg'],
        defaultOpen: true,
        popupContainer: false,
        previewProps: { escToClose: false },
      },
      slots: {
        actions: ({ url }) => h('span', { class: 'group-action-url' }, url),
      },
    })
    const preview = wrapper.findComponent(ImagePreview)
    expect(preview.props('loop')).toBe(false)
    expect(preview.props('closable')).toBe(true)
    expect(preview.props('maskClosable')).toBe(true)
    expect(preview.props('escToClose')).toBe(false)
    expect(wrapper.find('.group-action-url').text()).toBe('a.jpg')

    wrapper.vm.next()
    expect(wrapper.emitted('change')?.at(-1)).toEqual([1])
    wrapper.vm.close()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('openChange')?.[0]).toEqual([false])
    wrapper.vm.open(0)
    expect(wrapper.emitted('openChange')?.at(-1)).toEqual([true])
    expect(wrapper.emitted()).not.toHaveProperty('open-change')
    wrapper.unmount()
  })
})
