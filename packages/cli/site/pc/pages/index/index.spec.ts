import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Home from './index.vue'

const push = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ path: '/' }),
  useRouter: () => ({ push }),
}))
vi.mock('@config', async (load) => {
  const { default: defaults } = await load<typeof import('../../../../src/node/config/maple.default.config')>()
  const sections = [
    ['start', 'quickstart', '开始使用', 'Getting started'],
    ['components', 'button', '组件', 'Components'],
    ['showcase', 'showcase', '特色与场景', 'Features and scenarios'],
    ['ai', 'ai', 'AI 与工具', 'AI and tools'],
  ].map(([id, entry, zh, en]) => ({ id, entry, text: { 'zh-CN': zh, 'en-US': en } }))
  return { default: { ...defaults, pc: { ...defaults.pc, sections } } }
})
vi.mock('@maple-design/cli-vue/client', () => ({
  getPCLocationInfo: () => ({ language: location.hash.split('/')[1] }),
  getBrowserTheme: () => 'lightTheme',
  setTheme: vi.fn(),
  onThemeChange: vi.fn(),
}))

it.each([
  ['zh-CN', ['开始使用', '组件', '特色与场景', 'AI 与工具']],
  ['en-US', ['Getting started', 'Components', 'Features and scenarios', 'AI and tools']],
] as const)('opens each documentation area from the %s homepage', async (locale, labels) => {
  window.location.hash = `#/${locale}/`
  const page = mount(Home, {
    shallow: true,
    global: {
      stubs: { AppHeader: false, MpSpace: true, MpButton: true, MpIcon: true, MpCell: true },
      directives: { ripple: {} },
    },
  })
  try {
    const buttons = page.get('nav').findAll('button')
    expect(buttons.map((button) => button.text())).toEqual(labels)
    for (const [index, entry] of ['quickstart', 'button', 'showcase', 'ai'].entries()) {
      await buttons[index].trigger('click')
      expect(push).toHaveBeenLastCalledWith({ path: `/${locale}/${entry}`, query: {} })
    }
  } finally {
    page.unmount()
    window.location.hash = ''
  }
})
