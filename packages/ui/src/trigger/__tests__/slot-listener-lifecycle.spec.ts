import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Trigger from '../trigger'

it('removes shadow slot listeners on close, cache deactivation and unmount', async () => {
  const host = document.createElement('div'),
    mountPoint = document.createElement('div')
  const shadow = host.attachShadow({ mode: 'open' }),
    slot = document.createElement('slot')
  shadow.append(slot)
  host.append(mountPoint)
  document.body.append(host)
  const add = vi.spyOn(shadow, 'addEventListener'),
    remove = vi.spyOn(shadow, 'removeEventListener')
  const active = ref(true),
    opened = ref(true)
  const wrapper = mount(
    {
      setup: () => () =>
        h(KeepAlive, null, () =>
          active.value
            ? h(
                Trigger,
                { open: opened.value, updateAtScroll: true },
                { default: () => h('button'), content: () => h('div') },
              )
            : null,
        ),
    },
    { attachTo: mountPoint },
  )
  const live = () =>
    add.mock.calls.filter(([type]) => type === 'slotchange').length -
    remove.mock.calls.filter(([type]) => type === 'slotchange').length
  const flush = async () => {
    await nextTick()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
  }
  try {
    await flush()
    expect(live()).toBe(1)
    opened.value = false
    await flush()
    expect(live()).toBe(0)
    opened.value = true
    await flush()
    expect(live()).toBe(1)
    active.value = false
    await flush()
    expect(live()).toBe(0)
    active.value = true
    await flush()
    expect(live()).toBe(1)
  } finally {
    wrapper.unmount()
    host.remove()
  }
  expect(live()).toBe(0)
})
