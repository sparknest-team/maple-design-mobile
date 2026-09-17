import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Image from '..'
import { delay, trigger } from '../../utils/test'
import VarImage from '../Image'
import ImagePreview from '../ImagePreview.vue'

const SRC = 'https://maplejs.org/cat.png'

test('image plugin', () => {
  const app = createApp({}).use(Image)
  expect(app.component(Image.name)).toBeTruthy()
})

describe('test image component event', () => {
  test('image onLoad & onError', () => {
    const onLoad = vi.fn()
    const onError = vi.fn()
    const wrapper = mount(VarImage, {
      props: {
        onLoad,
        onError,
      },
    })
    const img = wrapper.find('img')

    img.trigger('load')
    img.trigger('error')
    expect(onLoad).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  test('image onLoad & onError in lazy mode', () => {
    const onLoad = vi.fn()
    const onError = vi.fn()
    const wrapper = mount(VarImage, {
      props: {
        lazy: true,
        onLoad,
        onError,
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('lazy')
    img.trigger('load')
    expect(onLoad).toHaveBeenCalledTimes(1)
    img.trigger('error')
    expect(onError).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })

  test('image onLoad & onError null callback', async () => {
    const onLoad = vi.fn()
    const onError = vi.fn()

    const wrapper = mount(VarImage)
    const img = wrapper.find('img')
    await img.trigger('load')
    expect(onLoad).toHaveBeenCalledTimes(0)

    await wrapper.setProps({ lazy: true })

    const lazyImage = wrapper.find('img')
    await lazyImage.trigger('load')
    expect(onLoad).toHaveBeenCalledTimes(0)
    await lazyImage.trigger('error')
    expect(onError).toHaveBeenCalledTimes(0)
    wrapper.unmount()
  })

  test('image onClick', () => {
    function expectOnClick(props = {}) {
      const onClick = vi.fn()
      const wrapper = mount(VarImage, {
        props: {
          onClick,
          ...props,
        },
      })

      wrapper.find('.mp-image__image').trigger('click')
      expect(onClick).toHaveBeenCalledTimes(1)
      wrapper.unmount()
    }

    expectOnClick()
    expectOnClick({ lazy: true })
  })
})

describe('test image component props', () => {
  test('image default preview open', async () => {
    const wrapper = mount(VarImage, {
      props: { src: SRC, defaultPreviewOpen: true },
    })

    await wrapper.find('img').trigger('load')
    expect(wrapper.findComponent(ImagePreview).props('open')).toBe(true)
    wrapper.unmount()
  })

  test('image src', () => {
    const wrapper = mount(VarImage, {
      props: {
        src: SRC,
      },
    })

    expect(wrapper.find('img').element.src).toEqual(SRC)
    wrapper.unmount()
  })

  test('image objectFit', () => {
    ;['fill', 'contain', 'cover', 'none', 'scale-down'].forEach((fit) => {
      const wrapper = mount(VarImage, {
        props: { objectFit: fit },
      })

      expect(wrapper.find('.mp-image__image').attributes('style')).toContain(`object-fit: ${fit};`)
      wrapper.unmount()
    })
  })

  test('image alt', () => {
    const wrapper = mount(VarImage, {
      props: {
        alt: 'This is alt',
      },
    })

    expect(wrapper.find('.mp-image__image').attributes('alt')).toContain('This is alt')
    wrapper.unmount()
  })

  test('image description falls back to alt', () => {
    const wrapper = mount(VarImage, {
      props: { description: 'Image description' },
    })

    expect(wrapper.find('img').attributes('alt')).toBe('Image description')
    wrapper.unmount()
  })

  test('image loader and custom loader slot', () => {
    const wrapper = mount(VarImage, {
      props: { showLoader: true },
    })
    expect(wrapper.find('.mp-image__loader').exists()).toBe(true)
    wrapper.unmount()

    const customWrapper = mount(VarImage, {
      slots: { loader: '<span class="custom-loader">Loading</span>' },
    })
    expect(customWrapper.find('.custom-loader').exists()).toBe(true)
    customWrapper.unmount()
  })

  test('image default and custom error state', async () => {
    const wrapper = mount(VarImage, {
      props: { description: 'Load failed' },
    })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('.mp-image__error').exists()).toBe(true)
    expect(wrapper.find('.mp-image__error-alt').text()).toBe('Load failed')
    wrapper.unmount()

    const customWrapper = mount(VarImage, {
      slots: { error: '<span class="custom-error">Error</span>' },
    })
    await customWrapper.find('img').trigger('error')
    expect(customWrapper.find('.custom-error').exists()).toBe(true)
    customWrapper.unmount()
  })

  test('image inner and outer footer', async () => {
    const wrapper = mount(VarImage, {
      props: { title: 'Title', description: 'Description', footerClass: 'custom-footer' },
      slots: { extra: '<button class="footer-extra">Action</button>' },
    })
    await wrapper.find('img').trigger('load')
    expect(wrapper.classes()).toContain('mp-image--with-footer-inner')
    expect(wrapper.find('.mp-image__content > .mp-image__footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
    expect(wrapper.find('.footer-extra').exists()).toBe(true)

    await wrapper.setProps({ footerPosition: 'outer' })
    expect(wrapper.classes()).toContain('mp-image--with-footer-outer')
    expect(wrapper.find('.mp-image > .mp-image__footer').exists()).toBe(true)
    wrapper.unmount()
  })

  test('image footer visibility', async () => {
    const hidden = mount(VarImage, { props: { title: 'Title', hideFooter: true } })
    await hidden.find('img').trigger('load')
    expect(hidden.find('.mp-image__footer').exists()).toBe(false)
    hidden.unmount()

    const neverHidden = mount(VarImage, { props: { title: 'Title', hideFooter: 'never' } })
    await neverHidden.find('img').trigger('error')
    expect(neverHidden.find('.mp-image__footer').exists()).toBe(true)
    neverHidden.unmount()
  })

  test('image forwards preview-actions', async () => {
    const wrapper = mount(VarImage, {
      props: { src: SRC },
      slots: { 'preview-actions': '<button class="preview-action">Action</button>' },
    })
    await wrapper.find('img').trigger('load')
    const preview = wrapper.findComponent(ImagePreview)
    expect(preview.vm.$slots.actions).toBeTruthy()
    expect(preview.vm.$slots.extra).toBeUndefined()
    wrapper.unmount()
  })

  test('image forwards popupContainer and emits canonical preview event', async () => {
    const wrapper = mount(VarImage, {
      props: { src: SRC, popupContainer: false },
    })
    await wrapper.find('img').trigger('load')
    await wrapper.find('img').trigger('click')

    expect(wrapper.findComponent(ImagePreview).props('popupContainer')).toBe(false)
    expect(wrapper.emitted('preview-open-change')?.[0]).toEqual([true])
    wrapper.unmount()
  })

  test('image title', () => {
    const wrapper = mount(VarImage, {
      props: {
        title: 'This is title',
      },
    })

    expect(wrapper.find('.mp-image__image').attributes('title')).toContain('This is title')
    wrapper.unmount()
  })

  test('image referrerPolicy', () => {
    const wrapper = mount(VarImage, {
      props: {
        imgProps: { referrerPolicy: 'no-referrer' },
      },
    })

    expect(wrapper.find('.mp-image__image').attributes('referrerpolicy')).toContain('no-referrer')
    wrapper.unmount()
  })

  test('image objectPosition', async () => {
    const wrapper = mount(VarImage)

    expect(wrapper.find('.mp-image__image').attributes('style')).toContain('object-position: 50% 50%')

    await wrapper.setProps({
      objectPosition: 'left',
    })
    expect(wrapper.find('.mp-image__image').attributes('style')).toContain('object-position: left')

    wrapper.unmount()
  })

  test('image width', async () => {
    const wrapper = mount(VarImage, {
      props: {
        width: '20px',
      },
    })

    expect(wrapper.find('.mp-image').attributes('style')).toContain('width: 20px;')
    await wrapper.setProps({ width: 30 })
    expect(wrapper.find('.mp-image').attributes('style')).toContain('width: 30px;')
    wrapper.unmount()
  })

  test('image height', async () => {
    const wrapper = mount(VarImage, {
      props: {
        height: '20px',
      },
    })

    expect(wrapper.find('.mp-image').attributes('style')).toContain('height: 20px;')
    await wrapper.setProps({ height: 30 })
    expect(wrapper.find('.mp-image').attributes('style')).toContain('height: 30px;')
    wrapper.unmount()
  })

  test('image radius', async () => {
    const wrapper = mount(VarImage, {
      props: {
        radius: '20px',
      },
    })

    expect(wrapper.find('.mp-image').attributes('style')).toContain('radius: 20px;')
    await wrapper.setProps({ radius: 30 })
    expect(wrapper.find('.mp-image').attributes('style')).toContain('radius: 30px;')
    wrapper.unmount()
  })

  test('image lazy', async () => {
    const wrapper = mount(VarImage, {
      props: {
        lazy: false,
        src: SRC,
      },
    })

    expect(wrapper.find('.mp-image__image').attributes('src')).toContain(SRC)
    await wrapper.setProps({ lazy: true })
    expect(wrapper.find('.mp-image__image').attributes('loading')).toBe('lazy')
    expect(wrapper.find('.mp-image__image').attributes('src')).toContain(SRC)
    wrapper.unmount()
  })

  test('image loading indicator', () => {
    const wrapper = mount(VarImage, {
      props: {
        lazy: true,
        showLoader: true,
      },
    })

    expect(wrapper.find('.mp-image__loader').exists()).toBe(true)
    wrapper.unmount()
  })

  test('image error fallback', async () => {
    const onError = vi.fn()
    const wrapper = mount(VarImage, {
      props: {
        src: 'invalid-image.jpg',
        fallbackSrc: SRC,
        onError,
      },
    })

    await wrapper.find('img').trigger('error')
    expect(wrapper.find('.mp-image__image').attributes('src')).toContain(SRC)
    expect(wrapper.vm.isLoading).toBe(true)
    expect(onError).toHaveBeenCalledTimes(1)

    await wrapper.find('img').trigger('load')
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.find('.mp-image__image').attributes('src')).toContain(SRC)

    await wrapper.setProps({ alt: 'fallback loaded' })
    expect(wrapper.find('.mp-image__image').attributes('src')).toContain(SRC)
    expect(onError).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  test('image ripple', async () => {
    const wrapper = mount(VarImage, {
      props: {
        ripple: true,
        src: SRC,
      },
    })

    await trigger(wrapper, 'touchstart')
    await delay(250)
    expect(wrapper.find('.mp-ripple').exists()).toBe(true)

    await trigger(document, 'touchend')
    await delay(500)
    expect(wrapper.find('.mp-ripple').exists()).toBe(false)

    await wrapper.setProps({ ripple: false })
    await trigger(wrapper, 'touchstart')
    await delay(250)
    expect(wrapper.find('.mp-ripple').exists()).toBe(false)

    wrapper.unmount()
  })

  test('image block', async () => {
    const wrapper = mount(VarImage, {
      props: {
        block: true,
      },
    })

    expect(wrapper.find('.mp-image--inline').exists()).toBe(false)
    await wrapper.setProps({ block: false })
    expect(wrapper.find('.mp-image--inline').exists()).toBe(true)
    wrapper.unmount()
  })
})
