import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AppMobile from './AppMobile.vue'

vi.mock('@maple-design/cli-vue/client', () => ({ getMobileIndex: () => '/mobile.html' }))

beforeEach(() => localStorage.clear())
afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('PC site mobile preview', () => {
  it('loads the selected component demo in the iframe', async () => {
    const wrapper = mount(AppMobile, {
      props: { componentName: 'button', language: 'zh-CN', replace: 'button', hash: '' },
    })

    expect(wrapper.find('iframe').attributes('src')).toBe(
      '/mobile.html#/button?language=zh-CN&platform=pc&replace=button',
    )

    await wrapper.setProps({ componentName: 'input', replace: 'input' })
    expect(wrapper.find('iframe').attributes('src')).toBe(
      '/mobile.html#/input?language=zh-CN&platform=pc&replace=input',
    )
    expect(new URL(wrapper.find('iframe').attributes('src')!, 'http://localhost:8080/guide/why/').pathname).toBe(
      '/mobile.html',
    )
    await wrapper.setProps({
      componentName: 'zh-CN/practiceDetail',
      query: { project: 'P-1007', state: '500', language: 'en-US' },
    })
    const url = wrapper.find('iframe').attributes('src')!
    expect(url).toContain('project=P-1007')
    expect(url).toContain('state=500')
    expect(url).toContain('language=zh-CN')
    expect(url).not.toContain('language=en-US')
  })
})

it('switches to the document outline without remounting the mobile preview', async () => {
  const root = document.createElement('main')
  root.innerHTML =
    '<article class="maple-site-doc"><h2>案例</h2><h3 id="basic"><a>#</a>基础用法</h3><div class="loca-doc-preview__example"><h3>Demo content</h3></div></article>'
  document.body.append(root)
  const wrapper = mount(AppMobile, {
    attachTo: document.body,
    props: { docRoot: root, pageKey: '/button', language: 'zh-CN' },
  })
  const iframe = wrapper.get('iframe').element
  const buttons = wrapper.findAll('.maple-site-mobile-toolbar button')
  await buttons[1].trigger('click')
  expect(buttons[1].attributes('aria-pressed')).toBe('true')
  expect(wrapper.get('.maple-site-mobile-content').isVisible()).toBe(false)
  const links = wrapper.findAll('.maple-site-outline__link')
  expect(links.map((link) => link.text())).toEqual(['案例', '基础用法'])
  await links[1].trigger('click')
  expect(wrapper.emitted('navigate')).toEqual([['basic']])
  await buttons[0].trigger('click')
  expect(wrapper.get('iframe').element).toBe(iframe)
  expect(wrapper.get('.maple-site-mobile-content').isVisible()).toBe(true)

  root.innerHTML = '<article class="maple-site-doc"><h3 id="async">Async section</h3></article>'
  await vi.waitFor(() =>
    expect(wrapper.findAll('.maple-site-outline__link').map((link) => link.text())).toEqual(['Async section']),
  )
  await wrapper.setProps({ language: 'en-US', pageKey: '/input' })
  expect(buttons[1].text()).toBe('On this page')
  wrapper.unmount()
  root.remove()
})

it.each(['preview', 'outline'] as const)(
  'remembers %s mode across component changes and page reloads',
  async (mode) => {
    const wrapper = mount(AppMobile, { props: { componentName: 'button' } })
    // Select the opposite mode first to verify saving both directions.
    const index = mode === 'preview' ? 0 : 1
    await wrapper.findAll('.maple-site-mobile-toolbar button')[1 - index].trigger('click')
    await wrapper.findAll('.maple-site-mobile-toolbar button')[index].trigger('click')
    await wrapper.setProps({ componentName: 'input', pageKey: '/input' })
    expect(wrapper.findAll('.maple-site-mobile-toolbar button')[index].attributes('aria-pressed')).toBe('true')
    expect(localStorage.getItem('MAPLE_UI_DOC_PANEL_MODE')).toBe(mode)
    wrapper.unmount()

    const reloaded = mount(AppMobile, { props: { componentName: 'select' } })
    expect(reloaded.findAll('.maple-site-mobile-toolbar button')[index].attributes('aria-pressed')).toBe('true')
    reloaded.unmount()
  },
)

it('still switches when browser storage is unavailable', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('Storage blocked')
  })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Storage blocked')
  })
  const wrapper = mount(AppMobile)
  const buttons = wrapper.findAll('.maple-site-mobile-toolbar button')
  expect(buttons[0].attributes('aria-pressed')).toBe('true')
  await buttons[1].trigger('click')
  expect(buttons[1].attributes('aria-pressed')).toBe('true')
  wrapper.unmount()
})

