// This marker survives the table's column normalization without using a
// public property name that could collide with a user's data-defined column.
export const TABLE_COLUMN_COMPONENT = Symbol('table-column-component')

export function isComponentColumn(column: object): boolean {
  return Boolean((column as { [TABLE_COLUMN_COMPONENT]?: boolean })[TABLE_COLUMN_COMPONENT])
}
