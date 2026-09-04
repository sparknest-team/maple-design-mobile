import { isArray, isString, toNumber } from '@maplejs/maple-shared'
import type { ImagePreviewOptions, UserImagePreviewOptions } from '../api'

export function getPreviewImages(source: { images?: string[]; src?: string }): string[] {
  if (source.images?.length) {
    return source.images
  }

  if (source.src) {
    return [source.src]
  }

  return []
}

export function getPreviewCurrent(current?: number | string): number {
  return toNumber(current ?? 0)
}

export function normalizePreviewOptions(
  options: UserImagePreviewOptions = {},
  defaultOptions: ImagePreviewOptions = {},
): ImagePreviewOptions {
  if (isString(options)) {
    return {
      ...defaultOptions,
      images: [options],
    }
  }

  if (isArray(options)) {
    return {
      ...defaultOptions,
      images: options,
    }
  }

  const images = getPreviewImages(options)

  return {
    ...defaultOptions,
    ...options,
    images: images.length ? images : options.images,
  }
}
