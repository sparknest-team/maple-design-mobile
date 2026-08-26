import type { ExtractPropTypes, PropType } from 'vue'
import { buttonProps, type ButtonProps } from '../button'
import { buttonGroupProps } from '../button-group'
import { menuProps } from '../menu'
import { pickProps } from '../utils/components'

export const splitButtonProps = {
  /** 菜单是否打开 */
  open: {
    type: Boolean,
    default: undefined,
  },
  /** 菜单默认是否打开 */
  defaultOpen: Boolean,
  /** 是否禁用整个分裂按钮 */
  disabled: Boolean,
  /** 主按钮属性 */
  buttonProps: Object as PropType<Partial<ButtonProps>>,
  /** 菜单触发按钮属性 */
  triggerButtonProps: Object as PropType<Partial<ButtonProps>>,
  /** 按钮组主题色 */
  status: buttonGroupProps.status,
  /** 按钮组尺寸 */
  size: buttonGroupProps.size,
  /** 按钮组变体 */
  variant: buttonGroupProps.variant,
  /** 自定义背景色 */
  color: buttonGroupProps.color,
  /** 自定义文字色 */
  textColor: buttonGroupProps.textColor,
  /** 按钮组海拔阴影 */
  elevation: buttonGroupProps.elevation,
  /** 主按钮是否自动进入加载状态 */
  autoLoading: buttonProps.autoLoading,
  ...pickProps(menuProps, [
    'trigger',
    'placement',
    'popupContainer',
    'popupMaxHeight',
    'popupClass',
    'offsetX',
    'offsetY',
    'hideOnSelect',
  ]),
}

export type SplitButtonProps = ExtractPropTypes<typeof splitButtonProps>
