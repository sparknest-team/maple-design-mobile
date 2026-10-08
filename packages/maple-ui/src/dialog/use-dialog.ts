import { computed, ref, watch, type Ref } from 'vue'
import type { DialogAction, DialogBeforeCloseRefs } from './types'

export interface DialogControllerOptions {
  open: Ref<boolean>
  beforeClose: () => ((action: DialogAction, done: () => void, refs: DialogBeforeCloseRefs) => void) | undefined
  confirmButtonLoading: () => boolean
  cancelButtonLoading: () => boolean
  confirmButtonDisabled: () => boolean
  cancelButtonDisabled: () => boolean
  commitOpen: (open: boolean) => void
  emitAction: (action: DialogAction, event?: Event) => void
}

/** Same-source Dialog action state machine. Layout and presentation stay local to each library. */
export function useDialog(options: DialogControllerOptions) {
  const confirmButtonLoading = ref(false)
  const cancelButtonLoading = ref(false)
  const confirmButtonDisabled = ref(false)
  const cancelButtonDisabled = ref(false)
  let closeRequestId = 0

  const beforeCloseRefs: DialogBeforeCloseRefs = {
    confirmButtonLoading,
    cancelButtonLoading,
    confirmButtonDisabled,
    cancelButtonDisabled,
  }
  const mergedConfirmButtonLoading = computed(() => options.confirmButtonLoading() || confirmButtonLoading.value)
  const mergedCancelButtonLoading = computed(() => options.cancelButtonLoading() || cancelButtonLoading.value)
  const mergedConfirmButtonDisabled = computed(() => options.confirmButtonDisabled() || confirmButtonDisabled.value)
  const mergedCancelButtonDisabled = computed(() => options.cancelButtonDisabled() || cancelButtonDisabled.value)

  function resetTransientState() {
    confirmButtonLoading.value = false
    cancelButtonLoading.value = false
    confirmButtonDisabled.value = false
    cancelButtonDisabled.value = false
  }

  function commitClose(action: DialogAction, event?: Event) {
    closeRequestId += 1
    resetTransientState()
    options.emitAction(action, event)
    options.commitOpen(false)
  }

  function requestClose(action: DialogAction, event?: Event) {
    const beforeClose = options.beforeClose()
    if (!beforeClose) {
      commitClose(action, event)
      return
    }

    const requestId = ++closeRequestId
    let completed = false
    beforeClose(
      action,
      () => {
        if (!completed && requestId === closeRequestId && options.open.value) {
          completed = true
          commitClose(action, event)
        }
      },
      beforeCloseRefs,
    )
  }

  function close() {
    commitClose('close')
  }

  watch(options.open, (open, previousOpen) => {
    if (open !== previousOpen) {
      closeRequestId += 1
    }
    if (open) {
      resetTransientState()
    }
  })

  return {
    beforeCloseRefs,
    mergedConfirmButtonLoading,
    mergedCancelButtonLoading,
    mergedConfirmButtonDisabled,
    mergedCancelButtonDisabled,
    requestClose,
    close,
  }
}
