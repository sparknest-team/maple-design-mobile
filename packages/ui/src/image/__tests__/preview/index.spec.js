import { createApp } from 'vue'
import { expect, test, vi } from 'vitest'
import { delay, trigger } from '../../../utils/test'
import { ImagePreview, imagePreview } from '../../index'

test('image preview plugin', () => {
  const app = createApp({}).use(ImagePreview)
  expect(app.component(ImagePreview.name)).toBeTruthy()
})

test('image preview functional show & close', async () => {
  const onOpen = vi.fn()
  const onOpened = vi.fn()
  const onClose = vi.fn()
  const onClosed = vi.fn()

  imagePreview({
    onOpen,
    onOpened,
    onClose,
    onClosed,
  })

  await delay(200)
  expect(onOpen).toHaveBeenCalledTimes(1)
  await delay(300)
  expect(onOpened).toHaveBeenCalledTimes(1)
  expect(document.querySelector('.mp-image-preview').style.display).toBe('')

  imagePreview.close()

  await delay(20)
  expect(onClose).toHaveBeenCalledTimes(1)
  await delay(300)
  expect(onClosed).toHaveBeenCalledTimes(1)
  expect(document.querySelector('.mp-image-preview')).toBeFalsy()
})

test('image preview onChange callback', async () => {
  const onChange = vi.fn()

  imagePreview({
    images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
    onChange,
  })
  await delay(200)

  await trigger(document.querySelector('[data-image-preview-arrow-right]'), 'click')
  expect(onChange).toHaveBeenLastCalledWith(2, 1)

  await trigger(document.querySelector('[data-image-preview-arrow-left]'), 'click')
  expect(onChange).toHaveBeenLastCalledWith(1, 2)

  imagePreview.close()
  await delay(16)
})

test('image preview closable', async () => {
  imagePreview({
    src: 'https://maplejs.org/cat.jpg',
    closable: true,
  })
  await delay(200)
  const closeButton = document.querySelector('[data-image-preview-close]')
  expect(closeButton.tagName).toBe('BUTTON')
  expect(closeButton.getAttribute('aria-label')).toBeTruthy()
  await trigger(closeButton, 'click')
  await delay(300)
  expect(document.querySelector('.mp-image-preview')).toBeFalsy()
})

test('image preview setDefaultOptions and resetDefaultOptions', async () => {
  imagePreview.setDefaultOptions({ closable: true })
  await delay(16)
  imagePreview('https://maplejs.org/cat.jpg')
  await delay(200)
  await trigger(document.querySelector('[data-image-preview-close]'), 'click')
  await delay(300)
  expect(document.querySelector('.mp-image-preview')).toBeFalsy()

  imagePreview.resetDefaultOptions()
  await delay(16)
  imagePreview('https://maplejs.org/cat.jpg')
  await delay(200)
  expect(document.querySelector('[data-image-preview-close]')).toBeTruthy()
  imagePreview.close()
})

test('image preview imagePreventDefault', async () => {
  imagePreview({
    images: ['https://maplejs.org/cat.jpg'],
    imagePreventDefault: true,
  })

  await delay(200)
  expect(document.querySelector('[data-image-preview-image]')?.classList.contains('mp-image-preview--prevent')).toBe(
    true,
  )

  imagePreview.close()
})

test('image preview onLongPress callback', async () => {
  const onLongPress = vi.fn()

  imagePreview({
    images: ['https://maplejs.org/cat.jpg'],
    onLongPress,
  })

  await delay(200)
  const image = document.querySelector('[data-image-preview-image]')
  const pointer = (type) =>
    Object.assign(new MouseEvent(type, { bubbles: true, button: 0, clientX: 20, clientY: 20 }), {
      pointerId: 1,
      pointerType: 'touch',
    })
  image.dispatchEvent(pointer('pointerdown'))
  await delay(550)
  image.dispatchEvent(pointer('pointerup'))
  expect(onLongPress).toBeCalledTimes(1)
  expect(onLongPress).toHaveBeenCalledWith()

  imagePreview.close()
})

test('image preview current', async () => {
  imagePreview({
    images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
    modelValue: 2,
  })

  await delay(200)
  expect(document.querySelector('.mp-image-preview__indicator').textContent).toBe('2 / 2')

  imagePreview.close()
})
