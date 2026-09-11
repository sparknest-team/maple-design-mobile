// DropdownMenu root and nested submenus expose the same public controls.
import type {
  DropdownMenuFieldNames,
  DropdownMenuInstance,
  DropdownMenuOption,
  DropdownMenuProps,
  MenuOptionProps,
} from '@maplejs/maple-ui/dropdown-menu'
import type { PopoverInstance, PopoverProps } from '@maplejs/maple-ui/popover'
import type { TooltipInstance, TooltipProps } from '@maplejs/maple-ui/tooltip'
import type { TriggerInstance, TriggerProps } from '@maplejs/maple-ui/trigger'
import { useVModel } from '@maplejs/maple-use'

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
// @ts-expect-error the default request event is update:open, not change
useVModel(props, 'open', {
  emit: (event: 'change', value: boolean) => {
    void event
    void value
  },
})
// @ts-expect-error the custom request event must be accepted by the emitter
useVModel(props, 'value', {
  eventName: 'change',
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

const fields: DropdownMenuFieldNames = { label: 'text', value: 'id', children: 'items' }
const menuOptions: DropdownMenuOption[] = [{ text: 'Branch', id: 'p', items: [{ text: 'Leaf', id: false }] }]
const menuSelection: DropdownMenuProps = {
  modelValue: 'p',
  options: menuOptions,
  fieldNames: fields,
  submenuTrigger: 'hover',
  popupContainer: false,
}
void menuSelection
// @ts-expect-error options must be an array
const invalidMenuOptions: DropdownMenuProps = { options: { value: 1 } }
// @ts-expect-error field mapping names must be strings
const invalidMenuFields: DropdownMenuProps = { fieldNames: { value: 42 } }
// @ts-expect-error submenu expansion is either click or hover
const invalidSubmenuTrigger: DropdownMenuProps = { submenuTrigger: 'focus' }
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
  backgroundColor: 'red',
  textColor: 'white',
  xs: true,
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
const menuMethods = (menu: DropdownMenuInstance) => {
  menu.open()
  menu.close()
  menu.resize()
  menu.setReference()
}
void optionProps
void menuMethods
