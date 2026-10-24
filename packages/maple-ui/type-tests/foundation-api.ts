// Menu root and nested submenus expose the same public controls.
import type { MenuFieldNames, MenuInstance, MenuOptionData, MenuOptionProps, MenuProps } from '@maple-design/ui/menu'
import type { PopoverInstance, PopoverProps } from '@maple-design/ui/popover'
import type { TooltipInstance, TooltipProps } from '@maple-design/ui/tooltip'
import type { TriggerInstance, TriggerProps } from '@maple-design/ui/trigger'
import { useVModel } from '@maple-design/use'

const props = { open: false, value: 1 }
const emit = (event: 'update:open' | 'close', value: boolean) => {
  void event
  void value
}
useVModel(props, 'open', { emit })
useVModel(props, 'value', {
  eventName: 'change',
  emit: (event: 'change', value: number) => {
    void event
    void value
  },
})
useVModel(props, 'open', {
  // @ts-expect-error the default request event is update:open, not change
  emit: (event: 'change', value: boolean) => {
    void event
    void value
  },
})
useVModel(props, 'value', {
  eventName: 'change',
  // @ts-expect-error the custom request event must be accepted by the emitter
  emit: (event: 'other', value: number) => {
    void event
    void value
  },
})

const renderProps: TriggerProps = {
  unmountOnClose: false,
  showArrow: true,
  duration: { enter: 120, leave: 80 },
  popupClass: 'position',
  contentClass: 'content',
  contentStyle: { padding: '8px' },
  arrowClass: 'arrow',
  arrowStyle: { background: 'red' },
}
void renderProps
// @ts-expect-error transition duration uses milliseconds
const invalidDuration: TriggerProps = { duration: 'fast' }
void invalidDuration

const fields: MenuFieldNames = { label: 'text', value: 'id', children: 'items' }
const menuOptions: MenuOptionData[] = [{ text: 'Branch', id: 'p', items: [{ text: 'Leaf', id: false }] }]
const menuSelection: MenuProps = {
  modelValue: 'p',
  options: menuOptions,
  fieldNames: fields,
  submenuTrigger: 'hover',
  strategy: 'fixed',
  popupContainer: false,
}
void menuSelection
// @ts-expect-error options must be an array
const invalidMenuOptions: MenuProps = { options: { value: 1 } }
// @ts-expect-error field mapping names must be strings
const invalidMenuFields: MenuProps = { fieldNames: { value: 42 } }
// @ts-expect-error submenu expansion is either click or hover
const invalidSubmenuTrigger: MenuProps = { submenuTrigger: 'focus' }
void invalidSubmenuTrigger
void invalidMenuOptions
void invalidMenuFields
const restoreMenuReference = (trigger: TriggerInstance) => trigger.focusReference()
void restoreMenuReference

const tooltipControls: TooltipProps = {
  trigger: ['hover', 'focus'],
  disabled: false,
  unmountOnClose: false,
  duration: { enter: 80, leave: 60 },
  showArrow: true,
  contentClass: 'content',
  popupClass: 'position',
  color: 'red',
  textColor: 'white',
  size: 'xs',
}
const popoverControls: PopoverProps = {
  title: 'Title',
  content: 'Body',
  trigger: 'manual',
  unmountOnClose: true,
  popupHoverStay: false,
  restoreFocus: false,
  duration: 80,
}
const bubbleMethods = (tooltip: TooltipInstance, popover: PopoverInstance) => {
  tooltip.setReference()
  tooltip.open()
  tooltip.close()
  tooltip.focusReference()
  popover.setReference()
  popover.resize()
  popover.allowClose()
  popover.getReference()
}
void tooltipControls
void popoverControls
void bubbleMethods
// @ts-expect-error duration must use milliseconds
const invalidTooltipDuration: TooltipProps = { duration: 'quick' }
// @ts-expect-error unknown interaction is rejected
const invalidPopoverTrigger: PopoverProps = { trigger: 'longpress' }
void invalidTooltipDuration
void invalidPopoverTrigger

const optionProps: MenuOptionProps = { label: () => 'rendered', value: false }
const menuMethods = (menu: MenuInstance) => {
  menu.open()
  menu.close()
  menu.resize()
  menu.setReference()
}
void optionProps
void menuMethods

// @ts-expect-error removed alias; use color
const removedTooltipBackground: TooltipProps = { backgroundColor: 'red' }
// @ts-expect-error removed alias; use size
const removedTooltipXs: TooltipProps = { xs: true }
void [removedTooltipBackground, removedTooltipXs]
