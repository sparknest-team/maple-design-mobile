import type { Slots } from 'vue'
import { getValueByPath } from '../../_utils/get-value-by-path'
import { isTableExtraColumn } from '../extra-column'
import { forwardTableColumnSlot, forwardTableSlot } from '../forward-table-slot'
import TableSlot from '../TableSlot.vue'
import type { TableColumnData, TableData } from '../types'

export function renderDataContent(
  props: { record: { raw: TableData }; column: TableColumnData; rowIndex?: number },
  slots: Slots,
  tableSlots: Slots = {},
) {
  if (slots.default) {
    return slots.default()
  }
  const data = { record: props.record?.raw, column: props.column, rowIndex: props.rowIndex ?? -1 }
  if (slots.cell) {
    return <TableSlot slotProps={data} v-slots={forwardTableSlot(slots.cell)} />
  }
  if (props.column.slots?.cell) {
    return <TableSlot slotProps={data} v-slots={forwardTableColumnSlot(props.column.slots.cell)} />
  }
  if (isTableExtraColumn(props.column) && props.column.slotName && tableSlots[props.column.slotName]) {
    return <TableSlot slotProps={data} v-slots={forwardTableSlot(tableSlots[props.column.slotName])} />
  }
  if (props.column.render) {
    return props.column.render(data)
  }
  if (props.column.slotName && tableSlots[props.column.slotName]) {
    return <TableSlot slotProps={data} v-slots={forwardTableSlot(tableSlots[props.column.slotName])} />
  }
  return String(getValueByPath(props.record?.raw, props.column.dataIndex) ?? '')
}
