import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import VarImagePreview from '../../image/ImagePreview.vue'
import { delay, mockImageNaturalSize, mockOffset, trigger, triggerDrag } from '../../utils/test'
import { previewImage } from '../index'

mockImageNaturalSize(1440, 1080)
mockOffset({ offsetWidth: 375, offsetHeight: 815 })

const doubleTouch = async (element) => {
  await trigger(element, 'touchstart')
  await trigger(element, 'touchend')
  await trigger(element, 'touchstart')
  await trigger(element, 'touchend')
}

const expectTap = async (element, wrapper) => {
  // tap touch
  await trigger(element, 'touchstart')
  await trigger(element, 'touchend')
  // tap delay wait double touch
  await delay(200)
  expect(element.element.style.transform).toBe('scale(1) translate(0px, 0px)')
  expect(element.element.style.transitionDuration).toBeFalsy()
  await delay(300)
  expect(wrapper.find('.mp-popup').isVisible()).toBe(false)
}

test('image preview component plugin', () => {
  const app = createApp({}).use(previewImage)
  expect(app.component(previewImage.Component.name)).toBeTruthy()
})

describe('test image preview component props', () => {
  test('image preview open', async () => {
    const onUpdateOpen = vi.fn((value) => wrapper.setProps({ open: value }))
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        'onUpdate:open': onUpdateOpen,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({
      open: true,
    })
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('image preview images', async () => {
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        images: ['https://maplejs.org/cat.jpg'],
        open: true,
      },
    })

    expect(wrapper.findAll('.mp-image-preview__zoom-container').length).toBe(1)

    await wrapper.setProps({
      images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
    })
    expect(wrapper.findAll('.mp-image-preview__zoom-container').length).toBe(2)

    wrapper.unmount()
  })

  test('image preview imagePreventDefault', async () => {
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        images: ['https://maplejs.org/cat.jpg'],
        imagePreventDefault: true,
        open: true,
      },
    })

    await delay(200)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mp-image-preview--prevent').isVisible()).toBe(true)

    wrapper.unmount()
  })

  test('image preview current', async () => {
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
        current: 1,
        open: true,
      },
    })

    await delay(200)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.mp-image-preview__indicators').text()).toBe('2 / 2')

    wrapper.unmount()
  })

  test('image preview closable', async () => {
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
        open: true,
      },
    })

    expect(wrapper.find('.mp-image-preview__close-icon').exists()).toBe(false)

    await wrapper.setProps({
      closable: true,
    })
    expect(wrapper.find('.mp-image-preview__close-icon').exists()).toBe(true)

    wrapper.unmount()
  })

  test('image preview zoom', async () => {
    const onUpdateOpen = vi.fn((value) => wrapper.setProps({ open: value }))
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        open: true,
        images: ['https://maplejs.org/cat.jpg'],
        'onUpdate:open': onUpdateOpen,
      },
    })

    const zoomContainer = wrapper.find('.mp-image-preview__zoom-container')

    await doubleTouch(zoomContainer)
    expect(zoomContainer.element.style.transform).toBe('scale(2) translate(0px, 0px)')
    await delay(250)
    expect(zoomContainer.element.style.transitionTimingFunction).toBe('linear')
    expect(zoomContainer.element.style.transitionDuration).toBe('0s')

    // double touch
    await doubleTouch(zoomContainer)
    expect(zoomContainer.element.style.transform).toBe('scale(1) translate(0px, 0px)')
    expect(zoomContainer.element.style.transitionDuration).toBeFalsy()

    // zoom in
    await doubleTouch(zoomContainer)
    await delay(250)
    await expectTap(zoomContainer, wrapper)
    wrapper.unmount()
  })

  test('image preview zoom move', async () => {
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        open: true,
        images: ['https://maplejs.org/cat.jpg'],
      },
    })

    const zoomContainer = wrapper.find('.mp-image-preview__zoom-container')

    // move to right limit
    await doubleTouch(zoomContainer)
    await triggerDrag(zoomContainer, -100, 0)
    await delay(220)
    expect(zoomContainer.element.style.transform).toBe('scale(2) translate(-93.75px, 0px)')

    // tap touch
    await trigger(zoomContainer, 'touchstart')
    await trigger(zoomContainer, 'touchend')
    await delay(220)
    expect(zoomContainer.element.style.transform).toBe('scale(1) translate(0px, 0px)')

    // move to left limit
    await doubleTouch(zoomContainer)
    await triggerDrag(zoomContainer, 100, 0)
    await delay(220)
    expect(zoomContainer.element.style.transform).toBe('scale(2) translate(93.75px, 0px)')

    wrapper.unmount()
  })
})

