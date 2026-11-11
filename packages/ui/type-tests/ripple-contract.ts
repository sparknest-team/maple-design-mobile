import type { RippleDirectiveValue } from '@maple-design/ui-vue'
import type { RippleDirectiveValue as EntryValue } from '@maple-design/ui-vue/ripple'

const value: RippleDirectiveValue = { color: 'red', disabled: true }
const entry: EntryValue = value
// @ts-expect-error disabled is boolean.
const invalid: RippleDirectiveValue = { disabled: 'yes' }
void [entry, invalid]
