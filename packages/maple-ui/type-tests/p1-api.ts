import type { SelectInstance, SelectProps, SelectValue } from '@maple-design/ui'

const cleared: SelectValue = undefined
const empty: SelectValue = ''
const multiple: SelectValue = [false, 0, { id: 'a' }]
const select: SelectProps = { modelValue: cleared, emptyValue: () => undefined }
function acceptsClear(instance: SelectInstance) {
  instance.$emit('change', cleared)
  instance.$emit('update:modelValue', cleared)
}
// @ts-expect-error Dates/functions are not part of the Select scalar value contract.
const invalid: SelectValue = () => 1
void [empty, multiple, select, acceptsClear, invalid]
