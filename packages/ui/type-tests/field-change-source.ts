import type { InputEmits, TextareaEmits } from '@maple-design/ui-vue'
import { InputNumber, Switch } from '@maple-design/ui-vue'

const programmaticInput: InputEmits['change'] = ['value']
const realInput: InputEmits['change'] = ['value', new MouseEvent('click')]
const programmaticTextarea: TextareaEmits['change'] = [null]
const realTextarea: TextareaEmits['change'] = ['value', new KeyboardEvent('keydown')]
declare const number: InstanceType<typeof InputNumber>
declare const toggle: InstanceType<typeof Switch>
number.$emit('change', 5)
number.$emit('change', 5, new Event('blur'))
toggle.$emit('change', true)
toggle.$emit('change', true, new MouseEvent('click'))
// @ts-expect-error Source, when present, is an Event rather than a boolean flag.
const invalid: InputEmits['change'] = ['value', true]
void [programmaticInput, realInput, programmaticTextarea, realTextarea, invalid]
