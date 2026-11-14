import type { InputTagProps, InputTagSlots } from '@maple-design/ui-vue'

const props: InputTagProps = { formatLabel: (data) => String(data.label) }
const label: NonNullable<InputTagSlots['label']> = ({ data }) => String(data.label)
// @ts-expect-error The previous formatter name was removed.
const oldFormatter: InputTagProps = { formatTag: () => 'old' }
// @ts-expect-error The previous selected-content slot was removed.
type OldSlot = InputTagSlots['tag']
void [props, label, oldFormatter]
