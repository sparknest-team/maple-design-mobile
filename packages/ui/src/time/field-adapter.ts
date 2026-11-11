import { h, type Component } from 'vue'
import type { FieldPresentationAdapter } from '../_components/field-presentation/with-field-presentation'
import TimeRangePicker from '../time-range/TimeRangePicker.vue'
import { getTimeCommitValue } from './time-commit'
import { formatTimeValue, parseTimeValue } from './time-value'
import TimePicker from './TimePicker.vue'

export function timeFieldAdapter(range: boolean): FieldPresentationAdapter {
  return {
    methods: ['focus', 'blur'],
    defaultPresentation: 'popup',
    text: (value, props) =>
      (Array.isArray(value) ? value : [value])
        .map((part) => formatTimeValue(part, props))
        .filter(Boolean)
        .join(props.separator ?? ' ~ '),
    valid: (value, props) =>
      value == null ||
      value === '' ||
      (Array.isArray(value) && !value.length) ||
      getTimeCommitValue(value, props, range) !== undefined,
    changeArgs: (value, props) => [
      value,
      Array.isArray(value)
        ? value.map((part) => parseTimeValue(part, props)?.toDate())
        : parseTimeValue(value, props)?.toDate(),
    ],
    editor: ({ props, value, update, emit, slots, disabled, readonly }) =>
      h(
        (range ? TimeRangePicker : TimePicker) as Component,
        {
          ...props.timePickerProps,
          ...props.timeRangePickerProps,
          ...Object.fromEntries(
            Object.keys((range ? TimeRangePicker : TimePicker).props)
              .filter((key) => key in props)
              .map((key) => [key, props[key]]),
          ),
          modelValue: value,
          defaultValue: undefined,
          disabled,
          readonly,
          disableConfirm: true,
          pickerProps: { ...props.pickerProps, toolbar: false },
          onDraftInitialize: update,
          onSelect: (next: any, dates: any) => {
            update(next)
            emit('select', next, dates)
          },
        },
        Object.fromEntries(Object.entries(slots).filter(([key]) => !['footer', 'read', 'default'].includes(key))),
      ),
  }
}
