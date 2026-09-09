// Menu root and slot submenus expose the same public controls.
import type {
  MenuFieldNames,
  MenuGroupProps,
  MenuInstance,
  MenuOptionData,
  MenuOptionProps,
  MenuProps,
  MenuSubmenuInstance,
  MenuSubmenuProps,
} from '@maplejs/maple-ui/menu'
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

const fields: MenuFieldNames = { label: 'text', value: 'id', children: 'items' }
const menuOptions: MenuOptionData[] = [{ text: 'Branch', id: 'p', items: [{ text: 'Leaf', id: false }] }]
const menuSelection: MenuProps = {
  multiple: true,
  modelValue: [],
  options: menuOptions,
  fieldNames: fields,
  popupContainer: false,
}
void menuSelection
// @ts-expect-error options must be an array
const invalidMenuOptions: MenuProps = { options: { value: 1 } }
// @ts-expect-error field mapping names must be strings
const invalidMenuFields: MenuProps = { fieldNames: { value: 42 } }
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

const submenuProps: MenuSubmenuProps = { trigger: 'hover', open: true, unmountOnClose: false }
const optionProps: MenuOptionProps = { label: () => 'rendered', value: false }
const groupProps: MenuGroupProps = { title: 'Actions' }
const menuMethods = (menu: MenuInstance, submenu: MenuSubmenuInstance) => {
  menu.open()
  menu.close()
  menu.resize()
  menu.setReference()
  submenu.open()
  submenu.close()
  submenu.allowClose()
}
void submenuProps
void optionProps
void groupProps
void menuMethods
