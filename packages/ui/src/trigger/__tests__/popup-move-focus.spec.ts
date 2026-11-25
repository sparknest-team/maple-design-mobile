import { h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '../trigger'

test.each(['open', 'closed'] as const)('respects focus moved after capture in %s shadow roots', async (mode) => {
  const hosts = [document.createElement('div'), document.createElement('div'), document.createElement('div')]
  document.body.append(...hosts)
  const roots = hosts.map((host) => host.attachShadow({ mode }))
  const targets = roots.map((root) => {
    const node = document.createElement('div')
    root.append(node)
    return node
  })
  const other = document.createElement('button')
  roots[2].append(other)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: targets[0] },
    slots: { default: () => h('button'), content: () => h('input') },
  })
  try {
    await nextTick()
    await nextTick()
    const input = roots[0].querySelector('input')!
    input.focus()
    const focus = vi.spyOn(input, 'focus')
    const update = wrapper.setProps({ popupContainer: targets[1] })
    await nextTick()
    expect(roots[1].querySelector('input')).toBe(input)
    expect(focus).not.toHaveBeenCalled()
    other.focus()
    await update
    await nextTick()
    expect(roots[2].activeElement).toBe(other)
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
    hosts.forEach((host) => host.remove())
  }
})

test.each(['click', 'focus'] as const)('%s popup preserves focused input while moving containers', async (trigger) => {
  const a = document.createElement('div'),
    b = document.createElement('div')
  document.body.append(a, b)
  const wrapper = mount(Trigger, {
    props: { open: true, trigger, popupContainer: a },
    slots: { default: () => h('button', 'reference'), content: () => h('input', { 'data-move-focus': '' }) },
  })
  try {
    await nextTick()
    const input = a.querySelector<HTMLInputElement>('[data-move-focus]')!
    input.value = 'draft'
    input.focus()
    input.setSelectionRange(1, 3)
    await wrapper.setProps({ popupContainer: b })
    await nextTick()
    expect(b.querySelector('input')).toBe(input)
    expect(input.value).toBe('draft')
    expect(document.activeElement).toBe(input)
    expect([input.selectionStart, input.selectionEnd]).toEqual([1, 3])
    expect(wrapper.emitted('update:open')).toBeUndefined()
  } finally {
    wrapper.unmount()
    a.remove()
    b.remove()
  }
})

test('does not restore focus after the user moved it outside', async () => {
  const a = document.createElement('div'),
    b = document.createElement('div'),
    outside = document.createElement('button')
  document.body.append(a, b, outside)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: a },
    slots: { default: () => h('button'), content: () => h('input') },
  })
  try {
    await nextTick()
    a.querySelector('input')!.focus()
    const update = wrapper.setProps({ popupContainer: b })
    outside.focus()
    await update
    await nextTick()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    a.remove()
    b.remove()
    outside.remove()
  }
})

test('preserves focus inside an open shadow root', async () => {
  const a = document.createElement('div'),
    b = document.createElement('div')
  document.body.append(a, b)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: a },
    slots: { default: () => h('button'), content: () => h('div', { 'data-shadow-host': '' }) },
  })
  try {
    await nextTick()
    const host = a.querySelector<HTMLElement>('[data-shadow-host]')!
    const shadow = host.attachShadow({ mode: 'open' })
    const input = document.createElement('input')
    shadow.append(input)
    input.value = 'draft'
    input.focus()
    input.setSelectionRange(1, 3)
    await wrapper.setProps({ popupContainer: b })
    await nextTick()
    expect(b.querySelector('[data-shadow-host]')).toBe(host)
    expect(document.activeElement).toBe(host)
    expect(shadow.activeElement).toBe(input)
    expect([input.selectionStart, input.selectionEnd]).toEqual([1, 3])
  } finally {
    wrapper.unmount()
    a.remove()
    b.remove()
  }
})

test('does not refocus an opaque potential shadow host', async () => {
  const a = document.createElement('div'),
    b = document.createElement('div')
  document.body.append(a, b)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: a },
    slots: { default: () => h('button'), content: () => h('div', { tabindex: 0, 'data-opaque-host': '' }) },
  })
  try {
    await nextTick()
    const host = a.querySelector<HTMLElement>('[data-opaque-host]')!
    host.focus()
    const focus = vi.spyOn(host, 'focus')
    await wrapper.setProps({ popupContainer: b })
    await nextTick()
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
    a.remove()
    b.remove()
  }
})

test('restores focus across a same-origin iframe and back', async () => {
  const host = document.createElement('div'),
    frame = document.createElement('iframe')
  document.body.append(host, frame)
  const hasFocus = vi.spyOn(document, 'hasFocus').mockReturnValue(true)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: host },
    slots: { default: () => h('button'), content: () => h('input') },
  })
  try {
    await nextTick()
    const input = host.querySelector('input')!
    input.focus()
    await wrapper.setProps({ popupContainer: frame.contentDocument!.body })
    await nextTick()
    expect(frame.contentDocument!.activeElement).toBe(input)
    await wrapper.setProps({ popupContainer: host })
    await nextTick()
    expect(document.activeElement).toBe(input)
  } finally {
    wrapper.unmount()
    hasFocus.mockRestore()
    host.remove()
    frame.remove()
  }
})

