import { computed, defineComponent, inject, nextTick, PropType, ref, watch } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import Scrollbar from '../_components/selection-scrollbar'
import VirtualList from '../_components/virtual-list-v2'
import { VirtualListProps, VirtualListRef } from '../_components/virtual-list-v2/interface'
import Empty from '../empty'
import { createNamespace, getPrefixCls } from '../utils/components'
import CascaderOption from './cascader-option'
import { cascaderInjectionKey } from './context'
import { CascaderOptionInfo } from './types'

const { name } = createNamespace('cascader-column')

export default defineComponent({
  name,
  props: {
    column: {
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    menuId: String,
    nextMenuId: String,
    selectedPath: {
      type: Array as PropType<string[]>,
      required: true,
    },
    activeKey: String,
    focusedKey: String,
    tabEntry: { type: Boolean, default: true },
    totalLevel: {
      type: Number,
      required: true,
    },
    displayedLevels: { type: Number, default: 1 },
    multiple: Boolean,
    checkStrictly: Boolean,
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader')
    const emptySlot = useEmptySlot()
    const cascader = inject(cascaderInjectionKey, undefined)
    const virtualListRef = ref<VirtualListRef & { currentList?: CascaderOptionInfo[] }>()
    const isVirtual = computed(() => Boolean(props.virtualListProps))
    const tabKey = computed(() => {
      const items = isVirtual.value ? (virtualListRef.value?.currentList ?? props.column.slice(0, 1)) : props.column
      const enabled = items.filter((item) => !item.disabled)
      return (
        items.find((item) => item.key === props.focusedKey) ??
        enabled.find((item) => item.key === props.activeKey) ??
        enabled.find((item) => cascader?.valueMap?.has(item.key)) ??
        enabled.find((item) => props.selectedPath.includes(item.key)) ??
        enabled[0] ??
        items[0]
      )?.key
    })
    const optionTabIndex = (item: CascaderOptionInfo) =>
      props.multiple ? undefined : props.tabEntry && item.key === tabKey.value ? 0 : -1

    watch(
      () => [props.activeKey, props.column, isVirtual.value] as const,
      async ([key]) => {
        if (!isVirtual.value || !key || !props.column.some((item) => item.key === key)) {
          return
        }
        await nextTick()
        const index = props.column.findIndex((item) => item.key === key)
        if (isVirtual.value && props.activeKey === key && index >= 0) {
          virtualListRef.value?.scrollTo({ index, align: 'auto' })
        }
      },
      { immediate: true, flush: 'post' },
    )

    const renderEmpty = () => {
      return slots.empty?.() ?? emptySlot.value?.({ component: 'cascader' }) ?? <Empty />
    }

    return () => {
      return (
        <div class={`${prefixCls}-panel-column`} style={{ zIndex: props.totalLevel - props.level }}>
          {props.column.length === 0 ? (
            <Scrollbar class={`${prefixCls}-column-content`}>
              <div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
            </Scrollbar>
          ) : isVirtual.value ? (
            <VirtualList
              key={props.level > 0 ? props.selectedPath[props.level - 1] : undefined}
              {...props.virtualListProps}
              {...(props.multiple ? {} : { tabindex: -1 })}
              ref={virtualListRef}
              data={props.column}
              component={{ container: props.virtualListProps?.component ?? 'div', content: 'ul' }}
              contentAttrs={{
                role: 'menu',
                id: props.menuId,
                class: [
                  `${prefixCls}-list`,
                  {
                    [`${prefixCls}-list-multiple`]: Boolean(props.multiple),
                    [`${prefixCls}-list-strictly`]: Boolean(props.checkStrictly),
                  },
                ],
              }}
              v-slots={{
                item: ({ item }: { item: CascaderOptionInfo }) => {
                  return (
                    <CascaderOption
                      key={item.key}
                      option={item}
                      active={props.selectedPath.includes(item.key) || item.key === props.activeKey}
                      expanded={props.selectedPath.includes(item.key) && props.displayedLevels > props.level + 1}
                      childMenuId={props.nextMenuId}
                      multiple={props.multiple}
                      checkStrictly={props.checkStrictly}
                      tabIndex={optionTabIndex(item)}
                    />
                  )
                },
              }}
            />
          ) : (
            <Scrollbar class={`${prefixCls}-column-content`} {...{ tabindex: props.multiple ? undefined : -1 }}>
              <ul
                role="menu"
                id={props.menuId}
                class={[
                  `${prefixCls}-list`,
                  {
                    [`${prefixCls}-list-multiple`]: Boolean(props?.multiple),
                    [`${prefixCls}-list-strictly`]: Boolean(props?.checkStrictly),
                  },
                ]}
              >
                {props.column.map((item) => {
                  return (
                    <CascaderOption
                      key={item.key}
                      option={item}
                      active={props.selectedPath.includes(item.key) || item.key === props.activeKey}
                      expanded={props.selectedPath.includes(item.key) && props.displayedLevels > props.level + 1}
                      childMenuId={props.nextMenuId}
                      multiple={props.multiple}
                      checkStrictly={props.checkStrictly}
                      tabIndex={optionTabIndex(item)}
                    />
                  )
                })}
              </ul>
            </Scrollbar>
          )}
        </div>
      )
    }
  },
})
