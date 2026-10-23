// Match the existing object-tag check without importing the full shared utility bundle.
const isPlainObject = (value: unknown): value is Record<string, any> =>
  Object.prototype.toString.call(value) === '[object Object]'

export function withPropsDefaultsSetter<T>(
  target: T,
  props: Record<string, any>,
): T & {
  setPropsDefaults: (defaults: Record<string, any>) => void
} {
  ;(target as any).setPropsDefaults = function (defaults: Record<string, any>) {
    Object.entries(defaults).forEach(([key, value]) => {
      const prop = props[key]

      if (prop == null) {
        return
      }

      const type = isPlainObject(prop) ? prop.type : prop
      const types = Array.isArray(type) ? type : [type]
      const defaultValue =
        types.includes(Object) && (value === null || isPlainObject(value))
          ? () => (value === null ? null : { ...value })
          : types.includes(Array) && (value === null || Array.isArray(value))
            ? () => (value === null ? null : [...value])
            : value

      if (isPlainObject(prop)) {
        // e.g. { type: String }
        props[key] = {
          ...prop,
          default: defaultValue,
        }
        return
      }

      props[key] = {
        type: prop,
        default: defaultValue,
      }
    })
  }

  return target as T & { setPropsDefaults: (defaults: Record<string, any>) => void }
}
