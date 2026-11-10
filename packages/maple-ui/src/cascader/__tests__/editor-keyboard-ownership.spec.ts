import { defineComponent, h, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Editor from '../CascaderEditor.vue'
import { cascaderProps } from '../props'

const Host = defineComponent({ props: cascaderProps, setup: (props) => () => h(Editor, { options: props }) })

test('disabled editor option cannot activate the previous option', async () => {
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta', disabled: true },
      ],
    },
  })
  try {
    await flushPromises()
    const editor = wrapper.getComponent(Editor)
    const [enabled, disabled] = editor.findAll('[role="menuitem"]')
    ;(enabled!.element as HTMLElement).focus()
    ;(disabled!.element as HTMLElement).focus()
    await disabled!.trigger('keydown', { key: 'Enter' })
    expect(editor.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('nested editor checkbox owns Enter without selecting a previous option', async () => {
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      multiple: true,
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    await flushPromises()
    const editor = wrapper.getComponent(Editor)
    const [first, second] = editor.findAll('[role="menuitem"]')
    ;(first!.element as HTMLElement).focus()
    const checkbox = second!.get('input[type="checkbox"]')
    ;(checkbox.element as HTMLInputElement).focus()
    await checkbox.trigger('keydown', { key: 'Enter' })
    expect(editor.emitted('update:modelValue')).toEqual([[['b']]])
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['ltr', 'ArrowRight'],
  ['rtl', 'ArrowLeft'],
])('disabled editor option does not expand an old branch in %s', async (dir, key) => {
  const wrapper = mount(Host, {
    attachTo: document.body,
    attrs: { dir },
    props: {
      options: [
        { value: 'a', label: 'Alpha', children: [{ value: 'a1', label: 'Child' }] },
        { value: 'b', label: 'Beta', disabled: true },
      ],
    },
  })
  try {
    await flushPromises()
    const editor = wrapper.getComponent(Editor)
    const [enabled, disabled] = editor.findAll('[role="menuitem"]')
    ;(enabled!.element as HTMLElement).focus()
    ;(disabled!.element as HTMLElement).focus()
    await disabled!.trigger('keydown', { key })
    expect(editor.findAll('[role="menuitem"]')).toHaveLength(2)
    expect(enabled!.attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['ArrowDown', 3, 2],
  ['ArrowUp', 0, 0],
])('editor vertical %s starts from disabled focused position', async (key, previous, expected) => {
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta', disabled: true },
        { value: 'c', label: 'Gamma' },
        { value: 'd', label: 'Delta' },
      ],
    },
  })
  try {
    await flushPromises()
    const items = wrapper.getComponent(Editor).findAll('[role="menuitem"]')
    ;(items[previous]!.element as HTMLElement).focus()
    ;(items[1]!.element as HTMLElement).focus()
    await items[1]!.trigger('keydown', { key })
    expect(items[expected]!.classes().some((name) => name.endsWith('-active'))).toBe(true)
    await nextTick()
    expect(document.activeElement).toBe(items[expected]!.element)
  } finally {
    wrapper.unmount()
  }
})

test('editor navigation does not steal focus moved outside before rendering', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    await flushPromises()
    const first = wrapper.getComponent(Editor).findAll('[role="menuitem"]')[0]!
    ;(first.element as HTMLElement).focus()
    first.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    outside.focus()
    await nextTick()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('editor moves focus to a newly mounted virtual option', async () => {
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: { options, virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 } },
  })
  try {
    await flushPromises()
    const editor = wrapper.getComponent(Editor)
    const items = editor.findAll('[role="menuitem"]')
    const last = items.at(-1)!
    const current = Number(last.attributes('title')!.replace('Item ', ''))
    expect(current).toBeLessThan(options.length - 1)
    ;(last.element as HTMLElement).focus()
    await last.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    const target = editor
      .findAll('[role="menuitem"]')
      .find((item) => item.attributes('title') === `Item ${current + 1}`)
    expect(target).toBeDefined()
    expect(document.activeElement).toBe(target!.element)
  } finally {
    wrapper.unmount()
  }
})

