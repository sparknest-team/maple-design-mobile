import { PropType } from 'vue'

export const props = {
  from: {
    type: [String, Number],
    default: 0,
  },
  to: {
    type: [String, Number],
    default: 0,
  },
  duration: {
    type: [String, Number],
    default: 2000,
  },
  precision: {
    type: [String, Number],
    default: 0,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
  timingFunction: {
    type: Function as PropType<(v: number) => number>,
  },
}
