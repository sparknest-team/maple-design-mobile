import { computed, defineComponent, h } from 'vue'
import { IconCloseCircleFill as PreviewCloseIcon } from '@maple-design/icons-vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import type { ImagePreviewActionName } from './api'

function glyph(char: string) {
  return defineComponent({ setup: () => () => h('span', char) })
}

export const ImageErrorIcon = defineComponent({
  setup() {
    return () => h('span', { 'aria-hidden': 'true' }, '×')
  },
})

export const ImageLoadingIcon = glyph('')
export { PreviewCloseIcon, toSizeUnit }
export const IconPrev = glyph('‹')
export const IconNext = glyph('›')
export const IconDownload = glyph('↓')
export const IconFullscreen = glyph('⛶')
export const IconOriginalSize = glyph('1:1')
export const IconRotateLeft = glyph('↶')
export const IconRotateRight = glyph('↷')
export const IconZoomIn = glyph('+')
export const IconZoomOut = glyph('−')

export const DefaultLoader = defineComponent({
  name: 'ImageDefaultLoader',
  setup() {
    const { n } = createNamespace('image')
    return () => h('div', { class: n('loader'), 'aria-hidden': 'true' })
  },
})

export function useActionLabels() {
  const { t: localT } = injectLocaleProvider()
  const label = (key: string, fallback: string) => (localT || t)(`imagePreview.${key}`) ?? fallback
  return computed<Record<ImagePreviewActionName, string>>(() => ({
    prev: label('prev', 'Previous image'),
    next: label('next', 'Next image'),
    fullScreen: label('fullScreen', 'Fullscreen'),
    rotateLeft: label('rotateLeft', 'Rotate left'),
    rotateRight: label('rotateRight', 'Rotate right'),
    originalSize: label('originalSize', 'Original size'),
    zoomOut: label('zoomOut', 'Zoom out'),
    zoomIn: label('zoomIn', 'Zoom in'),
    download: label('download', 'Download image'),
    close: label('close', 'Close image preview'),
  }))
}

export function useImagePreviewLabel() {
  const { t: localT } = injectLocaleProvider()
  return computed(() => (localT || t)('image.preview') ?? 'Preview image')
}
