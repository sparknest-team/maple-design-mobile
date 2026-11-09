import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { ImagePreview } from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})
function setup(props: Record<string, unknown> = {}) {
  const owner = mount(ImagePreview, {
    attachTo: document.body,
    props: { src: 'a.jpg', defaultOpen: true, popupContainer: false, ...props },
  })
  owners.push(owner)
  return owner
}

test('scales normalize invalid values, respect bounds, and react to changes', async () => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = setup({ defaultScale: Infinity, minScale: -1, maxScale: NaN, scaleStep: 0 })
  const vm = owner.vm as any
  expect(vm.scale).toBe(1)
  vm.zoomTo(NaN)
  expect(vm.scale).toBe(1)
  vm.zoomIn()
  expect(vm.scale).toBe(1.5)
  vm.zoomTo(-10)
  expect(vm.scale).toBe(0.5)
  await owner.setProps({ minScale: 2, maxScale: 1, defaultScale: 9 })
  expect(vm.scale).toBe(2)
  vm.reset()
  expect(vm.scale).toBe(2)
  await owner.setProps({ maxScale: 4, scaleStep: 0.5 })
  vm.zoomIn()
  expect(vm.scale).toBe(2.5)
})

test('explicit close action has an accessible name and closes without the separate close button', async () => {
  const owner = setup({ closable: false, showToolbar: true, actionsLayout: ['close'] })
  await nextTick()
  expect(owner.find('[data-image-preview-close]').exists()).toBe(false)
  const action = owner.get('[data-image-preview-action="close"]')
  expect(action.attributes('aria-label')).toBeTruthy()
  await action.trigger('click')
  expect(owner.emitted('update:open')).toEqual([[false]])
})

test('fullscreen returns the browser promise and handles missing browser support', async () => {
  const owner = setup()
  const stage = owner.get('[data-image-preview-stage]').element as HTMLElement
  const done = Promise.resolve()
  Object.defineProperty(stage, 'requestFullscreen', { configurable: true, value: vi.fn(() => done) })
  await expect((owner.vm as any).toggleFullscreen()).resolves.toBeUndefined()
  Object.defineProperty(stage, 'requestFullscreen', { configurable: true, value: undefined })
  expect((owner.vm as any).toggleFullscreen()).toBeUndefined()
})
