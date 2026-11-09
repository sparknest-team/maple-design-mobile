import { h } from 'vue'
import { InputNumber as RootInputNumber } from '@maple-design/ui'
import type {
  InputNumberEmits,
  InputNumberExpose,
  InputNumberInstance,
  InputNumberProps,
  InputNumberSlots,
} from '@maple-design/ui'
import DefaultInputNumber, { InputNumber as NamedInputNumber } from '../src/input-number'

const named: typeof DefaultInputNumber = NamedInputNumber
const root: typeof RootInputNumber = NamedInputNumber
const props: InputNumberProps = { modelValue: null, min: -Infinity, max: Infinity, modelEvent: 'change' }
h(NamedInputNumber, {
  ...props,
  onInput(value, text, event) {
    const current: number | null | undefined = value
    const display: string = text
    const source: Event = event
    void [current, display, source]
  },
  onChange(value, event) {
    const current: number | null | undefined = value
    const source: Event | undefined = event
    void [current, source]
  },
  onStep(value, direction, event) {
    const current: number = value
    const method: 'plus' | 'minus' = direction
    const source: Event = event
    void [current, method, source]
  },
})
const cleared: InputNumberEmits['change'] = [null]
const open: InputNumberEmits['open-change'] = [true]
const slots: InputNumberSlots = { read: ({ value, text }) => text + (value ?? '') }
declare const instance: InputNumberInstance
const exposed: InputNumberExpose = instance
instance.focus({ preventScroll: true })
instance.blur()
instance.select()
const native: HTMLInputElement | undefined = instance.inputRef
// @ts-expect-error Numeric change has an optional DOM Event, not boolean.
const invalid: InputNumberEmits['change'] = [1, false]
void [named, root, props, cleared, open, slots, exposed, native, invalid]
