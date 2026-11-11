import { PropType } from 'vue'
import type { ReadingDirection } from '@maple-design/use-vue'
import { Message } from '../locale'

export const props = {
  /** 阅读方向，未指定时继承父作用域或原生 DOM dir */
  dir: { type: String as PropType<ReadingDirection> },
  tag: {
    type: String,
    default: 'div',
  },
  locale: {
    type: String,
    default: 'zh-CN',
  },
  messages: {
    type: Object as PropType<Record<string, Partial<Message>>>,
  },
}
