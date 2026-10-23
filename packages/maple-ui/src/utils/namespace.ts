export type NamespaceClass = string | null | undefined
export interface ComponentNamespace {
  name: string
  n(suffix?: string): string
  classes(...names: (NamespaceClass | [unknown, NamespaceClass, NamespaceClass?])[]): NamespaceClass[]
}

// Keep kebab-case registration names consistent with the existing shared helper.
export function pascalCase(value: string): string {
  const camel = value.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase())
  const normalized = camel.replace(camel.charAt(0), camel.charAt(0).toLowerCase())
  return normalized.replace(value.charAt(0), value.charAt(0).toUpperCase())
}

export function createNamespace(name: string): ComponentNamespace {
  const prefix = 'mp'
  const componentName = `${prefix}-${name}`
  return {
    name: pascalCase(componentName),
    n(suffix) {
      if (!suffix) {
        return componentName
      }
      if (suffix[0] === '$') {
        return suffix.replace('$', prefix)
      }
      return suffix.startsWith('--') ? `${componentName}${suffix}` : `${componentName}__${suffix}`
    },
    classes(...names) {
      return names.map((name) => {
        if (Array.isArray(name)) {
          const [condition, truthy, falsy = null] = name
          return condition ? truthy : falsy
        }
        return name
      })
    },
  }
}
