import type { PropType } from 'vue'

export type EmptySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const props = {
  /** 空状态描述文字 */
  description: {
    type: String,
    default: '',
  },
  /** 空状态图片/图标尺寸，可选值为 `xs` `sm` `md` `lg` `xl`，或具体数值 */
  imageSize: {
    type: [String, Number] as PropType<EmptySize | number | string>,
    default: 'md',
  },
  /** 自定义图片 URL，会覆盖默认图标 */
  imageUrl: {
    type: String,
  },
  /** 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: true,
  },
  /** 是否显示描述 */
  showDescription: {
    type: Boolean,
    default: true,
  },
  /** 点击操作回调 */
}
