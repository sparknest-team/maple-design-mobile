import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Table from '..'

test('native table keeps its inline scroll distance when its local direction switches', async () => {
  const host = document.createElement('div')
  host.dir = 'rtl'
  document.body.append(host)
  const wrapper = mount(Table, { attachTo: host, props: { columns: [{ dataIndex: 'name', width: 1000 }] } })
  const viewport = wrapper.get('[role="region"]')
  Object.defineProperties(viewport.element, { scrollWidth: { value: 1000 }, clientWidth: { value: 200 } })
  try {
    await nextTick()
    viewport.element.scrollLeft = -130
    await viewport.trigger('scroll')
    host.dir = 'ltr'
    await nextTick()
    await Promise.resolve()
    await nextTick()
    await nextTick()
    expect(viewport.element.scrollLeft).toBe(130)
    expect(viewport.attributes('tabindex')).toBe('0')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
