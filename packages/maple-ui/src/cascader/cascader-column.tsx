import { defineComponent, inject, PropType, ref } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import Scrollbar from '../_components/selection-scrollbar'
import VirtualList from '../_components/virtual-list-v2'
import { VirtualListProps } from '../_components/virtual-list-v2/interface'
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
    multiple: Boolean,
    checkStrictly: Boolean,
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader')
    const emptySlot = useEmptySlot()
    const virtualListRef = ref()
    const isVirtual = ref(Boolean(props.virtualListProps))

    const renderEmpty = () => {
      return slots.empty?.() ?? emptySlot?.({ component: 'cascader' }) ?? <Empty />
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
              v-slots={{
                item: ({ item }: { item: CascaderOptionInfo }) => {
                  return (
                    <CascaderOption
                      key={item.key}
                      option={item}
                      active={props.selectedPath.includes(item.key) || item.key === props.activeKey}
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
