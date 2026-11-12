import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Card from '../Card.vue'

test.each(['open', 'closed'] as const)('restores the opening control in a %s shadow root', async (mode) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode })
  const opener = document.createElement('button')
  shadow.append(opener)
  const mountPoint = document.createElement('div')
  shadow.append(mountPoint)
  const wrapper = mount(Card, {
    attachTo: mountPoint,
    props: { floating: false, ripple: false },
    slots: { 'floating-content': () => h('input', { 'aria-label': 'Draft' }) },
  })
  try {
    opener.focus()
    await wrapper.setProps({ floating: true })
    const draft = wrapper.get('input').element as HTMLInputElement
    draft.focus()
    expect(shadow.activeElement).toBe(draft)
    await wrapper.setProps({ floating: false })
    expect(shadow.activeElement).toBe(opener)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test.each(['open', 'closed'] as const)('does not steal external focus from a %s shadow root', async (mode) => {
  const host = document.createElement('div'),
    outside = document.createElement('button')
  document.body.append(host, outside)
  const shadow = host.attachShadow({ mode }),
    opener = document.createElement('button'),
    mountPoint = document.createElement('div')
  shadow.append(opener, mountPoint)
  const wrapper = mount(Card, {
    attachTo: mountPoint,
    props: { floating: false, ripple: false },
    slots: { 'floating-content': () => h('input') },
  })
  try {
    opener.focus()
    await wrapper.setProps({ floating: true })
    ;(wrapper.get('input').element as HTMLInputElement).focus()
    outside.focus()
    await wrapper.setProps({ floating: false })
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    host.remove()
    outside.remove()
  }
})

test.each(['open', 'closed'] as const)(
  'restores focus when the floating content owns a nested %s shadow root',
  async (mode) => {
    const opener = document.createElement('button')
    document.body.append(opener)
    const wrapper = mount(Card, {
      attachTo: document.body,
      props: { floating: false, ripple: false },
      slots: { 'floating-content': () => h('div', { 'data-inner-host': '' }) },
    })
    try {
      const inner = wrapper.get('[data-inner-host]').element.attachShadow({ mode })
      const draft = document.createElement('input')
      inner.append(draft)
      opener.focus()
      await wrapper.setProps({ floating: true })
      draft.focus()
      expect(inner.activeElement).toBe(draft)
      await wrapper.setProps({ floating: false })
      expect(document.activeElement).toBe(opener)
    } finally {
      wrapper.unmount()
      opener.remove()
    }
  },
)

test('restores an opener inside a nested open shadow root', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode: 'open' }),
    nestedHost = document.createElement('div'),
    mountPoint = document.createElement('div')
  shadow.append(nestedHost, mountPoint)
  const nested = nestedHost.attachShadow({ mode: 'open' }),
    opener = document.createElement('button')
  nested.append(opener)
  const wrapper = mount(Card, {
    attachTo: mountPoint,
    props: { floating: false, ripple: false },
    slots: { 'floating-content': () => h('input') },
  })
  try {
    opener.focus()
    await wrapper.setProps({ floating: true })
    ;(wrapper.get('input').element as HTMLInputElement).focus()
    await wrapper.setProps({ floating: false })
    expect(nested.activeElement).toBe(opener)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('does not restore focus into an inert shadow host', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode: 'open' }),
    opener = document.createElement('button'),
    mountPoint = document.createElement('div')
  shadow.append(opener, mountPoint)
  const wrapper = mount(Card, {
    attachTo: mountPoint,
    props: { floating: false, ripple: false },
    slots: { 'floating-content': () => h('input') },
  })
  try {
    opener.focus()
    await wrapper.setProps({ floating: true })
    const draft = wrapper.get('input').element as HTMLInputElement
    draft.focus()
    host.setAttribute('inert', '')
    await wrapper.setProps({ floating: false })
    expect(shadow.activeElement).toBe(draft)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
