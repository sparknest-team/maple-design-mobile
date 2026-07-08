import { type ExtractPropTypes, type PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

/**
 * 标签主题色（与 Cedar Design Web 的 Status 集合对齐）
 */
export type TagStatus =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'secondary'
  | 'contrast'
  | 'default'

/**
 * 标签尺寸
 */
export type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * 标签变体（与 Button 的 variant 对齐）
 */
export type TagVariant = 'default' | 'outline'

export const tagProps = {
  /**
   * 标签主题色
   */
  status: {
    type: String as PropType<TagStatus>,
    default: 'default',
  },
  /**
   * 标签尺寸
   */
  size: {
    type: String as PropType<TagSize>,
    default: 'md',
  },
  /**
   * 标签变体：`default`（实心填充）/ `outline`（描边）
   */
  variant: {
    type: String as PropType<TagVariant>,
    default: 'default',
  },
  /**
   * @deprecated 请使用 `variant="outline"`
   */
  bordered: Boolean,
  /**
   * 标签是否可见（v-model）
   */
  visible: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 标签默认是否可见
   */
  defaultVisible: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否为加载中状态
   */
  loading: Boolean,
  /**
   * 是否可关闭
   */
  closable: Boolean,
  /**
   * 是否可点击选中
   */
  checkable: Boolean,
  /**
   * 标签选中状态（checkable 时有效，v-model）
   */
  checked: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 标签默认选中状态（checkable 时有效）
   */
  defaultChecked: {
    type: Boolean,
    default: true,
  },
  /**
   * 内容是否不换行（超出省略）
   */
  nowrap: Boolean,
  /**
   * 自定义背景色
   */
  color: String,
  /**
   * 自定义文字色
   */
  textColor: String,
  onClose: defineListenerProp<(e: MouseEvent) => void>(),
  onCheck: defineListenerProp<(checked: boolean, e: MouseEvent) => void>(),
  'onUpdate:visible': defineListenerProp<(visible: boolean) => void>(),
  'onUpdate:checked': defineListenerProp<(checked: boolean) => void>(),
}

export type TagProps = ExtractPropTypes<typeof tagProps>

/**
 * @deprecated 兼容旧 `import { props } from './props'` 调用
 */
export const props = tagProps
