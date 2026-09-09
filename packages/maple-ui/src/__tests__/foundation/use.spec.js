import { createSSRApp, defineComponent, effectScope, h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { useClickOutside } from '../../../../maple-use/src/useClickOutside'
import { useEventListener } from '../../../../maple-use/src/useEventListener'
import { useVModel } from '../../../../maple-use/src/useVModel'

describe('foundation model contract', () => {
  test.each([true, false])('emit uses update:key (passive=%s)', async (passive) => {
    const emit = vi.fn()
    const scope = effectScope()
    const model = scope.run(() => useVModel(reactive({ open: false }), 'open', { emit, passive }))
    model.value = true
    await nextTick()
    expect(emit.mock.calls).toEqual([['update:open', true]])
    scope.stop()
  })
  test('callback mode preserves onUpdate:key and explicit event override', async () => {
    const listener = vi.fn()
    const custom = vi.fn()
    const scope = effectScope()
    scope.run(() => {
      useVModel({ value: 0, 'onUpdate:value': listener }, 'value', { passive: false }).value = 1
      useVModel({ value: 0 }, 'value', { passive: false, emit: custom, eventName: 'change' }).value = 2
    })
    expect(listener.mock.calls).toEqual([[1]])
    expect(custom.mock.calls).toEqual([['change', 2]])
    scope.stop()
  })
  test('external updates do not echo and false/zero/empty remain valid', async () => {
    const props = reactive({ value: undefined })
    const emit = vi.fn()
    const scope = effectScope()
    const model = scope.run(() => useVModel(props, 'value', { emit, defaultValue: 'fallback' }))
    expect(model.value).toBe('fallback')
    for (const value of [false, 0, '', 'next']) {
      props.value = value
      await nextTick()
      await nextTick()
      expect(model.value).toBe(value)
    }
    expect(emit).not.toHaveBeenCalled()
    model.value = 'local'
    await nextTick()
    expect(emit.mock.calls).toEqual([['update:value', 'local']])
    scope.stop()
  })
  test('non-passive model remains controlled and instances are independent', () => {
    const props = reactive({ value: 1 })
    const emit = vi.fn()
    const scope = effectScope()
    scope.run(() => {
      const first = useVModel(props, 'value', { passive: false, emit })
      const second = useVModel(reactive({ value: 9 }), 'value', { passive: false })
      first.value = 2
      expect(first.value).toBe(1)
      expect(second.value).toBe(9)
    })
    scope.stop()
  })
})

describe('foundation event lifecycle', () => {
  test.each(['ref', 'getter'])('rebinds a dynamic %s and cleans the actual target', async (kind) => {
    const first = document.createElement('button')
    const second = document.createElement('button')
    const target = ref(first)
    const listener = vi.fn()
    let cleanup
    const wrapper = mount({
      setup() {
        cleanup = useEventListener(kind === 'ref' ? target : () => target.value, 'click', listener)
        return () => h('div')
      },
    })
    first.click()
    target.value = second
    await nextTick()
    first.click()
    second.click()
    expect(listener).toHaveBeenCalledTimes(2)
    cleanup()
    cleanup()
    second.click()
    expect(listener).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })
  test('KeepAlive detaches listeners while inactive and restores once', async () => {
    const active = ref(true)
    const target = document.createElement('button')
    const listener = vi.fn()
    const Child = defineComponent({
      setup() {
        useEventListener(target, 'click', listener)
        return () => h('div')
      },
    })
    const wrapper = mount({ render: () => h(KeepAlive, null, { default: () => (active.value ? h(Child) : null) }) })
    await nextTick()
    target.click()
    active.value = false
    await nextTick()
    target.click()
    active.value = true
    await nextTick()
    target.click()
    expect(listener).toHaveBeenCalledTimes(2)
    wrapper.unmount()
    target.click()
    expect(listener).toHaveBeenCalledTimes(2)
  })
  test('SSR always returns a callable cleanup', async () => {
    const previous = globalThis.window
    vi.stubGlobal('window', undefined)
    let cleanup
    try {
      await renderToString(
        createSSRApp({
          setup() {
            cleanup = useEventListener(
              () => window,
              'click',
              () => {},
            )
            return () => h('div')
          },
        }),
      )
      expect(typeof cleanup).toBe('function')
      cleanup()
    } finally {
      vi.stubGlobal('window', previous)
    }
  })
  test('outside click respects a shadow DOM composed path', async () => {
    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    const target = document.createElement('button')
    shadow.appendChild(target)
    document.body.appendChild(host)
    const listener = vi.fn()
    const wrapper = mount({
      setup() {
        useClickOutside(target, 'click', listener)
        return () => h('div')
      },
    })
    target.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }))
    expect(listener).not.toHaveBeenCalled()
    document.body.click()
    expect(listener).toHaveBeenCalledTimes(1)
    wrapper.unmount()
    document.body.click()
    expect(listener).toHaveBeenCalledTimes(1)
    host.remove()
  })
})
