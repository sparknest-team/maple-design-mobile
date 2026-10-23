import { isArray } from './predicates'
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

function classes(...names: Classes): any[] {
  return names.map((name) => {
    if (isArray(name)) {
      const [condition, truthy, falsy = null] = name
      return condition ? truthy : falsy
    }
    return name
  })
}

export function createNamespaceFn<N extends string>(namespace: N) {
  return <C extends string>(name: C) => {
    const componentName = `${namespace}-${name}` as const
    const createBEM = <S extends string | undefined = undefined>(suffix?: S): BEM<S, N, `${N}-${C}`> => {
      const result = !suffix
        ? componentName
        : suffix[0] === '$'
          ? suffix.replace('$', namespace)
          : suffix.startsWith('--')
            ? `${componentName}${suffix}`
            : `${componentName}__${suffix}`
      return result as BEM<S, N, `${N}-${C}`>
    }
    return { name: pascalCase(componentName), n: createBEM, classes }
  }
}
