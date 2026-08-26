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

export { imageProps, imagePreviewProps, previewImage }

export type {
  ImageProps,
  ImagePreviewProps,
  ImagePreviewGroupProps,
  ImagePreviewOptions,
  UserImagePreviewOptions,
} from './types'

export type ImageInstance = InstanceType<typeof ImageWithPreview>
export const _ImageComponent = ImageWithPreview
export default ImageWithPreview
