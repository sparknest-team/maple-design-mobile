import { defineComponent, inject, PropType } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import Scrollbar from '../_components/selection-scrollbar'
import Empty from '../empty'
import Loading from '../loading'
import { createNamespace, getPrefixCls } from '../utils/components'
import CascaderOption from './cascader-option'
import { CascaderOptionInfo } from './types'

const { name } = createNamespace('cascader-search-panel')

export default defineComponent({
  name,
  props: {
    options: {
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    loading: Boolean,
    activeKey: String,
    multiple: Boolean,
    checkStrictly: Boolean,
    pathLabel: Boolean,
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader')
    const emptySlot = useEmptySlot()

    const renderContent = () => {
      if (props.loading) {
        return <Loading />
      }
      if (props.options.length === 0) {
        return (
          <div class={`${prefixCls}-list-empty`}>
            {slots.empty?.() ?? emptySlot.value?.({ component: 'cascader' }) ?? <Empty />}
          </div>
        )
      }
      return (
        <ul
          role="menu"
          class={[
            `${prefixCls}-list`,
            `${prefixCls}-search-list`,
            {
              [`${prefixCls}-list-multiple`]: props.multiple,
            },
          ]}
        >
          {props.options.map((item) => (
            <CascaderOption
              key={item.key}
              class={`${prefixCls}-search-option`}
              option={item}
              active={item.key === props.activeKey}
              multiple={props.multiple}
              checkStrictly={props.checkStrictly}
              pathLabel={props.pathLabel}
              searchOption
            />
          ))}
        </ul>
      )
    }

    return () => <Scrollbar class={[`${prefixCls}-panel`, `${prefixCls}-search-panel`]}>{renderContent()}</Scrollbar>
  },
})
