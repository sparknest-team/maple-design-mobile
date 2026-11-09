import { computed } from 'vue'
import { toggleChoice, useChoiceState } from './choice-state'
import type { CheckboxModel, ChoiceValue, RadioModel } from './choice-value-props'

interface ControlProps<T> {
  modelValue?: T
  defaultValue: T
  value: ChoiceValue
}

export function useCheckboxControl(
  props: ControlProps<CheckboxModel>,
  notify: (value: CheckboxModel, event?: Event) => void,
  blocked: () => boolean,
  group?: { value: () => ChoiceValue[]; change: (value: ChoiceValue[], event?: Event) => void },
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
  props: ControlProps<RadioModel>,
  notify: (value: ChoiceValue, event?: Event) => void,
  blocked: () => boolean,
  group?: { value: () => RadioModel; change: (value: ChoiceValue, event?: Event) => void },
) {
  const state = useChoiceState<RadioModel>(
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