test('does not restore across documents when the common document is not focused', async () => {
  const host = document.createElement('div'),
    frame = document.createElement('iframe')
  document.body.append(host, frame)
  const hasFocus = vi.spyOn(document, 'hasFocus').mockReturnValue(false)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: host },
    slots: { default: () => h('button'), content: () => h('input') },
  })
  try {
    await nextTick()
    const input = host.querySelector('input')!
    input.focus()
    const focus = vi.spyOn(input, 'focus')
    await wrapper.setProps({ popupContainer: frame.contentDocument!.body })
    await nextTick()
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
    hasFocus.mockRestore()
    host.remove()
    frame.remove()
  }
})

test('does not restore focus after the popup is unmounted during a move', async () => {
  const a = document.createElement('div'),
    b = document.createElement('div'),
    outside = document.createElement('button')
  document.body.append(a, b, outside)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: a },
    slots: { default: () => h('button'), content: () => h('input') },
  })
  try {
    await nextTick()
    a.querySelector('input')!.focus()
    const update = wrapper.setProps({ popupContainer: b })
    wrapper.unmount()
    outside.focus()
    await update
    await nextTick()
    expect(document.activeElement).toBe(outside)
    expect(b.querySelector('input')).toBeNull()
  } finally {
    a.remove()
    b.remove()
    outside.remove()
  }
})

test('does not restore focus after deactivation and works again on activation', async () => {
  const a = document.createElement('div'),
    b = document.createElement('div'),
    outside = document.createElement('button')
  document.body.append(a, b, outside)
  const shown = ref(true),
    target = ref<HTMLElement>(a)
  const wrapper = mount({
    render: () =>
      h(KeepAlive, null, {
        default: () =>
          shown.value
            ? h(
                Trigger,
                { open: true, popupContainer: target.value },
                { default: () => h('button'), content: () => h('input') },
              )
            : null,
      }),
  })
  try {
    await nextTick()
    a.querySelector('input')!.focus()
    target.value = b
    shown.value = false
    outside.focus()
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(outside)
    shown.value = true
    await nextTick()
    await nextTick()
    const input = b.querySelector('input')!
    input.focus()
    target.value = a
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(input)
    expect(a.querySelector('input')).toBe(input)
  } finally {
    wrapper.unmount()
    a.remove()
    b.remove()
    outside.remove()
  }
})

test.each(['open', 'closed'] as const)('preserves focus when moving popup between %s shadow roots', async (mode) => {
  const hosts = [document.createElement('div'), document.createElement('div')]
  document.body.append(...hosts)
  const roots = hosts.map((host) => host.attachShadow({ mode }))
  const targets = roots.map((root) => {
    const node = document.createElement('div')
    root.append(node)
    return node
  })
  const wrapper = mount(Trigger, {
    props: { open: true, trigger: 'click', popupContainer: targets[0] },
    slots: { default: () => h('button'), content: () => h('input', { 'data-inner': '' }) },
  })
  try {
    await nextTick()
    await nextTick()
    const input = roots[0].querySelector<HTMLInputElement>('input[data-inner]')!
    input.value = 'draft'
    input.focus()
    input.setSelectionRange(1, 3)
    await wrapper.setProps({ popupContainer: targets[1] })
    await nextTick()
    expect(roots[1].querySelector('input')).toBe(input)
    expect(roots[1].activeElement).toBe(input)
    expect([input.selectionStart, input.selectionEnd]).toEqual([1, 3])
    expect(wrapper.emitted('update:open')).toBeUndefined()
  } finally {
    wrapper.unmount()
    hosts.forEach((host) => host.remove())
  }
})

test.each(['open', 'closed'] as const)(
  'does not steal focus from another %s shadow root during a popup move',
  async (mode) => {
    const hosts = [document.createElement('div'), document.createElement('div'), document.createElement('div')]
    document.body.append(...hosts)
    const roots = hosts.map((host) => host.attachShadow({ mode }))
    const targets = roots.map((root) => {
      const node = document.createElement('div')
      root.append(node)
      return node
    })
    const other = document.createElement('button')
    roots[2].append(other)
    const wrapper = mount(Trigger, {
      props: { open: true, popupContainer: targets[0] },
      slots: { default: () => h('button'), content: () => h('input') },
    })
    try {
      await nextTick()
      await nextTick()
      roots[0].querySelector('input')!.focus()
      const update = wrapper.setProps({ popupContainer: targets[1] })
      other.focus()
      await update
      await nextTick()
      expect(roots[2].activeElement).toBe(other)
    } finally {
      wrapper.unmount()
      hosts.forEach((host) => host.remove())
    }
  },
)

test('does not restore focus to a shadow input moved outside the popup', async () => {
  const from = document.createElement('div')
  const to = document.createElement('div')
  const outside = document.createElement('div')
  document.body.append(from, to, outside)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: from },
    slots: { default: () => h('button'), content: () => h('div', { 'data-host': '' }) },
  })
  try {
    await nextTick()
    const host = from.querySelector('[data-host]')!
    const input = document.createElement('input')
    host.attachShadow({ mode: 'open' }).append(input)
    input.focus()
    const focus = vi.spyOn(input, 'focus')
    const update = wrapper.setProps({ popupContainer: to })
    await nextTick()
    expect(to.querySelector('[data-host]')).toBe(host)
    outside.append(input)
    await update
    await nextTick()
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
    from.remove()
    to.remove()
    outside.remove()
  }
})
