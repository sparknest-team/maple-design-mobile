import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import VirtualList from '../VirtualList.vue'

const wrappers = [],
  hosts = []
function setup(component, options = {}, dir = 'rtl') {
  const host = document.createElement('div')
  host.dir = dir
  document.body.append(host)
  hosts.push(host)
  const wrapper = mount(component, { attachTo: host, ...options })
  wrappers.push(wrapper)
  return wrapper
}
async function settled() {
  await nextTick()
  await Promise.resolve()
  await nextTick()
  await nextTick()
}
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  hosts.splice(0).forEach((h) => h.remove())
})
function geometry(el, width = 200, height = 200) {
  Object.defineProperties(el, {
    clientWidth: { configurable: true, value: width },
    clientHeight: { configurable: true, value: height },
  })
}
function mouse(type, x, y = 0) {
  window.dispatchEvent(new MouseEvent(type, { clientX: x, clientY: y, bubbles: true }))
}
test('wide virtual rows preserve a normalized inline offset across direction switches and vertical commands', async () => {
  const w = setup(VirtualList, {
    props: { data: Array.from({ length: 100 }, (_, key) => ({ key })), fixedSize: true },
    slots: { item: ({ item }) => h('div', { style: { width: '1000px' } }, String(item.key)) },
  })
  geometry(w.element)
  Object.defineProperty(w.element, 'scrollWidth', { value: 1000 })
  await settled()
  w.element.scrollLeft = -120
  await w.trigger('scroll')
  hosts[0].dir = 'ltr'
  await settled()
  expect(w.element.scrollLeft).toBe(120)
  w.vm.scrollTo({ index: 30 })
  await settled()
  expect(w.element.scrollLeft).toBe(120)
  hosts[0].dir = 'rtl'
  await settled()
  expect(w.element.scrollLeft).toBe(-120)
})
