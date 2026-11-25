import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import FloatingPanel from '..'
import { trigger, triggerDrag } from '../../utils/test'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
  vi.restoreAllMocks()
})
function fixture(props = {}) {
  const w = mount(FloatingPanel, { props: { popupContainer: false, anchors: [100, 250], ...props } })
  owners.push(w)
  return w
}
const height = (w) => Number(w.get('.mp-floating-panel').element.style.transform.match(/- ([\d.]+)px/)?.[1])
test('a refusing controlled parent keeps its effective anchor after notifying', async () => {
  const w = fixture({ modelValue: 100 })
  await triggerDrag(w.get('.mp-floating-panel'), 0, -200)
  expect(w.emitted('update:modelValue')).toEqual([[250]])
  expect(w.emitted('height-change')).toEqual([[250]])
  expect(height(w)).toBe(100)
})
test('touchcancel rolls back without either commit event', async () => {
  const w = fixture()
  const root = w.get('.mp-floating-panel')
  await trigger(root, 'touchstart', 0, 0)
  await trigger(root, 'touchmove', 0, -200)
  expect(height(w)).toBeGreaterThan(100)
  await trigger(root, 'touchcancel', 0, -200)
  expect(height(w)).toBe(100)
  expect(w.emitted('height-change')).toBeUndefined()
  expect(w.emitted('update:modelValue')).toBeUndefined()
})
test('uncontrolled state commits and defaultValue stays initialization-only', async () => {
  const w = fixture()
  await triggerDrag(w.get('.mp-floating-panel'), 0, -200)
  expect(height(w)).toBe(250)
  await w.setProps({ defaultValue: 100 })
  expect(height(w)).toBe(250)
})
test('invalid anchors and heights cannot leave stale or nonfinite styles', async () => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  const w = fixture({ modelValue: 250 })
  await w.setProps({ anchors: [NaN, Infinity, -10, 80, 80], modelValue: NaN })
  expect(w.get('.mp-floating-panel').element.style.height).toBe('80px')
  expect(height(w)).toBe(80)
  await w.setProps({ anchors: [NaN, -1], duration: -20 })
  expect(w.html()).not.toMatch(/NaN|Infinity/)
  expect(w.get('.mp-floating-panel').element.style.transition).toContain('300ms')
})
test('anchor changes during dragging cancel the old gesture without commit', async () => {
  const w = fixture()
  const root = w.get('.mp-floating-panel')
  await trigger(root, 'touchstart', 0, 0)
  await trigger(root, 'touchmove', 0, -150)
  await w.setProps({ anchors: [50] })
  await trigger(root, 'touchend', 0, -150)
  expect(height(w)).toBe(50)
  expect(w.emitted('update:modelValue')).toBeUndefined()
})
test('accepted model changes and external changes do not duplicate commits', async () => {
  const w = fixture({ modelValue: 100, 'onUpdate:modelValue': (value) => w.setProps({ modelValue: value }) })
  await triggerDrag(w.get('.mp-floating-panel'), 0, -200)
  expect(height(w)).toBe(250)
  await w.setProps({ modelValue: 100 })
  expect(height(w)).toBe(100)
  expect(w.emitted('height-change')).toEqual([[250]])
})
test('zero and numeric-string duration and a single zero anchor are valid', async () => {
  const w = fixture({ anchors: [0, 0], defaultValue: 0, duration: '0' })
  expect(height(w)).toBe(0)
  expect(w.get('.mp-floating-panel').element.style.height).toBe('0px')
  expect(w.get('.mp-floating-panel').element.style.transition).toContain('0ms')
})
test('invalid runtime values use standard Vue warnings', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  fixture({ anchors: [-1], duration: Infinity, modelValue: NaN, defaultValue: -1 })
  expect(warn).toHaveBeenCalled()
})

test('a teleported panel follows its viewport and locks only its own document', async () => {
  const frame = document.body.appendChild(document.createElement('iframe'))
  const view = frame.contentWindow
  const body = view.document.body
  Object.defineProperty(view, 'innerHeight', { configurable: true, value: 500 })
  const w = fixture({ anchors: undefined, popupContainer: body })
  try {
    await nextTick()
    const panel = body.querySelector('.mp-floating-panel')
    expect(panel.style.height).toBe('300px')
    await trigger(panel, 'touchstart')
    expect(body.classList.contains('mp--lock')).toBe(true)
    expect(document.body.classList.contains('mp--lock')).toBe(false)
    await trigger(panel, 'touchcancel')
    expect(body.classList.contains('mp--lock')).toBe(false)
    Object.defineProperty(view, 'innerHeight', { configurable: true, value: 400 })
    await trigger(view, 'resize')
    expect(panel.style.height).toBe('240px')
    await w.setProps({ popupContainer: document.body })
    expect(panel.style.height).toBe(window.innerHeight * 0.6 + 'px')
    await trigger(view, 'orientationchange')
    expect(panel.style.height).toBe(window.innerHeight * 0.6 + 'px')
  } finally {
    owners.pop().unmount()
    frame.remove()
  }
})
