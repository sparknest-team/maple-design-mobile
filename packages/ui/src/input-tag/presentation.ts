import { provide, reactive, watch } from 'vue'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './input-tag'
import { findInputTagOption, inputTagOptionsKey } from './selected-options'
import type { InputTagOption, TagData } from './types'
import { getValueData } from './utils'

const Presented: typeof Base = withFieldPresentation(Base, {
  inheritInputGroup: true,
  intent: 'input',
  clearFallback: (props) => (props.multiple ? [] : null),
  setup: ({ props, value, options }) => {
    const labels = reactive(new Map<string | number, TagData>())
    provide(inputTagOptionsKey, labels)
    watch(
      [value, options, () => props.fieldNames, () => props.multiple],
      () => {
        const selected = Array.isArray(value.value)
          ? props.multiple
            ? value.value
            : value.value.slice(0, 1)
          : [value.value]
        for (const item of selected) {
          if (typeof item !== 'string' && typeof item !== 'number') {
            continue
          }
          const option = findInputTagOption(options.value as InputTagOption[], item, props.fieldNames)
          if (option) {
            labels.set(item, option)
          }
        }
      },
      { immediate: true, deep: true },
    )
    return labels
  },
  text: (value, props, labels: Map<string | number, TagData>) => {
    const names = { value: 'value', label: 'label', closable: 'closable', tagProps: 'tagProps', ...props.fieldNames }
    return getValueData(
      Array.isArray(value) ? (props.multiple ? value : value.slice(0, 1)) : value == null ? [] : [value],
      names,
      (item) =>
        findInputTagOption(Array.isArray(props.options) ? props.options : [], item, names) ??
        props.fallbackOption?.(item) ??
        labels.get(item),
    )
      .map((item) => props.formatLabel?.(item.raw) ?? item.label ?? '')
      .join(', ')
  },
  changeArgs: (value, _props, event) => (event ? [value, event] : [value]),
})

export default Presented
