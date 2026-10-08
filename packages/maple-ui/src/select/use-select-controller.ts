import {
  computed,
  ref,
  toRefs,
  watch,
  watchEffect,
  type ComponentPublicInstance,
  type ExtractPropTypes,
  type SetupContext,
} from 'vue'
import type { SelectionFieldItem } from '../_components/selection-field/props'
import { useSelectionSession, type SelectionSession } from '../_components/selection-field/use-selection-session'
import { useTrigger } from '../_hooks/use-trigger'
import { debounce } from '../_utils/debounce'
import {
  isArray,
  isBoolean,
  isEmptyObject,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from '../_utils/is'
import { useInputForm } from '../input/use-input-form'
import { selectEmits } from './emits'
import { useSelect } from './hooks/use-select'
import { presentations } from './presentations'
import { selectProps } from './props'
import type { OptionValueWithKey, SelectOptionData } from './types'
import { getKeyFromValue, hasEmptyStringKey } from './utils'

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  disabled: 'disabled',
  tagProps: 'tagProps',
  render: 'render',
}

export function useSelectController(
  props: Readonly<ExtractPropTypes<typeof selectProps>>,
  { emit }: Pick<SetupContext<typeof selectEmits>, 'emit'>,
) {
  // props
  const {
    size,
    variant,
    disabled,
    error,
    options,
    filterOption,
    multiple,
    open,
    defaultOpen,
    showExtraOptions,
    modelValue,
    fieldNames,
    loading,
    defaultActiveFirstOption,
  } = toRefs(props)
  const { mergedSize, mergedDisabled, mergedReadonly, mergedError, feedback, eventHandlers, group, hasOuterLabel } =
    useInputForm(props)
  const mergedVariant = computed(() => props.variant ?? group?.variant.value ?? 'filled')
  const mergedHint = computed(() => !hasOuterLabel.value && props.hint)
  const component = computed(() => (props.virtualListProps ? 'div' : 'li'))
  const retainInputValue = computed(() => isObject(props.filterable) && Boolean(props.filterable.retainInputValue))

  // refs
  const dropdownRef = ref<ComponentPublicInstance>()
  const optionRefs = ref<Record<string, HTMLElement>>({})
  const virtualListRef = ref()

  // trigger
  const { computedOpen, handleOpenChange: setOpen } = useTrigger({
    open,
    defaultOpen,
    emit,
  })

  const handleOpenChange = (open: boolean) => {
    if (open && (mergedDisabled.value || mergedReadonly.value)) {
      return
    }
    setOpen(open)
  }

  // value and key
  const _value = ref(props.defaultValue)

  const mergedFieldNames = computed(() => ({
    ...DEFAULT_FIELD_NAMES,
    ...fieldNames?.value,
  }))

  const committedValue = computed(() => props.modelValue ?? _value.value)
  const deferred = computed(() => presentations[props.presentation].deferred(props.multiple))
  const publish = (value: typeof props.defaultValue) => {
    _value.value = value
    emit('update:modelValue', value)
    emit('change', value)
    eventHandlers.value?.onChange?.()
  }
  const session: SelectionSession<typeof committedValue.value> = useSelectionSession({
    value: () => committedValue.value,
    open: computedOpen,
    deferred: () => deferred.value,
    blocked: () => mergedDisabled.value || mergedReadonly.value || props.loading,
    clone: (value) => (Array.isArray(value) ? [...value] : value),
    publish,
    valid: () => canConfirm.value,
    close: () => handleOpenChange(false),
  })
  watch(
    () => props.presentation,
    () => {
      session.cancel()
      session.reset()
    },
  )
  const committedValueObjects = computed<OptionValueWithKey[]>(() => {
    const value = committedValue.value
    const values = Array.isArray(value) ? value : value == null ? [] : [value]
    return values.map((value) => ({ value, key: getKeyFromValue(value, mergedFieldNames.value.value) }))
  })

  const computedValueObjects = computed<OptionValueWithKey[]>(() => {
    const mergedValue = session.value.value
    const valueArray = isArray(mergedValue)
      ? mergedValue
      : mergedValue || isNumber(mergedValue) || isString(mergedValue) || isBoolean(mergedValue)
        ? [mergedValue]
        : []
    return valueArray.map((value) => ({
      value,
      key: getKeyFromValue(value, mergedFieldNames.value.value),
    }))
  })
  watch(
    () => props.modelValue,
    (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = multiple.value ? [] : (value as any)
      }
    },
  )

  const computedValueKeys = computed(() => computedValueObjects.value.map((obj) => obj.key))

  // selected option
  const _selectedOption = ref()
  const getRawOptionFromValueKeys = (valueKeys: string[]) => {
    const optionMap: Record<string, unknown> = {}

    valueKeys.forEach((key) => {
      optionMap[key] = optionInfoMap.get(key)
    })

    return optionMap
  }

  const updateSelectedOption = (valueKeys: string[]) => {
    _selectedOption.value = getRawOptionFromValueKeys(valueKeys)
  }

  // extra value and option
  const getFallBackOption = (value: string | number | boolean | Record<string, unknown>): SelectOptionData => {
    if (isFunction(props.fallbackOption)) {
      return props.fallbackOption(value)
    }
    return {
      [mergedFieldNames.value.value]: value,
      [mergedFieldNames.value.label]: String(isObject(value) ? value[mergedFieldNames.value.value] : value),
    }
  }

  const getExtraValueData = (): OptionValueWithKey[] => {
    const valueArray: OptionValueWithKey[] = []
    const keyArray: string[] = []

    if (props.creatable || props.fallbackOption) {
      for (const item of computedValueObjects.value) {
        if (!keyArray.includes(item.key) && item.value !== '') {
          const optionInfo = optionInfoMap.get(item.key)
          if (!optionInfo || optionInfo.origin === 'extraOptions') {
            valueArray.push(item)
            keyArray.push(item.key)
          }
        }
      }
    }

    if (props.creatable && computedInputValue.value) {
      const key = getKeyFromValue(computedInputValue.value)
      if (!keyArray.includes(key)) {
        const optionInfo = optionInfoMap.get(key)
        if (!optionInfo || optionInfo.origin === 'extraOptions') {
          valueArray.push({
            value: computedInputValue.value,
            key,
          })
        }
      }
    }
    return valueArray
  }

  const extraValueObjects = ref<OptionValueWithKey[]>([])
  const extraOptions = computed(() =>
    extraValueObjects.value.map((obj) => {
      let optionInfo = getFallBackOption(obj.value)
      const extraOptionRawInfo = _selectedOption.value?.[obj.key]
      if (!isUndefined(extraOptionRawInfo) && !isEmptyObject(extraOptionRawInfo)) {
        optionInfo = { ...optionInfo, ...extraOptionRawInfo }
      }
      return optionInfo
    }),
  )

  // input value
  const _inputValue = ref(props.defaultInputValue)
  const computedInputValue = computed(() => props.inputValue ?? _inputValue.value)

  // clear input value when close dropdown
  watch(computedOpen, (visible) => {
    if (!visible && !retainInputValue.value && computedInputValue.value) {
      updateInputValue('')
    }
  })

  // update func
  const getValueFromValueKeys = (valueKeys: string[]) => {
    if (!props.multiple) {
      return (
        optionInfoMap.get(valueKeys[0])?.value ??
        (hasEmptyStringKey(optionInfoMap) ? (undefined as unknown as string) : '')
      )
    }
    return valueKeys.map((key) => optionInfoMap.get(key)?.value ?? '')
  }

  const updateValue = (valueKeys: string[]) => {
    const value = getValueFromValueKeys(valueKeys)
    session.update(value)
    updateSelectedOption(valueKeys)
  }

  const updateInputValue = (inputValue: string) => {
    _inputValue.value = inputValue
    emit('update:inputValue', inputValue)
    emit('input-value-change', inputValue)
  }

  // events
  const handleSelect = (key: string, ev: Event) => {
    if (mergedDisabled.value || mergedReadonly.value || props.loading || !enabledOptionKeys.value.includes(key)) {
      return
    }
    if (props.multiple) {
      if (!computedValueKeys.value.includes(key)) {
        if (enabledOptionKeys.value.includes(key)) {
          if (props.limit > 0 && computedValueKeys.value.length >= props.limit) {
            const info = optionInfoMap.get(key)
            emit('exceed-limit', info?.value, ev)
          } else {
            const valueKeys = computedValueKeys.value.concat(key)
            updateValue(valueKeys)
          }
        }
      } else {
        const valueKeys = computedValueKeys.value.filter((_key) => _key !== key)
        updateValue(valueKeys)
      }
      if (!retainInputValue.value) {
        // 点击一个选项时，清空输入框内容
        updateInputValue('')
      }
    } else {
      if (key !== computedValueKeys.value[0]) {
        updateValue([key])
      }
      if (retainInputValue.value) {
        const optionInfo = optionInfoMap.get(key)
        if (optionInfo) {
          updateInputValue(optionInfo.label)
        }
      }

      if (!deferred.value) {
        handleOpenChange(false)
      }
    }
  }

  const handleSearch = debounce((value: string) => {
    emit('search', value)
  }, props.searchDelay)

  const handleInputValueChange = (inputValue: string) => {
    if (inputValue !== computedInputValue.value) {
      if (!computedOpen.value) {
        handleOpenChange(true)
      }

      updateInputValue(inputValue)

      if (props.filterable) {
        handleSearch(inputValue)
      }
    }
  }

  const handleRemove = (key: string) => {
    if (mergedDisabled.value || mergedReadonly.value || optionInfoMap.get(key)?.disabled) {
      return
    }
    const optionInfo = optionInfoMap.get(key)
    const newKeys = committedValueObjects.value.map((item) => item.key).filter((_key) => _key !== key)
    publish(getValueFromValueKeys(newKeys))
    emit('remove', optionInfo?.value)
  }

  const handleClear = (e: Event) => {
    if (mergedDisabled.value || mergedReadonly.value || !props.clearable) {
      return
    }
    e?.stopPropagation()
    const newKeys = committedValueObjects.value
      .map((item) => item.key)
      .filter((key) => optionInfoMap.get(key)?.disabled)
    publish(getValueFromValueKeys(newKeys))
    updateInputValue('')
    eventHandlers.value?.onClear?.()
    emit('clear', e)
  }

  const handleDropdownScroll = (e: Event) => {
    emit('dropdown-scroll', e)
  }

  const handleDropdownReachBottom = (e: Event) => {
    emit('dropdown-reach-bottom', e)
  }

  const { validOptions, optionInfoMap, validOptionInfos, enabledOptionKeys, handleKeyDown } = useSelect({
    multiple,
    options,
    extraOptions,
    inputValue: computedInputValue,
    filterOption,
    showExtraOptions,
    component,
    fieldNames,
    loading,
    open: computedOpen,
    valueKeys: computedValueKeys,
    dropdownRef,
    optionRefs,
    virtualListRef,
    defaultActiveFirstOption,
    onSelect: handleSelect,
    onOpenChange: handleOpenChange,
  })

  const canConfirm = computed<boolean>(() => {
    const committed = new Set(committedValueObjects.value.map((item) => item.key))
    return (
      (props.multiple || computedValueKeys.value.length > 0) &&
      computedValueKeys.value.every(
        (key) =>
          (committed.has(key) && optionInfoMap.has(key)) ||
          (!optionInfoMap.get(key)?.disabled && optionInfoMap.has(key)),
      )
    )
  })
  const fieldItems = computed(() => {
    const result: SelectionFieldItem[] = []
    for (const item of committedValueObjects.value) {
      const optionInfo = optionInfoMap.get(item.key)
      if (optionInfo) {
        result.push({
          ...optionInfo,
          key: item.key,
          value: item.value,
          label:
            optionInfo?.label ?? String(isObject(item.value) ? item.value[mergedFieldNames.value.value] : item.value),
          closable: !optionInfo?.disabled,
          tagProps: optionInfo?.tagProps,
        })
      }
    }
    return result
  })

  watchEffect(() => {
    const valueData = getExtraValueData()
    if (valueData.length !== extraValueObjects.value.length) {
      extraValueObjects.value = valueData
    } else if (valueData.length > 0) {
      for (let i = 0; i < valueData.length; i++) {
        if (valueData[i].key !== extraValueObjects.value[i]?.key) {
          extraValueObjects.value = valueData
          break
        }
      }
    }
  })
  return {
    props,
    mergedSize,
    mergedDisabled,
    mergedReadonly,
    mergedError,
    mergedVariant,
    mergedHint,
    feedback,
    eventHandlers,
    dropdownRef,
    optionRefs,
    virtualListRef,
    computedOpen,
    handleOpenChange,
    computedInputValue,
    computedValueKeys,
    fieldItems,
    validOptions,
    validOptionInfos,
    optionInfoMap,
    handleSelect,
    handleRemove,
    handleClear,
    handleInputValueChange,
    handleKeyDown,
    handleDropdownScroll,
    handleDropdownReachBottom,
    session,
    deferred,
    canConfirm,
  }
}
export type SelectController = ReturnType<typeof useSelectController>
