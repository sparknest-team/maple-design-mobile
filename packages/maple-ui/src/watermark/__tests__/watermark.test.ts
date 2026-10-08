import { h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Watermark, { watermarkProps } from '..'

const PREFIX = 'mp'

function mockCanvas() {
  const context = {
    drawImage: vi.fn(),
    fillText: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
    measureText: vi.fn((text: string) => ({ width: text.length * 8 })),
    putImageData: vi.fn(),
    rotate: vi.fn(),
    scale: vi.fn(),
    translate: vi.fn(),
    fillStyle: '',
    font: '',
    globalAlpha: 1,
    textAlign: 'center',
    textBaseline: 'middle',
  }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as any)
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,watermark')
}

async function settle() {
  await nextTick()
  await flushPromises()
  await nextTick()
}

beforeEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  mockCanvas()
})

describe('watermark', () => {
  it('uses the unified public contract', () => {
    expect(watermarkProps.content).toEqual([String, Array])
    expect(watermarkProps.gap.default()).toEqual([90, 90])
    expect(watermarkProps.zIndex.default).toBe(6)
    expect(watermarkProps.alpha.default).toBe(1)
    expect(watermarkProps.antiTamper.default).toBe(true)
    expect(watermarkProps.repeat.default).toBe(true)
    expect(watermarkProps.staggered.default).toBe(true)
  })

  it('renders text and preserves default slot content', async () => {
    const wrapper = mount(Watermark, {
      props: { content: ['Watermark', 'Confidential'] },
      slots: { default: () => h('p', 'Protected content') },
    })
    await settle()
    expect(wrapper.text()).toContain('Protected content')
    const layer = wrapper.element.querySelector(`.${PREFIX}-watermark__layer`) as HTMLElement
    expect(layer.getAttribute('aria-hidden')).toBe('true')
    expect(layer.style.backgroundImage).toContain('data:image/png')
    expect(typeof (wrapper.vm as any).redraw).toBe('function')
    wrapper.unmount()
  })

  it('moves the same layer between local and fullscreen hosts', async () => {
    const wrapper = mount(Watermark, { props: { content: 'Confidential' } })
    await settle()
    const layer = wrapper.element.querySelector(`.${PREFIX}-watermark__layer`) as HTMLElement
    await wrapper.setProps({ fullscreen: true })
    await settle()
    expect(document.body.contains(layer)).toBe(true)
    expect(layer.classList.contains(`${PREFIX}-watermark__layer--fullscreen`)).toBe(true)
    await wrapper.setProps({ fullscreen: false })
    await settle()
    expect(wrapper.element.contains(layer)).toBe(true)
    wrapper.unmount()
  })

  it('restores a removed layer when antiTamper is enabled', async () => {
    const wrapper = mount(Watermark, { props: { content: 'Confidential' } })
    await settle()
    const layer = wrapper.element.querySelector(`.${PREFIX}-watermark__layer`) as HTMLElement
    layer.remove()
    await settle()
    expect(wrapper.element.contains(layer)).toBe(true)
    wrapper.unmount()
  })

  it('is SSR safe', async () => {
    await expect(renderToString(h(Watermark, { content: 'Confidential' }))).resolves.toContain(`${PREFIX}-watermark`)
  })
})
