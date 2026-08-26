import { type ExtractPropTypes } from 'vue'

export const props = {
  title: String,
}

export type MenuGroupProps = ExtractPropTypes<typeof props>
