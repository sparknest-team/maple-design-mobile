import { isArray } from './predicates'

export function removeItem<T>(array: T[], item: T): T[] | undefined {
  if (array.length) {
    const index = array.indexOf(item)
    if (index > -1) {
      return array.splice(index, 1)
    }
  }
}

export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function normalizeToArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value]
}
