import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { useActionGuard } from '../use-action-guard'
import { usePendingFeedback } from '../use-pending-feedback'

const task = () => {
  let resolve!: (v?: any) => void
  let reject!: (v: unknown) => void
  const promise = new Promise<any>((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
describe('pending feedback lifetime', () => {
  test('tracks overlapping explicit hooks, cancellation and stale completion', async () => {
    let state!: ReturnType<typeof usePendingFeedback>
    const w = mount(
      defineComponent({
        setup() {
          state = usePendingFeedback()
          return () => h('div')
        },
      }),
    )
    try {
      const first = task(),
        second = task(),
        third = task()
      const a = state.track(() => first.promise),
        b = state.track(() => second.promise)
      expect(state.pending.value).toBe(true)
      first.resolve()
      await a
      expect(state.pending.value).toBe(true)
      state.cancel()
      const c = state.track(() => third.promise)
      second.resolve()
      await b
      expect(state.pending.value).toBe(true)
      third.resolve()
      await c
      expect(state.pending.value).toBe(false)
      expect(state.track(() => true)).toBe(true)
      expect(state.pending.value).toBe(false)
      const error = new Error('rejected')
      const rejected = state.track(() => Promise.reject(error))
      await expect(rejected).rejects.toBe(error)
      expect(state.pending.value).toBe(false)
    } finally {
      w.unmount()
    }
  })
  test('deactivation cancels guard feedback and late results cannot clear a new wait', async () => {
    let state!: ReturnType<typeof useActionGuard>
    const visible = ref(true)
    const Host = defineComponent({
      setup() {
        state = useActionGuard()
        return () => h('div')
      },
    })
    const w = mount({ render: () => h(KeepAlive, null, { default: () => (visible.value ? h(Host) : null) }) })
    try {
      const first = task(),
        second = task()
      const old = state.run('old', () => first.promise)
      visible.value = false
      await nextTick()
      expect((await old).status).toBe('cancelled')
      expect(state.pending.value).toBe(false)
      visible.value = true
      await nextTick()
      const current = state.run('new', () => second.promise)
      first.resolve(true)
      await flushPromises()
      expect(state.pending.value).toBe(true)
      second.resolve(false)
      expect((await current).status).toBe('rejected')
      expect(state.pending.value).toBe(false)
    } finally {
      w.unmount()
    }
  })
})
