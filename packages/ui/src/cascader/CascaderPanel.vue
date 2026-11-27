<template>
  <base-cascader-panel
    ref="panelRef"
    :display-columns="displayColumns"
    :selected-path="selectedPath"
    :active-key="activeKey"
    :multiple="multiple"
    :total-level="totalLevel"
    :check-strictly="checkStrictly"
    @keydown="handleKeyDown"
  >
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </base-cascader-panel>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { computed, defineComponent, provide, reactive, ref, toRefs, watch } from 'vue'
import { isNull, isUndefined } from '../_utils/is'
import { getKeyDownHandler, KEYBOARD_KEY } from '../_utils/keyboard'
import { BaseType, UnionType } from '../_utils/types'
import { createNamespace, getPrefixCls } from '../utils/components'
import BaseCascaderPanelComponent from './base-cascader-panel'
import type { WithNativeListeners } from '../_utils/native-listener-types'
import { cascaderInjectionKey } from './context'
import { useSelectedPath } from './hooks/use-selected-path'
import { cascaderPanelProps } from './panel-props'
import { CascaderBaseValue, CascaderOption, CascaderOptionInfo } from './types'
import { useCascaderFocus } from './use-cascader-focus'
import { startKeyboardLazy } from './use-keyboard-lazy'
import { useLazyOptions } from './use-lazy-options'
import {
  getCheckedStatus,
  getLeafOptionInfos,
  getLeafOptionKeys,
  getOptionInfos,
  getValidValues,
  getValueKey,
} from './utils'

const BaseCascaderPanel = BaseCascaderPanelComponent as WithNativeListeners<
  typeof BaseCascaderPanelComponent,
  'onKeydown'
>

