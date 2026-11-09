import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Image, { ImagePreview } from '..'
import Overlay from '../../overlay'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.innerHTML = ''
})
function setup(props: Record<string, unknown> = {}) {
  const owner = mount(Image, { attachTo: document.body, props: { src: 'a.jpg', popupContainer: false, ...props } })
  owners.push(owner)
  return owner
}

test('explicit empty alt remains empty and non-preview image keeps native image semantics', () => {
  const owner = setup({ alt: '', description: 'caption', previewDisabled: true })
  const image = owner.get('img')
  expect(image.attributes('alt')).toBe('')
  expect(image.attributes('role')).toBeUndefined()
  expect(image.attributes('tabindex')).toBeUndefined()
})

test('previewable decorative image has a named action and Enter opens it once', async () => {
  const owner = setup({ alt: '', description: 'caption' })
  const image = owner.get('img')
  expect(image.attributes('alt')).toBe('')
  expect(image.attributes('role')).toBe('button')
  expect(image.attributes('tabindex')).toBe('0')
  expect(image.attributes('aria-label')).toBeTruthy()
  image.element.focus()
  await image.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('click')).toHaveLength(1)
  expect(owner.emitted('update:open')).toEqual([[true]])
})

test('Space activates once on release; failed images do not expose preview action', async () => {
  const owner = setup({ alt: 'example' })
  const image = owner.get('img')
  image.element.focus()
  await image.trigger('keydown', { key: ' ' })
  expect(owner.emitted('click')).toBeUndefined()
  await image.trigger('keyup', { key: ' ' })
  expect(owner.emitted('click')).toHaveLength(1)
  await image.trigger('error')
  expect(image.attributes('role')).toBeUndefined()
  await image.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('click')).toHaveLength(1)
})

test('keyboard close restores focus to the preview opener', async () => {
  const owner = setup({ alt: 'example' })
  const image = owner.get('img')
  image.element.focus()
  await image.trigger('keydown', { key: 'Enter' })
  await nextTick()
  const close = owner.get<HTMLButtonElement>('[data-image-preview-close]')
  close.element.focus()
  await close.trigger('click')
  await nextTick()
  expect(document.activeElement).toBe(image.element)
})

test('only the top preview responds and editable or interactive targets keep their keys', async () => {
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h('div', [
          h(ImagePreview, { src: 'a.jpg', defaultOpen: true, keyboard: true, popupContainer: false }),
          h(
            ImagePreview,
            { src: 'b.jpg', defaultOpen: true, keyboard: true, popupContainer: false },
            { extra: () => h('input', { 'data-test-input': '' }) },
          ),
        ]),
    }),
    { attachTo: document.body },
  )
  owners.push(owner)
  await nextTick()
  const previews = owner.findAllComponents(ImagePreview)
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
  expect((previews[0].vm as any).scale).toBe(1)
  expect((previews[1].vm as any).scale).toBeGreaterThan(1)
  const input = owner.get<HTMLInputElement>('[data-test-input]').element
  input.focus()
  const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
  input.dispatchEvent(event)
  expect(event.defaultPrevented).toBe(false)
  expect((previews[1].vm as any).scale).toBeGreaterThan(1)
  const close = previews[1].get('[data-image-preview-close]').element
  const buttonEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
  close.dispatchEvent(buttonEvent)
  expect(buttonEvent.defaultPrevented).toBe(false)
  expect((previews[1].vm as any).scale).toBeGreaterThan(1)
})

test('a canceled Space gesture cannot open after preview becomes disabled', async () => {
  const owner = setup({ alt: 'example' })
  const image = owner.get('img')
  image.element.focus()
  await image.trigger('keydown', { key: ' ' })
  await owner.setProps({ previewDisabled: true })
  await image.trigger('keyup', { key: ' ' })
  expect(owner.emitted('click')).toBeUndefined()
  expect(image.attributes('role')).toBeUndefined()
})

test('explicit empty alt on previewed image remains empty', async () => {
  const owner = mount(ImagePreview, {
    attachTo: document.body,
    props: { src: 'a.jpg', defaultOpen: true, popupContainer: false, previewedImgProps: { alt: '' } },
  })
  owners.push(owner)
  await nextTick()
  expect(owner.get('[data-image-preview-image]').attributes('alt')).toBe('')
})

test('a different top overlay prevents the underlying preview shortcuts', async () => {
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h('div', [
          h(ImagePreview, { src: 'a.jpg', defaultOpen: true, keyboard: true, popupContainer: false }),
          h(Overlay, { defaultOpen: true, popupContainer: false }),
        ]),
    }),
    { attachTo: document.body },
  )
  owners.push(owner)
  await nextTick()
  const preview = owner.findComponent(ImagePreview)
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
  expect((preview.vm as any).scale).toBe(1)
})

test('closing preview does not steal focus moved to an unrelated control', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const owner = setup({ alt: 'example' })
  const image = owner.get('img')
  image.element.focus()
  await image.trigger('keydown', { key: 'Enter' })
  await nextTick()
  const close = owner.get<HTMLButtonElement>('[data-image-preview-close]')
  close.element.focus()
  ;(close.element as HTMLElement).click()
  outside.focus()
  await nextTick()
  await nextTick()
  expect(document.activeElement).toBe(outside)
})
