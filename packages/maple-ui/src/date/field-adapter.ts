import { h } from 'vue'
import type { FieldPresentationAdapter } from '../_components/field-presentation/with-field-presentation'
import { isFieldOpenClick } from '../_components/picker-field/open-trigger'
import PickerField from '../_components/picker-field/PickerField.vue'
import { provideRangeField } from '../_components/picker-field/range-field-context'
import { fieldDecoratorProps } from '../field-decorator/props'
import { t } from '../locale'
import { isDateSelectionValid } from './date-rules'
import { dateEventPayload, formatDateValue } from './date-value'
import DatePanel from './DatePanel.vue'
import { dateFieldPanelOptions } from './field-panel-options'

export function dateFieldAdapter(range: boolean): FieldPresentationAdapter {
  return {
    setup: range
      ? () => {
          provideRangeField()
        }
      : undefined,
    reference: range
      ? ({ props, attrs, value, update, emit, slots, disabled, readonly, open, setOpen, referenceRef }) =>
          h(
            PickerField,
            {
              ...Object.fromEntries(Object.keys(fieldDecoratorProps).map((key) => [key, props[key]])),
              ...attrs,
              ref: referenceRef,
              class: ['mp-date-range', attrs.class],
              texts: [0, 1].map((index) => formatDateValue(value?.[index], props)),
              placeholders: Array.isArray(props.placeholder)
                ? props.placeholder
                : [t('dateRangeStart'), t('dateRangeEnd')],
              range: true,
              openTriggerTarget: props.openTriggerTarget,
              separator: props.separator,
              editable: false,
              open,
              disabled: disabled || readonly,
              clearable: Boolean(
                props.clearable &&
                !disabled &&
                !readonly &&
                !(Array.isArray(props.disabled) && props.disabled.some(Boolean)),
              ),
              disabledParts: [0, 1].map((index) =>
                Boolean(disabled || readonly || (Array.isArray(props.disabled) && props.disabled[index])),
              ),
              onClick: (event: MouseEvent) => {
                if (isFieldOpenClick(event, props.openTriggerTarget)) {
                  setOpen(true)
                }
              },
              onKeydown: (event: KeyboardEvent) => {
                if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
                  event.preventDefault()
                  setOpen(true)
                }
              },
              onClear: () => {
                if (disabled || readonly || (Array.isArray(props.disabled) && props.disabled.some(Boolean))) {
                  return
                }
                update([])
                emit('clear')
                setOpen(false)
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
