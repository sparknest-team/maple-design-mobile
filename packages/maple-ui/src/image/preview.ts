import { nextTick, reactive } from 'vue'
import { call, inBrowser } from '@maplejs/maple-shared'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import ImagePreview from './ImagePreview.vue'
import ImagePreviewGroup from './ImagePreviewGroup.vue'
import { props as imagePreviewProps } from './previewProps'
import type { ImagePreviewOptions, UserImagePreviewOptions } from './types'
import { normalizePreviewOptions } from './utils/previewUtils'

let singletonOptions: ImagePreviewOptions | null
let defaultOptions: ImagePreviewOptions = {}

function previewImage(options: UserImagePreviewOptions) {
  if (!inBrowser()) {
    return
  }

  previewImage.close()

  const imagePreviewOptions = normalizePreviewOptions(options, defaultOptions)
  const reactiveImagePreviewOptions = reactive({
    ...imagePreviewOptions,
    teleport: imagePreviewOptions.teleport ?? 'body',
    visible: true,
  })

  singletonOptions = reactiveImagePreviewOptions

  const { unmountInstance } = mountInstance(ImagePreview, reactiveImagePreviewOptions, {
    onClose: () => call(reactiveImagePreviewOptions.onClose),
    onClosed: () => {
      call(reactiveImagePreviewOptions.onClosed)
      unmountInstance()
      singletonOptions === reactiveImagePreviewOptions && (singletonOptions = null)
    },
    onRouteChange: () => {
      unmountInstance()
      singletonOptions === reactiveImagePreviewOptions && (singletonOptions = null)
    },
    'onUpdate:visible': (value: boolean) => {
      reactiveImagePreviewOptions.visible = value
    },
  })
}

previewImage.close = () => {
  if (singletonOptions != null) {
    const prevSingletonOptions = singletonOptions
    singletonOptions = null

    nextTick().then(() => {
      prevSingletonOptions.visible = false
    })
  }
}

previewImage.setDefaultOptions = (options: ImagePreviewOptions) => {
  defaultOptions = options
}

previewImage.resetDefaultOptions = () => {
  defaultOptions = {}
}

previewImage.Component = ImagePreview
previewImage.Group = ImagePreviewGroup

const ImagePreviewPlugin = previewImage

withInstall(ImagePreview)
withInstall(ImagePreviewGroup)
withInstall(ImagePreview, ImagePreviewPlugin)
withPropsDefaultsSetter(ImagePreviewPlugin, imagePreviewProps)

export { imagePreviewProps, ImagePreview, ImagePreviewGroup, previewImage }
export type { ImagePreviewOptions, UserImagePreviewOptions }

export const _ImagePreviewComponent = ImagePreview
export const _ImagePreviewGroupComponent = ImagePreviewGroup

export default ImagePreviewPlugin
