import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ImagePreview, ImagePreviewGroup } from '..'

const settle = async () => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 30))
  await nextTick()
}
describe('image preview reading direction', () => {
  it('uses semantic navigation keys after a runtime direction switch without changing image transforms', async () => {
    const host = document.createElement('div')
    host.dir = 'rtl'
    document.body.append(host)
    const wrapper = mount(ImagePreview, {
      attachTo: host,
      props: { defaultOpen: true, popupContainer: false, keyboard: true, src: 'a.jpg' },
    })
    try {
      await settle()
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
      expect(wrapper.emitted('next')).toHaveLength(1)
      wrapper.vm.zoomTo(2)
      wrapper.vm.rotateRight()
      host.dir = 'ltr'
      await settle()
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
      expect(wrapper.emitted('next')).toHaveLength(2)
      expect(wrapper.vm.scale).toBe(2)
      expect(wrapper.vm.rotate).toBe(90)
      expect(wrapper.emitted('update:open')).toBeUndefined()
    } finally {
      wrapper.unmount()
      host.remove()
    }
  })
  it('aligns the collection track and maps an RTL swipe to the next image', async () => {
    const host = document.createElement('div')
    host.dir = 'rtl'
    document.body.append(host)
    const wrapper = mount(ImagePreviewGroup, {
      attachTo: host,
      props: { images: ['a.jpg', 'b.jpg', 'c.jpg'], defaultValue: 2, defaultOpen: true, popupContainer: false },
    })
    try {
      await settle()
      expect(wrapper.get('[data-image-preview-track]').attributes('style')).toContain('calc(100% + 0px)')
      const stage = wrapper.get('[data-image-preview-stage]')
      await stage.trigger('pointerdown', { button: 0, pointerId: 1, pointerType: 'touch', clientX: 100, clientY: 20 })
      await stage.trigger('pointermove', { button: 0, pointerId: 1, pointerType: 'touch', clientX: 165, clientY: 20 })
      await stage.trigger('pointerup', { button: 0, pointerId: 1, pointerType: 'touch', clientX: 165, clientY: 20 })
      await settle()
      expect(wrapper.findComponent(ImagePreview).props('src')).toBe('c.jpg')
      expect(wrapper.emitted('change')?.at(-1)).toEqual([3, 2])
      host.dir = 'ltr'
      await settle()
      expect(wrapper.get('[data-image-preview-track]').attributes('style')).toContain('calc(-200% + 0px)')
      expect(wrapper.emitted('change')).toHaveLength(1)
    } finally {
      wrapper.unmount()
      host.remove()
    }
  })
})
