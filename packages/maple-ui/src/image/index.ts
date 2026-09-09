import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { imagePreviewGroupProps } from './groupProps'
import Image from './Image.vue'
import _ImagePreviewAction from './ImagePreviewAction'
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
  components: [Image, ImagePreview, ImagePreviewGroup, _ImagePreviewAction],
})

withPropsDefaultsSetter(ImageFamily, imageProps)

export {
  ImageFamily as Image,
  ImagePreview,
  ImagePreviewGroup,
  _ImagePreviewAction as ImagePreviewAction,
  imageProps,
  imagePreviewProps,
  imagePreviewGroupProps,
  imagePreview,
  imagePreview as previewImage,
  imagePreview as ImagePreviewFn,
}

export type ImagePreviewActionInstance = InstanceType<typeof _ImagePreviewAction>

export type {
  ImageFit,
  ImageProps,
  ImageInteraction,
  ImagePreviewActionName,
  ImageInstance,
  ImagePreviewProps,
  ImagePreviewInstance,
  ImagePreviewGroupProps,
  ImagePreviewGroupInstance,
  ImagePreviewOptions,
  ImagePreviewHandle,
  UserImagePreviewOptions,
} from './api'

export const _ImageComponent: typeof ImageFamily = ImageFamily
export const _ImagePreviewComponent: typeof ImagePreview = ImagePreview
export const _ImagePreviewGroupComponent: typeof ImagePreviewGroup = ImagePreviewGroup
export default ImageFamily
