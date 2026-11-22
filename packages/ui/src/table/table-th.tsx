import { computed, defineComponent, inject, PropType, toRefs, VNode } from 'vue'
import AutoTooltip from '../_components/auto-tooltip/auto-tooltip'
import { isBoolean, isFunction, isObject } from '../_utils/is'
import { createNamespace, getPrefixCls } from '../utils/components'
import { TableContext, tableInjectionKey } from './context'
import { useDesktopHeaderSorter } from './desktop/use-header-sorter'
import { getColumnLayoutKey, isTableExtraColumn } from './extra-column'
import { forwardTableColumnSlot, forwardTableSlot } from './forward-table-slot'
import { useI18n } from './mobile-locale'
import { getFixedCls, getStyle } from './render/cell-layout'
import { renderCellElement, renderHeaderContent } from './render/cells'
import { firstStructuralNode } from './structural-slot'
import TableSlot from './TableSlot.vue'
import { TableColumnData, TableOperationColumn } from './types'

const { name } = createNamespace('th')

export default defineComponent({
  name,
  props: {
    semanticLabelId: String,
    customHeader: Object as PropType<VNode>,
    column: {
      type: Object as PropType<TableColumnData>,
      default: () => ({}),
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      default: () => [],
    },
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    resizable: Boolean,
  },
  setup(props, { slots }) {
    const { column } = toRefs(props)
    const prefixCls = getPrefixCls('table')
    const { t } = useI18n()

    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {})

    const resizing = computed(() => props.column?.dataIndex && tableCtx.resizingColumn === props.column.dataIndex)

    const tooltipProps = computed(() => {
      if (isObject(props.column?.tooltip)) {
        return props.column.tooltip
      }
      return undefined
    })

    const { sortOrder, hasSorter, nextSortOrder, handleClickSorter, renderSorterNode } = useDesktopHeaderSorter(
      column,
      tableCtx,
      prefixCls,
    )

    const cellCls = computed(() => {
      const cls: any[] = [
        `${prefixCls}-cell`,
        `${prefixCls}-cell-align-${props.column?.align ?? (props.column.children ? 'center' : 'start')}`,
      ]

      if (hasSorter.value) {
        cls.push(`${prefixCls}-cell-with-sorter`, {
          [`${prefixCls}-cell-next-ascend`]: nextSortOrder.value === 'ascend',
          [`${prefixCls}-cell-next-descend`]: nextSortOrder.value === 'descend',
        })
      }

      if (showHeaderActions.value) {
        cls.push(`${prefixCls}-cell-with-actions`)
      }

      return cls
    })

    const renderTitle = () => {
      if (slots.default) {
        return slots.default()
      }
      if (props.column?.titleSlotName && tableCtx.slots?.[props.column.titleSlotName]) {
        return (
          <TableSlot
            slotProps={{ column: props.column }}
            v-slots={forwardTableSlot(tableCtx.slots[props.column.titleSlotName])}
          />
        )
      }
      if (props.column?.slots?.title) {
        return <TableSlot v-slots={forwardTableColumnSlot(props.column.slots.title)} />
      }
      if (isFunction(props.column.title)) {
        return props.column.title()
      }
      return props.column.title
    }

    const isExtraColumn = computed(() => {
      return isTableExtraColumn(props.column)
    })

    /** 叶子列且外部提供了 #header-cell-actions 时展示操作区（插槽在 render 时再调用） */
    const showHeaderActions = computed(() => {
      if (isExtraColumn.value || props.column?.children?.length || !props.column?.dataIndex) {
        return false
      }
      return Boolean(tableCtx.slots?.['header-cell-actions'])
    })

    const renderHeaderActions = () => {
      if (!showHeaderActions.value || !props.column?.dataIndex) {
        return null
      }
      return (
        <TableSlot
          slotProps={{ column: props.column, dataIndex: props.column.dataIndex }}
          v-slots={forwardTableSlot(tableCtx.slots?.['header-cell-actions'])}
        />
      )
    }

    const renderTitleNode = () => {
      if (props.column?.ellipsis && props.column?.tooltip) {
        return (
          <AutoTooltip class={`${prefixCls}-th-title`} tooltipProps={tooltipProps.value}>
            {props.semanticLabelId ? <span id={props.semanticLabelId}>{renderTitle()}</span> : renderTitle()}
          </AutoTooltip>
        )
      }
      return (
        <span
          id={props.semanticLabelId}
          class={[`${prefixCls}-th-title`, { [`${prefixCls}-text-ellipsis`]: props.column?.ellipsis }]}
        >
          {renderTitle()}
        </span>
      )
    }

    const isNestedInteractive = (event: Event) => {
      const target = event.target as HTMLElement | null
      const current = event.currentTarget as HTMLElement | null
      const interactive = target?.closest?.(
        'input,textarea,select,button,a[href],[contenteditable]:not([contenteditable="false"]),[role="button"]',
      )
      return Boolean(interactive && current && interactive !== current && current.contains(interactive))
    }

    const renderCell = () => {
      if (isExtraColumn.value) {
        const extraHeader = tableCtx.slots?.['extra-column-header'] ? (
          <TableSlot
            slotProps={{ column: props.column }}
            v-slots={forwardTableSlot(tableCtx.slots['extra-column-header'])}
          />
        ) : (
          renderTitle()
        )
        return (
          <span id={props.semanticLabelId} class={[`${prefixCls}-cell`, `${prefixCls}-cell-align-center`]}>
            {extraHeader}
          </span>
        )
      }

      return renderHeaderContent(prefixCls, {
        class: cellCls.value,
        interaction: {
          role: hasSorter.value ? 'button' : undefined,
          tabindex: hasSorter.value ? 0 : undefined,
          onClick: hasSorter.value
            ? (event: MouseEvent) => {
                if (!event.defaultPrevented && !isNestedInteractive(event)) {
                  handleClickSorter(event)
                }
              }
            : undefined,
          onKeydown: hasSorter.value
            ? (event: KeyboardEvent) => {
                if (
                  !event.defaultPrevented &&
                  !isNestedInteractive(event) &&
                  (event.key === 'Enter' || event.key === ' ')
                ) {
                  event.preventDefault()
                  handleClickSorter(event as unknown as MouseEvent)
                }
              }
            : undefined,
        },
        title: renderTitleNode,
        sorter: renderSorterNode,
        actions: showHeaderActions.value ? renderHeaderActions : undefined,
      })
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
      return {
        ...baseStyle,
        ...props.column?.cellStyle,
        ...props.column?.headerCellStyle,
      }
    })

    const cls = computed(() => [
      `${prefixCls}-th`,
      {
        [`${prefixCls}-col-sorted`]: Boolean(sortOrder.value),
        [`${prefixCls}-th-resizing`]: resizing.value,
      },
      ...getFixedCls(
        prefixCls,
        props.column,
        tableCtx.readingDirection === 'rtl' && tableCtx.hasPhysicalLeftOperations,
      ),
      props.column?.cellClass,
      props.column?.headerCellClass,
    ])

    const handleMouseDown = (ev: MouseEvent) => {
      if (props.column?.dataIndex) {
        tableCtx.onThMouseDown?.(props.column?.dataIndex, ev)
      }
    }

    return () => {
      const colSpan = props.column.colSpan ?? 1
      const rowSpan = props.column.rowSpan ?? 1
      const resizeColumnName = typeof props.column.title === 'string' ? props.column.title : props.column.dataIndex
      const translatedResizeLabel = t('table.resizeColumn', resizeColumnName)
      const customHeader =
        firstStructuralNode([props.customHeader]) ?? firstStructuralNode(slots.th?.({ column: props.column }))

      return renderCellElement(
        'th',
        customHeader,
        props.column,
        {
          class: cls.value,
          style: style.value,
          colspan: colSpan > 1 ? colSpan : undefined,
          rowspan: rowSpan > 1 ? rowSpan : undefined,
          'aria-sort':
            sortOrder.value === 'ascend' ? 'ascending' : sortOrder.value === 'descend' ? 'descending' : undefined,
        },
        () => [
          renderCell(),
          props.resizable && (
            <span
              class={`${prefixCls}-column-handle`}
              role="separator"
              tabindex={0}
              aria-label={
                translatedResizeLabel === 'table.resizeColumn'
                  ? `Resize ${resizeColumnName} column`
                  : translatedResizeLabel
              }
              aria-orientation="vertical"
              aria-valuemin={40}
              aria-valuenow={props.column._resizeWidth ?? props.column._realWidth ?? props.column.width}
              onPointerdown={handleMouseDown}
              onMousedown={handleMouseDown}
              onKeydown={(event: KeyboardEvent) => {
                if (props.column.dataIndex) {
                  tableCtx.onThKeydown?.(props.column.dataIndex, event)
                }
              }}
            />
          ),
        ],
      )
    }
  },
})
