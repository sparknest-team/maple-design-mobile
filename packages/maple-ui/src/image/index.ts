import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Image from './Image.vue'
import ImagePreviewGroup from './ImagePreviewGroup.vue'
import { ImagePreview, imagePreview } from './preview'
import { props as imagePreviewProps } from './previewProps'
import { props as imageProps } from './props'

const ImageWithPreview = Object.assign(Image, {
  Preview: ImagePreview,
  PreviewGroup: ImagePreviewGroup,
  preview: imagePreview,
})

const ImageFamily = withInstall(Image, ImageWithPreview, {
  components: [Image, ImagePreview, ImagePreviewGroup],
})

withPropsDefaultsSetter(ImageFamily, imageProps)

export { ImageFamily as Image, ImagePreview, ImagePreviewGroup, imageProps, imagePreviewProps, imagePreview }

export type {
  ImageProps,
  ImagePreviewProps,
  ImagePreviewGroupProps,
  ImagePreviewGroupMethods,
  ImagePreviewOptions,
  ImagePreviewHandle,
  ImagePreviewMethods,
  ImagePreviewActionsSlotData,
  UserImagePreviewOptions,
} from './types'

export type ImageInstance = InstanceType<typeof ImageFamily>
export const _ImageComponent = ImageFamily
export const _ImagePreviewComponent = ImagePreview
export const _ImagePreviewGroupComponent = ImagePreviewGroup
export default ImageFamily
