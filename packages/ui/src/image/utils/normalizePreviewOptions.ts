import type { ImagePreviewOptions, UserImagePreviewOptions } from '../api'
import { resolveActionsLayout, resolveEscToClose, resolveLoop, resolvePreviewImages } from './resolvePreviewOptions'

export function normalizePreviewOptions(
  options: UserImagePreviewOptions = {},
  defaultOptions: ImagePreviewOptions = {},
) {
  const supplied: ImagePreviewOptions =
    typeof options === 'string' ? { images: [options] } : Array.isArray(options) ? { images: options } : options
  const merged = { ...defaultOptions, ...supplied }
  // A call-specific URL takes precedence over a default group.
  const images = resolvePreviewImages(supplied.src ? supplied : merged)
  return {
    ...merged,
    images,
    loop: resolveLoop(merged, false),
    actionsLayout: resolveActionsLayout(merged),
    escToClose: resolveEscToClose(merged),
  }
}
