import type {
  AutoCompleteInstance,
  CascaderEditMode,
  CascaderInstance,
  DateInstance,
  DateRangeInstance,
  InputNumberInstance,
  TextareaInstance,
  TimeInstance,
  TimeRangeInstance,
  VerificationCodeInstance,
} from '@maple-design/ui-vue'
import type { CascaderEditMode as SubEditMode } from '@maple-design/ui-vue/cascader'

declare const code: VerificationCodeInstance
code.focus(2)
code.blur()
code.reset()
// @ts-expect-error index is numeric
code.focus('second')
declare const textarea: TextareaInstance
textarea.focus()
textarea.blur()
declare const inputnumber: InputNumberInstance
inputnumber.focus()
inputnumber.blur()
declare const date: DateInstance
date.focus()
date.blur()
declare const daterange: DateRangeInstance
daterange.focus()
daterange.blur()
declare const time: TimeInstance
time.focus()
time.blur()
declare const timerange: TimeRangeInstance
timerange.focus()
timerange.blur()
declare const auto: AutoCompleteInstance
declare const cascader: CascaderInstance
const autoRetry: Promise<void> = auto.refresh()
const cascaderRetry: Promise<void> = cascader.refresh()
const editMode: CascaderEditMode = 'direct'
const subMode: SubEditMode = editMode
void [autoRetry, cascaderRetry, subMode]
