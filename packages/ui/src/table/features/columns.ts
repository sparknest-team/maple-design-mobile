export function leafColumns<Column extends { children?: Column[] }>(columns: readonly Column[]): Column[] {
  return columns.flatMap(column => Array.isArray(column.children) ? leafColumns(column.children) : [column])
}
