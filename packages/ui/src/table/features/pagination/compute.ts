export function pageTableRows<Row>(data: Row[], enabled: unknown, page: number, pageSize: number): Row[] {
  return enabled && data.length > pageSize ? data.slice((page - 1) * pageSize, page * pageSize) : data
}
