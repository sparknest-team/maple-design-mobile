import type { ColProps } from '../src/col'
import type { RowProps } from '../src/row'

const row: RowProps = { onClick: (event: MouseEvent) => event.preventDefault() }
const col: ColProps = { onClick: (event: MouseEvent) => event.preventDefault(), order: -1 }
// @ts-expect-error click listeners receive MouseEvent
const invalidRow: RowProps = { onClick: (event: string) => event.toUpperCase() }
// @ts-expect-error a listener must be callable
const invalidCol: ColProps = { onClick: 'click' }
void [row, col, invalidRow, invalidCol]
