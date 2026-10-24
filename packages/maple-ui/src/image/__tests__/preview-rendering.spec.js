import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Group from '../ImagePreviewGroup.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
const flush = async () => {
  await nextTick()
  await nextTick()
}

test('omitted container teleports to body; explicit false remains inline', async () => {
  const owner = mount(Group, {
    props: { open: true, images: ['/first.png'] },
    global: { stubs: { teleport: false } },
  })
  owners.push(owner)
  await flush()
  const root = document.body.querySelector('.mp-image-preview')
  expect(document.body.contains(root)).toBe(true)
  expect(owner.element.contains(root)).toBe(false)
  expect(root?.style.position).toBe('fixed')
  await owner.setProps({ popupContainer: false })
  await flush()
  expect(owner.find('.mp-image-preview').exists()).toBe(true)
  expect(owner.find('.mp-image-preview').element.style.position).toBe('absolute')
})

test('group loading settles only for the active image and recognizes cached slides', async () => {
  const owner = mount(Group, {
    props: { open: true, popupContainer: false, images: ['/first.png', '/second.png'] },
  })
  owners.push(owner)
  await flush()
  const images = owner.findAll('[data-image-preview-image]')
  expect(owner.find('.mp-image-preview__loading').exists()).toBe(true)
  await images[1].trigger('load')
  expect(owner.find('.mp-image-preview__loading').exists()).toBe(true)
  await images[0].trigger('load')
  expect(owner.find('.mp-image-preview__loading').exists()).toBe(false)
  Object.defineProperty(images[1].element, 'complete', { configurable: true, value: true })
  await owner.setProps({ modelValue: 2 })
  await flush()
  expect(owner.find('.mp-image-preview__loading').exists()).toBe(false)
  Object.defineProperty(images[0].element, 'complete', { configurable: true, value: false })
  await owner.setProps({ modelValue: 1 })
  await flush()
  expect(owner.find('.mp-image-preview__loading').exists()).toBe(true)
  await images[0].trigger('error')
  expect(owner.find('.mp-image-preview__loading').exists()).toBe(false)
})
