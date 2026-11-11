import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Trigger from '../trigger'

it('preserves the accumulated scroll distance when an unrelated slot changes', async () => {
  const host = document.createElement('div'),
    mountPoint = document.createElement('div')
  const shadow = host.attachShadow({ mode: 'open' }),
    scroll = document.createElement('div')
  const first = document.createElement('slot'),
    other = document.createElement('slot')
  scroll.style.overflow = 'auto'
  first.name = 'target'
  other.name = 'other'
  scroll.append(first)
  shadow.append(scroll, other)
  mountPoint.slot = 'target'
  host.append(mountPoint)
  document.body.append(host)
  const wrapper = mount(Trigger, {
    attachTo: mountPoint,
    props: { open: true, scrollToClose: true, scrollToCloseDistance: 10 },
    slots: { default: () => h('button'), content: () => h('div') },
  })
  try {
    await nextTick()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))
    scroll.scrollTop = 6
    scroll.dispatchEvent(new Event('scroll'))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(wrapper.emitted('update:open')).toBeUndefined()
    const unrelated = document.createElement('div')
    unrelated.slot = 'other'
    host.append(unrelated)
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    scroll.scrollTop = 12
    scroll.dispatchEvent(new Event('scroll'))
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
