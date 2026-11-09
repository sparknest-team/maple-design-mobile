import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import InfiniteScroll from '..'

test('uses the scaled inner viewport edge for an external bordered target', () => {
  const target = document.createElement('div')
  document.body.appendChild(target)
  Object.defineProperties(target, {
    clientTop: { value: 20 },
    clientHeight: { value: 100 },
    offsetHeight: { value: 140 },
  })
  vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ top: 10, bottom: 290, height: 280 })
  const wrapper = mount(InfiniteScroll, { props: { target, immediate: false } })
  const detector = wrapper.element.querySelector('[class$="infinite-scroll__detector"]')
  const bounds = vi.spyOn(detector, 'getBoundingClientRect').mockReturnValue({ bottom: 260 })
  wrapper.vm.check()
  expect(wrapper.emitted('load')).toBeUndefined()
  bounds.mockReturnValue({ bottom: 250 })
  wrapper.vm.check()
  expect(wrapper.emitted('load')).toHaveLength(1)
  wrapper.unmount()
  target.remove()
})
