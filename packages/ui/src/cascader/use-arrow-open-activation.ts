import { nextTick, onDeactivated, onScopeDispose, watch, type Ref } from 'vue'

/** Keep the initial keyboard request only while its field still owns interaction. */
export function useArrowOpenActivation(options: {
  open: Readonly<Ref<boolean>>
  candidates: Readonly<Ref<unknown>>
  activeKey: Readonly<Ref<string | undefined>>
  loading: Readonly<Ref<boolean>>
  blocked: () => boolean
  firstKey: () => string | undefined
  activate: (key: string) => void
}) {
  let target: Element | undefined
  let generation = 0

  const cancel = () => {
    generation++
    target?.removeEventListener('blur', cancel)
    target?.ownerDocument.removeEventListener('pointerdown', cancel, true)
    target = undefined
  }
  const attempt = () => {
    if (!target) {
      return
    }
    if (
      !target.isConnected ||
      (target.getRootNode() as Document | ShadowRoot).activeElement !== target ||
      options.blocked()
    ) {
      cancel()
      return
    }
    if (!options.open.value) {
      return
    }
    if (options.activeKey.value) {
      cancel()
      return
    }
    if (options.loading.value) {
      return
    }
    const key = options.firstKey()
    if (key !== undefined) {
      cancel()
      options.activate(key)
    }
  }
  watch([options.open, options.candidates, options.activeKey, options.loading, options.blocked], attempt, {
    flush: 'post',
  })
  watch(
    options.open,
    (open, wasOpen) => {
      if (!open && wasOpen) {
        cancel()
      }
    },
    { flush: 'sync' },
  )
  onDeactivated(cancel)
  onScopeDispose(cancel)

  const begin = (element: Element, requestOpen: () => void) => {
    cancel()
    target = element
    const token = generation
    element.addEventListener('blur', cancel, { once: true })
    element.ownerDocument.addEventListener('pointerdown', cancel, true)
    try {
      requestOpen()
    } catch (error) {
      cancel()
      throw error
    }
    void nextTick(() => {
      if (token !== generation) {
        return
      }
      // A controlled parent that did not accept the request owns the closed state.
      if (!options.open.value) {
        cancel()
      } else {
        attempt()
      }
    })
  }
  return { begin, cancel }
}
