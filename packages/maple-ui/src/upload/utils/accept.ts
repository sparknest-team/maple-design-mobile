function getFileExtension(file: File) {
  const name = file.name || ''
  const index = name.lastIndexOf('.')
  return index > -1 ? name.slice(index).toLowerCase() : ''
}

export function isAcceptedFile(file: File, accept?: string) {
  if (!accept) {
    return true
  }

  const rules = accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)

  if (!rules.length) {
    return true
  }

  const fileType = file.type.toLowerCase()
  const fileExtension = getFileExtension(file)

  return rules.some((rule) => {
    if (rule === '*/*') {
      return true
    }

    if (rule.endsWith('/*')) {
      return fileType.startsWith(rule.slice(0, -1))
    }

    if (rule.startsWith('.')) {
      return fileExtension === rule
    }

    return fileType === rule
  })
}
