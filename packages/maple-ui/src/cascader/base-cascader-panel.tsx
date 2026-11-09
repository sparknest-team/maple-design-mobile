import { defineComponent, inject, PropType, TransitionGroup } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import { VirtualListProps } from '../_components/virtual-list-v2/interface'
import Empty from '../empty'
import Loading from '../loading'
import { createNamespace, getPrefixCls } from '../utils/components'
import CascaderColumn from './cascader-column'
import { CascaderOptionInfo } from './types'

const { name } = createNamespace('base-cascader-panel')

export default defineComponent({
  name,
  props: {
    displayColumns: {
      type: Array as PropType<CascaderOptionInfo[][]>,
      required: true,
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
    loading: Boolean,
    dropdown: Boolean,
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader')
    const emptySlot = useEmptySlot()

    const renderEmpty = () => {
      return slots.empty?.() ?? emptySlot.value?.({ component: 'cascader' }) ?? <Empty />
    }

    const renderContent = () => {
      if (props.loading) {
        return (
          <div
            key="panel-column-loading"
            {...{ class: [`${prefixCls}-panel-column`, `${prefixCls}-panel-column-loading`] }}
          >
            <Loading />
          </div>
        )
      }
      if (props.displayColumns.length === 0) {
        return (
          <div key="panel-column-empty" class={`${prefixCls}-panel-column`}>
            <div class={`${prefixCls}-list-empty`}>{renderEmpty()}</div>
          </div>
        )
      }
      return props.displayColumns.map((column, index) => (
        <CascaderColumn
          key={`column-${index}`}
          column={column}
          level={index}
          selectedPath={props.selectedPath}
          activeKey={props.activeKey}
          totalLevel={props.totalLevel}
          displayedLevels={props.displayColumns.length}
          multiple={props.multiple}
          checkStrictly={props.checkStrictly}
          virtualListProps={props.virtualListProps}
          v-slots={{
            empty: slots.empty,
          }}
        />
      ))
    }

    return () => (
      <TransitionGroup
        tag="div"
        name={`${prefixCls}-slide`}

        {...{
          class: [
            `${prefixCls}-panel`,
            {
              [`${prefixCls}-dropdown-panel`]: props.dropdown,
            },
          ],
        }}
      >
        {renderContent()}
      </TransitionGroup>
    )
  },
})