describe('test image preview component events', () => {
  test('image preview tap', async () => {
    const onUpdateOpen = vi.fn((value) => wrapper.setProps({ open: value }))
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        open: true,
        images: ['https://maplejs.org/cat.jpg'],
        'onUpdate:open': onUpdateOpen,
      },
    })

    const zoomContainer = wrapper.find('.mp-image-preview__zoom-container')
    await expectTap(zoomContainer, wrapper)

    wrapper.unmount()
  })

  test('image preview onLongPress', async () => {
    const onLongPress = vi.fn()
    const wrapper = mount(VarImagePreview, {
      props: {
        popupContainer: null,
        images: ['https://maplejs.org/cat.jpg'],
        onLongPress,
        open: true,
      },
    })

    const zoomContainer = wrapper.find('.mp-image-preview__zoom-container')
    await trigger(zoomContainer, 'touchstart')
    await delay(550)
    await trigger(zoomContainer, 'touchend')
    expect(onLongPress).toBeCalledTimes(1)
    expect(onLongPress).toHaveBeenCalledWith(0)

    wrapper.unmount()
  })
})

describe('test image preview component methods', () => {
  test('image preview next & prev & to method', async () => {
    const Wrapper = {
      components: {
        [VarImagePreview.name]: VarImagePreview,
      },
      template: `
        <mp-image-preview ref="imagePreviewRef">
        </mp-image-preview>
      `,
    }
    const wrapper = mount(Wrapper, {
      props: {
        popupContainer: null,
        images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
        open: true,
      },
    })

    await delay(50)
    const {
      imagePreviewRef: { prev, next, to },
    } = wrapper.vm.$refs

    to(1)
    await delay(100)
    expect(wrapper.find('.mp-image-preview__indicators').text()).toBe('2 / 2')

    prev()
    await delay(100)
    expect(wrapper.find('.mp-image-preview__indicators').text()).toBe('1 / 2')

    next()
    await delay(100)
    expect(wrapper.find('.mp-image-preview__indicators').text()).toBe('2 / 2')

    to(0)
    await delay(100)
    expect(wrapper.find('.mp-image-preview__indicators').text()).toBe('1 / 2')

    wrapper.unmount()
  })

  test('image preview zoom method', async () => {
    const Wrapper = {
      components: {
        [VarImagePreview.name]: VarImagePreview,
      },
      template: `
        <mp-image-preview ref="imagePreviewRef">
        </mp-image-preview>
      `,
    }
    const wrapper = mount(Wrapper, {
      props: {
        popupContainer: null,
        images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
        open: true,
      },
    })
    const zoomContainer = wrapper.find('.mp-image-preview__zoom-container')

    await delay(50)
    const {
      imagePreviewRef: { zoom },
    } = wrapper.vm.$refs

    zoom(2)
    await delay(100)
    expect(zoomContainer.element.style.transform).toBe('scale(2) translate(0px, 0px)')

    zoom(3)
    await delay(100)
    expect(zoomContainer.element.style.transform).toBe('scale(3) translate(0px, 0px)')

    zoom(0.5)
    await delay(100)
    expect(zoomContainer.element.style.transform).toBe('scale(1) translate(0px, 0px)')

    wrapper.unmount()
  })
})
