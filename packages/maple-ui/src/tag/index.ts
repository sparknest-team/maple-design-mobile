import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import _Tag from './Tag.vue'
import { tagProps } from './props'

withInstall(_Tag)
withPropsDefaultsSetter(_Tag, tagProps)

export type TagInstance = InstanceType<typeof _Tag>
export type { TagProps, TagStatus, TagSize } from './props'
export { tagProps }

export const _TagComponent = _Tag

export default _Tag
