import { computed, ref, watch } from 'vue'
import { normalizeTextInputValue } from '../utils/text-input-value'

interface InputValueProps {
  modelValue?: string
  defaultValue: string
  modelModifiers: { trim?: boolean }
  type: string
  maxLength: number | { length: number; errorOnly?: boolean }
  wordLength?: (value: string) => number
  wordSlice?: (value: string, maxLength: number) => string
}

export function useInputValue(
  props: Readonly<InputValueProps>,
  emitUpdate: (value: string) => void,
  emitChange: (value: string, ev: Event) => void,
) {
  const localValue = ref(props.defaultValue)
  const value = computed(() => props.modelValue ?? localValue.value)
  const focused = ref(false)
  const maxLength = computed(() => (typeof props.maxLength === 'object' ? props.maxLength.length : props.maxLength))
  const errorOnly = computed(() => typeof props.maxLength === 'object' && Boolean(props.maxLength.errorOnly))
  const getValueLength = (text: string) => props.wordLength?.(text) ?? text.length
  const valueLength = computed(() => getValueLength(value.value))
  let previousValue = value.value
  let pendingCommittedValue: string | undefined

  watch(
    () => props.modelValue,
    (nextValue) => {
      if (nextValue == null) {
        localValue.value = ''
      }
    },
  )

  watch(value, (nextValue, oldValue) => {
    if (nextValue === pendingCommittedValue) {
      previousValue = nextValue
      pendingCommittedValue = undefined
      return
    }
    previousValue = focused.value ? oldValue : nextValue
  })

  const updateValue = (text: string) => {
    const nextValue = normalizeTextInputValue(text, {
      numeric: props.type === 'number',
      maxLength: maxLength.value,
      errorOnly: errorOnly.value,
      wordLength: props.wordLength,
      wordSlice: props.wordSlice,
    })
    localValue.value = nextValue
    emitUpdate(nextValue)
    return nextValue
  }

  const commitValue = (ev: Event) => {
    const nextValue = props.modelModifiers.trim ? value.value.trim() : value.value
    if (nextValue !== value.value) {
      pendingCommittedValue = nextValue
      localValue.value = nextValue
      emitUpdate(nextValue)
    }
    if (nextValue !== previousValue) {
      previousValue = nextValue
      emitChange(nextValue, ev)
    }
  }

  const clearValue = () => {
    pendingCommittedValue = ''
    previousValue = ''
    updateValue('')
  }

  return { value, focused, maxLength, errorOnly, valueLength, getValueLength, updateValue, commitValue, clearValue }
}
