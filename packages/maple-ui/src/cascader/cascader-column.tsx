import { computed, defineComponent, inject, nextTick, PropType, ref, watch } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import Scrollbar from '../_components/selection-scrollbar'
import VirtualList from '../_components/virtual-list-v2'
import { VirtualListProps, VirtualListRef } from '../_components/virtual-list-v2/interface'
import Empty from '../empty'
import { createNamespace, getPrefixCls } from '../utils/components'
import CascaderOption from './cascader-option'
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
    selectedPath: {
      type: Array as PropType<string[]>,
      required: true,
    },
    activeKey: String,
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
    const virtualListRef = ref<VirtualListRef>()
    const isVirtual = computed(() => Boolean(props.virtualListProps))

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
              key={props.column?.length}
              {...props.virtualListProps}
              ref={virtualListRef}
              data={props.column}
              component={{ container: props.virtualListProps?.component ?? 'div', content: 'ul' }}
              contentAttrs={{
                role: 'menu',
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
                      multiple={props.multiple}
                      checkStrictly={props.checkStrictly}
                    />
                  )
                },
              }}
            />
          ) : (
            <Scrollbar class={`${prefixCls}-column-content`}>
              <ul
                role="menu"
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
                      multiple={props.multiple}
                      checkStrictly={props.checkStrictly}
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
