import { hasOwn, isArray, isObject, isPlainObject, toRawType } from './predicates'

// Keep form snapshots faithful to the previous clone semantics, including cycles,
// prototypes, symbol keys, binary views, and collection keys.
export function cloneDeep<T>(value: T): T {
  const cache = new WeakMap<object, any>()
  function clone(value: any): any {
    if (!isObject(value)) {
      return value
    }
    if (cache.has(value)) {
      return cache.get(value)
    }
    const type = toRawType(value)
    if (type === 'Date') {
      return new Date(value as unknown as Date)
    }
    if (type === 'RegExp') {
      return new RegExp(value as unknown as RegExp)
    }
    if (type === 'Map') {
      const result = new Map()
      cache.set(value, result)
      ;(value as Map<any, any>).forEach((entry, key) => result.set(clone(key), clone(entry)))
      return result
    }
    if (type === 'Set') {
      const result = new Set()
      cache.set(value, result)
      ;(value as Set<any>).forEach((entry) => result.add(clone(entry)))
      return result
    }
    if (type === 'String' || type === 'Number' || type === 'Boolean') {
      return newInstance(value, value.valueOf())
    }
    if (type === 'WeakMap' || type === 'WeakSet' || type === 'Error' || type === 'DOMException') {
      return {}
    }
    if (
      [
        'Int8Array',
        'Uint8Array',
        'Uint8ClampedArray',
        'Int16Array',
        'Uint16Array',
        'Int32Array',
        'Uint32Array',
        'Float32Array',
        'Float64Array',
        'BigInt64Array',
        'BigUint64Array',
      ].includes(type)
    ) {
      return newInstance(value, cloneBuffer(value.buffer), value.byteOffset, value.length)
    }
    if (type === 'DataView') {
      return newInstance(value, cloneBuffer(value.buffer), value.byteOffset, value.byteLength)
    }
    if (type === 'ArrayBuffer') {
      return cloneBuffer(value as ArrayBuffer)
    }
    if (isArray(value)) {
      const result: any[] = []
      cache.set(value, result)
      value.forEach((entry, index) => {
        result[index] = clone(entry)
      })
      return result
    }
    if (isPlainObject(value)) {
      const result = Object.create(Reflect.getPrototypeOf(value))
      cache.set(value, result)
      const keys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)]
      keys.forEach((key) => {
        result[key] = clone((value as Record<PropertyKey, any>)[key])
      })
      return result
    }
    return value
  }
  function newInstance(value: Record<string, any>, ...args: any[]): any {
    const Constructor = value.constructor as new (...args: any[]) => any
    return new Constructor(...args)
  }
  function cloneBuffer(buffer: ArrayBuffer): ArrayBuffer {
    const result = new ArrayBuffer(buffer.byteLength)
    new Uint8Array(result).set(new Uint8Array(buffer))
    return result
  }
  return clone(value)
}

type MergeCustomizer = (
  targetValue: any,
  sourceValue: any,
  key: string | number | symbol,
  object?: any,
  source?: any,
) => any

export function mergeWith<T extends Record<string, any>, K extends Record<string, any>>(
  object: T,
  ...sources: [...K[], customizer: MergeCustomizer]
): T & K {
  const customizer = sources[sources.length - 1] as MergeCustomizer
  const targets = [object, ...sources.slice(0, -1)] as Record<string, any>[]
  let index = targets.length - 1
  let result = targets[index]
  // Configuration merging folds right-to-left; preserve customizer order and mutation.
  while (index) {
    result = mergeSource(targets[index - 1], result)
    index--
  }
  function mergeSource(object: Record<string, any>, source: Record<string, any>) {
    function merge(target: Record<string, any>, sourceValue: Record<string, any>) {
      for (const key in sourceValue) {
        if (hasOwn(sourceValue, key)) {
          const value = sourceValue[key]
          const previous = target[key]
          const replacement = customizer(previous, value, key, object, source)
          if (replacement !== undefined) {
            target[key] = replacement
          } else if (isObject(value)) {
            target[key] = merge(isObject(previous) ? previous : isArray(value) ? [] : {}, value)
          } else {
            target[key] = value
          }
        }
      }
      return target
    }
    return merge(object, source)
  }
  return result as T & K
}
