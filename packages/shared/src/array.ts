export function removeItem<T>(array: T[], item: T): T[] | undefined {
  const position = array.indexOf(item)
  return position < 0 ? undefined : array.splice(position, 1)
}

export function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

export function normalizeToArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}
