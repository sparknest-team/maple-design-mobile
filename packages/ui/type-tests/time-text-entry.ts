import type { TimeProps, TimeRangeProps } from '@maple-design/ui-vue'

const single: TimeProps[] = [{}, { inputEditable: true }, { inputEditable: false }]
const range: TimeRangeProps[] = [{}, { inputEditable: true }, { inputEditable: false }]
// @ts-expect-error Text entry is a boolean option, not a presentation mode.
const invalidSingle: TimeProps = { inputEditable: 'picker' }
// @ts-expect-error Range uses the same boolean contract.
const invalidRange: TimeRangeProps = { inputEditable: 'true' }
void [single, range, invalidSingle, invalidRange]
