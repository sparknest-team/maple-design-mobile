import type { UploadFileItem } from '../interfaces'

export function isVideo(file: UploadFileItem) {
  const videoExtension = /\.(mp4|webm|ogg|mov|m4v)(?:[?#]|$)/i
  return Boolean(
    file.type?.startsWith('video/') || videoExtension.test(file.url ?? '') || videoExtension.test(file.name ?? ''),
  )
}

export function formatVideoDuration(value?: number) {
  if (value === undefined || !Number.isFinite(value) || value < 0) {
    return ''
  }
  const total = Math.floor(value)
  const seconds = String(total % 60).padStart(2, '0')
  const minutes = String(Math.floor(total / 60) % 60).padStart(2, '0')
  return total >= 3600 ? `${Math.floor(total / 3600)}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}

/** Read only local Files; remote/server records can provide duration explicitly. */
export function readVideoDuration(file: File, signal: AbortSignal): Promise<number | undefined> {
  if (typeof document === 'undefined' || signal.aborted || typeof URL.createObjectURL !== 'function') {
    return Promise.resolve(undefined)
  }
  return new Promise((resolve) => {
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)
    let settled = false
    const finish = (duration?: number) => {
      if (settled) {
        return
      }
      settled = true
      clearTimeout(timer)
      signal.removeEventListener('abort', abort)
      video.removeEventListener('loadedmetadata', loaded)
      video.removeEventListener('durationchange', loaded)
      video.removeEventListener('error', abort)
      video.removeAttribute('src')
      video.load()
      URL.revokeObjectURL(url)
      resolve(duration)
    }
    const abort = () => finish()
    let seekingDuration = false
    const loaded = () => {
      if (Number.isFinite(video.duration) && video.duration >= 0) {
        finish(video.duration)
      } else if (video.duration === Infinity && !seekingDuration) {
        // Some locally recorded WebM files omit the segment duration.
        seekingDuration = true
        video.currentTime = 1e10
      }
    }
    const timer = setTimeout(abort, 5000)
    signal.addEventListener('abort', abort, { once: true })
    video.addEventListener('loadedmetadata', loaded)
    video.addEventListener('durationchange', loaded)
    video.addEventListener('error', abort, { once: true })
    video.preload = 'metadata'
    video.src = url
  })
}
