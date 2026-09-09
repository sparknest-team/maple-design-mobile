export function resolveFieldPath(object: any, path: string | undefined, strict = false): { o: any; k: string; v: any } {
  const keys = (path ?? '')
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
  let parent = object
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!key || parent == null || !['object', 'function'].includes(typeof parent) || !(key in parent)) {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      return { o: undefined, k: keys[keys.length - 1], v: undefined }
    }
    parent = parent[key]
  }
  const key = keys[keys.length - 1]
  return { o: parent, k: key, v: key ? parent?.[key] : undefined }
}
