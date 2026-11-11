import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Affix from '../Affix.vue'

let frames, owners, target
const tick = async () => {
  frames.splice(0).forEach((callback) => callback(0))
  await Promise.resolve()
  await nextTick()
}
const settle = async () => {
  await tick()
  await tick()
  await tick()
}
beforeEach(() => {
  frames = []
  owners = []
  target = document.createElement('div')
  document.body.appendChild(target)
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => frames.push(callback))
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
})
afterEach(() => {
  owners.forEach((owner) => owner.unmount())
  target.remove()
  vi.restoreAllMocks()
})
test('remeasuring a fixed instance does not duplicate change and disabling emits false', async () => {
  const owner = mount(Affix, { props: { target, offsetTop: 10 } })
  owners.push(owner)
  await settle()
  expect(owner.emitted('change').map((args) => args[0])).toEqual([true])
  const resized = owner.vm.updatePosition()
  await settle()
  await resized
  expect(owner.emitted('change').map((args) => args[0])).toEqual([true])
  await owner.setProps({ disabled: true })
  await settle()
  expect(owner.emitted('change').map((args) => args[0])).toEqual([true, false])
  expect(owner.emitted('change').slice(-1)[0][1]).toBe(0)
})
test('a pending resize cannot rebind a deactivated scroller even after reactivation', async () => {
  const show = ref(true),
    inner = ref(),
    added = vi.spyOn(target, 'addEventListener')
  const owner = mount({
    setup: () => () => h(KeepAlive, null, { default: () => (show.value ? h(Affix, { ref: inner, target }) : null) }),
  })
  owners.push(owner)
  await settle()
  const old = inner.value.updatePosition()
  show.value = false
  await nextTick()
  added.mockClear()
  await settle()
  await old
  expect(added.mock.calls.filter(([event]) => event === 'scroll')).toHaveLength(0)
  show.value = true
  await nextTick()
  await settle()
  expect(added.mock.calls.filter(([event]) => event === 'scroll')).toHaveLength(1)
  const stale = inner.value.updatePosition()
  show.value = false
  await nextTick()
  show.value = true
  await nextTick()
  added.mockClear()
  await settle()
  await stale
  expect(added.mock.calls.filter(([event]) => event === 'scroll')).toHaveLength(1)
})
test('viewport offsets are recomputed after the viewport changes', async () => {
  const width = vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1000)
  const owner = mount(Affix, { props: { target, offsetTop: '10vw' } })
  owners.push(owner)
  await settle()
  expect(owner.get('.mp-affix__wrapper').element.style.top).toBe('100px')
  width.mockReturnValue(1200)
  const pending = owner.vm.updatePosition()
  await settle()
  await pending
  expect(owner.get('.mp-affix__wrapper').element.style.top).toBe('120px')
})
