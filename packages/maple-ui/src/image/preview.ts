import { createApp, h, nextTick, reactive, ref, type App } from 'vue'
import type { ImagePreviewHandle, ImagePreviewOptions, UserImagePreviewOptions } from './api'
import ImagePreview from './ImagePreview.vue'
import ImagePreviewGroup from './ImagePreviewGroup.vue'
import { normalizePreviewOptions } from './utils/normalizePreviewOptions'

let singletonApp: App | null = null
let singletonHost: HTMLElement | null = null
let singletonOptions: ImagePreviewOptions | null = null
let singletonHandle: ImagePreviewHandle | null = null
let singletonFinalize: (() => void) | null = null
let previewGeneration = 0
let defaultOptions: ImagePreviewOptions = {}

function unmountCurrent() {
  const app = singletonApp
  const host = singletonHost
  const finalize = singletonFinalize
  singletonApp = null
  singletonHost = null
  singletonOptions = null
  singletonHandle = null
  singletonFinalize = null
  try {
    app?.unmount()
  } finally {
    host?.parentNode?.removeChild(host)
    finalize?.()
  }
}

function previewImage(options: UserImagePreviewOptions): ImagePreviewHandle | undefined {
  if (typeof window === 'undefined') {
    return
  }
  const generation = ++previewGeneration
  unmountCurrent()
  // An onClosed callback may open a newer preview while the previous one is disposed.
  if (generation !== previewGeneration) {
    return
  }

  const normalized = normalizePreviewOptions(options, defaultOptions) as ImagePreviewOptions
  let finalized = false
  const finalize = () => {
    if (finalized) {
      return
    }
    finalized = true
    normalized.onClosed?.()
  }
  const images = normalized.images?.length ? normalized.images : normalized.src ? [normalized.src] : []
  const reactiveOptions = reactive({ ...normalized, images, src: images[0], open: true })
  singletonOptions = reactiveOptions as unknown as ImagePreviewOptions
  const componentRef = ref<any>()
  const component = images.length > 1 ? ImagePreviewGroup : ImagePreview
  const host = document.createElement('div')
  document.body.appendChild(host)
  const app = createApp({
    setup: () => () =>
      h(component as any, {
        ...reactiveOptions,
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
          if (singletonApp === app) {
            unmountCurrent()
          } else {
            finalize()
          }
        },
      }),
  })
  singletonHost = host
  singletonApp = app
  singletonFinalize = finalize
  app.mount(host)

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

previewImage.close = () => {
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
previewImage.setDefaultOptions = (options: ImagePreviewOptions) => {
  defaultOptions = options
}
previewImage.resetDefaultOptions = () => {
  defaultOptions = {}
}

export { previewImage, ImagePreview, ImagePreviewGroup }
export { previewImage as imagePreview }
export type { ImagePreviewOptions, UserImagePreviewOptions }
export default previewImage
export { previewImage as ImagePreviewFn }
