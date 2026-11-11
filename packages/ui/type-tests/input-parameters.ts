import { h } from 'vue'
import { InputPassword as RootPassword } from '@maple-design/ui-vue'
import type { InputMaxLength, InputPasswordEmits } from '@maple-design/ui-vue'
import { InputPassword } from '../src/input'

type NotAny<T> = 0 extends 1 & T ? never : T
type Props = InstanceType<typeof InputPassword>['$props']
const component: typeof RootPassword = InputPassword
const listeners: Pick<
  Props,
  | 'onInput'
  | 'onChange'
  | 'onClick'
  | 'onFocus'
  | 'onBlur'
  | 'onClear'
  | 'onKeydown'
  | 'onPress-enter'
  | 'onUpdate:open'
  | 'onUpdate:modelValue'
> = {
  onInput(value, event) {
    const text: NotAny<typeof value> = value
    const source: Event = event
    void [text, source]
  },
  onChange(value, event) {
    const text: string | null = value
    const source: Event | undefined = event
    const concrete: NotAny<typeof value> = value
    void [text, source, concrete]
  },
  onClick(event) {
    const source: MouseEvent = event
    void source
  },
  onFocus(event) {
    const source: FocusEvent = event
    void source
  },
  onBlur(event) {
    const source: FocusEvent = event
    void source
  },
  onClear(event) {
    const source: Event = event
    void source
  },
  onKeydown(event) {
    const source: KeyboardEvent = event
    void source
  },
  'onPress-enter'(event) {
    const source: KeyboardEvent = event
    void source
  },
  'onUpdate:open'(open) {
    const value: boolean = open
    void value
  },
  'onUpdate:modelValue'(value) {
    const text: string | null = value
    void text
  },
}
h(InputPassword, listeners)
const limit: InputMaxLength = { length: 4, errorOnly: true }
const change: InputPasswordEmits['change'] = [null]
// @ts-expect-error A length must be a number.
const badLength: InputMaxLength = { length: '4' }
// @ts-expect-error errorOnly must be a boolean.
const badMode: InputMaxLength = { length: 4, errorOnly: 'yes' }
// @ts-expect-error Password change has an optional DOM source, never a boolean.
const badChange: InputPasswordEmits['change'] = ['value', false]
void [component, limit, change, badLength, badMode, badChange]
