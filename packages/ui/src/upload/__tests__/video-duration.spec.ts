import { afterEach, expect, test, vi } from 'vitest'
import { formatVideoDuration, isVideo, readVideoDuration } from '../utils/video-duration'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

test('video duration is finite seconds, supports hours and never invents unknown metadata', () => {
  expect([undefined, NaN, Infinity, -1].map(formatVideoDuration)).toEqual(['', '', '', ''])
  expect([0, 65.9, 3601].map(formatVideoDuration)).toEqual(['00:00', '01:05', '1:00:01'])
  expect(isVideo({ type: 'video/webm' } as any)).toBe(true)
  expect(isVideo({ name: 'clip.MOV' } as any)).toBe(true)
})

test.each(['metadata', 'error', 'abort', 'timeout'])(
  'local metadata %s always frees its temporary URL and listeners',
  async (end) => {
    vi.useFakeTimers()
    vi.stubGlobal('URL', { createObjectURL: vi.fn(() => 'blob:metadata'), revokeObjectURL: vi.fn() })
    const video = document.createElement('video')
    vi.spyOn(video, 'load').mockImplementation(() => {})
    Object.defineProperty(video, 'duration', { value: 65 })
    const original = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation(((tag: string) =>
      tag === 'video' ? video : original(tag)) as typeof document.createElement)
    const controller = new AbortController()
    const reading = readVideoDuration(new File(['video'], 'clip.webm'), controller.signal)
    if (end === 'metadata') {
      video.dispatchEvent(new Event('loadedmetadata'))
    }
    if (end === 'error') {
      video.dispatchEvent(new Event('error'))
    }
    if (end === 'abort') {
      controller.abort()
    }
    if (end === 'timeout') {
      await vi.advanceTimersByTimeAsync(5000)
    }
    expect(await reading).toBe(end === 'metadata' ? 65 : undefined)
    expect(URL.revokeObjectURL).toHaveBeenCalledExactlyOnceWith('blob:metadata')
    expect(video.hasAttribute('src')).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  },
)
