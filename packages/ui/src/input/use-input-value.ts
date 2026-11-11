import { computed, ref, watch } from 'vue'
import { resolveEmptyValue, useEmptyValues } from '../utils/empty-value'
import { normalizeTextInputValue, resolveTextInputMaxLength, type TextInputMaxLength } from '../utils/text-input-value'

interface InputValueProps {
  emptyValues?: readonly unknown[]
  emptyValue?: string | null | (() => string | null)
  modelValue?: string | null
  defaultValue: string
  modelModifiers: { trim?: boolean }
  type: string
  maxLength: TextInputMaxLength
  wordLength?: (value: string) => number
  wordSlice?: (value: string, maxLength: number) => string
}

export function useInputValue(
  props: Readonly<InputValueProps>,
  emitUpdate: (value: string | null, notifyModel?: boolean) => void,
  emitChange: (value: string | null, ev: Event) => void,
) {
  const localValue = ref(props.defaultValue)
  const emptyPolicy = useEmptyValues(props)
  const value = computed(() => {
    const raw = props.modelValue === null ? null : (props.modelValue ?? localValue.value)
    return emptyPolicy.isEmpty(raw) ? '' : (raw ?? '')
  })
  const focused = ref(false)
  const limit = computed(() => resolveTextInputMaxLength(props.maxLength))
  const maxLength = computed(() => limit.value.length)
  const errorOnly = computed(() => limit.value.errorOnly)
  const getValueLength = (text: string) => props.wordLength?.(text) ?? text.length
  const valueLength = computed(() => getValueLength(value.value))
  let previousValue: string | null = value.value
  let pendingCommittedValue: string | null | undefined
  let requestedValue: string | undefined
  let lastModelProposal: string | null | undefined

  watch(
    () => props.modelValue,
    (nextValue) => {
      if (nextValue == null) {
        localValue.value = ''
      }
    },
  )

  watch(focused, (active) => {
    if (active) {
      previousValue = value.value
    }
  })

  watch(value, (nextValue) => {
    if (nextValue === pendingCommittedValue) {
      previousValue = nextValue
      pendingCommittedValue = undefined
      return
    }
    if (nextValue === requestedValue || (props.modelModifiers.trim && nextValue === requestedValue?.trim())) {
      requestedValue = undefined
      return
    }
    lastModelProposal = undefined
    previousValue = nextValue
  })

  const updateValue = (text: string, beforeUpdate?: (value: string) => void) => {
    const nextValue = normalizeTextInputValue(text, {
      numeric: props.type === 'number',
      maxLength: maxLength.value,
      errorOnly: errorOnly.value,
      wordLength: props.wordLength,
      wordSlice: props.wordSlice,
    })
    beforeUpdate?.(nextValue)
    requestedValue = nextValue
    localValue.value = nextValue
    lastModelProposal = props.modelModifiers.trim ? nextValue.trim() : nextValue
    emitUpdate(nextValue)
    return nextValue
  }

  const commitValue = (ev: Event) => {
    const nextValue = props.modelModifiers.trim ? value.value.trim() : value.value
    if (nextValue !== value.value) {
      pendingCommittedValue = nextValue
      localValue.value = nextValue
      // Vue already trims model listeners during input; only a new proposal is needed.
      const notifyModel = nextValue !== lastModelProposal
      lastModelProposal = nextValue
      emitUpdate(nextValue, notifyModel)
    }
    if (nextValue !== previousValue) {
      previousValue = nextValue
      emitChange(nextValue, ev)
    }
  }

  const clearValue = (event: Event, beforeUpdate?: (value: string | null) => void) => {
    const cleared = resolveEmptyValue(props, '')
    pendingCommittedValue = cleared
    const previous = value.value
    const next = cleared
    beforeUpdate?.(next)
    localValue.value = next ?? ''
    lastModelProposal = typeof next === 'string' && props.modelModifiers.trim ? next.trim() : next
    emitUpdate(next)
    previousValue = props.modelValue !== undefined ? value.value : next
    if (previous !== next) {
      emitChange(next, event)
    }
  }

  return {
    value,
    focused,
    maxLength,
    errorOnly,
    valueLength,
    getValueLength,
    updateValue,
    commitValue,
    clearValue,
  }
}
