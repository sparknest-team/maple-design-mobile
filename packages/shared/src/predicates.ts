export function inBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function inMobile(): boolean {
  if (!inBrowser()) {
    return false
  }
  const agent = navigator.userAgent.toLowerCase()
  return ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 'opera mini'].some((name) =>
    agent.includes(name),
  )
}

export function hasOwn<T extends object>(value: T, key: PropertyKey): key is keyof T {
  return Object.getOwnPropertyDescriptor(value, key) !== undefined
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
  if (isString(value)) {
    return /^[+-]?[0-9]+$/.test(value)
  }
  return isNumber(value)
}

export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

export function toRawType(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}

export function isPlainObject(value: unknown): value is Record<string, any> {
  return toRawType(value) === 'Object'
}

export function isEmpty(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.length === 0
  }
  return value === '' || value === null || value === undefined
}

export function isWindow(value: unknown): value is Window {
  return value === window
}

export function supportTouch(): boolean {
  return inBrowser() && Reflect.has(window, 'ontouchstart')
}
