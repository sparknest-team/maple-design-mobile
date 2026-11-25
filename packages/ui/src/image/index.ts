import { withInstall } from '../utils/components'
import { imagePreviewGroupProps } from './groupProps'
import _Image from './Image.vue'
import _ImagePreview from './ImagePreview.vue'
import _ImagePreviewAction from './ImagePreviewAction.vue'
import _ImagePreviewGroup from './ImagePreviewGroup.vue'
import { imagePreview } from './preview'
import { imagePreviewProps } from './previewProps'
import { imageProps } from './props'

const ImagePreview: import('../utils/components').ComponentWithInstall<typeof _ImagePreview> =
  withInstall(_ImagePreview)
const ImagePreviewGroup: import('../utils/components').ComponentWithInstall<typeof _ImagePreviewGroup> =
  withInstall(_ImagePreviewGroup)

const ImageWithPreview: typeof _Image & {
  Preview: typeof ImagePreview
  PreviewGroup: typeof ImagePreviewGroup
  preview: typeof imagePreview
} = Object.assign(_Image, {
  Preview: ImagePreview,
  PreviewGroup: ImagePreviewGroup,
  preview: imagePreview,
})

const ImageFamily: import('../utils/components').ComponentWithInstall<typeof ImageWithPreview> = withInstall(
  _Image,
  ImageWithPreview,
  {
    components: [_Image, ImagePreview, ImagePreviewGroup, _ImagePreviewAction],
  },
)

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
  ImageSlots,
  ImagePreviewImageSlotProps,
  ImagePreviewSlots,
  ImagePreviewGroupSlots,
  ImagePreviewActionSlots,
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
