export { normalizeToArray, removeItem, uniq } from './array'
export { doubleRaf, getRect, getScrollLeft, getScrollTop, getStyle, inViewport, preventDefault, raf } from './dom'
export { call, throttle } from './function'
export { motion } from './motion'
export type { MotionState } from './motion'
export { createNamespaceFn } from './namespace'
export { clamp, clampArrayRange, floor, toNumber } from './number'
export { cloneDeep, mergeWith } from './object'
export {
  hasOwn,
  inBrowser,
  inMobile,
  isArray,
  isBoolean,
  isEmpty,
  isFunction,
  isNumber,
  isNumeric,
  isObject,
  isPlainObject,
  isString,
  isWindow,
  supportTouch,
} from './predicates'
export { camelize, kebabCase, pascalCase, slash } from './string'

export function assert(condition: boolean, source: string, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Maple [${source}]: ${message}`)
  }
}

export function error(source: string, message: string): void {
  console.error(`Maple [${source}]: ${message}`)
}
