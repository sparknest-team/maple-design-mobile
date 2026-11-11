import type { ComponentPublicInstance, Ref } from 'vue'
import {
  computed,
  inject,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import { fieldEditorEnterSubmits, fieldEditorPanel } from '../../_components/field-presentation/context'
import { VirtualListRef } from '../../_components/virtual-list-v2/interface'
import { getRelativeRect } from '../../_utils/dom'
import { getKeyDownHandler, KEYBOARD_KEY } from '../../_utils/keyboard'
import type { OptionSearchField } from '../../utils/option-data'
import { selectInjectionKey } from '../context'
import { FilterOption, SelectFieldNames, SelectOption, SelectOptionGroupInfo, SelectOptionInfo } from '../types'
import { isGroupOptionInfo } from '../utils'
import { useOptions } from './use-options'

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  disabled: 'disabled',
  tagProps: 'tagProps',
  render: 'render',
}

export const useSelect = ({
  multiple,
  options,
  extraOptions,
  inputValue,
  filterOption,
  caseSensitive,
  searchFields,
  showExtraOptions,
  component,
  fieldNames,
  loading,
  open,
  valueKeys,
  dropdownRef,
  optionRefs,
  virtualListRef,
  onSelect,
  onOpenChange,
  enterToOpen = true,
  defaultActiveFirstOption,
  getOptionId,
}: {
  multiple?: Ref<boolean>
  options?: Ref<SelectOption[]>
  extraOptions?: Ref<SelectOption[]>
  inputValue?: Ref<string>
  filterOption?: Ref<FilterOption>
  caseSensitive?: Ref<boolean>
  searchFields?: Ref<readonly OptionSearchField[]>
  showExtraOptions?: Ref<boolean>
  component?: Ref<'li' | 'div'>
  fieldNames?: Ref<SelectFieldNames | undefined>
  loading?: Ref<boolean>
  open: Ref<boolean>
  valueKeys: Ref<string[]>
  dropdownRef?: Ref<ComponentPublicInstance | undefined>
  optionRefs?: Ref<Record<string | number, HTMLElement>>
  virtualListRef?: Ref<VirtualListRef>
  onSelect: (key: string, ev: Event) => void
  onOpenChange: (open: boolean) => void
  enterToOpen?: boolean
  getOptionId?: (key: string) => string
  defaultActiveFirstOption?: Ref<boolean>
}) => {
  const insideFieldEditor = inject(fieldEditorPanel, false)
  const editorEnterSubmits = inject(fieldEditorEnterSubmits, undefined)
  const mergedFieldNames = computed(() => ({
    ...DEFAULT_FIELD_NAMES,
    ...fieldNames?.value,
  }))

  const {
    validOptions,
    optionInfoMap,
    validOptionInfos,
    enabledOptionKeys,
    getNextSlotOptionIndex,
    addSlotOptionInfo,
    removeSlotOptionInfo,
  } = useOptions({
    options,
    extraOptions,
    inputValue,
    filterOption,
    caseSensitive,
    searchFields,
    showExtraOptions,
    fieldNames,
  })

  const activeKey = ref<string | undefined>()
  let active = true
  let disposed = false
  let scrollRequest = 0
  let pendingInitialKey: string | undefined
  let pendingGroupCorrection = false
  const available = () => active && !disposed
  onActivated(() => {
    if (!disposed) {
      active = true
    }
  })
  onDeactivated(() => {
    active = false
    pendingInitialKey = undefined
    pendingGroupCorrection = false
    scrollRequest++
  })
  onBeforeUnmount(() => {
    disposed = true
    active = false
    pendingInitialKey = undefined
    pendingGroupCorrection = false
    scrollRequest++
  })

  watch(enabledOptionKeys, (enabledKeys) => {
    if (!activeKey.value || !enabledKeys.includes(activeKey.value)) {
      ;[activeKey.value] = enabledKeys
    }
  })

  const cancelPendingInitialScroll = () => {
    if (pendingInitialKey || pendingGroupCorrection) {
      pendingInitialKey = undefined
      pendingGroupCorrection = false
      scrollRequest++
    }
  }

  const setActiveKey = (key?: string) => {
    if (!available()) {
      return
    }
    pendingInitialKey = undefined
    pendingGroupCorrection = false
    scrollRequest++
    activeKey.value = key
  }

  const getNextActiveKey = (direction: 'up' | 'down') => {
    const _length = enabledOptionKeys.value.length
    if (_length === 0) {
      return undefined
    }

    if (!activeKey.value) {
      if (direction === 'down') {
        return enabledOptionKeys.value[0]
      }
      return enabledOptionKeys.value[_length - 1]
    }

    const activeIndex = enabledOptionKeys.value.indexOf(activeKey.value)
    const nextIndex = (_length + activeIndex + (direction === 'up' ? -1 : 1)) % _length
    return enabledOptionKeys.value[nextIndex]
  }

  const scrollIntoView = (key: string) => {
    if (!available() || !open.value || !enabledOptionKeys.value.includes(key)) {
      return
    }
    const request = ++scrollRequest
    pendingGroupCorrection = false
    const dropdown = dropdownRef?.value
    const virtual = virtualListRef?.value
    const containsKey = (item: SelectOptionInfo | SelectOptionGroupInfo): boolean =>
      isGroupOptionInfo(item) ? item.options.some(containsKey) : item.key === key
    const group =
      optionInfoMap.get(key)?.origin === 'slot'
        ? undefined
        : validOptions.value.find((item): item is SelectOptionGroupInfo => isGroupOptionInfo(item) && containsKey(item))
    if (virtual) {
      if (!group) {
        const list = virtual as VirtualListRef & { itemKey?: unknown; data?: Array<{ key?: unknown }> }
        const customKey = list.itemKey !== undefined && list.itemKey !== 'key'
        const index = customKey ? (list.data?.findIndex((item) => item.key === key) ?? -1) : -1
        virtual.scrollTo(index >= 0 ? { index } : { key })
      } else {
        pendingGroupCorrection = true
        const isCurrentGroup = () =>
          available() &&
          open.value &&
          request === scrollRequest &&
          pendingGroupCorrection &&
          virtualListRef?.value === virtual &&
          activeKey.value === key &&
          enabledOptionKeys.value.includes(key)
        // Slot registration can change the virtual data during this render.
        // Wait until the list receives the current order before using an index.
        nextTick(() => {
          if (!isCurrentGroup()) {
            return
          }
          const position = validOptions.value.findIndex((item) => isGroupOptionInfo(item) && containsKey(item))
          if (position < 0) {
            pendingGroupCorrection = false
            return
          }
          const slotCount = validOptionInfos.value.filter((option) => option.origin === 'slot').length
          virtual.scrollTo({ index: slotCount + position })
          nextTick(() => {
            if (!isCurrentGroup()) {
              return
            }
            pendingGroupCorrection = false
            const viewport = (virtual as VirtualListRef & { containerRef?: HTMLElement }).containerRef
            const option = optionRefs?.value[key]
            if (!viewport || !option || !viewport.contains(option)) {
              return
            }
            const viewportRect = viewport.getBoundingClientRect()
            const optionRect = option.getBoundingClientRect()
            const scale = viewport.offsetHeight ? viewportRect.height / viewport.offsetHeight : 1
            if (!scale) {
              return
            }
            const top = viewportRect.top + viewport.clientTop * scale
            const bottom = top + viewport.clientHeight * scale
            const delta =
              optionRect.top < top ? optionRect.top - top : optionRect.bottom > bottom ? optionRect.bottom - bottom : 0
            if (delta) {
              virtual.scrollTo(viewport.scrollTop + delta / scale)
            }
          })
        })
      }
    }
    if (
      !available() ||
      !open.value ||
      request !== scrollRequest ||
      dropdownRef?.value !== dropdown ||
      virtualListRef?.value !== virtual
    ) {
      return
    }
    const optionInfo = optionInfoMap.get(key)

    const wrapperEle = (dropdownRef?.value as (ComponentPublicInstance & { wrapperRef?: HTMLElement }) | undefined)
      ?.wrapperRef
    const optionEle = optionRefs?.value[key] ?? optionInfo?.ref

    if (!wrapperEle || !optionEle) {
      return
    }
    if (wrapperEle.scrollHeight === wrapperEle.offsetHeight) {
      return
    }
    const optionRect = getRelativeRect(optionEle, wrapperEle)
    const wrapperScrollTop = wrapperEle.scrollTop
    if (
      !available() ||
      !open.value ||
      request !== scrollRequest ||
      dropdownRef?.value !== dropdown ||
      virtualListRef?.value !== virtual ||
      !enabledOptionKeys.value.includes(key) ||
      (dropdownRef?.value as (ComponentPublicInstance & { wrapperRef?: HTMLElement }) | undefined)?.wrapperRef !==
        wrapperEle ||
      (optionRefs?.value[key] ?? optionInfoMap.get(key)?.ref) !== optionEle
    ) {
      return
    }

    if (optionRect.top < 0) {
      wrapperEle.scrollTo(0, wrapperScrollTop + optionRect.top)
    } else if (optionRect.bottom < 0) {
      wrapperEle.scrollTo(0, wrapperScrollTop - optionRect.bottom)
    }
  }

  // If the selected option arrives after opening, finish the initial positioning
  // only while no newer user interaction has superseded it.
  watch(validOptionInfos, (infos) => {
    const key = pendingInitialKey
    if (!key || !available() || !open.value || valueKeys.value[valueKeys.value.length - 1] !== key) {
      return
    }
    const info = infos.find((option) => option.key === key && option.origin !== 'extraOptions' && !option.disabled)
    if (!info) {
      return
    }
    const previousActiveKey = activeKey.value
    const request = ++scrollRequest
    const dropdown = dropdownRef?.value
    const virtual = virtualListRef?.value
    nextTick(() => {
      if (
        !available() ||
        !open.value ||
        request !== scrollRequest ||
        pendingInitialKey !== key ||
        activeKey.value !== previousActiveKey ||
        valueKeys.value[valueKeys.value.length - 1] !== key ||
        (dropdown && dropdown !== dropdownRef?.value) ||
        (virtual && virtual !== virtualListRef?.value)
      ) {
        return
      }
      pendingInitialKey = undefined
      activeKey.value = key
      scrollIntoView(key)
    })
  })

  // Handling when the drop-down box is displayed/hide
  watch(
    open,
    (visible) => {
      pendingInitialKey = undefined
      const request = ++scrollRequest
      if (visible && available()) {
        // get last value key
        const current = valueKeys.value[valueKeys.value.length - 1]
        if (
          current &&
          (!enabledOptionKeys.value.includes(current) || optionInfoMap.get(current)?.origin === 'extraOptions')
        ) {
          pendingInitialKey = current
        }
        let _activeKey = (defaultActiveFirstOption?.value ?? true) ? enabledOptionKeys.value[0] : undefined
        if (enabledOptionKeys.value.includes(current)) {
          _activeKey = current
        }
        if (_activeKey !== activeKey.value) {
          activeKey.value = _activeKey
        }
        // Wait for render/option registration, not CSS animation completion.
        const key = activeKey.value
        const dropdown = dropdownRef?.value
        const virtual = virtualListRef?.value
        nextTick(() => {
          if (
            !available() ||
            !open.value ||
            request !== scrollRequest ||
            (key && key !== activeKey.value) ||
            (dropdown && dropdown !== dropdownRef?.value) ||
            (virtual && virtual !== virtualListRef?.value)
          ) {
            return
          }
          scrollRequest++
          if (activeKey.value) {
            scrollIntoView(activeKey.value)
          }
        })
      }
    },
    { flush: 'sync', immediate: true },
  )

  const dispatchKeyDown = getKeyDownHandler(
    new Map([
      [
        KEYBOARD_KEY.ENTER,
        (e: Event) => {
          if (!loading?.value && !(e as KeyboardEvent).isComposing) {
            if (open.value) {
              if (activeKey.value) {
                onSelect(activeKey.value, e)
                e.preventDefault()
              }
            } else if (enterToOpen) {
              onOpenChange(true)
              e.preventDefault()
            }
          }
        },
      ],
      [
        KEYBOARD_KEY.ESC,
        (e: Event) => {
          if (open.value) {
            onOpenChange(false)
            e.preventDefault()
          }
        },
      ],
      [
        KEYBOARD_KEY.ARROW_DOWN,
        (e: Event) => {
          if (open.value) {
            const next = getNextActiveKey('down')
            if (next) {
              activeKey.value = next
              scrollIntoView(next)
            }
            e.preventDefault()
          }
        },
      ],
      [
        KEYBOARD_KEY.ARROW_UP,
        (e: Event) => {
          if (open.value) {
            const next = getNextActiveKey('up')
            if (next) {
              activeKey.value = next
              scrollIntoView(next)
            }
            e.preventDefault()
          }
        },
      ],
    ]),
  )
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.isComposing || event.keyCode === 229) {
      return
    }
    if (
      insideFieldEditor &&
      !open.value &&
      (event.key === 'Escape' || (event.key === 'Enter' && editorEnterSubmits?.value))
    ) {
      return
    }
    if (available()) {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
        cancelPendingInitialScroll()
      }
      dispatchKeyDown(event)
    }
  }

  provide(
    selectInjectionKey,
    reactive({
      multiple,
      fieldNames: mergedFieldNames,
      inputValue,
      filterOption,
      caseSensitive,
      searchFields,
      component,
      valueKeys,
      activeKey,
      getOptionId,
      setActiveKey,
      onSelect: (key: string, event: Event) => {
        if (available() && open.value) {
          onSelect(key, event)
        }
      },
      getNextSlotOptionIndex,
      addSlotOptionInfo,
      removeSlotOptionInfo,
    }),
  )

  return {
    validOptions,
    optionInfoMap,
    validOptionInfos,
    enabledOptionKeys,
    activeKey,
    setActiveKey,
    addSlotOptionInfo,
    removeSlotOptionInfo,
    getNextActiveKey,
    scrollIntoView,
    cancelPendingInitialScroll,
    handleKeyDown,
  }
}
