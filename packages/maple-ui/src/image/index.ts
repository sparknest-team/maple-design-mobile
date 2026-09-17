import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { imagePreviewGroupProps } from './groupProps'
import _Image from './Image.vue'
import _ImagePreviewAction from './ImagePreviewAction.vue'
import _ImagePreviewGroup from './ImagePreviewGroup.vue'
import { ImagePreview as _ImagePreview, imagePreview } from './preview'
import { imagePreviewProps } from './previewProps'
import { imageProps } from './props'

const ImagePreview = withInstall(_ImagePreview)
const ImagePreviewGroup = withInstall(_ImagePreviewGroup)

const ImageWithPreview = Object.assign(_Image, {
  Preview: ImagePreview,
  PreviewGroup: ImagePreviewGroup,
  preview: imagePreview,
})

const ImageFamily = withInstall(_Image, ImageWithPreview, {
  components: [_Image, ImagePreview, ImagePreviewGroup, _ImagePreviewAction],
})

withPropsDefaultsSetter(ImageFamily, imageProps)
withPropsDefaultsSetter(ImagePreview, imagePreviewProps)
withPropsDefaultsSetter(ImagePreviewGroup, imagePreviewGroupProps)

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
export const _ImagePreviewActionComponent: typeof _ImagePreviewAction = _ImagePreviewAction
export default ImageFamily
