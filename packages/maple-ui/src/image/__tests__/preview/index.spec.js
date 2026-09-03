import { createApp } from 'vue'
import { expect, test, vi } from 'vitest'
import { delay, trigger, triggerDrag } from '../../../utils/test'
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
  expect(document.querySelector('.mp-popup').style.display).toBe('')

  imagePreview.close()

  await delay(20)
  expect(onClose).toHaveBeenCalledTimes(1)
  await delay(300)
  expect(onClosed).toHaveBeenCalledTimes(1)
  expect(document.querySelector('.mp-popup')).toBeFalsy()
})

test('image preview onChange callback', async () => {
  const onChange = vi.fn()

  imagePreview({
    images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
    onChange,
  })
  await delay(200)

  const track = document.querySelector('.mp-carousel__track')
  await triggerDrag(track, -100, 0)
  expect(onChange).toHaveBeenLastCalledWith(1)

  await triggerDrag(track, 100, 0)
  expect(onChange).toHaveBeenLastCalledWith(0)

  imagePreview.close()
  await delay(16)
})

test('image preview closable', async () => {
  imagePreview({
    closable: true,
  })
  await delay(200)
  await trigger(document.querySelector('.mp-image-preview__close-icon'), 'click')
  await delay(300)
  expect(document.querySelector('.mp-popup')).toBeFalsy()
})

test('image preview setDefaultOptions and resetDefaultOptions', async () => {
  imagePreview.setDefaultOptions({ closable: true })
  await delay(16)
  imagePreview('https://maplejs.org/cat.jpg')
  await delay(200)
  await trigger(document.querySelector('.mp-image-preview__close-icon'), 'click')
  await delay(300)
  expect(document.querySelector('.mp-popup')).toBeFalsy()

  imagePreview.resetDefaultOptions()
  await delay(16)
  imagePreview('https://maplejs.org/cat.jpg')
  await delay(200)
  expect(document.querySelector('.mp-image-preview__close-icon')).toBeTruthy()
  imagePreview.close()
})

test('image preview imagePreventDefault', async () => {
  imagePreview({
    images: ['https://maplejs.org/cat.jpg'],
    imagePreventDefault: true,
  })

  await delay(200)
  expect(document.querySelector('.mp-image-preview--prevent')).toBeTruthy()

  imagePreview.close()
})

test('image preview onLongPress callback', async () => {
  const onLongPress = vi.fn()

  imagePreview({
    images: ['https://maplejs.org/cat.jpg'],
    onLongPress,
  })

  await delay(200)
  await trigger(document.querySelector('.mp-image-preview__zoom-container'), 'touchstart')
  await delay(550)
  await trigger(document.querySelector('.mp-image-preview__zoom-container'), 'touchend')
  expect(onLongPress).toBeCalledTimes(1)
  expect(onLongPress).toHaveBeenCalledWith(0)

  imagePreview.close()
})

test('image preview current', async () => {
  imagePreview({
    images: ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg'],
    current: 1,
  })

  await delay(200)
  expect(document.querySelector('.mp-image-preview__indicators').textContent).toBe('2 / 2')

  imagePreview.close()
})
