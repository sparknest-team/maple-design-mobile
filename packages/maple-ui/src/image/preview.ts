import { nextTick, reactive, ref } from 'vue'
import { inBrowser } from '@maplejs/maple-shared'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import type { ImagePreviewHandle, ImagePreviewOptions, UserImagePreviewOptions } from './api'
import _ImagePreview from './ImagePreview.vue'
import ImagePreviewGroup from './ImagePreviewGroup.vue'
import { imagePreviewProps } from './previewProps'
import { normalizePreviewOptions } from './utils/previewUtils'

let singletonOptions: ImagePreviewOptions | null
let singletonHandle: ImagePreviewHandle | null
let defaultOptions: ImagePreviewOptions = {}

function imagePreview(options: UserImagePreviewOptions): ImagePreviewHandle | undefined {
  if (!inBrowser()) {
    return
  }
  imagePreview.close()

  const normalized = normalizePreviewOptions(options, defaultOptions)
  const images = normalized.images?.length ? normalized.images : normalized.src ? [normalized.src] : []
  const reactiveOptions = reactive({ ...normalized, images, src: images[0], open: true })
  singletonOptions = reactiveOptions as unknown as ImagePreviewOptions
  const componentRef = ref<any>()
  const component = images.length > 1 ? ImagePreviewGroup : _ImagePreview
  const { unmountInstance } = mountInstance(component as any, reactiveOptions as any, {
    ref: componentRef,
    'onUpdate:open': (open: boolean) => {
      reactiveOptions.open = open
      normalized['onUpdate:open']?.(open)
    },
    'onUpdate:current': (current: number) => {
      reactiveOptions.current = current
      normalized['onUpdate:current']?.(current)
    },
    onOpenChange: (open: boolean) => normalized.onOpenChange?.(open),
    onClosed: () => {
      normalized.onClosed?.()
      unmountInstance()
      singletonOptions = null
      singletonHandle = null
    },
  })

  const call = (method: string, ...args: unknown[]) => componentRef.value?.[method]?.(...args)
  const handle: ImagePreviewHandle = {
    open: (index) => call('open', index),
    close: () => call('close'),
    reset: () => call('reset'),
    prev: () => call('prev'),
    next: () => call('next'),
    to: (index) => call('to', index),
    zoomTo: (scale) => call('zoomTo', scale),
    zoomIn: () => call('zoomIn'),
    zoomOut: () => call('zoomOut'),
    rotateLeft: () => call('rotateLeft'),
    rotateRight: () => call('rotateRight'),
    toggleFullscreen: () => call('toggleFullscreen'),
  }
  singletonHandle = handle
  return handle
}

imagePreview.close = () => {
  const handle = singletonHandle
  const options = singletonOptions
  singletonHandle = null
  singletonOptions = null
  nextTick(() => {
    if (handle) {
      handle.close()
    } else if (options) {
      options.open = false
    }
  })
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
export { imagePreview as previewImage }
export { imagePreview as ImagePreviewFn }
export type { ImagePreviewOptions, UserImagePreviewOptions }
export const _ImagePreviewComponent = _ImagePreview
export type ImagePreviewInstance = InstanceType<typeof _ImagePreview>
export default ImagePreview
