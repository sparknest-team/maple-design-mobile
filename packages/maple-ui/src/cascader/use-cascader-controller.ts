import { computed, provide, reactive, ref, toRefs, watch, type ExtractPropTypes, type SetupContext } from 'vue'
import { useSelectionSession } from '../_components/selection-field/use-selection-session'
import { debounce } from '../_utils/debounce'
import { isArray, isFunction, isNull, isUndefined } from '../_utils/is'
import { getKeyDownHandler, KEYBOARD_KEY } from '../_utils/keyboard'
import type { BaseType, UnionType } from '../_utils/types'
import { useInputForm } from '../input/use-input-form'
import { cascaderInjectionKey } from './context'
import { cascaderEmits } from './emits'
import { useSelectedPath } from './hooks/use-selected-path'
import { presentations } from './presentations'
import { cascaderProps } from './props'
import type { CascaderBaseValue, CascaderOption, CascaderOptionInfo } from './types'
import {
  getCheckedStatus,
  getLeafOptionInfos,
  getLeafOptionKeys,
  getOptionInfos,
  getOptionLabel,
  getValidValues,
  getValueKey,
} from './utils'

export function useCascaderController(
  props: Readonly<ExtractPropTypes<typeof cascaderProps>>,
  { emit, slots }: Pick<SetupContext<typeof cascaderEmits>, 'emit' | 'slots'>,
) {
  const {
    options,
    checkStrictly,
    loadMore,
    formatLabel,
    modelValue,
    disabled,
    expandTrigger,
    expandChild,
    pathMode,
    multiple,
  } = toRefs(props)
  const _value = ref<CascaderBaseValue | undefined>(props.defaultValue)
  const _inputValue = ref(props.defaultInputValue)
  const _open = ref(props.defaultOpen)

  const { mergedDisabled, mergedReadonly, mergedError, mergedSize, eventHandlers, group, hasOuterLabel, feedback } =
    useInputForm(props)
  const mergedVariant = computed(() => props.variant ?? group?.variant.value ?? 'filled')
  const mergedHint = computed(() => !hasOuterLabel.value && props.hint)
  const computedOpen = computed(() => props.open ?? _open.value)
  const committedValue = computed(() => props.modelValue ?? _value.value)
  const deferred = computed(() => presentations[props.presentation].deferred(props.multiple))
  const publish = (value: CascaderBaseValue | undefined) => {
    _value.value = value
    emit('update:modelValue', value)
    emit('change', value)
    eventHandlers.value?.onChange?.()
  }
  const session = useSelectionSession({
    value: () => committedValue.value,
    open: computedOpen,
    deferred: () => deferred.value,
    blocked: () => mergedDisabled.value || mergedReadonly.value || props.loading,
    clone: (value) => (Array.isArray(value) ? value.map((item) => (Array.isArray(item) ? [...item] : item)) : value),
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

  watch(
    () => props.modelValue,
    (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = props.multiple ? [] : undefined
      }
    },
  )

  const optionInfos = ref<CascaderOptionInfo[]>([])
  const totalLevel = ref(1)

  const optionMap = reactive(new Map<string, CascaderOptionInfo>())
  const leafOptionMap = reactive(new Map<string, CascaderOptionInfo>())
  const leafOptionValueMap = reactive(new Map<BaseType, string>())
  const leafOptionSet = reactive(new Set<CascaderOptionInfo>())

  const lazyLoadOptions = reactive<Record<string, CascaderOption[]>>({})

  const pendingLoads = new Map<string, Promise<void>>()
  let optionsVersion = 0
  watch(options, () => {
    optionsVersion++
    pendingLoads.clear()
    Object.keys(lazyLoadOptions).forEach((key) => delete lazyLoadOptions[key])
  })
  const expandOption = (option: CascaderOptionInfo): Promise<void> => {
    if (option.disabled || mergedDisabled.value || mergedReadonly.value) {
      return Promise.resolve()
    }
    setSelectedPath(option.key)
    if (!props.loadMore || option.isLeaf || option.children) {
      return Promise.resolve()
    }
    const pending = pendingLoads.get(option.key)
    if (pending) {
      return pending
    }
    const version = optionsVersion
    const task = new Promise<void>((resolve, reject) => {
      try {
        props.loadMore?.(option.raw, (children) => {
          if (version === optionsVersion && children) {
            addLazyLoadOptions(children, option.key)
          }
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    }).finally(() => {
      if (version === optionsVersion) {
        pendingLoads.delete(option.key)
      }
    })
    pendingLoads.set(option.key, task)
    return task
  }

  const addLazyLoadOptions = (children: CascaderOption[], key: string) => {
    lazyLoadOptions[key] = children
  }

  const DEFAULT_FIELD_NAMES = {
    value: 'value',
    label: 'label',
    disabled: 'disabled',
    children: 'children',
    tagProps: 'tagProps',
    render: 'render',
    isLeaf: 'isLeaf',
  }

  const mergedFieldNames = computed(() => ({
    ...DEFAULT_FIELD_NAMES,
    ...props.fieldNames,
  }))

  watch(
    [options, lazyLoadOptions, mergedFieldNames],
    ([_options, _lazyLoadOptions, _fieldNames]) => {
      optionMap.clear()
      leafOptionMap.clear()
      leafOptionValueMap.clear()
      leafOptionSet.clear()

      optionInfos.value = getOptionInfos(_options ?? [], {
        enabledLazyLoad: Boolean(props.loadMore),
        lazyLoadOptions,
        optionMap,
        leafOptionSet,
        leafOptionMap,
        leafOptionValueMap,
        totalLevel,
        checkStrictly,
        fieldNames: _fieldNames,
      })
    },
    {
      immediate: true,
      deep: true,
    },
  )

  const computedValueMap = computed(() => {
    const values = getValidValues(session.value.value, {
      multiple: props.multiple,
      pathMode: props.pathMode,
    })
    return new Map(
      values.map((value): [string, UnionType | UnionType[]] => [
        getValueKey(value, {
          valueField: mergedFieldNames.value.value,
          leafOptionValueMap,
        }),
        value,
      ]),
    )
  })

  const computedInputValue = computed(() => props.inputValue ?? _inputValue.value)
  const getFilteredStatus = (label: string) => {
    return label?.toLocaleLowerCase().includes(computedInputValue.value?.toLocaleLowerCase())
  }

  const filteredLeafOptions = computed(() => {
    const options = props.checkStrictly ? Array.from(optionMap.values()) : Array.from(leafOptionSet)

    return options.filter((item) => {
      if (isFunction(props.filterOption)) {
        return props.filterOption(computedInputValue.value, item.raw)
      }

      if (props.checkStrictly) {
        return getFilteredStatus(item.label)
      }

      return item.path?.find((leaf) => getFilteredStatus(leaf.label))
    })
  })

  const updateValue = (values: UnionType[] | UnionType[][]) => {
    if (mergedDisabled.value || mergedReadonly.value) {
      return
    }
    const value = props.multiple ? values : (values[0] ?? '')
    if (values.length === 0) {
      setSelectedPath()
      setActiveKey()
    }

    session.update(value)
  }

  watch([multiple, pathMode], () => {
    const values: any[] = []
    computedValueMap.value.forEach((value, key) => {
      const option = leafOptionMap.get(key)
      if (option) {
        values.push(pathMode.value ? option.pathValue : option.value)
      }
    })
    updateValue(values)
  })

  const handleOpenChange = (visible: boolean): void => {
    if (visible && (mergedDisabled.value || mergedReadonly.value)) {
      return
    }
    if (computedOpen.value !== visible) {
      _open.value = visible
      emit('update:open', visible)
      emit('open-change', visible)
    }
  }

  const handleRemove = (itemKey: string | number | symbol) => {
    const key = String(itemKey)
    if (mergedDisabled.value || mergedReadonly.value || leafOptionMap.get(key)?.disabled || !props.multiple) {
      return
    }
    const values = getValidValues(committedValue.value, { multiple: true, pathMode: props.pathMode })
    publish(
      values.filter(
        (value) => getValueKey(value, { valueField: mergedFieldNames.value.value, leafOptionValueMap }) !== key,
      ),
    )
  }

  const selectSingle = (option: CascaderOptionInfo) => {
    updateValue([props.pathMode ? option.pathValue : option.value])
    if (!deferred.value) {
      handleOpenChange(false)
    }
  }

  const selectMultiple = (option: CascaderOptionInfo, checked: boolean) => {
    if (checked) {
      const leafOptionInfos = props.checkStrictly ? [option] : getLeafOptionInfos(option)

      updateValue([
        ...computedValueMap.value.values(),
        ...leafOptionInfos
          .filter((item) => !computedValueMap.value.has(item.key))
          .map((item) => {
            return props.pathMode ? item.pathValue : item.value
          }),
      ] as UnionType[] | UnionType[][])
    } else {
      const leafOptionKeys = props.checkStrictly ? [option.key] : getLeafOptionKeys(option)
      const values: any[] = []
      computedValueMap.value.forEach((value, key) => {
        if (!leafOptionKeys.includes(key)) {
          values.push(value)
        }
      })
      updateValue(values)
    }

    handleInputValueChange('', 'optionChecked')
  }

  const handleClickOption = (option: CascaderOptionInfo, checked?: boolean) => {
    if (
      mergedDisabled.value ||
      mergedReadonly.value ||
      props.loading ||
      option.disabled ||
      (!props.multiple && !props.checkStrictly && !option.isLeaf)
    ) {
      return
    }
    if (props.multiple) {
      selectMultiple(option, checked ?? true)
    } else {
      selectSingle(option)
    }
  }

  const handleSearch = debounce((value: string) => {
    emit('search', value)
  }, props.searchDelay)

  const handleInputValueChange = (value: string, reason = 'manual'): void => {
    if (value !== computedInputValue.value) {
      if (reason === 'manual' && !computedOpen.value) {
        _open.value = true
        emit('update:open', true)
        emit('open-change', true)
      }

      _inputValue.value = value
      emit('update:inputValue', value)
      emit('input-value-change', value)

      if (props.filterable) {
        handleSearch(value)
      }
    }
  }

  watch(computedOpen, (value) => {
    if (value) {
      if (computedValueMap.value.size > 0) {
        const keys = Array.from(computedValueMap.value.keys())
        const lastKey = keys[keys.length - 1]
        const option = leafOptionMap.get(lastKey)
        if (option && option.key !== activeKey.value) {
          setSelectedPath(option.key)
          setActiveKey(option.key)
        }
      }
    } else {
      if (computedValueMap.value.size === 0) {
        setSelectedPath()
        setActiveKey()
      }
      handleInputValueChange('', 'optionListHide')
    }
  })

  const handleClear = (e: Event) => {
    if (mergedDisabled.value || mergedReadonly.value || !props.clearable) {
      return
    }
    e.stopPropagation()
    if (props.multiple) {
      // 保留已经被选中但被disabled的选项值
      const newValues: any[] = []
      computedValueMap.value.forEach((value, key) => {
        const option = leafOptionMap.get(key)
        if (option?.disabled) {
          newValues.push(props.pathMode ? option.pathValue : option.value)
        }
      })
      publish(newValues)
    } else {
      publish('')
    }
    handleInputValueChange('', 'clear')
    eventHandlers.value?.onClear?.()
    emit('clear', e)
  }

  const showSearchPanel = computed(() => props.filterable && computedInputValue.value.length > 0)

  const handleFocus = (e: FocusEvent) => {
    emit('focus', e)
    eventHandlers.value?.onFocus?.(e)
  }
  const handleBlur = (e: FocusEvent) => {
    emit('blur', e)
    eventHandlers.value?.onBlur?.(e)
  }

  const { activeKey, activeOption, selectedPath, displayColumns, setActiveKey, setSelectedPath, getNextActiveNode } =
    useSelectedPath(optionInfos, {
      optionMap,
      filteredLeafOptions,
      showSearchPanel,
      expandChild,
    })

  provide(
    cascaderInjectionKey,
    reactive({
      onClickOption: handleClickOption,
      setActiveKey,
      setSelectedPath,
      loadMore,
      expandTrigger,
      addLazyLoadOptions,
      expandOption,
      formatLabel,
      slots,
      valueMap: computedValueMap,
    }),
  )

  const handleKeyDown = getKeyDownHandler(
    new Map([
      [
        KEYBOARD_KEY.ENTER,
        (ev: Event) => {
          if (computedOpen.value) {
            if (activeOption.value) {
              let checked: boolean
              if (props.checkStrictly || activeOption.value.isLeaf) {
                checked = !computedValueMap.value.has(activeOption.value.key)
              } else {
                checked = !getCheckedStatus(activeOption.value, computedValueMap.value).checked
              }
              setSelectedPath(activeOption.value.key)
              handleClickOption(activeOption.value, checked)
            }
          } else {
            handleOpenChange(true)
          }
        },
      ],
      [
        KEYBOARD_KEY.ESC,
        (ev: Event) => {
          handleOpenChange(false)
        },
      ],
      [
        KEYBOARD_KEY.ARROW_DOWN,
        (ev: Event) => {
          ev.preventDefault()
          const activeNode = getNextActiveNode('next')
          setActiveKey(activeNode?.key)
        },
      ],
      [
        KEYBOARD_KEY.ARROW_UP,
        (ev: Event) => {
          ev.preventDefault()
          const activeNode = getNextActiveNode('preview')
          setActiveKey(activeNode?.key)
        },
      ],
      [
        KEYBOARD_KEY.ARROW_RIGHT,
        (ev: Event) => {
          if (!showSearchPanel.value) {
            ev.preventDefault()
            if (activeOption.value?.children) {
              setSelectedPath(activeOption.value.key)
              setActiveKey(activeOption.value.children[0]?.key)
            }
          }
        },
      ],
      [
        KEYBOARD_KEY.ARROW_LEFT,
        (ev: Event) => {
          if (!showSearchPanel.value) {
            ev.preventDefault()
            if (activeOption.value?.parent) {
              setSelectedPath(activeOption.value.parent.key)
              setActiveKey(activeOption.value.parent.key)
            }
          }
        },
      ],
    ]),
  )

  const canConfirm = computed<boolean>(() => {
    const committed = getValidValues(committedValue.value, { multiple: props.multiple, pathMode: props.pathMode })
    const keys = new Set(
      committed.map((value) => getValueKey(value, { valueField: mergedFieldNames.value.value, leafOptionValueMap })),
    )
    return (
      (props.multiple || computedValueMap.value.size > 0) &&
      [...computedValueMap.value.keys()].every((key) => {
        const option = optionMap.get(key)
        return keys.has(key) || Boolean(option && !option.disabled && (props.checkStrictly || option.isLeaf))
      })
    )
  })
  const fieldItems = computed(() => {
    const result: any[] = []
    new Map(
      getValidValues(committedValue.value, { multiple: props.multiple, pathMode: props.pathMode }).map(
        (value) =>
          [getValueKey(value, { valueField: mergedFieldNames.value.value, leafOptionValueMap }), value] as const,
      ),
    ).forEach((value, key) => {
      const option = leafOptionMap.get(key)
      if (option) {
        result.push({
          key,
          value,
          label: props.formatLabel?.(option.path.map((item) => item.raw)) ?? getOptionLabel(option),
          closable: !option.disabled,
          tagProps: option.tagProps,
        })
      } else if (props.fallback) {
        const label = isFunction(props.fallback)
          ? props.fallback(value)
          : isArray(value)
            ? value.join(' / ')
            : String(value)
        result.push({
          key,
          value,
          label,
          closable: true,
        })
      }
    })
    return result
  })

  return {
    props,
    session,
    deferred,
    canConfirm,
    mergedVariant,
    mergedHint,
    feedback,
    handleClickOption,
    optionMap,
    computedValueMap,
    setSelectedPath,
    setActiveKey,
    addLazyLoadOptions,
    expandOption,
    optionInfos,
    filteredLeafOptions,
    selectedPath,
    activeKey,
    displayColumns,
    computedInputValue,
    computedOpen,
    handleClear,
    fieldItems,
    handleInputValueChange,
    showSearchPanel,
    handleOpenChange,
    handleFocus,
    handleBlur,
    handleRemove,
    mergedDisabled,
    mergedReadonly,
    mergedError,
    mergedSize,
    handleKeyDown,
    totalLevel,
  }
}
export type CascaderController = ReturnType<typeof useCascaderController>
