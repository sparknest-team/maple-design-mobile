import { type ExtractPropTypes, type PropType } from 'vue'
import type { ComponentSize, SemanticStatus } from '../utils/constants'

/**
 * 标签主题色（与 Button / Cedar Tag 的 Status 集合对齐）
 */
/**
 * 标签变体（与 Button 的 variant 对齐）
 */
export type TagVariant = 'default' | 'outline'

export const tagVariants = ['default', 'outline'] as const

export const TAG_COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'brand',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
] as const

export type TagColor = (typeof TAG_COLORS)[number]

export const tagProps = {
  /**
   * 标签主题色
   */
  status: {
    type: String as PropType<SemanticStatus>,
    default: 'default',
  },
  /**
   * 标签尺寸
   */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'md',
  },
  /**
   * 标签变体：`default`（实心填充）/ `outline`（描边）
   */
  variant: {
    type: String as PropType<TagVariant>,
    default: 'default',
    validator: (value: unknown): value is TagVariant => tagVariants.includes(value as TagVariant),
  },
  /**
   * 标签是否可见（v-model）
   */
  show: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 标签默认是否可见
   */
  defaultShow: {
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
   * 是否为圆角胶囊形
   */
  round: Boolean,
  /**
   * 自定义背景色（outline 时为边框色）
   */
  color: String as PropType<TagColor | string>,
  /**
   * 自定义文字色
   */
  textColor: String,
}

export type TagProps = ExtractPropTypes<typeof tagProps>
