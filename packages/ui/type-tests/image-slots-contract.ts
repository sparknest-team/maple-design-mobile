import type {
  Image,
  ImagePreview,
  ImagePreviewAction,
  ImagePreviewGroup,
  ImagePreviewGroupSlots,
  ImagePreviewImageSlotProps,
  ImagePreviewInstance,
  ImagePreviewSlots,
  ImageSlots,
} from '@maple-design/ui-vue'
import type { ImageSlots as EntryImageSlots } from '@maple-design/ui-vue/image'

const imageSlots: ImageSlots = { 'preview-actions': () => [], placeholder: () => [] }
const previewScope: ImagePreviewImageSlotProps = {
  src: 'a',
  scale: 1,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  moving: false,
}
const previewSlots: ImagePreviewSlots = {
  image: (scope) => {
    scope.scale.toFixed()
    return []
  },
}
const groupSlots: ImagePreviewGroupSlots = {
  indicator: (scope) => {
    scope.imageNumber.toFixed()
    scope.length.toFixed()
    return []
  },
}
const actualImage = {} as InstanceType<typeof Image>
const actualAction = {} as InstanceType<typeof ImagePreviewAction>
actualImage.$slots.placeholder?.()
actualImage.$slots['preview-actions']?.()
actualAction.$slots.default?.()
const actualPreview = {} as InstanceType<typeof ImagePreview>
const actualGroup = {} as InstanceType<typeof ImagePreviewGroup>
actualPreview.$slots.image?.(previewScope)
actualGroup.$slots.indicator?.({ imageNumber: 1, length: 2 })
// @ts-expect-error Image numbers are numeric.
actualGroup.$slots.indicator?.({ imageNumber: 'bad', length: 2 })
const instance = {} as ImagePreviewInstance
const fullscreen: Promise<void> | undefined = instance.toggleFullscreen()
const entrySlots: EntryImageSlots = imageSlots
void [imageSlots, entrySlots, previewSlots, groupSlots, fullscreen]
