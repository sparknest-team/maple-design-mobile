export function camelize(value: string): string {
  const words = value.split(/-(?=\w)/)
  let result = words[0]
  for (const word of words.slice(1)) {
    result += word.charAt(0).toUpperCase() + word.slice(1)
  }
  return result.charAt(0).toLowerCase() + result.slice(1)
}

export function kebabCase(value: string): string {
  let words = ''
  for (const letter of value) {
    words += letter >= 'A' && letter <= 'Z' ? ' ' + letter : letter
  }
  return words.trim().replace(/ /g, '-').toLowerCase()
}

export function pascalCase(value: string): string {
  // The public helper capitalizes the first occurrence of the original initial.
  const initial = value.charAt(0)
  const normalized = camelize(value)
  const at = normalized.indexOf(initial)
  if (at < 0) {
    return normalized
  }
  return normalized.slice(0, at) + initial.toUpperCase() + normalized.slice(at + initial.length)
}

export function slash(path: string): string {
  if (path.slice(0, 4) === '\\\\?\\') {
    return path
  }
  return path.split('\\').join('/')
}
