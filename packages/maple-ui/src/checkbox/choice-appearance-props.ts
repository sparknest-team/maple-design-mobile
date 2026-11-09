import type { PropType } from 'vue'
import type { Orientation } from '../utils/constants'
import { positiveLength } from '../utils/size-length'

export const choiceOrientationProp = {
  type: String as PropType<Orientation>,
  default: 'horizontal',
  validator: (value: string) => ['horizontal', 'vertical'].includes(value),
}
export const choiceIconSizeProp = {
  type: [String, Number] as PropType<string | number>,
  validator: (value: unknown) => positiveLength(value, '') !== '',
}
