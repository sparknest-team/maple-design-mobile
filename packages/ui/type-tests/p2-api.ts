import { createApp } from 'vue'
import type {
  AutoCompleteEmits,
  AutoCompleteExpose,
  AutoCompleteSlots,
  DialogBeforeClose,
  DialogConfig,
  AutoCompleteProps as F05AutoProps,
  CascaderProps as F05CascaderProps,
  SelectProps as F05SelectProps,
  InputProps,
  CheckboxProps as NullableCheckboxProps,
  SliderProps as NullableSliderProps,
  SwitchProps as NullableSwitchProps,
  UploadProps as NullableUploadProps,
  OptionSearchField,
  PeopleSelectOption,
  PeopleSelectProps,
  SelectEmits,
  SelectExpose,
  SelectProps,
  SelectSlots,
} from '@maple-design/ui-vue'
import { PeopleSelect } from '@maple-design/ui-vue'
import type { SelectEmits as SelectEntryEmits } from '@maple-design/ui-vue/select'

const search: AutoCompleteEmits['search'] = ['apple', new Event('input')]
const clear: SelectEmits['change'] = [undefined]
// @ts-expect-error Select search notifications carry text, not a numeric ID.
const invalidSearch: SelectEmits['search'] = [123]
// @ts-expect-error AutoComplete change also carries the originating event.
const invalidChange: AutoCompleteEmits['change'] = ['apple']
const autoSlots: AutoCompleteSlots = { option: ({ data }) => data.label, footer: () => 'More' }
const selectSlots: SelectSlots = { label: ({ data }) => data.label, read: ({ text }) => text }
function focus(auto: AutoCompleteExpose, select: SelectExpose) {
  auto.focus()
  select.blur()
}
void [search, clear, invalidSearch, invalidChange, autoSlots, selectSlots, focus]
const sensitiveAuto: F05AutoProps = { caseSensitive: true }
const sensitiveSelect: F05SelectProps = { caseSensitive: false }
const sensitiveCascader: F05CascaderProps = { caseSensitive: true }
// @ts-expect-error Removed by explicit major migration; no strict alias.
const removedStrict: F05AutoProps = { strict: true }
// @ts-expect-error The flag is a boolean, not a string.
const badSensitive: F05SelectProps = { caseSensitive: 'true' }
void [sensitiveAuto, sensitiveSelect, sensitiveCascader, removedStrict, badSensitive]
const fields: readonly OptionSearchField[] = ['value', 'label']
const searchable: F05SelectProps = { searchFields: fields }
// @ts-expect-error Only semantic value/label fields are supported; use fieldNames for business keys.
const badFields: F05SelectProps = { searchFields: ['name'] }
const guard: DialogBeforeClose = async ({ action }, _done, { signal }) => !signal.aborted && action === 'confirm'
const dialogGuard: DialogConfig = { beforeClose: guard }
// @ts-expect-error New guards return decisions, not strings.
const badGuard: DialogBeforeClose = async () => 'allowed'
void [searchable, badFields, dialogGuard, badGuard]

const person: PeopleSelectOption = { value: 'a', label: 'Alice', avatar: '/a.png' }
const peopleServices: PeopleSelectProps = {
  options: async (query, { signal }) => (signal.aborted || !query ? [] : [person]),
  fallbackOption: (id) => ({ value: id, label: person.label }),
  renderActions: ({ person, disabled }) => (disabled ? null : person.label),
}
PeopleSelect.setPropsDefaults(peopleServices)
const componentServices: PeopleSelectProps = {
  options: peopleServices.options,
  showChat: true,
  chat: async (person) => {
    void person.value
  },
}
// @ts-expect-error person identities are strings
const wrongIdentity: PeopleSelectOption = { value: 1, label: 'Alice' }
// @ts-expect-error loaders return normalized person arrays, not business HTTP response envelopes
const wrongRequest: PeopleSelectProps = { options: async () => ({ records: [] }) }
void [componentServices, wrongIdentity, wrongRequest]

const clearInput: InputProps = { emptyValue: () => '' }
const clearSelect: SelectProps = { emptyValue: () => undefined }
const clearMultiple: SelectProps = { multiple: true, emptyValue: () => [] }
// @ts-expect-error text fields keep their string model shape
const badTextClear: InputProps = { emptyValue: 0 }
// @ts-expect-error old unpublished clear prop is removed
const oldClearName: SelectProps = { valueOnClear: '' }
void [clearInput, clearSelect, clearMultiple, badTextClear, oldClearName]
const nullableInput: InputProps = { modelValue: null, emptyValue: null }
const nullableSelect: SelectProps = { modelValue: null, emptyValue: () => null }
const nullableSwitch: NullableSwitchProps = { modelValue: null, emptyValue: null, clearable: true }
const nullableCheckbox: NullableCheckboxProps = { modelValue: null, emptyValue: null, clearable: true }
const nullableUpload: NullableUploadProps = { modelValue: null, emptyValue: null }
const nullableSlider: NullableSliderProps = { modelValue: null, emptyValue: null }
// @ts-expect-error Candidate loading is an options function; there is no standalone request prop.
const separateRequest: SelectProps = { request: async () => [] }
void [nullableInput, nullableSelect, nullableSwitch, nullableCheckbox, nullableUpload, nullableSlider, separateRequest]

const selectKeyboard: SelectEmits['keydown'] = [new KeyboardEvent('keydown')]
const selectEntryKeyboard: SelectEntryEmits['keydown'] = selectKeyboard
// @ts-expect-error Keydown listeners receive a KeyboardEvent, not a key string.
const invalidSelectKeyboard: SelectEmits['keydown'] = ['Enter']
void [selectKeyboard, selectEntryKeyboard, invalidSelectKeyboard]

const cascaderKeyboard: import('@maple-design/ui-vue/cascader').CascaderEmits['keydown'] = [
  new KeyboardEvent('keydown'),
]
// @ts-expect-error keydown emits the original keyboard event
const invalidCascaderKeyboard: import('@maple-design/ui-vue/cascader').CascaderEmits['keydown'] = ['Enter']
void [cascaderKeyboard, invalidCascaderKeyboard]
const cascaderRootKeyboard: import('@maple-design/ui-vue').CascaderEmits['keydown'] = [new KeyboardEvent('keydown')]
void cascaderRootKeyboard
const autoCompleteKeyboard: import('@maple-design/ui-vue/auto-complete').AutoCompleteEmits['keydown'] = [
  new KeyboardEvent('keydown'),
]
const autoCompleteRootKeyboard: import('@maple-design/ui-vue').AutoCompleteEmits['keydown'] = [
  new KeyboardEvent('keydown'),
]
// @ts-expect-error keydown emits the original keyboard event
const invalidAutoCompleteKeyboard: import('@maple-design/ui-vue').AutoCompleteEmits['keydown'] = ['ArrowDown']
void [autoCompleteKeyboard, autoCompleteRootKeyboard, invalidAutoCompleteKeyboard]
