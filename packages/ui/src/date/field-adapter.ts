import { h, type Component } from 'vue'
import type { FieldPresentationAdapter } from '../_components/field-presentation/with-field-presentation'
import { isFieldOpenClick } from '../_components/picker-field/open-trigger'
import PickerField from '../_components/picker-field/PickerField.vue'
import { provideRangeField } from '../_components/picker-field/range-field-context'
import { fieldDecoratorProps } from '../field-decorator/props'
import { dateText as t } from '../locale/date-text'
import { isDateSelectionValid } from './date-rules'
import { dateEventPayload, formatDateValue } from './date-value'
import DatePanel from './DatePanel.vue'
import { dateFieldPanelOptions } from './field-panel-options'
import { provideRangeRenderer } from './range-renderer'

export function dateFieldAdapter(range: boolean, renderer?: Component): FieldPresentationAdapter {
  return {
    methods: ['focus', 'blur'],
    setup: range
      ? () => {
          provideRangeField()
          if (renderer) {
            provideRangeRenderer(renderer)
          }
        }
      : undefined,
    reference: range
      ? ({ props, attrs, value, clear, emit, slots, disabled, readonly, open, setOpen, referenceRef }) =>
          h(
            PickerField,
            {
              ...Object.fromEntries(Object.keys(fieldDecoratorProps).map((key) => [key, props[key]])),
              ...attrs,
              ref: referenceRef,
              class: ['mp-date-range', attrs.class],
              texts: [0, 1].map((index) => formatDateValue(value?.[index], props)),
              placeholder: Array.isArray(props.placeholder) ? props.placeholder[0] : props.placeholder,
              placeholders: Array.isArray(props.placeholder)
                ? props.placeholder
                : typeof props.placeholder === 'string'
                  ? [props.placeholder, props.placeholder]
                  : [t('dateRangeStart'), t('dateRangeEnd')],
              range: true,
              openTriggerTarget: props.openTriggerTarget,
              separator: props.separator,
              editable: false,
              open,
              disabled,
              readonly,
              clearable: Boolean(
                props.clearable &&
                !disabled &&
                !readonly &&
                !(Array.isArray(props.disabled) && props.disabled.some(Boolean)),
              ),
              disabledParts: [0, 1].map((index) =>
                Boolean(disabled || (Array.isArray(props.disabled) && props.disabled[index])),
              ),
              onFocus: () => emit('focus'),
              onBlur: () => emit('blur'),
              onClick: (event: MouseEvent) => {
                if (disabled) {
                  return
                }
                emit('click', event)
                if (readonly) {
                  return
                }
                if (isFieldOpenClick(event, props.openTriggerTarget)) {
                  setOpen(true)
                }
              },
              onKeydown: (event: KeyboardEvent) => {
                if (disabled || readonly) {
                  return
                }
                if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
                  event.preventDefault()
                  setOpen(true)
                }
              },
              onClear: () => {
                if (disabled || readonly || (Array.isArray(props.disabled) && props.disabled.some(Boolean))) {
                  return
                }
                return clear().then(() => emit('clear'))
              },
            },
            slots,
          )
      : undefined,
    defaultPresentation: 'popup',
    text: (value, props) =>
      (Array.isArray(value) ? value : [value])
        .map((part) => formatDateValue(part, props))
        .filter(Boolean)
        .join(props.separator ?? (range ? ' ~ ' : ', ')),
    valid: (value, props) => isDateSelectionValid(value, props, range, props.multiple),
    changeArgs: (value, props) => {
      const payload = dateEventPayload(value, props)
      return [value, payload.dates, payload.texts]
    },
    editor: ({ value, props, update, emit, slots, disabled, readonly }) =>
      h(
        DatePanel,
        {
          endpointEditor: range,
          options: {
            ...dateFieldPanelOptions(props as any, range),
            modelValue: value,
            defaultValue: undefined,
            disableConfirm: true,
            disabled: disabled ? true : props.disabled,
            readonly,
          },
          range,
          onDraftInitialize: update,
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
