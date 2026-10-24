import { pascalCase } from './string'

type ClassName = string | undefined | null
type Classes = (ClassName | [any, ClassName, ClassName?])[]
type BEM<S extends string | undefined, N extends string, NC extends string> = S extends undefined
  ? NC
  : S extends `$--${infer CM}`
    ? `${N}--${CM}`
    : S extends `--${infer M}`
      ? `${NC}--${M}`
      : `${NC}__${S}`

export function createNamespaceFn<N extends string>(namespace: N) {
  return <C extends string>(name: C) => {
    const componentName = `${namespace}-${name}` as const
    return {
      name: pascalCase(componentName),
      n<S extends string | undefined = undefined>(suffix?: S): BEM<S, N, `${N}-${C}`> {
        return (
          !suffix
            ? componentName
            : suffix[0] === '$'
              ? suffix.replace('$', namespace)
              : suffix.startsWith('--')
                ? componentName + suffix
                : componentName + '__' + suffix
        ) as BEM<S, N, `${N}-${C}`>
      },
      classes(...names: Classes): any[] {
        return names.map((name) => {
          if (Array.isArray(name)) {
            return name[0] ? name[1] : (name[2] ?? null)
          }
          return name
        })
      },
    }
  }
}
