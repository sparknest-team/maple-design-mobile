import { pascalCase } from './string'

type OptionalClass = string | null | undefined
type ConditionalClass = [condition: any, enabled: OptionalClass, disabled?: OptionalClass]

type Modifier<Base extends string, Key extends string> = `${Base}--${Key}`
type ComponentPart<Base extends string, Part extends string | undefined> = Part extends `--${infer Key}`
  ? Modifier<Base, Key>
  : `${Base}__${Part}`

type ScopedClass<
  Prefix extends string,
  Component extends string,
  Part extends string | undefined,
> = Part extends undefined
  ? Component
  : Part extends `$--${infer Key}`
    ? Modifier<Prefix, Key>
    : ComponentPart<Component, Part>

export function createNamespaceFn<N extends string>(namespace: N) {
  return <C extends string>(name: C) => {
    const componentName = `${namespace}-${name}` as const
    return {
      name: pascalCase(componentName),
      n<S extends string | undefined = undefined>(suffix?: S): ScopedClass<N, `${N}-${C}`, S> {
        let className: string = componentName
        if (suffix) {
          if (suffix.startsWith('$')) {
            className = suffix.replace('$', namespace)
          } else {
            className += suffix.startsWith('--') ? suffix : '__' + suffix
          }
        }
        return className as ScopedClass<N, `${N}-${C}`, S>
      },
      classes(...names: (OptionalClass | ConditionalClass)[]): any[] {
        return names.map((entry) => {
          if (!Array.isArray(entry)) {
            return entry
          }
          const [active, yes, no = null] = entry
          return active ? yes : no
        })
      },
    }
  }
}
