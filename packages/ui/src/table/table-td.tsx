import { computed, defineComponent, inject, PropType, VNode } from 'vue'
import { IconLoading } from '@maple-design/icons-vue/icon-loading'
import AutoTooltip from '../_components/auto-tooltip/auto-tooltip'
import { isFunction, isObject } from '../_utils/is'
import { createNamespace, getPrefixCls } from '../utils/components'
import { TableContext, tableInjectionKey } from './context'
import { useCellLoad } from './features/expansion/use-cell-load'
import { renderDataContent } from './render/cell-content'
import { getFixedCls, getStyle } from './render/cell-layout'
import { renderBodyContent, renderCellElement, renderTextContent } from './render/cells'
import { firstStructuralNode } from './structural-slot'
import { TableColumnData, TableData, TableDataWithRaw, TableOperationColumn } from './types'

const TD_TYPES = ['normal', 'operation', 'checkbox', 'radio', 'expand'] as const
type TdTypes = (typeof TD_TYPES)[number]

const { name } = createNamespace('td')

export default defineComponent({
  name,
  props: {
    headers: String,
    rowIndex: Number,
    record: {
      type: Object as PropType<TableDataWithRaw>,
      default: () => ({}),
    },
    column: {
      type: Object as PropType<TableColumnData>,
      default: () => ({}),
    },
    type: {
      type: String as PropType<TdTypes>,
      default: 'normal',
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      default: () => [],
    },
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    colSpan: {
      type: Number,
      default: 1,
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    isFixedExpand: {
      type: Boolean,
      default: false,
    },
    containerWidth: {
      type: Number,
    },
    showExpandBtn: {
      type: Boolean,
      default: false,
    },
    indentSize: {
      type: Number,
      default: 0,
    },
    renderExpandBtn: {
      type: Function as PropType<(record: TableDataWithRaw, stopPropagation?: boolean) => VNode>,
    },
    summary: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('table')

    const tooltipProps = computed(() => {
      if (isObject(props.column?.tooltip)) {
        return props.column.tooltip
      }
      return undefined
    })

    const isSorted = computed(() => props.column?.dataIndex && tableCtx.sorter?.field === props.column.dataIndex)

    const resizing = computed(() => props.column?.dataIndex && tableCtx.resizingColumn === props.column.dataIndex)

    const getCustomClass = () => {
      if (props.summary) {
        return isFunction(props.column?.summaryCellClass)
          ? props.column.summaryCellClass(props.record?.raw)
          : props.column?.summaryCellClass
      }
      return isFunction(props.column?.bodyCellClass)
        ? props.column.bodyCellClass(props.record?.raw)
        : props.column?.bodyCellClass
    }

    const cls = computed(() => [
      `${prefixCls}-td`,
      {
        [`${prefixCls}-col-sorted`]: isSorted.value,
        [`${prefixCls}-td-resizing`]: resizing.value,
      },
      ...getFixedCls(
        prefixCls,
        props.column,
        tableCtx.readingDirection === 'rtl' && tableCtx.hasPhysicalLeftOperations,
      ),
      props.column?.cellClass,
      getCustomClass(),
    ])

    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {})

    const getCustomStyle = () => {
      if (props.summary) {
        return isFunction(props.column?.summaryCellStyle)
          ? props.column.summaryCellStyle(props.record?.raw)
          : props.column?.summaryCellStyle
      }
      return isFunction(props.column?.bodyCellStyle)
        ? props.column.bodyCellStyle(props.record?.raw)
        : props.column?.bodyCellStyle
    }

    const style = computed(() => {
      const baseStyle = getStyle(
        props.column,
        {
          dataColumns: props.dataColumns,
          operations: props.operations,
        },
        tableCtx.tableLayout,
        tableCtx.readingDirection,
      )
      const customStyle = getCustomStyle()
      return {
        ...baseStyle,
        ...props.column?.cellStyle,
        ...customStyle,
      }
    })

    const cellStyle = computed(() => {
      if (props.isFixedExpand && props.containerWidth) {
        return {
          width: `${props.containerWidth}px`,
        }
      }
      return undefined
    })

    const renderContent = () => renderDataContent(props, slots, tableCtx.slots)

    const { isLoading, handleClick } = useCellLoad(props, tableCtx)

    const renderCell = () =>
      renderBodyContent(prefixCls, {
        align: props.column?.align,
        fixedExpand: props.isFixedExpand,
        hasExpand: props.showExpandBtn,
        style: cellStyle.value,
        indent: props.indentSize,
        onExpand: handleClick,
        expand: () => (isLoading.value ? <IconLoading /> : props.renderExpandBtn?.(props.record, false)),
        content: () =>
          props.column?.ellipsis && props.column?.tooltip ? (
            <AutoTooltip class={`${prefixCls}-td-content`} tooltipProps={tooltipProps.value}>
              {renderContent()}
            </AutoTooltip>
          ) : (
            renderTextContent(prefixCls, renderContent(), props.column?.ellipsis)
          ),
      })

    return () => {
      const customCell = firstStructuralNode(
        slots.td?.({
          record: props.record?.raw,
          column: props.column,
          rowIndex: props.rowIndex ?? -1,
        }),
      )
      const customHeaders =
        customCell?.props &&
        Object.prototype.hasOwnProperty.call(customCell.props, 'headers') &&
        customCell.props.headers !== undefined
          ? customCell.props.headers
          : props.headers
      return renderCellElement(
        'td',
        customCell,
        props.column,
        {
          class: cls.value,
          style: style.value,
          rowspan: props.rowSpan > 1 ? props.rowSpan : undefined,
          colspan: props.colSpan > 1 ? props.colSpan : undefined,
          headers: customHeaders,
        },
        () => [renderCell()],
      )
    }
  },
})
