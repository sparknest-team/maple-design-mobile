export function inBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function inMobile(): boolean {
  return inBrowser() && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function hasOwn<T extends object>(value: T, key: PropertyKey): key is keyof T {
  return Object.prototype.hasOwnProperty.call(value, key)
}

export function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumeric(value: unknown): value is number | string {
  return typeof value === 'number' || (typeof value === 'string' && /^[-+]?\d+$/.test(value))
}

export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

export function toRawType(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}

export function isPlainObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === '' || (isArray(value) && !value.length)
}

export function isWindow(value: unknown): value is Window {
  return value === window
}

export function supportTouch(): boolean {
  return inBrowser() && 'ontouchstart' in window
}
