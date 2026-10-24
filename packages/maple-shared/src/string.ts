export function camelize(value: string): string {
  return value
    .replace(/-(\w)/g, (_, character: string) => character.toUpperCase())
    .replace(/^./, (character) => character.toLowerCase())
}

export function kebabCase(value: string): string {
  return value
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase()
}

// Keep the Pascal export standalone so namespace imports do not retain a camelize wrapper.
export function pascalCase(value: string): string {
  const first = value.charAt(0)
  return value
    .replace(/-(\w)/g, (_, character: string) => character.toUpperCase())
    .replace(/^./, (character) => character.toLowerCase())
    .replace(first, first.toUpperCase())
}

export function slash(path: string): string {
  return path.startsWith('\\\\?\\') ? path : path.replace(/\\/g, '/')
}
