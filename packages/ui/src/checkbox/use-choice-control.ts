import { computed } from 'vue'
import { toggleChoice, useChoiceState } from './choice-state'

interface ControlProps<T> {
  modelValue?: T
  defaultValue: T
  value: string | number | boolean
}

export function useCheckboxControl(
  props: ControlProps<boolean | (string | number | boolean)[] | null>,
  notify: (value: boolean | (string | number | boolean)[] | null, event?: Event) => void,
  blocked: () => boolean,
  group?: {
    value: () => (string | number | boolean)[]
    change: (value: (string | number | boolean)[], event?: Event) => void
  },
) {
  const state = useChoiceState(() => props.modelValue, props.defaultValue, notify, blocked)
  const value = computed(() => (group ? group.value() : state.value.value))
  const checked = computed(() =>
    Array.isArray(value.value) ? value.value.includes(props.value) : Boolean(value.value),
  )
  function toggle(next = !checked.value, event?: Event) {
    if (blocked()) {
      return
    }
    const current = value.value
    const changed = Array.isArray(current) ? toggleChoice(current, props.value, next) : next
    if (group && Array.isArray(changed)) {
      group.change(changed, event)
    } else {
      state.commit(changed, event)
    }
  }
  return { checked, toggle }
}

export function useRadioControl(
  props: ControlProps<string | number | boolean | null>,
  notify: (value: string | number | boolean, event?: Event) => void,
  blocked: () => boolean,
  group?: {
    value: () => string | number | boolean | null
    change: (value: string | number | boolean, event?: Event) => void
  },
) {
  const state = useChoiceState<string | number | boolean | null>(
    () => props.modelValue,
    props.defaultValue,
    (value, event) => {
      if (value !== null) {
        notify(value, event)
      }
    },
    blocked,
  )
  const value = computed(() => (group ? group.value() : state.value.value))
  const checked = computed(() => Object.is(value.value, props.value))
  function select(event?: Event) {
    if (blocked() || checked.value) {
      return
    }
    if (group) {
      group.change(props.value, event)
    } else {
      state.commit(props.value, event)
    }
  }
  return { checked, select }
}
