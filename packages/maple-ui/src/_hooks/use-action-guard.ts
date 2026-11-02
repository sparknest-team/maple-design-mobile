import { onActivated, onDeactivated, onScopeDispose, readonly, ref } from 'vue'
import type { Ref } from 'vue'

export interface ActionGuardContext {
  signal: AbortSignal
  event?: Event
}
export type ActionGuardResult = boolean | void
export type ActionGuard<Action> = (
  action: Action,
  context: ActionGuardContext,
) => ActionGuardResult | Promise<ActionGuardResult>
export type ActionGuardOutcome =
  { status: 'allowed' | 'rejected' | 'cancelled' | 'busy' } | { status: 'error'; error: unknown }

export interface ActionGuardRunner {
  pending: Readonly<Ref<boolean>>
  run: <Action>(action: Action, guard: ActionGuard<Action>, event?: Event) => Promise<ActionGuardOutcome>
  cancel: () => void
}

/** One active operation. Cancellation settles even when transport ignores AbortSignal. */
export function useActionGuard(): ActionGuardRunner {
  const pending = ref(false)
  let disposed = false
  let suspended = false
  let active:
    | {
        controller: AbortController
        settle: (outcome: ActionGuardOutcome) => void
      }
    | undefined
  function cancel() {
    const task = active
    active = undefined
    pending.value = false
    if (task) {
      task.controller.abort()
      task.settle({ status: 'cancelled' })
    }
  }
  function run<Action>(action: Action, guard: ActionGuard<Action>, event?: Event): Promise<ActionGuardOutcome> {
    if (disposed || suspended) {
      return Promise.resolve({ status: 'cancelled' })
    }
    if (active) {
      return Promise.resolve({ status: 'busy' })
    }
    pending.value = true
    return new Promise((resolve) => {
      const task = { controller: new AbortController(), settle: resolve }
      active = task
      void (async () => {
        let outcome: ActionGuardOutcome
        try {
          outcome = {
            status:
              (await guard(action, {
                signal: task.controller.signal,
                event,
              })) === false
                ? 'rejected'
                : 'allowed',
          }
        } catch (error) {
          outcome = { status: 'error', error }
        }
        if (active !== task) {
          return
        }
        active = undefined
        pending.value = false
        resolve(outcome)
      })()
    })
  }
  onDeactivated(() => {
    suspended = true
    cancel()
  })
  onActivated(() => {
    suspended = false
  })
  onScopeDispose(() => {
    disposed = true
    cancel()
  })
  return { pending: readonly(pending), run, cancel }
}

/** Callback completion is explicit; no inference from function arity. */
export type BeforeHookContext = ActionGuardContext
export type BeforeHookDone = (allowed?: boolean) => void
export type BeforeHookResult = boolean | void | Promise<boolean | void>
export function invokeBeforeHook(
  invoke: (done: BeforeHookDone) => BeforeHookResult,
  context: ActionGuardContext,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let settled = false
    const cleanup = () => context.signal.removeEventListener('abort', cancel)
    const done: BeforeHookDone = (allowed = true) => {
      if (settled) {
        return
      }
      settled = true
      cleanup()
      resolve(allowed !== false)
    }
    const cancel = () => done(false)
    const fail = (error: unknown) => {
      if (settled) {
        return
      }
      settled = true
      cleanup()
      reject(error)
    }
    if (context.signal.aborted) {
      done(false)
      return
    }
    context.signal.addEventListener('abort', cancel, { once: true })
    try {
      const result = invoke(done)
      if (typeof result === 'boolean') {
        done(result)
      } else if (result && typeof result.then === 'function') {
        void Promise.resolve(result).then((value) => done(value !== false), fail)
      }
      // Synchronous void is the existing callback protocol: wait for done().
    } catch (error) {
      fail(error)
    }
  })
}