test('virtual navigation does not steal focus moved outside before mounting the target', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      options,
      virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 },
    },
  })
  try {
    await flushPromises()
    const last = wrapper.getComponent(Editor).findAll('[role="menuitem"]').at(-1)!
    ;(last.element as HTMLElement).focus()
    last.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    outside.focus()
    await flushPromises()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('unmount cancels pending virtual focus observation and late callbacks', async () => {
  const view = document.defaultView!
  const original = Object.getOwnPropertyDescriptor(view, 'MutationObserver')
  const disconnect = vi.fn()
  const observe = vi.fn()
  let callback: MutationCallback | undefined
  class SilentObserver {
    constructor(next: MutationCallback) {
      callback = next
    }
    observe = observe
    disconnect = disconnect
    takeRecords() {
      return []
    }
  }
  Object.defineProperty(view, 'MutationObserver', { configurable: true, writable: true, value: SilentObserver })
  const clear = vi.spyOn(view, 'clearTimeout')
  const outside = document.createElement('button')
  document.body.append(outside)
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      options,
      virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 },
    },
  })
  let mounted = true
  try {
    await flushPromises()
    const last = wrapper.getComponent(Editor).findAll('[role="menuitem"]').at(-1)!
    ;(last.element as HTMLElement).focus()
    last.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(observe).toHaveBeenCalled()
    wrapper.unmount()
    mounted = false
    expect(disconnect).toHaveBeenCalled()
    expect(clear).toHaveBeenCalled()
    outside.focus()
    callback?.([], {} as MutationObserver)
    await nextTick()
    expect(document.activeElement).toBe(outside)
  } finally {
    if (mounted) {
      wrapper.unmount()
    }
    outside.remove()
    clear.mockRestore()
    if (original) {
      Object.defineProperty(view, 'MutationObserver', original)
    } else {
      Reflect.deleteProperty(view, 'MutationObserver')
    }
  }
})

test.each(['pointer', 'timeout'])('%s cancels virtual focus observation and ignores late delivery', async (reason) => {
  const view = document.defaultView!
  const original = Object.getOwnPropertyDescriptor(view, 'MutationObserver')
  const disconnect = vi.fn()
  let callback: MutationCallback | undefined
  class SilentObserver {
    constructor(next: MutationCallback) {
      callback = next
    }
    observe() {}
    disconnect = disconnect
    takeRecords() {
      return []
    }
  }
  Object.defineProperty(view, 'MutationObserver', { configurable: true, writable: true, value: SilentObserver })
  const schedule = vi.spyOn(view, 'setTimeout')
  const clear = vi.spyOn(view, 'clearTimeout')
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(Host, {
    attachTo: document.body,
    props: {
      options,
      virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 },
    },
  })
  try {
    await flushPromises()
    const last = wrapper.getComponent(Editor).findAll('[role="menuitem"]').at(-1)!
    const current = Number(last.attributes('title')!.replace('Item ', ''))
    ;(last.element as HTMLElement).focus()
    last.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    const timeout = schedule.mock.calls.findLast((call) => call[1] === 1000)?.[0]
    expect(typeof timeout).toBe('function')
    if (reason === 'pointer') {
      document.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    } else {
      ;(timeout as () => void)()
    }
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(clear).toHaveBeenCalled()
    callback?.([], {} as MutationObserver)
    await flushPromises()
    expect(document.activeElement?.getAttribute('title')).not.toBe(`Item ${current + 1}`)
  } finally {
    wrapper.unmount()
    schedule.mockRestore()
    clear.mockRestore()
    if (original) {
      Object.defineProperty(view, 'MutationObserver', original)
    } else {
      Reflect.deleteProperty(view, 'MutationObserver')
    }
  }
})

test('editor navigation does not focus a matching option in a nested panel', async () => {
  const Panel = (await import('../CascaderPanel.vue')).default
  const NestedHost = defineComponent({
    props: cascaderProps,
    setup: (props) => () =>
      h(
        Editor,
        { options: props },
        {
          option: ({ data }: any) =>
            data.value === 'a'
              ? h('div', [data.label, h(Panel, { options: [{ value: 'b', label: 'Inner Beta' }] })])
              : data.label,
        },
      ),
  })
  const wrapper = mount(NestedHost, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Outer Beta' },
      ],
    },
  })
  try {
    await flushPromises()
    const editor = wrapper.getComponent(Editor)
    const alpha = editor.get('[role="menuitem"][title="Alpha"]')
    const inner = editor.get('[role="menuitem"][title="Inner Beta"]')
    const outer = editor.get('[role="menuitem"][title="Outer Beta"]')
    ;(alpha.element as HTMLElement).focus()
    await alpha.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    expect(document.activeElement).toBe(outer.element)
    expect(document.activeElement).not.toBe(inner.element)
  } finally {
    wrapper.unmount()
  }
})