export default defineComponent({
  name: createNamespace('cascader-panel').name,
  components: {
    BaseCascaderPanel,
  },
  props: cascaderPanelProps,
  emits: {
    'update:modelValue': (
      value:
        | string
        | number
        | Record<string, any>
        | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
        | undefined,
    ) => true,
    /**
     * @zh 选中值改变时触发
     * @en Triggered when the selected value changes
     * @property {string | number | (string | number | (string | number)[])[] | undefined} value
     */
    change: (
      value:
        | string
        | number
        | Record<string, any>
        | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
        | undefined,
    ) => true,
  },
  /**
   * @zh 选项为空时的显示内容
   * @en Display content when the option is empty
   * @slot empty
   */
  setup(props, { emit, slots }) {
    const { options, checkStrictly, modelValue, expandChild, expandTrigger } = toRefs(props)
    const _value = ref<CascaderBaseValue | undefined>(props.defaultValue)

    watch(
      () => props.modelValue,
      (value) => {
        if (isUndefined(value) || isNull(value)) {
          _value.value = props.multiple ? [] : undefined
        }
      },
    )

    const optionInfos: Ref<CascaderOptionInfo[]> = ref<CascaderOptionInfo[]>([])
    const totalLevel = ref(1)

    const optionMap = reactive(new Map<string, CascaderOptionInfo>())
    const leafOptionMap = reactive(new Map<string, CascaderOptionInfo>())
    const leafOptionValueMap = reactive(new Map<BaseType, string>())
    const leafOptionSet = reactive(new Set<CascaderOptionInfo>())

    const lazyLoadOptions = reactive<Record<string, CascaderOption[]>>({})

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
      [options, lazyLoadOptions, mergedFieldNames, checkStrictly, () => props.loadMore],
      ([_options, _lazyLoadOptions, _fieldNames]) => {
        optionMap.clear()
        leafOptionMap.clear()
        leafOptionValueMap.clear()
        leafOptionSet.clear()

        optionInfos.value = getOptionInfos(_options ?? [], {
          enabledLazyLoad: Boolean(props.loadMore),
          lazyLoadOptions: _lazyLoadOptions,
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
      const values = getValidValues(props.modelValue ?? _value.value, {
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

    const filteredLeafOptions = computed<CascaderOptionInfo[]>(() =>
      props.checkStrictly ? Array.from(optionMap.values()) : Array.from(leafOptionSet),
    )

    const updateValue = (values: UnionType[] | UnionType[][]) => {
      const value = props.multiple ? values : (values[0] ?? '')
      if (values.length === 0) {
        setSelectedPath()
        setActiveKey()
      }

      _value.value = value
      emit('update:modelValue', value)
      emit('change', value)
    }

    const selectSingle = (option: CascaderOptionInfo) => {
      updateValue([props.pathMode ? option.pathValue : option.value])
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
    }

    const handleClickOption = (option: CascaderOptionInfo, checked?: boolean) => {
      if (
        option.disabled ||
        (props.multiple && option.selectionDisabled) ||
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

    const {
      activeKey,
      activeOption,
      selectedPath,
      displayColumns,
      setActiveKey,
      setSelectedPath,
      getNextActiveNode,
      navigateLevel,
    } = useSelectedPath(optionInfos, {
      optionMap,
      filteredLeafOptions,
      expandChild,
    })

    const loadLazyOption = useLazyOptions({
      options: () => props.options,
      loader: () => props.loadMore,
      fieldNames: () => props.fieldNames,
      blocked: () => false,
      cache: lazyLoadOptions,
    })
    const expandOption = (option: CascaderOptionInfo): Promise<void> => {
      if (option.disabled) {
        return Promise.resolve()
      }
      setSelectedPath(option.key)
      return loadLazyOption(option)
    }

    provide(
      cascaderInjectionKey,
      reactive({
        onClickOption: handleClickOption,
        setActiveKey,
        setSelectedPath,
        expandOption,
        isOptionLoading: loadLazyOption.isPending,
        slots,
        valueMap: computedValueMap,
        expandTrigger,
      }),
    )

    const activateKeyDown = (ev: Event) => {
      if (activeOption.value) {
        let checked: boolean
        if (props.checkStrictly || activeOption.value.isLeaf) {
          checked = !computedValueMap.value.has(activeOption.value.key)
        } else {
          checked = !getCheckedStatus(activeOption.value, computedValueMap.value).checked
        }
        if ((ev as KeyboardEvent).key !== ' ' || !(ev.target as Element | null)?.matches('[role="menuitemcheckbox"]')) {
          setSelectedPath(activeOption.value.key)
        }
        handleClickOption(activeOption.value, checked)
      }
    }

    const dispatchKeyDown = getKeyDownHandler(
      new Map([
        [KEYBOARD_KEY.ENTER, activateKeyDown],
        [
          KEYBOARD_KEY.SPACE,
          (ev: Event) => {
            ev.preventDefault()
            activateKeyDown(ev)
          },
        ],
        [
          KEYBOARD_KEY.ARROW_DOWN,
          (ev: Event) => {
            ev.preventDefault()
            const activeNode = getNextActiveNode(
              'next',
              (ev.target as Element | null)?.closest?.('[data-cascader-key]')?.getAttribute('data-cascader-key') ??
                undefined,
            )
            setActiveKey(activeNode?.key)
          },
        ],
        [
          KEYBOARD_KEY.ARROW_UP,
          (ev: Event) => {
            ev.preventDefault()
            const activeNode = getNextActiveNode(
              'preview',
              (ev.target as Element | null)?.closest?.('[data-cascader-key]')?.getAttribute('data-cascader-key') ??
                undefined,
            )
            setActiveKey(activeNode?.key)
          },
        ],
        [KEYBOARD_KEY.ARROW_RIGHT, (event: Event) => navigateLevel(event, true)],
        [KEYBOARD_KEY.ARROW_LEFT, (event: Event) => navigateLevel(event, false)],
      ]),
    )

    const panelRef = ref<{ $el: HTMLElement }>()
    const focusOption = useCascaderFocus(activeKey)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || event.keyCode === 229) {
        return
      }
      const target = event.target as Element | null
      const option = target?.closest?.(
        '[role="menuitem"][data-cascader-key], [role="menuitemradio"][data-cascader-key], [role="menuitemcheckbox"][data-cascader-key], [role="option"][data-cascader-key]',
      )
      if (event.key === ' ' && !option) {
        return
      }
      const panelSelector = `.${getPrefixCls('cascader')}-panel, .${getPrefixCls('cascader')}-editor-panel`
      const originPanel = option?.closest(panelSelector)
      if (option && originPanel !== event.currentTarget) {
        return
      }
      // Nested inputs and buttons own their own keyboard interaction.
      if (
        option?.getAttribute('aria-disabled') === 'true' &&
        ['Enter', ' ', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        event.preventDefault()
        return
      }
      if (option && target !== option) {
        return
      }
      if (option && ['Enter', ' ', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        const key = option.getAttribute('data-cascader-key')
        if (key) {
          setActiveKey(key)
        }
      }
      const root = panelRef.value?.$el
      const lazyTask = startKeyboardLazy(
        event,
        activeOption.value,
        Boolean(props.loadMore),
        false,
        expandOption,
        (key) => activeKey.value === key && selectedPath.value.includes(key),
        navigateLevel,
        () => {
          if (root && option) {
            focusOption(root, option, originPanel, panelSelector)
          }
        },
      )
      dispatchKeyDown(event)
      if (option && ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key) && root) {
        focusOption(root, option, originPanel, panelSelector)
      }
      return lazyTask
    }

    return {
      panelRef,
      optionInfos,
      filteredLeafOptions,
      selectedPath,
      activeKey,
      displayColumns,
      handleKeyDown,
      totalLevel,
    }
  },
})
</script>
