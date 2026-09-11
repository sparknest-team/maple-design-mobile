import type { PropType } from 'vue'
import type { DropdownMenuOption } from './types'

export type MenuOptionKeyArrowX = 'ArrowLeft' | 'ArrowRight'

export const props = {
  /** 主内容 */
  label: { type: [String, Number, Boolean, Function, Object, Array] as PropType<any>, default: undefined },
  /** 激活命令时传给事件的值 */
  value: { type: [String, Number, Boolean, Object] as PropType<any>, default: undefined },
  /** 禁用当前项 */
  disabled: Boolean,
  /** 是否显示点击波纹 */
  ripple: { type: Boolean, default: true },
  /** 关联的原始选项数据 */
  option: Object as PropType<DropdownMenuOption>,
  /** 是否为子菜单触发项 */
  childrenTrigger: Boolean,
  /** 强制高亮 */
  highlight: Boolean,
  /** 处于激活路径上 */
  active: Boolean,
  /** 不注入菜单上下文，用于独立使用 */
  uninjectContext: Boolean,
}

export const menuOptionProps = props
export type MenuOptionProps = import('vue').ExtractPublicPropTypes<typeof props>
