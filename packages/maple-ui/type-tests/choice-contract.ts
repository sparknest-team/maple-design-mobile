import type {
  CheckboxGroupInstance,
  CheckboxGroupProps,
  CheckboxGroupSlots,
  CheckboxInstance,
  CheckboxProps,
  CheckboxSlots,
  RadioEmits,
  RadioGroupEmits,
  RadioGroupInstance,
  RadioGroupProps,
  RadioGroupSlots,
  RadioInstance,
  RadioProps,
  RadioSlots,
} from '@maple-design/ui'
import type { CheckboxSlots as SubCheckboxSlots } from '@maple-design/ui/checkbox'
import type { RadioGroupEmits as SubRadioGroupEmits } from '@maple-design/ui/radio'

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
const checkbox: CheckboxProps = { modelValue: null, iconSize: 0.5, emptyValue: null }
const group: CheckboxGroupProps = { modelValue: null, max: 0, orientation: 'vertical', emptyValue: null }
const radio: RadioProps = { modelValue: false, iconSize: '1rem', emptyValue: null }
const radios: RadioGroupProps = { modelValue: null, orientation: 'horizontal', size: 'xl' }
const sameCheckbox: Equal<CheckboxSlots, SubCheckboxSlots> = true
const sameRadio: Equal<RadioGroupEmits, SubRadioGroupEmits> = true
const loadError: Equal<RadioGroupEmits['load-error'], [error: unknown]> = true
const radioClear: Equal<RadioEmits['change'], [value: string | number | boolean | null, event?: Event]> = true
type CRead = Parameters<NonNullable<CheckboxSlots['read']>>[0]
type CGRead = Parameters<NonNullable<CheckboxGroupSlots['read']>>[0]
type RRead = Parameters<NonNullable<RadioSlots['read']>>[0]
type RGRead = Parameters<NonNullable<RadioGroupSlots['read']>>[0]
const readCheckbox: CRead = { value: null, text: '-' }
const readGroup: CGRead = { value: null, text: '-' }
const readRadio: RRead = { value: false, text: 'False option' }
const readRadios: RGRead = { value: null, text: '-' }
declare const c: CheckboxInstance, cg: CheckboxGroupInstance, rr: RadioInstance, rg: RadioGroupInstance
c.$emit('update:open', true)
cg.$emit('open-change', false)
rr.$emit('change', null)
rg.$emit('load-error', new Error('failed'))
cg.$emit('change', null)
// @ts-expect-error counts are numbers rather than implicit strings
const badMax: CheckboxGroupProps = { max: '2' }
// @ts-expect-error invalid orientation
const badOrientation: RadioGroupProps = { orientation: 'row' }
// @ts-expect-error loading is not a choice control API
const badLoading: CheckboxProps = { loading: true }
// @ts-expect-error ordinary circle Radio has no size prop
const badCircleSize: RadioProps = { size: 'xl' }
void [
  checkbox,
  group,
  radio,
  radios,
  sameCheckbox,
  sameRadio,
  loadError,
  radioClear,
  readCheckbox,
  readGroup,
  readRadio,
  readRadios,
  badMax,
  badOrientation,
  badLoading,
  badCircleSize,
]
