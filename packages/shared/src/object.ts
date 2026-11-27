import { isObject, toRawType } from './predicates'

function copyBytes(source: ArrayBufferLike): ArrayBuffer {
  const bytes = new Uint8Array(source)
  return new Uint8Array(bytes).buffer
}

export function cloneDeep<T>(value: T): T {
  const copies = new WeakMap<object, any>()

  function visit(input: any): any {
    if (!isObject(input)) {
      return input
    }
    const existing = copies.get(input)
    if (existing !== undefined) {
      return existing
    }

    const tag = toRawType(input)
    switch (tag) {
      case 'Set': {
        const entries = new Set()
        copies.set(input, entries)
        input.forEach((entry: any) => entries.add(visit(entry)))
        return entries
      }
      case 'Map': {
        const entries = new Map()
        copies.set(input, entries)
        input.forEach((entry: any, key: any) => entries.set(visit(key), visit(entry)))
        return entries
      }
      case 'Date':
        return new Date(input as unknown as Date)
      case 'RegExp':
        return new RegExp(input as unknown as RegExp)
      case 'ArrayBuffer':
        return copyBytes(input as ArrayBuffer)
      case 'Boolean':
      case 'Number':
      case 'String':
        return Reflect.construct(input.constructor, [input.valueOf()])
      case 'WeakMap':
      case 'WeakSet':
      case 'DOMException':
      case 'Error':
        return {}
      case 'DataView':
        return Reflect.construct(input.constructor, [copyBytes(input.buffer), input.byteOffset, input.byteLength])
      default:
        if (/^(?:Int(?:8|16|32)|Uint(?:8Clamped|8|16|32)|Float(?:32|64)|Big(?:Int|Uint)64)Array$/.test(tag)) {
          return Reflect.construct(input.constructor, [copyBytes(input.buffer), input.byteOffset, input.length])
        }
        if (Array.isArray(input)) {
          const array: any[] = []
          copies.set(input, array)
          // Trailing holes in the source do not extend the destination.
          input.forEach((item, index) => {
            array[index] = visit(item)
          })
          return array
        }
        if (toRawType(input) === 'Object') {
          const record = Object.create(Object.getPrototypeOf(input))
          copies.set(input, record)
          for (const key of [...Object.keys(input), ...Object.getOwnPropertySymbols(input)]) {
            record[key] = visit(Reflect.get(input, key))
          }
          return record
        }
        return input
    }
  }
  return visit(value)
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
  const customize = sources.pop() as MergeCustomizer
  const layers: Record<string, any>[] = [object, ...(sources as K[])]
  return layers.reduceRight((sourceRoot, targetRoot) => {
    function overlay(target: Record<string, any>, source: Record<string, any>) {
      for (const key in source) {
        if (Object.getOwnPropertyDescriptor(source, key) === undefined) {
          continue
        }
        const incoming = source[key]
        const current = target[key]
        const chosen = customize(current, incoming, key, targetRoot, sourceRoot)
        if (chosen !== undefined || !isObject(incoming)) {
          target[key] = chosen === undefined ? incoming : chosen
          continue
        }
        const container = isObject(current) ? current : Array.isArray(incoming) ? [] : {}
        overlay(container, incoming)
        target[key] = container
      }
    }
    overlay(targetRoot, sourceRoot)
    return targetRoot
  }) as T & K
}
