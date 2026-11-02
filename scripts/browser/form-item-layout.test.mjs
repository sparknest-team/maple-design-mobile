import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { chromium } from 'playwright'

const require = createRequire(new URL('../../packages/maple-cli/package.json', import.meta.url))
const less = require('less')
const source = new URL('../../packages/maple-ui/src/', import.meta.url)

test('presentation preserves form columns and labels center on content rather than feedback', async () => {
  const styles = await Promise.all(
    ['row/style/index.less', 'col/style/index.less', 'form/style/index.less'].map(async (path) => {
      const filename = new URL(path, source).pathname
      return (await less.render(await readFile(filename, 'utf8'), { filename })).css
    }),
  )
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    await page.setContent(`<style>${styles.join('\n')}
      * { box-sizing: border-box; }
      body { width: 360px; font: 14px/1.4 sans-serif; }
      .control { height: var(--test-height); width: 100%; }
      .feedback { height: 60px; }
    </style>`)
    for (const layout of ['vertical', 'horizontal', 'inline']) {
      for (const height of [20, 32, 40, 56]) {
        await page.evaluate(
          ({ layout, height }) => {
            document.querySelector('main')?.remove()
            const main = document.createElement('main')
            const grid = layout === 'horizontal'
            main.innerHTML = `<div class="mp-form-item mp-form-item--${layout} ${grid ? 'mp-row mp-row--align-start' : ''}">
            <div class="mp-form-item__label-col ${grid ? 'mp-col mp-col--span-5' : ''}" style="--mp-form-item-content-height:${height}px">
              <label class="mp-form-item__label">名称</label>
            </div>
            <div class="mp-form-item__wrapper ${grid ? 'mp-col mp-col--span-19' : ''}">
              <div class="mp-form-item__content"><div class="control" style="--test-height:${height}px">字段值</div></div>
              <div class="feedback">帮助或错误信息</div>
            </div>
          </div>`
            document.body.append(main)
          },
          { layout, height },
        )
        const geometry = () =>
          page.evaluate(() => {
            const rect = (selector) => {
              const { x, y, width, height } = document.querySelector(selector).getBoundingClientRect()
              return { x, y, width, height }
            }
            return {
              label: rect('.mp-form-item__label'),
              column: rect('.mp-form-item__label-col'),
              content: rect('.mp-form-item__content'),
            }
          })
        const inline = await geometry()
        await page.locator('.mp-form-item').evaluate((element) => element.setAttribute('data-presentation', 'popup'))
        assert.deepEqual(await geometry(), inline, `${layout}/${height}: popup must preserve column geometry`)
        if (layout === 'vertical') {
          assert.ok(inline.content.y >= inline.label.y + inline.label.height)
        } else {
          assert.ok(
            Math.abs(inline.label.y + inline.label.height / 2 - inline.content.y - inline.content.height / 2) < 1,
            `${layout}/${height}: label must center against the control, excluding feedback`,
          )
        }
      }
    }
  } finally {
    await browser.close()
  }
})
