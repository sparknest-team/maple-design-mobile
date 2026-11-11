import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CodeExample from './CodeExample.vue'

vi.mock('@config', () => ({
  default: { pc: { fold: { defaultFold: true, foldHeight: 0 }, clipboard: { 'zh-CN': '已复制' } } },
}))
vi.mock('@maple-design/cli-vue/client', () => ({
  getBrowserTheme: () => 'lightTheme',
  getPCLocationInfo: () => ({ language: 'zh-CN' }),
}))
vi.mock('@maple-design/ui-vue', () => ({ Context: {}, Message: { success: vi.fn() } }))
vi.mock('@maple-design/icons-vue', () => ({ IconCodeJson: 'span', IconCopy: 'span', IconXml: 'span' }))
vi.mock('@maple-design/shared-vue', () => ({ doubleRaf: () => Promise.resolve() }))
vi.mock('clipboard', () => ({
  default: class {
    on() {}
  },
}))

afterEach(() => vi.restoreAllMocks())

describe('Markdown code visibility', () => {
  it('shows prose code with a stale folded site config and still allows manual folding', async () => {
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(160)
    const wrapper = mount(CodeExample, { slots: { default: '<pre>npm install @maple-design/ui-vue</pre>' } })
    const code = wrapper.get('.mp-site-code-example__code')
    expect(code.attributes('aria-hidden')).toBe('false')
    expect(code.attributes('style') ?? '').not.toContain('height: 0px')
    await wrapper.get('button[aria-label="Hide Source"]').trigger('click')
    await flushPromises()
    expect(code.attributes('aria-hidden')).toBe('true')
    expect(code.attributes('style')).toContain('height: 0px')
    wrapper.unmount()
  })
})
