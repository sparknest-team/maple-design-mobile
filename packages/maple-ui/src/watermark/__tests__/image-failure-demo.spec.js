import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Watermark from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/demos/image-watermark.vue'

useDemoControls()

test('image Demo reports local failure, paints fallback text and recovers the image without duplicate layers', async () => {
  const context = {
    drawImage: vi.fn(),
    fillText: vi.fn(),
    measureText: (text) => ({ width: text.length * 8 }),
    rotate: vi.fn(),
    scale: vi.fn(),
    translate: vi.fn(),
  }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context)
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,watermark')
  const originalImage = globalThis.Image
  vi.stubGlobal(
    'Image',
    class {
      naturalWidth = 160
      naturalHeight = 48
      set src(source) {
        queueMicrotask(() => {
          if (source.includes('invalid-local-image')) {
            this.onerror?.(new Event('error'))
          } else {
            this.onload?.()
          }
        })
      }
    },
  )
  const wrapper = mount(Demo, { global: { components: { MpWatermark: Watermark } } })
  try {
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toBe('Mode: image · Errors: -')
    expect(context.drawImage).toHaveBeenCalled()
    context.fillText.mockClear()
    await wrapper.get('input').setValue(true)
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toBe('Mode: failure · Errors: image')
    expect(context.fillText).toHaveBeenCalledWith('FALLBACK 201', expect.any(Number), expect.any(Number))
    expect(wrapper.findAll('.mp-watermark__layer')).toHaveLength(1)
    const draws = context.drawImage.mock.calls.length
    await wrapper.get('button').trigger('click')
    await flushPromises()
    expect(wrapper.get('[role=status]').text()).toBe('Mode: image · Errors: image')
    expect(wrapper.get('button').element.disabled).toBe(true)
    expect(context.drawImage.mock.calls.length).toBeGreaterThan(draws)
    expect(wrapper.findAll('.mp-watermark__layer')).toHaveLength(1)
  } finally {
    wrapper.unmount()
    vi.restoreAllMocks()
    vi.stubGlobal('Image', originalImage)
  }
})
