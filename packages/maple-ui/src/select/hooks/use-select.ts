import type { ComponentPublicInstance, Ref } from 'vue'
import { computed, nextTick, provide, reactive, ref, watch } from 'vue'
import { VirtualListRef } from '../../_components/virtual-list-v2/interface'
import { getRelativeRect } from '../../_utils/dom'
import { getKeyDownHandler, KEYBOARD_KEY } from '../../_utils/keyboard'
import { selectInjectionKey } from '../context'
import { FilterOption, SelectFieldNames, SelectOption } from '../types'
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
}: {
  multiple?: Ref<boolean>
  options?: Ref<SelectOption[]>
  extraOptions?: Ref<SelectOption[]>
  inputValue?: Ref<string>
  filterOption?: Ref<FilterOption>
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
  defaultActiveFirstOption?: Ref<boolean>
}) => {
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
    showExtraOptions,
    fieldNames,
  })

  const activeKey = ref<string | undefined>()

  watch(enabledOptionKeys, (enabledKeys) => {
    if (!activeKey.value || !enabledKeys.includes(activeKey.value)) {
      activeKey.value = enabledKeys[0]
    }
  })

  const setActiveKey = (key?: string) => {
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
    if (virtualListRef?.value) {
      virtualListRef.value.scrollTo({ key })
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

    if (optionRect.top < 0) {
      wrapperEle.scrollTo(0, wrapperScrollTop + optionRect.top)
    } else if (optionRect.bottom < 0) {
      wrapperEle.scrollTo(0, wrapperScrollTop - optionRect.bottom)
    }
  }

  // Handling when the drop-down box is displayed/hide
  watch(open, (visible) => {
    if (visible) {
      // get last value key
      const current = valueKeys.value[valueKeys.value.length - 1]
      let _activeKey = (defaultActiveFirstOption?.value ?? true) ? enabledOptionKeys.value[0] : undefined
      if (enabledOptionKeys.value.includes(current)) {
        _activeKey = current
      }
      if (_activeKey !== activeKey.value) {
        activeKey.value = _activeKey
      }
      // Execute scrollIntoView after the pop-up animation ends, otherwise unnecessary scrolling will occur
      nextTick(() => {
        if (activeKey.value) {
          scrollIntoView(activeKey.value)
        }
      })
    }
  })

  const handleKeyDown = getKeyDownHandler(
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

  provide(
    selectInjectionKey,
    reactive({
      multiple,
      fieldNames: mergedFieldNames,
      inputValue,
      filterOption,
      component,
      valueKeys,
      activeKey,
      setActiveKey,
      onSelect,
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
    handleKeyDown,
  }
}
