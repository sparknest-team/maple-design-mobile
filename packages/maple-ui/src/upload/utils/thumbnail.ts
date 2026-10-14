import type { UploadCreateThumbnailUrl, UploadFileItem, UploadResolveType } from '../interfaces'

export async function resolveThumbnailUrl(options: {
  file: File
  fileItem: UploadFileItem
  resolveType: UploadResolveType
  createThumbnailUrl?: UploadCreateThumbnailUrl
  onOwnedUrl?: (url: string) => void
}) {
  const custom = await options.createThumbnailUrl?.(options)
  if (custom) {
    return custom
  }
  if (options.resolveType === 'file') {
    return undefined
  }
  if (options.resolveType === 'data-url') {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result ?? ''))
      reader.onerror = () => reject(reader.error)
      reader.onabort = () => reject(new Error('File reading aborted'))
      reader.readAsDataURL(options.file)
    })
  }
  const url = URL.createObjectURL(options.file)
  options.onOwnedUrl?.(url)
  return url
}
