import { resolveFieldPath } from '../utils/field-path'

export function getValueByPath(obj: Record<string, any> | undefined, path: string | undefined): any {
  return resolveFieldPath(obj, path).v
}
export function setValueByPath(obj: Record<string, any> | undefined, path: string | undefined, value: any) {
  const { o, k } = resolveFieldPath(obj, path)
  if (o != null && k) {
    o[k] = value
  }
}

export function isEmptyValue(value: unknown) {
  if (value == null) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim() === ''
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  return false
}
