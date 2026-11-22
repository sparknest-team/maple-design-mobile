import { computed, defineComponent, inject, PropType } from 'vue'
import { isFunction } from '../_utils/is'
import Checkbox from '../checkbox'
import { createNamespace, getPrefixCls } from '../utils/components'
import { TableContext, tableInjectionKey } from './context'
import { useI18n } from './mobile-locale'
import { getOperationFixedCls, getOperationStyle } from './render/cell-layout'
import { TableOperationColumn } from './types'

const { name } = createNamespace('operation-th')

export default defineComponent({
  name,
  props: {
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true,
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true,
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    // for selection
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('table')
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {})
    const { t } = useI18n()
    const selectionHeaderLabel = () => {
      if (
        props.operationColumn.title ||
        !['selection-checkbox', 'selection-radio'].includes(props.operationColumn.name)
      ) {
        return undefined
      }
      if (props.selectAll) {
        return t('table.selectAll')
      }
      const label = t('table.selectionColumn')
      return label === 'table.selectionColumn' ? 'Selection' : label
    }

    const checkboxStatus = computed(() => {
      let checked = false
      let indeterminate = false

      const currentSelectedEnabledRowKeys =
        tableCtx.currentSelectedRowKeys?.filter((key) => tableCtx.currentAllEnabledRowKeys?.includes(key) ?? true) ?? []

      const selectedNumber = currentSelectedEnabledRowKeys.length
      const totalEnabledNumber = tableCtx.currentAllEnabledRowKeys?.length ?? 0
      if (selectedNumber > 0) {
        if (selectedNumber >= totalEnabledNumber) {
          checked = true
        } else {
          indeterminate = true
        }
      }
      return {
        checked,
        indeterminate,
      }
    })

    const renderContent = () => {
      if (props.selectAll) {
        return (
          <Checkbox
            v-slots={
              props.operationColumn.title
                ? {
                    default: () =>
                      isFunction(props.operationColumn.title)
                        ? props.operationColumn.title()
                        : props.operationColumn.title,
                  }
                : {}
            }
            ariaLabel={props.operationColumn.title ? undefined : t('table.selectAll')}
            modelValue={checkboxStatus.value.checked}
            indeterminate={checkboxStatus.value.indeterminate}
            uninjectGroupContext
            onChange={(checked) => {
              tableCtx.onSelectAll?.(checked as boolean)
            }}
          />
        )
      }
      if (props.operationColumn.title) {
        return isFunction(props.operationColumn.title) ? props.operationColumn.title() : props.operationColumn.title
      }
      return null
    }

    const style = computed(() =>
      getOperationStyle(
        props.operationColumn,
        props.operations,
        tableCtx.readingDirection,
        tableCtx.physicalDataColumns,
        tableCtx.tableLayout,
      ),
    )

    const cls = computed(() => [
      `${prefixCls}-th`,
      `${prefixCls}-operation`,
      {
        [`${prefixCls}-checkbox`]: props.selectAll,
      },
      ...getOperationFixedCls(prefixCls, props.operationColumn),
    ])

    return () => (
      <th
        aria-label={selectionHeaderLabel()}
        class={cls.value}
        style={style.value}
        rowspan={props.rowSpan > 1 ? props.rowSpan : undefined}
        data-operation-key={props.operationColumn.name}
      >
        <span class={`${prefixCls}-cell`}>{renderContent()}</span>
      </th>
    )
  },
})
