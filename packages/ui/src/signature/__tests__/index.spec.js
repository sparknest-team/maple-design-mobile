import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import Signature from '..'
import VarSignature from '../Signature.vue'

const originalContext = HTMLCanvasElement.prototype.getContext
const originalDataUrl = HTMLCanvasElement.prototype.toDataURL
afterAll(() => {
  HTMLCanvasElement.prototype.getContext = originalContext
  HTMLCanvasElement.prototype.toDataURL = originalDataUrl
})
// A continuous touch gesture keeps one identifier; the shared helper creates a new one per event.
function trigger(wrapper, type) {
  const point = { identifier: 1, clientX: 0, clientY: 0 }
  const touches = type === 'touchend' || type === 'touchcancel' ? [] : [point]
  const event = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperties(event, {
    touches: { value: touches },
    changedTouches: { value: [point] },
    targetTouches: { value: touches },
  })
  wrapper.element.dispatchEvent(event)
  return nextTick()
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect: vi.fn(),
    closePath: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
  }))

  HTMLCanvasElement.prototype.toDataURL = vi.fn((type) => {
    return type === 'image/jpeg' ? 'data:image/jpeg;base64,test' : 'data:image/png;base64,test'
  })
})

test('signature plugin', () => {
  const app = createApp({}).use(Signature)
  expect(app.component(Signature.name)).toBeTruthy()
})

test('signature events', async () => {
  const onStart = vi.fn()
  const onEnd = vi.fn()
  const onSigning = vi.fn()

  const wrapper = mount(VarSignature, {
    props: {
      onStart,
      onEnd,
      onSigning,
    },
  })

  const canvas = wrapper.find('canvas')

  await trigger(canvas, 'touchmove')
  expect(onSigning).not.toHaveBeenCalled()

  await trigger(canvas, 'touchend')
  expect(onEnd).not.toHaveBeenCalled()

  await trigger(canvas, 'touchstart')
  expect(onStart).toHaveBeenCalled()

  await trigger(canvas, 'touchmove')
  expect(onSigning).toHaveBeenCalled()

  await trigger(canvas, 'touchend')
  expect(onEnd).toHaveBeenCalled()

  wrapper.unmount()
})

test('signature methods', async () => {
  const wrapper = mount(VarSignature, {
    props: {
      dataUrlType: 'png',
    },
  })

  HTMLCanvasElement.prototype.toDataURL = vi.fn((type) => {
    expect(type).toBe('image/png')
    return type === 'image/jpeg' ? 'data:image/jpeg;base64,test' : 'data:image/png;base64,test'
  })

  expect(wrapper.vm.confirm()).toBe('')
  wrapper.vm.reset()

  await wrapper.setProps({ dataUrlType: 'jpg' })

  HTMLCanvasElement.prototype.toDataURL = vi.fn((type) => {
    expect(type).toBe('image/jpeg')
    return type === 'image/jpeg' ? 'data:image/jpeg;base64,test' : 'data:image/png;base64,test'
  })

  expect(wrapper.vm.confirm()).toBe('')
  wrapper.unmount()
})
