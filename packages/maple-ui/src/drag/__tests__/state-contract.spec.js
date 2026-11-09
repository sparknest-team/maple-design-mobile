import { nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Drag from '..'
import { trigger } from '../../utils/test'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
  vi.restoreAllMocks()
})
function fixture(props = {}) {
  const w = mount(Drag, {
    props: { popupContainer: false, ...props },
    attrs: { style: { width: '60px', height: '40px' } },
  })
  owners.push(w)
  const node = w.get('.mp-drag').element
  const parent = document.createElement('section')
  Object.defineProperties(parent, { clientWidth: { value: 300 }, clientHeight: { value: 220 } })
  Object.defineProperty(node, 'offsetParent', { configurable: true, value: parent })
  vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({ x: 0, y: 0, left: 0, top: 0, width: 300, height: 220 })
  vi.spyOn(node, 'getBoundingClientRect').mockReturnValue({ x: 0, y: 0, left: 0, top: 0, width: 60, height: 40 })
  return w
}
async function move(w) {
  const root = w.get('.mp-drag')
  await trigger(root, 'touchstart', 0, 0)
  await trigger(root, 'touchmove', 500, 500)
  return root
}
test('disabling during dragging retires touch and allows the next ordinary click', async () => {
  const click = vi.fn()
  const w = fixture({ onClick: click })
  const root = await move(w)
  await w.setProps({ disabled: true })
  await trigger(root, 'touchend', 500, 500)
  await w.setProps({ disabled: false })
  await root.trigger('click')
  expect(click).toHaveBeenCalledTimes(1)
})
test('boundary replacement clamps the existing position without resize()', async () => {
  const w = fixture()
  const root = await move(w)
  expect(root.element.style.transform).toBe('translate(240px, 180px)')
  await w.setProps({ boundary: { right: 100, bottom: 100 } })
  expect(root.element.style.transform).toBe('translate(140px, 80px)')
  await trigger(root, 'touchend', 500, 500)
  expect(root.element.style.transform).toBe('translate(140px, 80px)')
})
test('invalid enum and boundary values warn and remain finite', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = fixture({ axis: 'bad', attraction: 'bad', boundary: { top: NaN, left: Infinity, right: 'calc(1px)' } })
  await move(w)
  expect(warn).toHaveBeenCalled()
  expect(w.html()).not.toMatch(/NaN|Infinity/)
})

test('in-place reactive boundaries clamp without replacing the object', async () => {
  const boundary = reactive({ right: 0, bottom: 0 })
  const w = fixture({ boundary })
  const root = await move(w)
  boundary.right = 100
  boundary.bottom = 100
  await nextTick()
  expect(root.element.style.transform).toBe('translate(140px, 80px)')
})
test('touchcancel releases the drag without attraction', async () => {
  const w = fixture({ attraction: 'x' })
  const root = await move(w)
  await trigger(root, 'touchcancel', 500, 500)
  expect(root.element.style.transform).toBe('translate(240px, 180px)')
})
