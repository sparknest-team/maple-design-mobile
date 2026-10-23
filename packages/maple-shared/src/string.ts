export function camelize(value: string): string {
  value = value.replace(/-(\w)/g, (_, character: string) => character.toUpperCase())
  return value.replace(value.charAt(0), value.charAt(0).toLowerCase())
}

export function kebabCase(value: string): string {
  return value
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase()
}

export function pascalCase(value: string): string {
  return camelize(value).replace(value.charAt(0), value.charAt(0).toUpperCase())
}

export function slash(path: string): string {
  return path.startsWith('\\\\?\\') ? path : path.replace(/\\/g, '/')
}
