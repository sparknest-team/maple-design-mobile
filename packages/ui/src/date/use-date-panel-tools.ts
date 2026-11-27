import { computed, nextTick, shallowRef } from 'vue'
import { cloneFieldValue } from '../_components/picker-field/use-field-value'
import { isDateSelectionValid } from './date-rules'
import { outputDateValue, parseDateValue, sameDateSelection } from './date-value'
import type { DatePanelOptions } from './panel-state'
import type { DateShortcut } from './panel-tools-props'

interface PanelToolsOptions {
  options: () => DatePanelOptions
  range: () => boolean
  value: () => Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  blocked: () => boolean
  valid: (value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined) => boolean
  select: (value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined) => boolean
  onShortcut: (shortcut: DateShortcut) => void
  onNavigate: (value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined) => void
}

export function useDatePanelTools(config: PanelToolsOptions) {
  const options = () => config.options()
  const first = options().defaultPickerValue ?? config.value()
  const values = Array.isArray(first) ? first : [first]
  const anchor =
    parseDateValue(values[0], options()) ?? parseDateValue(new Date(), options()) ?? parseDateValue(new Date())!
  const initial = config.range()
    ? options().defaultPickerValue !== undefined &&
      values.length === 2 &&
      values.every((value) => parseDateValue(value, options()))
      ? values
      : [
          outputDateValue(anchor.toDate(), options()),
          outputDateValue(
            anchor
              .add(
                options().type === 'year' ? 120 : ['month', 'quarter'].includes(options().type ?? '') ? 12 : 1,
                'month',
              )
              .toDate(),
            options(),
          ),
        ]
    : parseDateValue(values[0], options())
      ? values[0]
      : outputDateValue(anchor.toDate(), options())
  const localPickerValue = shallowRef<
    Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  >(cloneFieldValue(initial))
  const previewValue = shallowRef<
    Date | string | number | (Date | string | number | null | undefined)[] | null | undefined
  >()
  const actualPickerValue = computed(() =>
    cloneFieldValue(options().pickerValue !== undefined ? options().pickerValue : localPickerValue.value),
  )
  const pickerValue = computed(() => {
    const preview = previewValue.value
    if (preview === undefined || config.blocked() || !config.valid(preview)) {
      return actualPickerValue.value
    }
    if (config.range() && Array.isArray(preview)) {
      const start = parseDateValue(preview[0], options())
      const end = parseDateValue(preview[1], options())
      const span = options().type === 'year' ? 120 : ['month', 'quarter'].includes(options().type ?? '') ? 12 : 1
      if (start && end && end.isBefore(start.add(span, 'month'), 'month')) {
        return [preview[0], outputDateValue(start.add(span, 'month').toDate(), options())]
      }
    }
    return cloneFieldValue(config.range() ? preview : Array.isArray(preview) ? preview[0] : preview)
  })
  let suppressNavigation = false
  let previewRevision = 0

  function shortcutValue(
    shortcut: DateShortcut,
  ): Date | string | number | (Date | string | number | null | undefined)[] | null | undefined {
    try {
      const source = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value
      const convert = (part: Date | string | number | null | undefined) => {
        const date = parseDateValue(part, {
          ...options(),
          ...(shortcut.format ? { valueFormat: shortcut.format } : {}),
        })
        return date ? outputDateValue(date.toDate(), options()) : undefined
      }
      return Array.isArray(source) ? source.map(convert) : convert(source)
    } catch {
      return undefined
    }
  }
  function allowed(
    shortcut: DateShortcut,
    value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined,
  ) {
    return (
      !shortcut.disabled &&
      !config.blocked() &&
      isDateSelectionValid(value, options(), config.range(), Boolean(options().multiple)) &&
      config.valid(value)
    )
  }
  function endPreview() {
    const revision = ++previewRevision
    suppressNavigation = true
    previewValue.value = undefined
    nextTick(() => {
      if (revision === previewRevision) {
        suppressNavigation = false
      }
    })
  }
  function preview(shortcut?: DateShortcut) {
    endPreview()
    if (!shortcut || options().previewShortcut === false) {
      return
    }
    const value = shortcutValue(shortcut)
    if (allowed(shortcut, value)) {
      previewValue.value = cloneFieldValue(value)
    }
  }
  function choose(shortcut: DateShortcut) {
    endPreview()
    const value = shortcutValue(shortcut)
    if (!allowed(shortcut, value) || !config.select(value)) {
      return false
    }
    config.onShortcut(shortcut)
    return true
  }
  function navigate(value: Date | string | number | (Date | string | number | null | undefined)[] | null | undefined) {
    if (suppressNavigation || config.blocked() || sameDateSelection(value, actualPickerValue.value, options())) {
      return false
    }
    const values = Array.isArray(value) ? value : [value]
    if (!values.length || values.some((part) => !parseDateValue(part, options()))) {
      return false
    }
    if (config.range() && (!Array.isArray(value) || value.length !== 2)) {
      return false
    }
    if (options().pickerValue === undefined) {
      localPickerValue.value = cloneFieldValue(value)
    }
    config.onNavigate(cloneFieldValue(value))
    return true
  }
  const displayValue = computed(() =>
    previewValue.value !== undefined && !config.blocked() && config.valid(previewValue.value)
      ? previewValue.value
      : config.value(),
  )
  return { pickerValue, displayValue, preview, choose, navigate, endPreview }
}