it('follows the active heading after the parent reveals the outline with v-show', async () => {
  const root = document.createElement('main')
  root.innerHTML = '<article class="maple-site-doc"><h3 id="current">Current section</h3></article>'
  document.body.append(root)
  vi.spyOn(root.querySelector('h3')!, 'getBoundingClientRect').mockReturnValue({ top: 100 } as DOMRect)
  const wrapper = mount(AppMobile, { props: { docRoot: root } })
  const nav = wrapper.get('.maple-site-outline').element as HTMLElement
  const link = wrapper.get('.maple-site-outline__link').element
  const scrollTo = vi.fn()
  nav.scrollTo = scrollTo
  vi.spyOn(nav, 'getBoundingClientRect').mockImplementation(
    () => ({ top: 100, bottom: 300, height: nav.style.display === 'none' ? 0 : 200 }) as DOMRect,
  )
  vi.spyOn(link, 'getBoundingClientRect').mockReturnValue({ top: 350, bottom: 380 } as DOMRect)
  await flushPromises()
  expect(scrollTo).not.toHaveBeenCalled()
  await wrapper.findAll('.maple-site-mobile-toolbar button')[1].trigger('click')
  await flushPromises()
  expect(scrollTo).toHaveBeenLastCalledWith({ top: 80, behavior: 'smooth' })
  wrapper.unmount()
  root.remove()
})

it('scrolls the existing iframe only when switching back to preview, even when the URL hash has not caught up', async () => {
  const root = document.createElement('main')
  root.innerHTML =
    '<article class="maple-site-doc"><div class="card"><h3>First</h3><div data-mobile-demo="first"></div></div><div class="card"><h3>Second</h3><div data-mobile-demo="second"></div></div></article>'
  let secondTop = 400
  vi.spyOn(root.querySelectorAll('h3')[0], 'getBoundingClientRect').mockReturnValue({ top: 100 } as DOMRect)
  vi.spyOn(root.querySelectorAll('h3')[1], 'getBoundingClientRect').mockImplementation(
    () => ({ top: secondTop }) as DOMRect,
  )
  const wrapper = mount(AppMobile, { attachTo: document.body, props: { docRoot: root, hash: 'first' } })
  const frame = wrapper.get('iframe').element as HTMLIFrameElement
  const frameDoc = document.implementation.createHTMLDocument()
  const scrollTo = vi.fn()
  Object.defineProperty(frame, 'contentDocument', { value: frameDoc })
  Object.defineProperty(frame, 'contentWindow', { value: { scrollY: 0, scrollTo } })
  frameDoc.body.innerHTML =
    '<header class="mobile-page-header"></header><section data-demo="first"></section><section data-demo="second"></section>'
  vi.spyOn(frameDoc.querySelector('header')!, 'getBoundingClientRect').mockReturnValue({ height: 48 } as DOMRect)
  vi.spyOn(frameDoc.querySelector('[data-demo="second"]')!, 'getBoundingClientRect').mockReturnValue({
    top: 600,
  } as DOMRect)
  const buttons = wrapper.findAll('.maple-site-mobile-toolbar button')
  await buttons[1].trigger('click')
  secondTop = 100
  document.dispatchEvent(new Event('scroll'))
  await flushPromises()
  expect(scrollTo).not.toHaveBeenCalled()
  await buttons[0].trigger('click')
  await flushPromises()
  expect(scrollTo).toHaveBeenCalledWith({ top: 540, behavior: 'smooth' })
  expect(wrapper.get('iframe').element).toBe(frame)
  expect(wrapper.get('iframe').attributes('src')).toContain('#first')
  scrollTo.mockClear()
  document.dispatchEvent(new Event('scroll'))
  await flushPromises()
  await buttons[0].trigger('click')
  await flushPromises()
  expect(scrollTo).not.toHaveBeenCalled()
  wrapper.unmount()
})

it('waits for a lazily mounted demo and cancels the switch request when leaving preview', async () => {
  const root = document.createElement('main')
  root.innerHTML =
    '<article class="maple-site-doc"><div class="card"><h3>Late demo</h3><div data-mobile-demo="late"></div></div></article>'
  vi.spyOn(root.querySelector('h3')!, 'getBoundingClientRect').mockReturnValue({ top: 100 } as DOMRect)
  const wrapper = mount(AppMobile, { props: { docRoot: root } })
  const frame = wrapper.get('iframe').element as HTMLIFrameElement
  const doc = document.implementation.createHTMLDocument()
  const scrollTo = vi.fn()
  Object.defineProperty(frame, 'contentDocument', { value: doc })
  Object.defineProperty(frame, 'contentWindow', { value: { scrollY: 0, scrollTo } })
  const buttons = wrapper.findAll('.maple-site-mobile-toolbar button')
  await buttons[1].trigger('click')
  await buttons[0].trigger('click')
  await flushPromises()
  expect(scrollTo).not.toHaveBeenCalled()
  const demo = doc.createElement('section')
  demo.dataset.demo = 'late'
  vi.spyOn(demo, 'getBoundingClientRect').mockReturnValue({ top: 500 } as DOMRect)
  doc.body.append(demo)
  await flushPromises()
  expect(scrollTo).toHaveBeenCalledTimes(1)
  demo.remove()
  scrollTo.mockClear()
  await buttons[1].trigger('click')
  await buttons[0].trigger('click')
  await flushPromises()
  await buttons[1].trigger('click')
  doc.body.append(demo)
  await flushPromises()
  expect(scrollTo).not.toHaveBeenCalled()
  wrapper.unmount()
})
