import ImagePreviewGroup from '../image/ImagePreviewGroup.vue'
import { withInstall } from '../utils/components'
import { imagePreviewGroupProps } from './props'

withInstall(ImagePreviewGroup)

export { ImagePreviewGroup }
export type ImagePreviewGroupInstance = InstanceType<typeof ImagePreviewGroup>
export type { ImagePreviewGroupProps } from './props'
export { imagePreviewGroupProps }
export const _ImagePreviewGroupComponent = ImagePreviewGroup

export default ImagePreviewGroup
