import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { tagProps } from './props'
import _Tag from './Tag.vue'

withInstall(_Tag)
withPropsDefaultsSetter(_Tag, tagProps)

export type TagInstance = InstanceType<typeof _Tag>
export type { TagProps, TagVariant } from './props'
export { tagProps }

export const _TagComponent = _Tag

export default _Tag
