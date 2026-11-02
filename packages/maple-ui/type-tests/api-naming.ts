import type { FabPlacement, FabPosition, FabProps, MenuPlacement, TriggerPlacement } from '../src'
// @ts-expect-error Legacy Fab type was removed.
import type { FabExpandDirection } from '../src/fab'
// @ts-expect-error Legacy placement alias was removed.
import type { MenuPosition } from '../src/menu'

const placement: FabPlacement = 'left'
const position: FabPosition = 'bottom-right'
const menu: MenuPlacement = 'bottom-start'
const trigger: TriggerPlacement = menu
const fab = { placement, position, drag: { axis: 'x' } } satisfies FabProps
// @ts-expect-error The old property is no longer public.
const oldProp = { expandDirection: 'left' } satisfies FabProps
// @ts-expect-error Corner values are vertical-first.
const oldCorner: FabPosition = 'right-bottom'
void [fab, trigger, oldProp, oldCorner]
