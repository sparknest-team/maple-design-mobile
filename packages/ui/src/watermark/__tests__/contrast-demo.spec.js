import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Watermark from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/demos/text-watermark.vue'

useDemoControls()

test('local contrast Demo redraws text and color, cleans hidden layers and restores content interaction', async () => {
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
  const wrapper = mount(Demo, { global: { components: { MpWatermark: Watermark } } })
  try {
    await flushPromises()
    expect(wrapper.findAll('.mp-watermark__layer')).toHaveLength(1)
    await wrapper.findAll('input')[0].setValue(true)
    await wrapper.findAll('input')[2].setValue('SYNTHETIC 200')
    await flushPromises()
    expect(wrapper.getComponent(Watermark).props('font').color).toBe('rgba(255,255,255,0.4)')
    expect(context.fillText).toHaveBeenCalledWith('SYNTHETIC 200', expect.any(Number), expect.any(Number))
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('[role=status]').text()).toBe('Visible: true · Dark: true · Clicks: 1')
    await wrapper.findAll('input')[1].setValue(false)
    await flushPromises()
    expect(wrapper.findAll('.mp-watermark__layer')).toHaveLength(0)
    await wrapper.findAll('input')[0].setValue(false)
    await wrapper.findAll('input')[1].setValue(true)
    await flushPromises()
    expect(wrapper.findAll('.mp-watermark__layer')).toHaveLength(1)
    expect(wrapper.getComponent(Watermark).props('font').color).toBe('rgba(0,0,0,0.25)')
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('[role=status]').text()).toBe('Visible: true · Dark: false · Clicks: 2')
  } finally {
    wrapper.unmount()
    vi.restoreAllMocks()
  }
})
