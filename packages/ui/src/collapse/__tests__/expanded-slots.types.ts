import type { CollapseExpandIconSlotProps, CollapseItemSlots, CollapseSlots } from '..'
import Collapse, { CollapseItem } from '..'

export const parent: CollapseSlots = { 'expand-icon': ({ expanded }) => String(expanded) }
export const item: CollapseItemSlots = { 'expand-icon': ({ expanded }) => String(expanded) }
export function checkExpanded(
  context: CollapseExpandIconSlotProps,
  slots: InstanceType<typeof Collapse>['$slots'],
  itemSlots: InstanceType<typeof CollapseItem>['$slots'],
) {
  const expanded: boolean = context.expanded
  // @ts-expect-error legacy active was removed
  void context.active
  slots['expand-icon']?.({ expanded, disabled: false, position: 'left' })
  itemSlots['expand-icon']?.({ expanded, disabled: false, position: 'right' })
  // @ts-expect-error old slot shape is rejected
  slots['expand-icon']?.({ active: true, disabled: false, position: 'left' })
}
