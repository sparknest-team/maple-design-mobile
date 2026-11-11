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

  it('restores managed styles and class without a redraw loop', async () => {
    const wrapper = mount(Watermark, { props: { content: 'Confidential' } })
    await settle()
    const layer = wrapper.element.querySelector(`.${PREFIX}-watermark__layer`) as HTMLElement
    const canvas = vi.mocked(HTMLCanvasElement.prototype.toDataURL)
    layer.style.setProperty('display', 'none', 'important')
    layer.style.opacity = '0'
    layer.style.position = 'static'
    layer.className = 'tampered'
    await settle()
    expect(layer.className).toBe(`${PREFIX}-watermark__layer`)
    expect(layer.style.display).toBe('')
    expect(layer.style.opacity).toBe('')
    expect(layer.style.position).toBe('')
    expect(layer.style.backgroundImage).toContain('data:image/png')
    const calls = canvas.mock.calls.length
    await settle()
    expect(canvas).toHaveBeenCalledTimes(calls)
    await wrapper.setProps({ fullscreen: true })
    await settle()
    layer.style.opacity = '0'
    await settle()
    expect(layer.style.opacity).toBe('')
    expect(layer.classList.contains(`${PREFIX}-watermark__layer--fullscreen`)).toBe(true)
    wrapper.unmount()
  })

  it('leaves external changes alone when antiTamper is disabled', async () => {
    const wrapper = mount(Watermark, { props: { content: 'Confidential', antiTamper: false } })
    await settle()
    const layer = wrapper.element.querySelector(`.${PREFIX}-watermark__layer`) as HTMLElement
    layer.style.display = 'none'
    await settle()
    expect(layer.style.display).toBe('none')
    wrapper.unmount()
  })

  it('redraws when its color changes but ignores unrelated styles', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const wrapper = mount(Watermark, { attachTo: host, props: { content: 'Confidential' } })
    await settle()
    const canvas = vi.mocked(HTMLCanvasElement.prototype.toDataURL)
    const calls = canvas.mock.calls.length
    host.style.padding = '1px'
    await settle()
    expect(canvas).toHaveBeenCalledTimes(calls)
    ;(wrapper.element as HTMLElement).style.setProperty('--mp-watermark-content-color', 'blue')
    await settle()
    expect(canvas.mock.calls.length).toBeGreaterThan(calls)
    wrapper.unmount()
  })

  it('is SSR safe', async () => {
    await expect(renderToString(h(Watermark, { content: 'Confidential' }))).resolves.toContain(`${PREFIX}-watermark`)
  })

  it('uses a rounded default line height and validates alpha', async () => {
    const wrapper = mount(Watermark, { props: { content: ['One', 'Two'], font: { fontSize: 15 } } })
    await settle()
    const context = vi.mocked(HTMLCanvasElement.prototype.getContext).mock.results[0].value as CanvasRenderingContext2D
    expect(context.fillText).toHaveBeenNthCalledWith(1, 'One', 12, 10.5)
    expect(context.fillText).toHaveBeenNthCalledWith(2, 'Two', 12, 31.5)
    expect(watermarkProps.alpha.validator(NaN)).toBe(false)
    expect(watermarkProps.alpha.validator(Infinity)).toBe(false)
    expect(watermarkProps.alpha.validator(0)).toBe(true)
    expect(watermarkProps.alpha.validator(1)).toBe(true)
    wrapper.unmount()
  })

  it('reports canvas failures and handles them in redraw', async () => {
    const wrapper = mount(Watermark, { props: { content: 'Confidential' } })
    await settle()
    const cause = new Error('canvas failed')
    vi.mocked(HTMLCanvasElement.prototype.toDataURL).mockImplementationOnce(() => {
      throw cause
    })
    await expect((wrapper.vm as any).redraw()).resolves.toBeUndefined()
    expect(wrapper.emitted('error')?.[0]?.[0]).toEqual({ source: 'canvas', error: cause })
    expect((wrapper.element.querySelector(`.${PREFIX}-watermark__layer`) as HTMLElement).style.backgroundImage).toBe(
      'none',
    )
    wrapper.unmount()
  })
})
