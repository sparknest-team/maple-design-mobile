import { computed, defineComponent, inject, PropType, VNode } from 'vue'
import { IconDragDotVertical } from '@maple-design/icons-vue/icon-drag-dot-vertical'
import { IconMinus } from '@maple-design/icons-vue/icon-minus'
import { IconPlus } from '@maple-design/icons-vue/icon-plus'
import { BaseType } from '../_utils/types'
import Checkbox from '../checkbox'
import Radio from '../radio'
import { createNamespace, getPrefixCls } from '../utils/components'
import { TableContext, tableInjectionKey } from './context'
import { forwardTableSlot } from './forward-table-slot'
import { useI18n } from './mobile-locale'
import { getOperationFixedCls, getOperationStyle } from './render/cell-layout'
import TableSlot from './TableSlot.vue'
import { TableDataWithRaw, TableOperationColumn } from './types'
import { getLeafKeys, getSelectionStatus } from './utils'

const { name } = createNamespace('operation-td')

export default defineComponent({
  name,
  components: {
    Checkbox,
    Radio,
    IconPlus,
    IconMinus,
  },
  props: {
    headers: String,
    operationColumn: {
      type: Object as PropType<TableOperationColumn>,
      required: true,
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true,
    },
    record: {
      type: Object as PropType<TableDataWithRaw>,
      required: true,
    },
    hasExpand: {
      type: Boolean,
      default: false,
    },
    selectedRowKeys: {
      type: Array as PropType<BaseType[]>,
    },
    renderExpandBtn: {
      type: Function as PropType<(record: TableDataWithRaw, stopPropagation?: boolean) => VNode>,
    },
    colSpan: {
      type: Number,
      default: 1,
    },
    rowSpan: {
      type: Number,
      default: 1,
    },
    summary: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select'],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('table')
    const tableCtx = inject<Partial<TableContext>>(tableInjectionKey, {})
    const { t } = useI18n()
    const selectionLabel = () => {
      const translated = t('table.selectRow', String(props.record.key))
      return translated === 'table.selectRow' ? `Select row ${props.record.key}` : translated
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
      `${prefixCls}-td`,
      `${prefixCls}-operation`,
      {
        [`${prefixCls}-checkbox`]: props.operationColumn.name === 'selection-checkbox',
        [`${prefixCls}-radio`]: props.operationColumn.name === 'selection-radio',
        [`${prefixCls}-expand`]: props.operationColumn.name === 'expand',
        [`${prefixCls}-drag-handle`]: props.operationColumn.name === 'drag-handle',
      },
      ...getOperationFixedCls(prefixCls, props.operationColumn),
    ])

    const leafKeys = computed(() => getLeafKeys(props.record))

    const selectionStatus = computed(() => getSelectionStatus(tableCtx.currentSelectedRowKeys ?? [], leafKeys.value))

    const renderContent = () => {
      if (props.summary) {
        return null
      }
      if (props.operationColumn.render) {
        return props.operationColumn.render(props.record.raw)
      }
      if (props.operationColumn.name === 'selection-checkbox') {
        const value = props.record.key

        if (!tableCtx.checkStrictly && !props.record.isLeaf) {
          return (
            <Checkbox
              ariaLabel={selectionLabel()}
              modelValue={selectionStatus.value.checked}
              indeterminate={selectionStatus.value.indeterminate}
              disabled={Boolean(props.record.disabled)}
              uninjectGroupContext
              onChange={(checked) => tableCtx.onSelectAllLeafs?.(props.record, checked as boolean)}
              onClick={(ev: Event) => ev.stopPropagation()}
            />
          )
        }

        return (
          <Checkbox
            ariaLabel={selectionLabel()}
            modelValue={props.selectedRowKeys?.includes(value) ?? false}
            disabled={Boolean(props.record.disabled)}
            uninjectGroupContext
            onChange={(checked) => tableCtx.onSelect?.(checked as boolean, props.record)}
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        )
      }
      if (props.operationColumn.name === 'selection-radio') {
        const value = props.record.key
        return (
          <Radio
            ariaLabel={selectionLabel()}
            modelValue={props.selectedRowKeys?.includes(value) ?? false}
            disabled={Boolean(props.record.disabled)}
            uninjectGroupContext
            onChange={(checked) => tableCtx.onSelect?.(checked as boolean, props.record)}
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        )
      }
      if (props.operationColumn.name === 'expand') {
        if (props.hasExpand && props.renderExpandBtn) {
          return props.renderExpandBtn(props.record)
        }
        return null
      }
      if (props.operationColumn.name === 'drag-handle') {
        return slots['drag-handle-icon'] ? (
          <TableSlot v-slots={forwardTableSlot(slots['drag-handle-icon'])} />
        ) : (
          <IconDragDotVertical />
        )
      }
      return null
    }

    return () => (
      <td
        class={cls.value}
        style={style.value}
        rowspan={props.rowSpan > 1 ? props.rowSpan : undefined}
        colspan={props.colSpan > 1 ? props.colSpan : undefined}
        headers={props.headers}
        data-operation-key={props.operationColumn.name}
      >
        <span class={`${prefixCls}-cell`}>{renderContent()}</span>
      </td>
    )
  },
})
