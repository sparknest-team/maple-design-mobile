import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Image, { ImagePreview, ImagePreviewGroup } from '../index'

for (const [name, Component, props] of [
  ['single', ImagePreview, { src: 'one.jpg' }],
  ['group', ImagePreviewGroup, { images: ['one.jpg', 'two.jpg'] }],
] as const) {
  test(`${name} preview notifies open changes once through emits`, async () => {
    const change = vi.fn(() => new Promise(() => {})),
      once = vi.fn(),
      updates = vi.fn()
    const owner = mount(Component as any, {
      props: {
        ...props,
        popupContainer: false,
        onOpenChange: change,
        onOpenChangeOnce: once,
        'onUpdate:open': updates,
      },
    })
    try {
      ;(owner.vm as any).open()
      await flushPromises()
      expect(change.mock.calls).toHaveLength(1)
      expect(updates.mock.calls).toEqual([[true]])
      ;(owner.vm as any).close()
      await flushPromises()
      expect(updates.mock.calls).toEqual([[true], [false]])
      expect(change).toHaveBeenCalledTimes(2)
      expect(once).toHaveBeenCalledTimes(1)
    } finally {
      owner.unmount()
    }
  })
}

test('Image standalone preview close produces one model update', async () => {
  const updates = vi.fn(),
    change = vi.fn()
  const owner = mount(Image, {
    props: { src: 'one.jpg', popupContainer: false, 'onUpdate:open': updates, onOpenChange: change },
  })
  try {
    owner.vm.showPreview()
    await flushPromises()
    owner.findComponent(ImagePreview).vm.close()
    await flushPromises()
    expect(updates.mock.calls).toEqual([[true], [false]])
    expect(change.mock.calls).toEqual([[true], [false]])
  } finally {
    owner.unmount()
  }
})

test('Image root receives business class/style while imgProps still owns inner image styling', () => {
  const owner = mount(Image, {
    props: { src: 'one.jpg', width: 100, imgProps: { class: 'actual-img', style: { opacity: 0.5 } } },
    attrs: { class: 'business-image', style: { border: '7px solid red' } },
  })
  try {
    expect(owner.classes()).toContain('business-image')
    expect((owner.element as HTMLElement).style.border).toBe('7px solid red')
    expect((owner.element as HTMLElement).style.width).toBe('100px')
    expect(owner.get('img').classes()).toContain('actual-img')
    expect(owner.get('img').element.style.opacity).toBe('0.5')
    expect(owner.get('img').element.style.border).toBe('')
  } finally {
    owner.unmount()
  }
})
