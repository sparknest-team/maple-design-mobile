import { computed, defineComponent, h } from 'vue'
import { IconCloseCircleFill as PreviewCloseIcon } from '@maple-design/icons-vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import {
  defaultImageImagePreview,
  defaultImageImagePreviewClose,
  defaultImageImagePreviewDownload,
  defaultImageImagePreviewFullScreen,
  defaultImageImagePreviewNext,
  defaultImageImagePreviewOriginalSize,
  defaultImageImagePreviewPrev,
  defaultImageImagePreviewRotateLeft,
  defaultImageImagePreviewRotateRight,
  defaultImageImagePreviewZoomIn,
  defaultImageImagePreviewZoomOut,
} from '../locale/zh-CN'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import type { ImagePreviewActionName } from './api'

const defaultImageTexts = {
  'imagePreview.prev': defaultImageImagePreviewPrev,
  'imagePreview.next': defaultImageImagePreviewNext,
  'imagePreview.fullScreen': defaultImageImagePreviewFullScreen,
  'imagePreview.rotateLeft': defaultImageImagePreviewRotateLeft,
  'imagePreview.rotateRight': defaultImageImagePreviewRotateRight,
  'imagePreview.originalSize': defaultImageImagePreviewOriginalSize,
  'imagePreview.zoomOut': defaultImageImagePreviewZoomOut,
  'imagePreview.zoomIn': defaultImageImagePreviewZoomIn,
  'imagePreview.download': defaultImageImagePreviewDownload,
  'imagePreview.close': defaultImageImagePreviewClose,
  'image.preview': defaultImageImagePreview,
} as const

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
  const label = (key: ImagePreviewActionName, fallback: string) => {
    const localeKey = `imagePreview.${key}` as keyof typeof defaultImageTexts
    const value = localT ? localT(localeKey) : t(localeKey)
    return value ?? (!localT && !defaultLocaleReady.value ? defaultImageTexts[localeKey] : fallback)
  }
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
  return computed(() => {
    const value = localT ? localT('image.preview') : t('image.preview')
    return value ?? (!localT && !defaultLocaleReady.value ? defaultImageTexts['image.preview'] : 'Preview image')
  })
}
