import type { MenuOptionLabel, MenuOptionProps, MenuOptionSlots, MenuRenderContext, MenuSlots } from '..'
import Menu from '..'

export function checkMenuActive(context: MenuRenderContext) {
  const active: boolean = context.active
  // @ts-expect-error selected is no longer a render-context field
  void context.selected
  // @ts-expect-error descendant state stays private
  void context.hasSelectedDescendant
  return active
}
export const label: MenuOptionLabel = ({ active, option, level }) => `${active}:${option.value}:${level}`
export const manual: MenuOptionProps = { value: 0, label, highlight: true }
// @ts-expect-error active is a render result, not a visual override prop
export const oldActive: MenuOptionProps = { active: true }
// @ts-expect-error legacy two-argument callbacks are no longer accepted
export const oldLabel: MenuOptionProps = { label: (_option: unknown, _active: boolean) => 'old' }
export const menuSlots: MenuSlots = { 'option-label': ({ active }) => String(active) }
export const optionSlots: MenuOptionSlots = { default: ({ active }) => String(active) }
export function checkComponentSlots(slots: InstanceType<typeof Menu>['$slots']) {
  slots['option-label']?.({ option: {}, active: false, level: 0 })
  // @ts-expect-error selected is not a component slot parameter
  slots['option-label']?.({ option: {}, selected: false, level: 0 })
}
