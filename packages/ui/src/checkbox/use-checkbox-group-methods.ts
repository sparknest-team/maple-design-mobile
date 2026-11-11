import { onActivated, onDeactivated, onScopeDispose } from 'vue'
import { bulkChoices } from './choice-state'
import type { ChoiceValue } from './choice-value-props'

export interface CheckboxGroupMethods {
  checkAll(): ChoiceValue[]
  inverseAll(): ChoiceValue[]
}

export interface ChoiceRegistration {
  value(): ChoiceValue
  disabled(): boolean
  readonly(): boolean
  element(): HTMLElement | null | undefined
}
export type RegisterChoice = (item: ChoiceRegistration) => () => void

/** Each group owns its registry. DOM order is read at invocation, never cached. */
export function useCheckboxGroupMethods(
  value: () => ChoiceValue[],
  commit: (next: ChoiceValue[]) => unknown,
  blocked: () => boolean,
  max: () => number | undefined,
) {
  const items = new Set<ChoiceRegistration>()
  let disposed = false
  const register: RegisterChoice = (item) => {
    if (!disposed) {
      items.add(item)
    }
    return () => {
      items.delete(item)
    }
  }
  onScopeDispose(() => {
    disposed = true
    items.clear()
  })

  function bulk(inverse: boolean): ChoiceValue[] {
    if (disposed || blocked()) {
      return [...value()]
    }
    const ordered = [...items].sort((left, right) => {
      const a = left.element()
      const b = right.element()
      if (!a || !b || a === b) {
        return 0
      }
      const position = a.compareDocumentPosition(b)
      if (position & 1) {
        return 0
      }
      return position & 4 ? -1 : position & 2 ? 1 : 0
    })
    const next = bulkChoices(
      value(),
      ordered.map((item) => ({
        value: item.value(),
        disabled: item.disabled(),
        readonly: item.readonly(),
      })),
      inverse,
      max(),
    )
    commit(next)
    return [...next]
  }
  const methods: CheckboxGroupMethods = { checkAll: () => bulk(false), inverseAll: () => bulk(true) }
  return { register, methods }
}

/** KeepAlive removal is separate from final scope disposal. */
export function useChoiceRegistration(register: RegisterChoice | undefined, item: ChoiceRegistration) {
  let remove = register?.(item)
  const stop = () => {
    remove?.()
    remove = undefined
  }
  onActivated(() => {
    stop()
    remove = register?.(item)
  })
  onDeactivated(stop)
  onScopeDispose(stop)
}
