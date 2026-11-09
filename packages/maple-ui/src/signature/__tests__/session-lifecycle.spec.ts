import { h, KeepAlive, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Signature from '..'

const owners: ReturnType<typeof mount>[] = []
let eventTime = 0
const context = {
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  clearRect: vi.fn(),
  closePath: vi.fn(),
}
interface Finger {
  identifier: number
  clientX: number
  clientY: number
}
const finger = (identifier: number, clientX = 10, clientY = 10): Finger => ({ identifier, clientX, clientY })
function touch(
  canvas: HTMLCanvasElement,
  type: string,
  touches: Finger[],
  changedTouches = touches,
  cancelable = true,
) {
  const event = new Event(type, { bubbles: true, cancelable })
  Object.defineProperties(event, {
    touches: { value: touches },
    changedTouches: { value: changedTouches },
    targetTouches: { value: touches },
  })
  Object.defineProperty(event, 'timeStamp', { value: ++eventTime })
  canvas.dispatchEvent(event)
  return event
}
beforeEach(() => {
  eventTime = 0
  for (const method of ['beginPath', 'moveTo', 'arc', 'fill', 'lineTo', 'stroke', 'clearRect', 'closePath'] as const) {
    context[method].mockClear()
  }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D)
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  vi.restoreAllMocks()
})
async function fixture(extra = {}) {
  const owner = mount(Signature, { props: extra })
  owners.push(owner)
  await flushPromises()
  return { owner, canvas: owner.get('canvas').element }
}
test('touchcancel ends once and a late move cannot continue the canceled stroke', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [finger(1)])
  touch(canvas, 'touchmove', [finger(1, 30, 40)])
  touch(canvas, 'touchcancel', [], [finger(1, 30, 40)], false)
  expect(owner.emitted('end')).toHaveLength(1)
  touch(canvas, 'touchmove', [finger(1, 90, 90)])
  touch(canvas, 'touchend', [], [finger(1)])
  expect(context.lineTo).toHaveBeenCalledTimes(1)
  expect(owner.emitted('signing')).toHaveLength(1)
  expect(owner.emitted('end')).toHaveLength(1)
  expect(context.clearRect).not.toHaveBeenCalled()
})
test('reset closes the active interaction once and repeated reset cannot manufacture an end', async () => {
  const clearedAtEnd: number[] = []
  const { owner, canvas } = await fixture({ onEnd: () => clearedAtEnd.push(context.clearRect.mock.calls.length) })
  touch(canvas, 'touchstart', [finger(1)])
  owner.vm.reset()
  expect(owner.emitted('end')).toHaveLength(1)
  expect(context.clearRect).toHaveBeenCalledTimes(1)
  expect(clearedAtEnd).toEqual([1])
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(context.lineTo).not.toHaveBeenCalled()
  owner.vm.reset()
  expect(owner.emitted('end')).toHaveLength(1)
})
test('the initiating contact owns the stroke when touch order changes or another finger ends', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [finger(1)])
  touch(canvas, 'touchstart', [finger(1), finger(2)], [finger(2)])
  expect(owner.emitted('start')).toHaveLength(1)
  touch(canvas, 'touchmove', [finger(2, 90), finger(1, 50, 20)])
  expect(context.lineTo).toHaveBeenLastCalledWith(50, 20)
  touch(canvas, 'touchend', [finger(1)], [finger(2)])
  expect(owner.emitted('end')).toBeUndefined()
  touch(canvas, 'touchmove', [finger(1, 60, 30)])
  expect(owner.emitted('signing')).toHaveLength(2)
  touch(canvas, 'touchend', [], [finger(1)])
  expect(owner.emitted('end')).toHaveLength(1)
})
test('an unrelated move does not draw, prevent scrolling, or revive a finished contact', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [finger(1)])
  const other = touch(canvas, 'touchmove', [finger(2, 80)])
  expect(context.lineTo).not.toHaveBeenCalled()
  expect(other.defaultPrevented).toBe(false)
  touch(canvas, 'touchend', [], [finger(1)])
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(context.lineTo).not.toHaveBeenCalled()
  expect(owner.emitted('end')).toHaveLength(1)
})
test('empty or initial multi-contact starts are ignored', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [])
  touch(canvas, 'touchstart', [finger(1), finger(2)])
  expect(owner.emitted('start')).toBeUndefined()
  expect(context.beginPath).not.toHaveBeenCalled()
})
test('KeepAlive deactivation ends the old stroke and activation requires a fresh start', async () => {
  const visible = ref(true),
    starts: unknown[] = [],
    ends: unknown[] = [],
    signs: unknown[] = []
  const owner = mount({
    render: () =>
      h(KeepAlive, null, () =>
        visible.value
          ? h(Signature, {
              onStart: () => starts.push('start'),
              onEnd: () => ends.push('end'),
              onSigning: () => signs.push('move'),
            })
          : h('span'),
      ),
  })
  owners.push(owner)
  await flushPromises()
  const canvas = owner.get('canvas').element
  touch(canvas, 'touchstart', [finger(1)])
  visible.value = false
  await nextTick()
  expect(ends).toHaveLength(1)
  visible.value = true
  await nextTick()
  touch(canvas, 'touchmove', [finger(1, 80)])
  expect(signs).toEqual([])
  touch(canvas, 'touchstart', [finger(2)])
  touch(canvas, 'touchmove', [finger(2, 50)])
  touch(canvas, 'touchend', [], [finger(2)])
  expect(starts).toHaveLength(2)
  expect(ends).toHaveLength(2)
  expect(signs).toHaveLength(1)
})
test('unmount balances the active session and releases event qualification', async () => {
  const starts: unknown[] = [],
    ends: unknown[] = []
  const { owner, canvas } = await fixture({ onStart: () => starts.push('start'), onEnd: () => ends.push('end') })
  touch(canvas, 'touchstart', [finger(1)])
  owner.unmount()
  owners.splice(owners.indexOf(owner), 1)
  expect(starts).toHaveLength(1)
  expect(ends).toHaveLength(1)
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(context.lineTo).not.toHaveBeenCalled()
})
test('resize ends the active session before the existing bitmap reset', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [finger(1)])
  window.dispatchEvent(new Event('resize'))
  await nextTick()
  expect(owner.emitted('end')).toHaveLength(1)
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(context.lineTo).not.toHaveBeenCalled()
})
test('a reset from start notification cannot leave the stroke alive', async () => {
  const starts: unknown[] = [],
    ends: unknown[] = []
  const owner = mount(Signature, {
    props: {
      onStart: () => {
        starts.push('start')
        owner.vm.reset()
      },
      onEnd: () => ends.push('end'),
    },
  })
  owners.push(owner)
  await flushPromises()
  const canvas = owner.get('canvas').element
  touch(canvas, 'touchstart', [finger(1)])
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(starts).toHaveLength(1)
  expect(ends).toHaveLength(1)
  expect(context.lineTo).not.toHaveBeenCalled()
})
test('ordinary end notification Promises do not hold the next writing session open', async () => {
  const end = vi.fn(() => new Promise<void>(() => {})),
    { owner, canvas } = await fixture({ onEnd: end })
  for (const id of [1, 2]) {
    touch(canvas, 'touchstart', [finger(id)])
    touch(canvas, 'touchmove', [finger(id, 40)])
    touch(canvas, 'touchend', [], [finger(id)])
  }
  expect(owner.emitted('start')).toHaveLength(2)
  expect(owner.emitted('end')).toHaveLength(2)
  expect(end).toHaveBeenCalledTimes(2)
})

