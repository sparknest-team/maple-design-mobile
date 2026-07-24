export function getValueByPath(obj: Record<string, any> | undefined, path: string | undefined): any {
  if (!obj || !path) {
    return undefined
  }

  const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.')
  let temp: any = obj

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (temp == null || key === '') {
      return undefined
    }

    if (i === keys.length - 1) {
      return temp[key]
    }

    temp = temp[key]
  }

  return undefined
}

export function setValueByPath(obj: Record<string, any> | undefined, path: string | undefined, value: any) {
  if (!obj || !path) {
    return
  }

  const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.')
  let temp: any = obj

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (temp == null || key === '') {
      return
    }

    if (i === keys.length - 1) {
      temp[key] = value
      return
    }

    temp = temp[key]
  }
}

export function isEmptyValue(value: unknown) {
  if (value == null) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim() === ''
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  return false
}
