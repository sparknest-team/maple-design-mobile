import { describe, expect, it } from 'vitest'
import { imagePlatformConfig } from '../platform.config'
import { props as imageProps } from '../props'
import { normalizePreviewOptions } from '../utils/previewUtils'

describe('image api contract', () => {
  it('preview defaults to true on Image', () => {
    expect(imageProps.preview.default).toBe(true)
  })

  it('normalizes string preview options', () => {
    expect(normalizePreviewOptions('a.jpg')).toEqual({
      images: ['a.jpg'],
    })
  })

  it('normalizes array preview options', () => {
    expect(normalizePreviewOptions(['a.jpg', 'b.jpg'])).toEqual({
      images: ['a.jpg', 'b.jpg'],
    })
  })

  it('normalizes object preview options with src', () => {
    expect(normalizePreviewOptions({ src: 'a.jpg', current: 1 })).toEqual({
      src: 'a.jpg',
      current: 1,
      images: ['a.jpg'],
    })
  })

  it('uses maple mobile platform defaults', () => {
    expect(imagePlatformConfig.defaultPreview).toBe(true)
    expect(imagePlatformConfig.defaultClosable).toBe(false)
  })
})
