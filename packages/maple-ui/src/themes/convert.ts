import type { StyleVarName, StyleVars } from '../theme-provider/props'

export function convert(theme: StyleVars, converter: (value: string) => string) {
  return Object.entries(theme).reduce((target, [key, value]) => {
    target[key as StyleVarName] = value.includes('px')
      ? value.replace(/([+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)px\b/g, (_, number: string) => converter(number))
      : value

    return target
  }, {} as StyleVars)
}
