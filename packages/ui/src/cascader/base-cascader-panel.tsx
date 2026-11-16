import { defineComponent, inject, PropType, TransitionGroup } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import { VirtualListProps } from '../_components/virtual-list-v2/interface'
import Empty from '../empty'
import Loading from '../loading/Loading.vue'
import { createNamespace, getPrefixCls } from '../utils/components'
import { useId } from '../utils/vue-compat'
import CascaderColumn from './cascader-column'
import { CascaderOptionInfo } from './types'
import { useCascaderMenuFocus } from './use-menu-focus'

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
    const { focusedKey, onFocusin, onFocusout } = useCascaderMenuFocus(
      `.${prefixCls}-panel, .${prefixCls}-editor-panel`,
    )
    const menuBaseId = `cascader-menu-${useId()}`
    const menuId = (index: number) => `${menuBaseId}-${index}`
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
      const preferredKey = focusedKey.value ?? props.activeKey
      const activeLevel = props.displayColumns.findIndex((column) => column.some((item) => item.key === preferredKey))
      const tabEntryLevel =
        activeLevel >= 0 ? activeLevel : props.displayColumns.findIndex((column) => column.length > 0)
      return props.displayColumns.map((column, index) => (
        <CascaderColumn
          key={`column-${index}`}
          column={column}
          level={index}
          menuId={menuId(index)}
          nextMenuId={props.displayColumns[index + 1]?.length ? menuId(index + 1) : undefined}
          selectedPath={props.selectedPath}
          activeKey={props.activeKey}
          focusedKey={focusedKey.value}
          tabEntry={index === tabEntryLevel}
          totalLevel={props.totalLevel}
          displayedLevels={props.displayColumns[index + 1]?.length ? props.displayColumns.length : index + 1}
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
          onFocusin,
          onFocusout,
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
