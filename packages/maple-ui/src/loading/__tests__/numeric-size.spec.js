import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, expect, test } from 'vitest'
import Loading from '..'

// Use the same Less compiler as maple-cli's build and test pipeline.
const require = createRequire(import.meta.url)
const less = createRequire(require.resolve('@maple-design/cli'))('less')

let stylesheet
beforeAll(async () => {
  const filename = resolve(process.cwd(), 'src/loading/style/loading.less')
  const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
  stylesheet = document.createElement('style')
  stylesheet.textContent = css
  document.head.appendChild(stylesheet)
})
afterAll(() => stylesheet?.remove())

test.each(['wave', 'cube', 'rect', 'disappear'])(
  '%s numeric size gives animation primitives nonzero dimensions',
  async (type) => {
    const wrapper = mount(Loading, { props: { type, size: 20 }, attachTo: document.body })
    try {
      const container = () => wrapper.find(`.mp-loading__${type}`)
      const items = () => wrapper.findAll(`.mp-loading__${type}-item`)
      expect(container().element.style.width).toBe('20px')
      for (const item of items()) {
        const style = getComputedStyle(item.element)
        // jsdom keeps percentages; the browser also checks their resolved pixel sizes.
        expect(parseFloat(style.width)).toBeGreaterThan(0)
        expect(parseFloat(style.height)).toBeGreaterThan(0)
        expect(style.animation || style.animationName).toContain(type)
      }
      await wrapper.setProps({ size: 'sm' })
      expect(container().element.style.width).toBe('')
      expect(items()[0].classes()).toContain(`mp-loading__${type}-item--sm`)
      await wrapper.setProps({ size: 40 })
      expect(container().element.style.width).toBe('40px')
      expect(items()[0].classes()).toContain(`mp-loading__${type}-item--numeric`)
    } finally {
      wrapper.unmount()
    }
  },
)