test('old events cannot finish a new stroke when the browser reuses a touch identifier', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [finger(1)])
  const oldMove = touch(canvas, 'touchmove', [finger(1, 30)])
  const oldEnd = touch(canvas, 'touchend', [], [finger(1)])
  touch(canvas, 'touchstart', [finger(1)])
  canvas.dispatchEvent(oldMove)
  canvas.dispatchEvent(oldEnd)
  expect(context.lineTo).toHaveBeenCalledTimes(1)
  expect(owner.emitted('end')).toHaveLength(1)
  touch(canvas, 'touchmove', [finger(1, 60)])
  touch(canvas, 'touchend', [], [finger(1)])
  expect(context.lineTo).toHaveBeenCalledTimes(2)
  expect(owner.emitted('end')).toHaveLength(2)
})

test('owner-window blur ends writing without clearing ink', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [finger(1)])
  window.dispatchEvent(new Event('blur'))
  expect(owner.emitted('end')).toHaveLength(1)
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(context.lineTo).not.toHaveBeenCalled()
  expect(context.clearRect).not.toHaveBeenCalled()
})
test('a hidden owner document closes its active writing session', async () => {
  const { owner, canvas } = await fixture()
  touch(canvas, 'touchstart', [finger(1)])
  vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden')
  document.dispatchEvent(new Event('visibilitychange'))
  expect(owner.emitted('end')).toHaveLength(1)
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(context.lineTo).not.toHaveBeenCalled()
})

test('unmount from resize end notification cannot continue measuring', async () => {
  const onEnd = (): void => {
    owner.unmount()
  }
  const owner = mount(Signature, { props: { onEnd } })
  await flushPromises()
  const canvas = owner.get('canvas').element
  touch(canvas, 'touchstart', [finger(1)])
  expect(() => window.dispatchEvent(new Event('resize'))).not.toThrow()
  touch(canvas, 'touchmove', [finger(1, 90)])
  expect(context.lineTo).not.toHaveBeenCalled()
})

test('initial touch establishes the path and invalid pen widths fall back safely', async () => {
  const { owner, canvas } = await fixture({ lineWidth: 0 })
  touch(canvas, 'touchstart', [finger(1, 10, 20)])
  expect(context.moveTo).toHaveBeenCalledWith(10, 20)
  expect((context as unknown as CanvasRenderingContext2D).lineWidth).toBe(2)
  touch(canvas, 'touchmove', [finger(1, 50, 20)])
  expect(context.lineTo).toHaveBeenCalledWith(50, 20)
  touch(canvas, 'touchend', [], [finger(1, 50, 20)])
  await owner.setProps({ lineWidth: '0.5' })
  touch(canvas, 'touchstart', [finger(2)])
  expect((context as unknown as CanvasRenderingContext2D).lineWidth).toBe(0.5)
})
