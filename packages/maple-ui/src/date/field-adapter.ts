import { h } from 'vue'
import type { FieldPresentationAdapter } from '../_components/field-presentation/with-field-presentation'
import { isDateSelectionValid } from './date-rules'
import { dateEventPayload, formatDateValue } from './date-value'
import DatePanel from './DatePanel.vue'
import { dateFieldPanelOptions } from './field-panel-options'

export function dateFieldAdapter(range: boolean): FieldPresentationAdapter {
  return {
    text: (value, props) =>
      (Array.isArray(value) ? value : [value])
        .map((part) => formatDateValue(part, props))
        .filter(Boolean)
        .join(props.separator ?? (range ? ' ~ ' : ', ')),
    valid: (value, props) =>
      value == null ||
      value === '' ||
      (Array.isArray(value) && !value.length) ||
      isDateSelectionValid(value, props, range, props.multiple),
    changeArgs: (value, props) => {
      const payload = dateEventPayload(value, props)
      return [value, payload.dates, payload.texts]
    },
    editor: ({ value, props, update, emit, slots, disabled, readonly }) =>
      h(
        DatePanel,
        {
          options: {
            ...dateFieldPanelOptions(props as any, range),
            modelValue: value,
            defaultValue: undefined,
            disableConfirm: true,
            disabled: disabled ? true : props.disabled,
            readonly,
          },
          range,
          onSelect: (next: any, dates: any, texts: any) => {
            update(next)
            emit('select', next, dates, texts)
          },
          'onUpdate:pickerValue': (next: any) => emit('update:pickerValue', next),
          onPickerValueChange: (...args: any[]) => emit('picker-value-change', ...args),
          onSelectShortcut: (next: any) => emit('select-shortcut', next),
        },
        Object.fromEntries(Object.entries(slots).filter(([key]) => !['actions', 'read', 'default'].includes(key))),
      ),
  }
}
