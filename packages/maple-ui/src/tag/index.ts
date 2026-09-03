import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { tagProps, tagVariants } from './props'
import _Tag from './Tag.vue'

withInstall(_Tag)
withPropsDefaultsSetter(_Tag, tagProps)

export type TagInstance = InstanceType<typeof _Tag>
export type { TagColor, TagProps, TagVariant } from './props'
export { TAG_COLORS, tagProps, tagVariants }

export const _TagComponent = _Tag

export default _Tag
