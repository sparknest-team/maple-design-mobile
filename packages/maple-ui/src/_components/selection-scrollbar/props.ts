import { computed, CSSProperties, defineComponent, onMounted, PropType, ref, StyleValue } from 'vue'
import { isNumber, isObject } from '../../_utils/is'
import { createNamespace, getPrefixCls } from '../../utils/components'
import ResizeObserver from '../resize-observer-v2'
import Thumb from './Thumb.vue'
import { ThumbData } from './types'

export const scrollbarProps = {
  /**
   * @zh 类型
   * @en Type
   */
  type: {
    type: String as PropType<'track' | 'embed'>,
    default: 'embed',
  },
  /**
   * @zh 外层的类名
   * @en Outer class
   */
  outerClass: [String, Object, Array],
  /**
   * @zh 外层的样式
   * @en Outer style
   */
  outerStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
  },
  // private
  hide: {
    type: Boolean,
    default: false,
  },
  disableHorizontal: {
    type: Boolean,
    default: false,
  },
  disableVertical: {
    type: Boolean,
    default: false,
  },
}
