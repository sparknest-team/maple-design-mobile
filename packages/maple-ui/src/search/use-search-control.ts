import {
  computed,
  getCurrentInstance,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  shallowRef,
  watch,
} from 'vue'
import type { SetupContext } from 'vue'
import { useInputForm } from '../input/use-input-form'
import type { SearchResolvedProps } from './props'
import type { SearchResult } from './result'
import { useSearchLocale } from './use-search-locale'

export const searchEmits = {
  'update:modelValue': (_value: string | null) => true,
  'update:modelField': (_value: string) => true,
  'update:model': (_value: Record<string, unknown>) => true,
  input: (_value: string, _event: Event) => true,
  change: (_value: string | null, _event: Event) => true,
  clear: (_event: Event) => true,
  search: (_result: SearchResult, _event: Event) => true,
  cancel: (_event: Event) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
}

export function useSearchControl(
  props: SearchResolvedProps,
  emit: SetupContext<typeof searchEmits>['emit'],
  input: { value: { focus(): void; blur(): void } | null | undefined },
  reading: () => boolean = () => false,
) {
  const { searchText, cancelText } = useSearchLocale()
  const instance = getCurrentInstance()
  const editMode = computed(() => props.editMode ?? 'direct')
  const popupInput = shallowRef<{ focus(): void; blur(): void }>()
  const activeInput = shallowRef<{ focus(): void; blur(): void }>()
  const value = ref<string | null>(props.defaultValue)
  const field = ref<string | undefined>(props.defaultField ?? props.fields[0]?.value)
  const historyMenuVisible = ref(false)
  const historyPopupVisible = ref(false)
  const historyPopupClosing = ref(false)
  let disposed = false
  let inactive = false
  const { mergedDisabled, mergedReadonly, mergedSize, eventHandlers } = useInputForm(props)
  onActivated(() => {
    inactive = false
  })
  onDeactivated(() => {
    inactive = true
    historyMenuVisible.value = false
    historyPopupVisible.value = false
    historyPopupClosing.value = false
  })
  onBeforeUnmount(() => {
    disposed = true
  })

  const computedField = computed(() => props.modelField ?? field.value)
  const computedValue = computed(() => {
    if (props.modelValue !== undefined) {
      return props.modelValue
    }
    if (props.model && computedField.value !== undefined) {
      return String(props.model[computedField.value] ?? '')
    }
    return value.value
  })
  const searchPlaceholder = computed(
    () => props.fields.find((item) => item.value === computedField.value)?.placeholder ?? props.placeholder,
  )
  const searchDisabled = computed(() =>
    Boolean(mergedDisabled.value || mergedReadonly.value || props.loading || reading()),
  )
  const effectiveShowAction = computed(() => props.showAction || props.searchButton)
  const effectiveActionType = computed(() => (props.searchButton ? 'search' : props.actionType))
  const effectiveActionText = computed(() =>
    props.searchButton
      ? (props.buttonText ?? searchText.value)
      : (props.actionText ?? (props.actionType === 'search' ? searchText.value : cancelText.value)),
  )
  const historyOptions = computed(() => props.recentSearches.map((item) => ({ value: item, label: item })))

  watch(
    () => props.fields.map((item) => item.value),
    (values) => {
      if (props.modelField === undefined && !values.includes(field.value ?? '')) {
        field.value = values.includes(props.defaultField ?? '') ? props.defaultField : values[0]
      }
    },
  )

  function updateValue(nextValue: string | null, nextField = computedField.value) {
    value.value = nextValue
    emit('update:modelValue', nextValue)
    if (props.model && props.fields.length) {
      const proposal = { ...props.model }
      for (const item of props.fields) {
        proposal[item.value] = undefined
      }
      if (nextField !== undefined) {
        proposal[nextField] = nextValue
      }
      emit('update:model', proposal)
    }
  }

  function getRecentSearches(nextValue: string) {
    const keywords = [nextValue, ...props.recentSearches].map((item) => item.trim()).filter(Boolean)
    const limit = Number.isFinite(props.maxSearchHistoryCount)
      ? Math.max(0, Math.floor(props.maxSearchHistoryCount))
      : 0
    return [...new Set(keywords)].slice(0, limit)
  }

  function getResult(): SearchResult {
    return {
      modelField: computedField.value,
      modelValue: computedValue.value,
      model: props.model,
      recentSearches: getRecentSearches(computedValue.value ?? ''),
    }
  }

  function resetHistory() {
    historyMenuVisible.value = false
    historyPopupVisible.value = false
    historyPopupClosing.value = false
    activeInput.value = undefined
  }
  function closeHistoryMenu() {
    historyMenuVisible.value = false
  }
  function closeHistoryPopup() {
    if (historyPopupVisible.value) {
      historyPopupClosing.value = true
    }
    historyPopupVisible.value = false
    closeHistoryMenu()
  }
  function openHistory() {
    if (disposed || inactive || searchDisabled.value || historyPopupClosing.value || !props.recentSearches.length) {
      return
    }
    if (editMode.value === 'popup') {
      historyPopupVisible.value = true
    } else {
      historyMenuVisible.value = true
    }
  }
  function handleHistoryMenuVisibleChange(open: boolean) {
    historyMenuVisible.value =
      open && editMode.value === 'direct' && !searchDisabled.value && props.recentSearches.length > 0
  }
  function handlePopupVisibleChange(open: boolean) {
    if (!open) {
      closeHistoryPopup()
    } else if (editMode.value === 'popup') {
      openHistory()
    }
  }
  function handleHistoryPopupClosed() {
    blur()
    activeInput.value = undefined
    historyPopupClosing.value = false
  }
  watch([searchDisabled, () => props.recentSearches.length, () => editMode.value], () => {
    closeHistoryPopup()
    if (editMode.value === 'direct') {
      historyPopupClosing.value = false
    }
  })

  function handleInput(nextValue: string, event: Event) {
    emit('input', nextValue, event)
    openHistory()
  }
  function handleChange(nextValue: string | null, event?: Event) {
    // Search renders direct Input children, whose commits have native sources.
    if (!event) {
      return
    }

    emit('change', nextValue, event)
  }
  function handleClear(event: Event) {
    emit('clear', event)
    openHistory()
  }
  function handleFocus(event: FocusEvent) {
    activeInput.value = input.value ?? undefined
    openHistory()
    emit('focus', event)
  }
  function handlePopupFocus(event: FocusEvent) {
    activeInput.value = popupInput.value
    emit('focus', event)
  }
  function setPopupInput(target: { focus(): void; blur(): void } | undefined) {
    popupInput.value = target
    if (historyPopupVisible.value && target) {
      activeInput.value = target
    }
  }
  function handleBlur(event: FocusEvent) {
    emit('blur', event)
  }
  async function handleSearch(event: Event = new Event('search')) {
    if (searchDisabled.value) {
      return
    }
    closeHistoryPopup()
    await nextTick()
    if (!disposed && !inactive && !searchDisabled.value) {
      emit('search', getResult(), event)
    }
  }
  async function handleHistorySelect(nextValue: unknown, event: Event = new Event('select')) {
    if (searchDisabled.value) {
      return
    }
    const normalized = String(nextValue)
    updateValue(normalized)
    emit('change', normalized, event)
    eventHandlers.value?.onChange?.(event)
    await handleSearch(event)
  }
  function handleHistoryMenuSelect(nextValue: unknown, _option?: unknown, event?: Event) {
    return handleHistorySelect(nextValue, event)
  }
  function handleFieldChange(nextField: unknown, event: Event = new Event('change')) {
    if (searchDisabled.value) {
      return
    }
    const normalized = String(nextField)
    field.value = normalized
    emit('update:modelField', normalized)
    updateValue('', normalized)
    emit('change', '', event)
    eventHandlers.value?.onChange?.(event)
    nextTick(() => {
      if (!disposed && !inactive) {
        focus()
      }
    })
  }
  function handleAction(event: Event) {
    if (searchDisabled.value) {
      return
    }
    if (effectiveActionType.value === 'search') {
      return handleSearch(event)
    }
    return handleCancel(event)
  }
  async function handleCancel(event: Event) {
    if (searchDisabled.value) {
      return
    }
    closeHistoryPopup()
    updateValue('')
    emit('cancel', event)
    emit('change', '', event)
    eventHandlers.value?.onChange?.(event)
    await nextTick()
    if (!disposed && !inactive) {
      blur()
    }
  }
  function focus() {
    ;(historyPopupVisible.value ? (popupInput.value ?? input.value) : input.value)?.focus()
  }
  function blur() {
    ;(activeInput.value ?? input.value)?.blur()
  }

  return {
    editMode,
    searchText,
    cancelText,
    computedValue,
    computedField,
    searchPlaceholder,
    searchDisabled,
    mergedDisabled,
    mergedReadonly,
    mergedSize,
    effectiveShowAction,
    effectiveActionType,
    effectiveActionText,
    historyOptions,
    historyMenuVisible,
    historyPopupVisible,
    historyPopupClosing,
    updateValue,
    getResult,
    handleFieldChange,
    handleInput,
    handleChange,
    handleClear,
    handleFocus,
    handlePopupFocus,
    setPopupInput,
    handleBlur,
    handleSearch,
    handleAction,
    handleCancel,
    handleHistorySelect,
    handleHistoryMenuSelect,
    handleHistoryMenuVisibleChange,
    handlePopupVisibleChange,
    handleHistoryPopupClosed,
    openHistory,
    closeHistoryPopup,
    closeHistoryMenu,
    resetHistory,
    focus,
    blur,
  }
}

export type SearchControl = ReturnType<typeof useSearchControl>
