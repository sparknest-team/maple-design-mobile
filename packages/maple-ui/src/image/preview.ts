import { nextTick, reactive, ref } from 'vue'
import { call, inBrowser } from '@maplejs/maple-shared'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import _ImagePreview from './ImagePreview.vue'
import ImagePreviewGroup from './ImagePreviewGroup.vue'
import { props as imagePreviewProps } from './previewProps'
import type { ImagePreviewMethods, ImagePreviewOptions, UserImagePreviewOptions } from './types'
import { normalizePreviewOptions } from './utils/previewUtils'

let singletonOptions: ImagePreviewOptions | null
let singletonHandle: ImagePreviewMethods | null
let defaultOptions: ImagePreviewOptions = {}

function imagePreview(options: UserImagePreviewOptions): ImagePreviewMethods | undefined {
  if (!inBrowser()) {
    return
  }

  imagePreview.close()

  const imagePreviewOptions = normalizePreviewOptions(options, defaultOptions)
  const reactiveImagePreviewOptions = reactive({
    ...imagePreviewOptions,
    popupContainer: imagePreviewOptions.popupContainer ?? 'body',
    open: true,
  })

  singletonOptions = reactiveImagePreviewOptions
  const componentRef = ref<ImagePreviewMethods | null>(null)

  const { unmountInstance } = mountInstance(_ImagePreview, reactiveImagePreviewOptions, {
    ref: componentRef,
    onClose: () => call(reactiveImagePreviewOptions.onClose),
    onClosed: () => {
      call(reactiveImagePreviewOptions.onClosed)
      unmountInstance()
      if (singletonOptions === reactiveImagePreviewOptions) {
        singletonOptions = null
        singletonHandle = null
      }
    },
    onRouteChange: () => {
      call(reactiveImagePreviewOptions.onRouteChange)
      unmountInstance()
      if (singletonOptions === reactiveImagePreviewOptions) {
        singletonOptions = null
        singletonHandle = null
      }
    },
    'onUpdate:open': (value: boolean) => {
      reactiveImagePreviewOptions.open = value
      call(reactiveImagePreviewOptions['onUpdate:open'], value)
    },
    'onUpdate:current': (index: number) => {
      reactiveImagePreviewOptions.current = index
      call(reactiveImagePreviewOptions['onUpdate:current'], index)
    },
    onOpenChange: (value: boolean) => {
      call(reactiveImagePreviewOptions.onOpenChange, value)
    },
  })

  const images = reactiveImagePreviewOptions.images ?? []
  const setCurrent = (index: number) => {
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= images.length ||
      index === reactiveImagePreviewOptions.current
    ) {
      return
    }

    reactiveImagePreviewOptions.current = index
    call(reactiveImagePreviewOptions['onUpdate:current'], index)
    call(reactiveImagePreviewOptions.onChange, index)
  }

  const getCurrent = () => reactiveImagePreviewOptions.current ?? reactiveImagePreviewOptions.defaultCurrent ?? 0
  const getLoopIndex = (index: number) => {
    if (index >= 0 && index < images.length) {
      return index
    }
    if (!reactiveImagePreviewOptions.loop || images.length === 0) {
      return index
    }
    return index < 0 ? images.length - 1 : 0
  }

  const handle = {
    close: () => {
      if (componentRef.value) {
        componentRef.value.close()
      } else {
        reactiveImagePreviewOptions.open = false
      }
    },
    prev: () => setCurrent(getLoopIndex(getCurrent() - 1)),
    next: () => setCurrent(getLoopIndex(getCurrent() + 1)),
    to: setCurrent,
    zoom: (ratio: number) => componentRef.value?.zoom(ratio),
  } satisfies ImagePreviewMethods

  singletonHandle = handle
  return handle
}

imagePreview.close = () => {
  if (singletonOptions != null) {
    const prevSingletonOptions = singletonOptions
    const prevSingletonHandle = singletonHandle
    singletonOptions = null
    singletonHandle = null

    nextTick().then(() => {
      if (prevSingletonHandle) {
        prevSingletonHandle.close()
      } else {
        prevSingletonOptions.open = false
      }
    })
  }
}

imagePreview.setDefaultOptions = (options: ImagePreviewOptions) => {
  defaultOptions = options
}

imagePreview.resetDefaultOptions = () => {
  defaultOptions = {}
}

const ImagePreview = withInstall(_ImagePreview)

withInstall(ImagePreviewGroup)
withPropsDefaultsSetter(ImagePreview, imagePreviewProps)

export { imagePreviewProps, ImagePreview, imagePreview }
export type { ImagePreviewOptions, UserImagePreviewOptions }

export const _ImagePreviewComponent = _ImagePreview
export type ImagePreviewInstance = InstanceType<typeof _ImagePreview>

export default ImagePreview
