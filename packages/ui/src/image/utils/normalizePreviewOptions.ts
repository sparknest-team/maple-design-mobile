import { isArray, isString } from '@maple-design/shared-vue'
import type { ImagePreviewOptions, UserImagePreviewOptions } from '../api'
import {
  resolveActionsLayout,
  resolveEscToClose,
  resolveLoop,
  resolvePopupContainer,
  resolvePreviewImages,
} from './resolvePreviewOptions'

/** Normalize preview options to the canonical public field names. */
export function normalizePreviewOptions(
  options: UserImagePreviewOptions = {},
  defaultOptions: ImagePreviewOptions = {},
): ImagePreviewOptions {
  let merged: ImagePreviewOptions

  if (isString(options)) {
    merged = {
      ...defaultOptions,
      images: [options],
    }
  } else if (isArray(options)) {
    merged = {
      ...defaultOptions,
      images: options,
    }
  } else {
    const images = resolvePreviewImages(options)
    merged = {
      ...defaultOptions,
      ...options,
      images: images.length ? images : options.images,
    }
  }

  const images = resolvePreviewImages(merged)
  const loop = resolveLoop(merged, false)
  const popupContainer = resolvePopupContainer(merged)
  const current = merged.modelValue
  const actionsLayout = resolveActionsLayout(merged)
  const escToClose = resolveEscToClose(merged)

  return {
    ...merged,
    images: images.length ? images : merged.images,
    loop,
    popupContainer,
    closable: merged.closable,
    open: merged.open,
    modelValue: current,
    actionsLayout,
    escToClose,
  }
}
