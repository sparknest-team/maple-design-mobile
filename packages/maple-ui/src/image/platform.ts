import { computed, defineComponent, h } from 'vue'
import { IconCloseCircleFill as PreviewCloseIcon } from '@maplejs/icons-vue'
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
  return computed<Record<ImagePreviewActionName, string>>(() => ({
    prev: '‹',
    next: '›',
    fullScreen: 'Fullscreen',
    rotateLeft: 'Rotate left',
    rotateRight: 'Rotate right',
    originalSize: 'Original size',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    download: 'Download',
    close: 'Close',
  }))
}
