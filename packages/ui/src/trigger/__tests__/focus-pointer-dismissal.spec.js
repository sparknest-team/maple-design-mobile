import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Trigger from '..'

const tick = async () => {
  await nextTick()
  await nextTick()
}
const event = (target, type, detail = 0) =>
  target.dispatchEvent(new MouseEvent(type, { bubbles: true, composed: true, button: 0, detail }))
async function setup() {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: false },
    slots: {
      default: () => h('button', { 'data-reference': '' }, 'ref'),
      content: () => h('input', { 'data-panel': '' }),
    },
  })
  await tick()
  wrapper.get('[data-panel]').element.focus()
  await tick()
  return {
    outside,
    wrapper,
    cleanup: () => {
      wrapper.unmount()
      outside.remove()
    },
  }
}
test('one physical outside click emits once despite focusout, and a later click retries', async () => {
  const { outside, wrapper, cleanup } = await setup()
  try {
    event(outside, 'pointerdown')
    outside.focus()
    event(outside, 'click', 1)
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    expect(wrapper.emitted('click-outside')).toHaveLength(1)
    event(outside, 'pointerdown')
    event(outside, 'click', 1)
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false], [false]])
  } finally {
    cleanup()
  }
})
test('keyboard focus change and later keyboard click remain separate requests', async () => {
  const { outside, wrapper, cleanup } = await setup()
  try {
    outside.focus()
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    event(outside, 'click', 0)
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false], [false]])
  } finally {
    cleanup()
  }
})
test('a canceled pointer does not suppress a later click', async () => {
  const { outside, wrapper, cleanup } = await setup()
  try {
    event(outside, 'pointerdown')
    outside.focus()
    event(outside, 'pointercancel')
    event(outside, 'click', 1)
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false], [false]])
  } finally {
    cleanup()
  }
})
test('pointer dismissal across documents with no relatedTarget is coalesced and can retry', async () => {
  const outside = document.createElement('button'),
    frame = document.createElement('iframe')
  document.body.append(outside, frame)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: frame.contentDocument.body },
    slots: {
      default: () => h('button', { 'data-reference': '' }, 'ref'),
      content: () => h('input', { 'data-panel': '' }),
    },
  })
  try {
    await tick()
    const panel = frame.contentDocument.querySelector('[data-panel]')
    expect(panel).toBeTruthy()
    panel.focus()
    await tick()
    event(outside, 'pointerdown')
    panel.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true, relatedTarget: null }))
    event(outside, 'click', 1)
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    event(outside, 'pointerdown')
    event(outside, 'click', 1)
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false], [false]])
  } finally {
    wrapper.unmount()
    outside.remove()
    frame.remove()
  }
})
test('outside label click which focuses its associated control is one dismissal', async () => {
  const label = document.createElement('label'),
    outside = document.createElement('input')
  outside.id = 'coalescing-label-target'
  label.htmlFor = outside.id
  document.body.append(label, outside)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: false },
    slots: {
      default: () => h('button', { 'data-reference': '' }, 'ref'),
      content: () => h('input', { 'data-panel': '' }),
    },
  })
  try {
    await tick()
    wrapper.get('[data-panel]').element.focus()
    await tick()
    event(label, 'pointerdown')
    outside.focus()
    event(label, 'click', 1)
    await tick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  } finally {
    wrapper.unmount()
    label.remove()
    outside.remove()
  }
})

test('a later unrelated synthetic click is not coalesced with an earlier pointerdown and blur', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: false },
    slots: { default: () => h('button', 'ref'), content: () => h('input', { 'data-panel': '' }) },
  })
  try {
    await nextTick()
    await nextTick()
    wrapper.get('[data-panel]').element.focus()
    outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, composed: true, button: 0 }))
    outside.focus()
    outside.dispatchEvent(new MouseEvent('pointerup', { bubbles: true, composed: true, button: 0 }))
    await new Promise((resolve) => setTimeout(resolve, 30))
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, detail: 1 }))
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false], [false]])
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

const send = (node, type, detail = 0) =>
  node.dispatchEvent(new MouseEvent(type, { bubbles: true, composed: true, button: 0, detail }))
test('dragging from outside input to page edge produces one request and a later independent click is preserved', async () => {
  const outside = document.createElement('input')
  document.body.append(outside)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: false },
    slots: { default: () => h('button', 'ref'), content: () => h('input', { 'data-panel': '' }) },
  })
  try {
    await nextTick()
    await nextTick()
    wrapper.get('[data-panel]').element.focus()
    send(outside, 'pointerdown')
    outside.focus()
    send(document.documentElement, 'pointerup')
    send(document.documentElement, 'click', 1)
    await new Promise((resolve) => setTimeout(resolve, 30))
    send(outside, 'click', 1)
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false], [false]])
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

const pointer = (node, type, id, primary) => {
  const event = new MouseEvent(type, { bubbles: true, composed: true, button: 0 })
  Object.defineProperties(event, { pointerId: { value: id }, isPrimary: { value: primary } })
  node.dispatchEvent(event)
}
test('release of another pointer does not expire the focused pointer dismissal', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: false },
    slots: { default: () => h('button', 'ref'), content: () => h('input', { 'data-panel': '' }) },
  })
  try {
    await nextTick()
    await nextTick()
    wrapper.get('[data-panel]').element.focus()
    pointer(outside, 'pointerdown', 1, true)
    outside.focus()
    pointer(document.body, 'pointerup', 2, false)
    await new Promise((resolve) => setTimeout(resolve, 30))
    pointer(outside, 'pointerup', 1, true)
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, button: 0, detail: 1 }))
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('secondary pointer activity does not replace a pending primary interaction', async () => {
  const outside = document.createElement('button')
  const second = document.createElement('button')
  document.body.append(outside, second)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: false },
    slots: { default: () => h('button', 'ref'), content: () => h('input', { 'data-panel': '' }) },
  })
  try {
    await nextTick()
    await nextTick()
    wrapper.get('[data-panel]').element.focus()
    pointer(outside, 'pointerdown', 1, true)
    outside.focus()
    pointer(second, 'pointerdown', 2, false)
    pointer(second, 'pointerup', 2, false)
    const otherClick = new MouseEvent('click', { bubbles: true, composed: true, button: 0, detail: 1 })
    Object.defineProperty(otherClick, 'pointerId', { value: 2 })
    second.dispatchEvent(otherClick)
    pointer(outside, 'pointerup', 1, true)
    const primaryClick = new MouseEvent('click', { bubbles: true, composed: true, button: 0, detail: 1 })
    Object.defineProperty(primaryClick, 'pointerId', { value: 1 })
    outside.dispatchEvent(primaryClick)
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false], [false]])
  } finally {
    wrapper.unmount()
    outside.remove()
    second.remove()
  }
})
