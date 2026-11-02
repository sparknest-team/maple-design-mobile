import { computed, onScopeDispose, ref, watch, type Ref } from 'vue'
import { invokeBeforeHook, useActionGuard } from '../_hooks/use-action-guard'
import type { DialogAction, DialogBeforeClose } from './types'

export interface DialogControllerOptions {
  open: Ref<boolean>
  beforeClose: () => DialogBeforeClose | undefined
  onGuardError?: (error: unknown, action: DialogAction) => void
  confirmButtonLoading: () => boolean
  cancelButtonLoading: () => boolean
  confirmButtonDisabled: () => boolean
  cancelButtonDisabled: () => boolean
  commitOpen: (open: boolean) => void
  emitAction: (action: DialogAction, event?: Event) => void
}

/** Same-source action state machine; legacy callback semantics remain explicit. */
export function useDialog(options: DialogControllerOptions) {
  const guard = useActionGuard()
  const pendingAction = ref<DialogAction>()
  let closeRequestId = 0
  let disposed = false
  const mergedConfirmButtonLoading = computed(
    () => options.confirmButtonLoading() || (guard.pending.value && pendingAction.value === 'confirm'),
  )
  const mergedCancelButtonLoading = computed(
    () => options.cancelButtonLoading() || (guard.pending.value && pendingAction.value === 'cancel'),
  )
  const mergedConfirmButtonDisabled = computed(() => options.confirmButtonDisabled() || guard.pending.value)
  const mergedCancelButtonDisabled = computed(() => options.cancelButtonDisabled() || guard.pending.value)
  function retire() {
    closeRequestId++
    guard.cancel()
  }
  function commitClose(action: DialogAction, event?: Event) {
    if (disposed || !options.open.value) {
      return
    }
    retire()
    options.emitAction(action, event)
    options.commitOpen(false)
  }
  async function requestClose(action: DialogAction, event?: Event) {
    if (disposed || !options.open.value || guard.pending.value) {
      return
    }
    if (
      (action === 'confirm' && mergedConfirmButtonDisabled.value) ||
      (action === 'cancel' && mergedCancelButtonDisabled.value)
    ) {
      return
    }
    const hook = options.beforeClose()
    if (!hook) {
      commitClose(action, event)
      return
    }
    const requestId = ++closeRequestId
    pendingAction.value = action
    const outcome = await guard.run(
      action,
      (current, context) => invokeBeforeHook((done) => hook({ action: current }, done, context), context),
      event,
    )
    if (requestId !== closeRequestId || disposed || !options.open.value) {
      return
    }
    if (outcome.status === 'allowed') {
      commitClose(action, event)
    } else if (outcome.status === 'error') {
      options.onGuardError?.(outcome.error, action)
    }
  }

  function close() {
    commitClose('close')
  }
  watch(options.open, () => retire(), { flush: 'sync' })
  watch([() => options.beforeClose(), options.confirmButtonDisabled, options.cancelButtonDisabled], () => retire(), {
    flush: 'sync',
  })
  onScopeDispose(() => {
    disposed = true
    retire()
  })
  return {
    pending: guard.pending,
    pendingAction,
    mergedConfirmButtonLoading,
    mergedCancelButtonLoading,
    mergedConfirmButtonDisabled,
    mergedCancelButtonDisabled,
    requestClose,
    close,
  }
}
