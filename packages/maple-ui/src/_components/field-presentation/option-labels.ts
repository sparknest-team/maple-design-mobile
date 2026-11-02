import { formatFieldValue } from './with-field-presentation'

export function optionValueText(value: any, props: Record<string, any>): string {
  const fields = { value: 'value', label: 'label', children: 'children', ...props.fieldNames }
  const fallbackText = (part: any): string => {
    if (part == null) {
      return formatFieldValue(part)
    }
    if (typeof props.fallbackOption === 'function') {
      const option = props.fallbackOption(part)
      if (option === false) {
        return ''
      }
      return formatFieldValue(
        option && typeof option === 'object' ? (option[fields.label] ?? option.label ?? part) : option,
      )
    }
    return props.fallbackOption === false ? '' : formatFieldValue(part)
  }
  if (props.pathMode) {
    const showPath = (path: any): string => {
      const source = props.options ?? props.data
      let options = Array.isArray(source) ? source : []
      let unresolved = false
      const text = (Array.isArray(path) ? path : [path])
        .map((part: any) => {
          const option = options.find(
            (item: any) => item != null && typeof item === 'object' && Object.is(item[fields.value], part),
          )
          if (!option) {
            unresolved = true
          }
          options = option?.[fields.children] ?? []
          const label = option?.[fields.label]
          return option && typeof label !== 'function' ? String(label ?? part ?? '') : formatFieldValue(part)
        })
        .join(' / ')
      return unresolved && (typeof props.fallbackOption === 'function' || props.fallbackOption === false)
        ? fallbackText(path)
        : text
    }
    if (value == null) {
      return ''
    }
    return props.multiple && Array.isArray(value) ? value.map(showPath).join(props.separator ?? ', ') : showPath(value)
  }
  const labels = new Map<any, string>()
  const walk = (options: any[], path: string[] = []) => {
    for (const option of Array.isArray(options) ? options : []) {
      if (option == null) {
        continue
      }
      if (typeof option !== 'object') {
        labels.set(option, String(option))
        continue
      }
      const label = option[fields.label]
      const text =
        typeof label === 'function' ? String(option[fields.value]) : String(label ?? option[fields.value] ?? '')
      const next = [...path, text]
      labels.set(option[fields.value], props.showPathLabel ? next.join(' / ') : text)
      walk(option[fields.children], next)
    }
  }
  walk(props.options ?? props.data ?? [])
  const show = (part: any): string =>
    Array.isArray(part) ? part.map(show).join(' / ') : (labels.get(part) ?? fallbackText(part))
  return Array.isArray(value) ? value.map(show).join(props.separator ?? ', ') : show(value)
}
