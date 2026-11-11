import { defineComponent, h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Dialog from '../Dialog.vue'
import { useDialog } from '../use-dialog'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
function setup(extra: Record<string, any> = {}) {
  const open = ref(true),
    disabled = ref(false),
    emit = vi.fn(),
    error = vi.fn()
  let state!: ReturnType<typeof useDialog>
  const owner = mount(
    defineComponent({
      setup() {
        state = useDialog({
          open,
          beforeClose: () => extra.beforeClose,
          confirmButtonLoading: () => false,
          cancelButtonLoading: () => false,
          confirmButtonDisabled: () => disabled.value,
          cancelButtonDisabled: () => false,
          commitOpen: (value) => {
            open.value = value
          },
          emitAction: emit,
          onGuardError: error,
        })
        return () => h('div')
      },
    }),
  )
  owners.push(owner)
  return {
    owner,
    open,
    disabled,
    emit,
    error,
    get state() {
      return state
    },
  }
}
for (const [name, result, allowed] of [
  ['true', true, true],
  ['void', undefined, true],
  ['false', false, false],
] as const) {
  test(`new guard ${name} settles as ${allowed}`, async () => {
    const legacy = vi.fn(),
      modern = vi.fn(async () => result)
    const f = setup({ beforeClose: modern })
    await f.state.requestClose('confirm')
    expect(f.open.value).toBe(!allowed)
    expect(legacy).not.toHaveBeenCalled()
    expect(modern).toHaveBeenCalledTimes(1)
    expect(f.emit).toHaveBeenCalledTimes(allowed ? 1 : 0)
  })
}
test('pending guard blocks duplicate actions, exposes loading/disabled, and emits only the accepted action', async () => {
  const task = deferred<void>()
  let signal!: AbortSignal
  const modern = vi.fn((_payload, _done, context) => {
    signal = context.signal
    return task.promise
  })
  const f = setup({ beforeClose: modern })
  const pending = f.state.requestClose('confirm', new Event('click'))
  expect(f.state.mergedConfirmButtonLoading.value).toBe(true)
  expect(f.state.mergedCancelButtonDisabled.value).toBe(true)
  await f.state.requestClose('cancel')
  expect(modern).toHaveBeenCalledTimes(1)
  task.resolve()
  await pending
  expect(f.emit).toHaveBeenCalledTimes(1)
  expect(f.emit.mock.calls[0][0]).toBe('confirm')
  expect(signal.aborted).toBe(false)
})
for (const kind of ['throw', 'reject']) {
  test(`${kind} rejects, emits guard-error context and restores flags; retry remains possible`, async () => {
    const cause = new Error('blocked')
    const modern = vi.fn(() => {
      if (kind === 'throw') {
        throw cause
      }
      return Promise.reject(cause)
    })
    const f = setup({ beforeClose: modern })
    await f.state.requestClose('confirm')
    expect(f.open.value).toBe(true)
    expect(f.error).toHaveBeenCalledWith(cause, 'confirm')
    expect(f.state.mergedConfirmButtonLoading.value).toBe(false)
    modern.mockImplementation(() => true as any)
    await f.state.requestClose('confirm')
    expect(f.open.value).toBe(false)
  })
}
for (const reason of ['external-close', 'force-close', 'disable', 'unmount']) {
  test(`${reason} cancels and retires a noncooperating promise`, async () => {
    const task = deferred<boolean>()
    let signal!: AbortSignal
    const f = setup({
      beforeClose: (_payload: unknown, _done: unknown, context: { signal: AbortSignal }) => {
        signal = context.signal
        return task.promise
      },
    })
    const pending = f.state.requestClose('confirm')
    if (reason === 'external-close') {
      f.open.value = false
    }
    if (reason === 'force-close') {
      f.state.close()
    }
    if (reason === 'disable') {
      f.disabled.value = true
    }
    if (reason === 'unmount') {
      f.owner.unmount()
    }
    await pending
    expect(signal.aborted).toBe(true)
    if (reason === 'external-close') {
      f.open.value = true
    }
    task.resolve(true)
    await flushPromises()
    expect(f.emit.mock.calls.filter((call) => call[0] === 'confirm')).toHaveLength(0)
    expect(f.state.mergedConfirmButtonLoading.value).toBe(false)
  })
}
test('callback done waits, is idempotent, and gets retired by forced closure', async () => {
  const callbacks: ((allowed?: boolean) => void)[] = []
  const f = setup({
    beforeClose: (_action: unknown, done: (allowed?: boolean) => void) => {
      callbacks.push(done)
    },
  })
  const pending = f.state.requestClose('confirm')
  expect(f.open.value).toBe(true)
  callbacks[0](false)
  await pending
  expect(f.open.value).toBe(true)
  const accepted = f.state.requestClose('confirm')
  callbacks[1]()
  callbacks[1]()
  await accepted
  expect(f.open.value).toBe(false)
  expect(f.emit).toHaveBeenCalledTimes(1)
})
test('legacy rejected async return restores transient refs and does not leak an unhandled rejection', async () => {
  const cause = new Error('legacy')
  const f = setup({
    beforeClose: (_payload: unknown, _done: unknown, _context: unknown) => {
      return Promise.reject(cause)
    },
  })
  await f.state.requestClose('confirm')
  await flushPromises()
  expect(f.error).toHaveBeenCalledWith(cause, 'confirm')
  expect(f.state.mergedConfirmButtonLoading.value).toBe(false)
  expect(f.open.value).toBe(true)
})
test('component forwards modern guard and surfaces the guard-error event', async () => {
  const cause = new Error('component guard')
  const owner = mount(Dialog, {
    props: {
      defaultOpen: true,
      beforeClose: () => {
        throw cause
      },
    },
  })
  owners.push(owner)
  ;(owner.vm as any).confirm()
  await flushPromises()
  expect(owner.emitted('guard-error')?.[0]).toEqual([cause, 'confirm'])
  expect(owner.emitted('confirm')).toBeUndefined()
})

test('replacing a component guard cancels its old attempt before the next one can commit', async () => {
  const task = deferred<boolean>()
  let signal!: AbortSignal
  const owner = mount(Dialog, {
    props: {
      defaultOpen: true,
      beforeClose: (_payload, _done, context) => {
        signal = context.signal
        return task.promise
      },
    },
  })
  owners.push(owner)
  ;(owner.vm as any).confirm()
  await owner.setProps({ beforeClose: () => true })
  await flushPromises()
  expect(signal.aborted).toBe(true)
  ;(owner.vm as any).confirm()
  await flushPromises()
  expect(owner.emitted('confirm')).toHaveLength(1)
  task.resolve(true)
  await flushPromises()
  expect(owner.emitted('confirm')).toHaveLength(1)
})
