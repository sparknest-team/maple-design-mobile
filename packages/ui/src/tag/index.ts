import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { TAG_COLORS, tagProps, tagVariants } from './props'
import _TagSource from './Tag.vue'

const _Tag = withInstall(_TagSource)
withPropsDefaultsSetter(_Tag, tagProps)

export type TagInstance = InstanceType<typeof _Tag>
export type { TagColor, TagProps, TagVariant } from './props'
export { TAG_COLORS, tagProps, tagVariants }

export const _TagComponent: typeof _Tag = _Tag

export default _Tag

export type { TagSlots, TagEmits } from './types'
