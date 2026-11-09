import type { SelectEditMode, SelectProps } from '@maple-design/ui'
import type { SelectEditMode as SubMode } from '@maple-design/ui/select'

type Assert<T extends true> = T
export type SameMode = Assert<SelectEditMode extends SubMode ? (SubMode extends SelectEditMode ? true : false) : false>
export const direct: SelectEditMode = 'direct'
export const props: SelectProps = { editMode: direct }
// @ts-expect-error Invalid edit modes remain rejected.
export const invalid: SelectEditMode = 'arbitrary'
