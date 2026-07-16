import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Image from './Image.vue'
import ImagePreviewGroup from './ImagePreviewGroup.vue'
import { ImagePreview, previewImage } from './preview'
import { props as imagePreviewProps } from './previewProps'
import { props as imageProps } from './props'

const ImageWithPreview = Object.assign(Image, {
  Preview: ImagePreview,
  PreviewGroup: ImagePreviewGroup,
  preview: previewImage,
})

withInstall(ImageWithPreview)
withInstall(ImagePreview)
withInstall(ImagePreviewGroup)
withInstall(ImagePreview, previewImage)
withPropsDefaultsSetter(ImageWithPreview, imageProps)
withPropsDefaultsSetter(previewImage, imagePreviewProps)

export { imageProps, imagePreviewProps, ImagePreview, ImagePreviewGroup, previewImage }

export type {
  ImageProps,
  ImagePreviewProps,
  ImagePreviewGroupProps,
  ImagePreviewOptions,
  UserImagePreviewOptions,
} from './types'

export const _ImageComponent = ImageWithPreview
export const _ImagePreviewComponent = ImagePreview
export const _ImagePreviewGroupComponent = ImagePreviewGroup

export default ImageWithPreview
