import type { ButtonHTMLAttributes, ExtractPublicPropTypes, PropType } from 'vue'
import { buttonGroupProps, buttonProps, type ButtonProps } from '../button'
import { menuProps } from '../menu'
import { popupContainerProp } from '../utils/popup-container'

/** Props and native attributes forwarded to either nested button. */
export type SplitButtonButtonProps = Partial<ButtonProps> &
  Omit<ButtonHTMLAttributes, keyof ButtonProps | 'onClick'> & { onClick?: (event: MouseEvent) => void }

export const splitButtonProps = {
  /** 菜单是否打开 */
  open: menuProps.open,
  /** 菜单默认是否打开 */
  defaultOpen: menuProps.defaultOpen,
  /** 是否禁用整个分裂按钮 */
  disabled: buttonGroupProps.disabled,
  /** 主按钮属性 */
  buttonProps: Object as PropType<SplitButtonButtonProps>,
  /** 菜单触发按钮属性 */
  triggerButtonProps: Object as PropType<SplitButtonButtonProps>,
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
  /** 菜单触发方式 */
  trigger: menuProps.trigger,
  /** 菜单弹出位置 */
  /** 浮层相对触发元素的首选方位，默认 bottom；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 */
  placement: menuProps.placement,
  /** 菜单挂载容器 */
  popupContainer: popupContainerProp,
  /** 菜单最大高度 */
  popupMaxHeight: menuProps.popupMaxHeight,
  /** 菜单浮层类名 */
  popupClass: menuProps.popupClass,
  /** 屏幕水平方向偏移 */
  offsetX: menuProps.offsetX,
  /** 屏幕垂直方向偏移 */
  offsetY: menuProps.offsetY,
  /** 选择菜单项后是否关闭菜单 */
  hideOnSelect: menuProps.hideOnSelect,
}

export type SplitButtonProps = ExtractPublicPropTypes<typeof splitButtonProps>
