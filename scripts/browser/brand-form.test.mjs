import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { chooseDemoOption } from '../../../design-ui/browser/demo-control.mjs'
import { createServer, jsx, vue } from '../../packages/maple-cli/test-utils/browser-vite.mjs'

const root = fileURLToPath(new URL('../../packages/maple-ui/', import.meta.url))
const output = fileURLToPath(new URL('../../artifacts/brand-form/', import.meta.url))
const evidence = JSON.parse(
  await readFile(
    new URL('../../../design-ui/audits/evidence/horo-brand-tokens-2026-10-25.json', import.meta.url),
    'utf8',
  ),
)
let server
let browser
const errors = []
const fixture = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>
*{box-sizing:border-box}body{margin:0;background:var(--mp-color-body);color:var(--mp-color-text);font-family:var(--mp-sys-font-family)}
main{max-width:480px;margin:0 auto;padding:24px 20px}h1{margin:0;font-size:24px}h2{font-size:22px;margin:24px 0 8px}p{line-height:1.6;color:var(--mp-sys-color-content-secondary)}.mp-form-item{margin-top:16px}pre{white-space:pre-wrap;overflow-wrap:anywhere}header{padding-bottom:16px;border-bottom:1px solid var(--mp-sys-color-border-subtle)}
</style></head><body><main><header><h1 id="brand-name"></h1><p>Maple · 移动端完整表单</p></header><div id="app"></div></main><script type="module">
import { createApp, h, ref, nextTick } from 'vue'
import BrandForm from '/src/safe-area/example/demos/app-form.vue'
import Themes from '/src/themes/index.ts'
import ThemeProvider from '/src/theme-provider/index.ts'
import SafeArea from '/src/safe-area/index.ts'
import Button from '/src/button/index.ts'
import Collapse from '/src/collapse/index.ts'
import Cascader from '/src/cascader/index.ts'
import Checkbox from '/src/checkbox/index.ts'
import DateField from '/src/date/index.ts'
import DateRange from '/src/date-range/index.ts'
import Form from '/src/form/index.ts'
import Input from '/src/input/index.ts'
import InputNumber from '/src/input-number/index.ts'
import Radio from '/src/radio/index.ts'
import Select from '/src/select/index.ts'
import Space from '/src/space/index.ts'
import Switch from '/src/switch/index.ts'
import Textarea from '/src/textarea/index.ts'
import TimeField from '/src/time/index.ts'
import Upload from '/src/upload/index.ts'
import Popup from '/src/popup/index.ts'
${['collapse', 'button', 'cascader', 'checkbox', 'date', 'date-range', 'form', 'input', 'input-number', 'radio', 'safe-area', 'select', 'space', 'switch', 'textarea', 'time', 'upload', 'popup'].map((name) => `import '/src/${name}/style/index.ts'`).join('\n')}
const form = ref(null), themeVars = ref(Themes.default.light)
const app = createApp({render:()=>h(ThemeProvider,{theme:themeVars.value},()=>h(BrandForm,{ref:form}))})
;[Collapse, Button, Cascader, Checkbox, DateField, DateRange, Form, Input, InputNumber, Radio, Select, Space, Switch, Textarea, TimeField, Upload, SafeArea, Popup].forEach(component => app.use(component))
app.mount('#app')
document.querySelector('.brand-form-options [aria-expanded]').click()
const setTheme=(brand, mode='light')=>{themeVars.value=Themes[brand][mode];document.getElementById('brand-name').textContent=brand==='alps'?'ALPS 乐道':'firefly 萤火虫'}
SafeArea.setInsets({bottom:34})
setTheme(new URLSearchParams(location.search).get('brand')||'alps', new URLSearchParams(location.search).get('mode')||'light')
window.brandTest={form,setTheme,nextTick,Themes,ThemeProvider}
</script></body></html>`

before(
  async () => {
    await mkdir(output, { recursive: true })
    server = await createServer({
      root,
      configFile: false,
      optimizeDeps: { entries: [], include: ['vue'] },
      plugins: [
        vue(),
        jsx(),
        {
          name: 'brand-form-fixture',
          configureServer(s) {
            s.middlewares.use('/__brand-form', async (_req, res) => {
              res.setHeader('Content-Type', 'text/html')
              res.end(await server.transformIndexHtml('/__brand-form.html', fixture))
            })
          },
        },
      ],
      server: { host: '127.0.0.1', port: 0, watch: { ignored: ['**/*'] } },
    })
    await server.listen()
    browser = await chromium.launch({ headless: true })
  },
  { timeout: 60000 },
)

after(async () => {
  await browser?.close()
  await server?.close()
})

for (const brand of ['alps', 'firefly']) {
  test(
    `${brand}: source colors, complete form, validation, files, draft transactions and safe areas`,
    async (t) => {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
      t.after(async () => {
        if (!page.isClosed()) {
          await writeFile(`${output}/${brand}-debug.html`, await page.content())
          await page.screenshot({ path: `${output}/${brand}-debug.png`, fullPage: true })
          await page.close()
        }
      })
      page.on('pageerror', (e) => {
        errors.push(e.message)
        console.error('Brand page error:', e.message)
      })
      await page.route('**/*', (route) =>
        new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
      )
      await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/__brand-form?brand=${brand}`)
      await page.waitForFunction(() => Boolean(window.brandTest), null, { timeout: 30000 })
      await page.screenshot({ path: `${output}/${brand}-initial.png`, fullPage: true })
      const m = evidence.brands[brand].mappings
      const samples = await page.evaluate(() => {
        const input = document.querySelector('input[aria-label="联系人"]')
        const field = input.closest('.mp-field-decorator')
        const button = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('提交预约'))
        const checked = document.querySelector('.mp-checkbox--checked .mp-checkbox__icon')
        return {
          action: getComputedStyle(button).backgroundColor,
          foreground: getComputedStyle(button).color,
          caret: getComputedStyle(input).caretColor,
          fieldRadius: getComputedStyle(field).borderRadius,
          fieldBackground: getComputedStyle(field).backgroundColor,
          checkboxRadius: getComputedStyle(checked).borderRadius,
          overflow: document.documentElement.scrollWidth > innerWidth,
          safeBottom: getComputedStyle(document.querySelector('.brand-form-footer')).paddingBottom,
          switchColor: getComputedStyle(document.querySelector('.mp-switch__track')).backgroundColor,
        }
      })
      assert.equal(samples.action, m['--mp-color-primary'].value)
      // Browsers serialize fully opaque rgba as rgb.
      assert.equal(
        samples.foreground.replace('rgba(', 'rgb(').replace(', 1)', ')'),
        m['--mp-button-solid-text-color'].value.replace('rgba(', 'rgb(').replace(', 1)', ')'),
      )
      assert.equal(samples.caret, m['--mp-field-caret-color'].value)
      assert.equal(samples.fieldRadius, m['--mp-field-border-radius'].value)
      assert.equal(
        samples.fieldBackground,
        brand === 'alps' ? 'rgba(0, 0, 0, 0)' : m['--mp-field-variant-outline-background'].value,
      )
      assert.equal(samples.checkboxRadius, m['--mp-checkbox-control-border-radius'].value)
      assert.equal(samples.switchColor, m['--mp-switch-track-active-background'].value)
      assert.equal(samples.safeBottom, '34px')
      assert.equal(samples.overflow, false)

      await page.getByRole('button', { name: '提交预约', exact: true }).click()
      await page.getByText('联系人不能为空', { exact: true }).waitFor()
      await page.getByRole('textbox', { name: '联系人', exact: true }).fill('林女士')
      await page.getByRole('button', { name: '提交预约', exact: true }).click()
      await page.getByText('预约信息校验通过（本地演示）', { exact: true }).waitFor()

      await page.getByText('禁用表单', { exact: true }).click()
      assert.equal(await page.getByRole('textbox', { name: '联系人', exact: true }).isDisabled(), true)
      await page.getByText('禁用表单', { exact: true }).click()
      await page.getByText('只读表单', { exact: true }).click()
      assert.equal(await page.getByRole('textbox', { name: '联系人', exact: true }).getAttribute('readonly'), '')
      await page.getByText('只读表单', { exact: true }).click()

      await page.locator('input[type="file"]').setInputFiles({
        name: '预约说明.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Local brand form fixture'),
      })
      await page.getByText('预约说明.txt', { exact: true }).first().waitFor()
      await page.waitForFunction(() => window.brandTest.form.value.model.files[0]?.status === 'success')

      // Preserve Maple draft/cancel/confirm behavior in the fully themed body portal.
      await chooseDemoOption(page, '字段编辑方式', '弹层确认后保存')
      await page
        .locator('.mp-form-item')
        .filter({ has: page.locator('label', { hasText: '联系人' }) })
        .locator('button.mp-field-presentation__reference')
        .click()
      const panel = page.getByRole('region', { name: '联系人', exact: true })
      await panel.waitFor()
      assert.equal(await panel.evaluate((el) => getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)')
      assert.equal(await panel.evaluate((el) => getComputedStyle(el).paddingBottom), '42px')
      await page.screenshot({ path: `${output}/${brand}-popup.png`, fullPage: true })
      await panel.locator('input').fill('未保存的草稿')
      await panel.getByRole('button', { name: '关闭', exact: true }).click()
      assert.equal(await page.evaluate(() => window.brandTest.form.value.model.name), '林女士')
      await page.locator('button.mp-field-presentation__reference').first().click()
      await panel.locator('input').fill('已确认联系人')
      await panel.getByRole('button', { name: '确认', exact: true }).click()
      await page.waitForFunction(() => window.brandTest.form.value.model.name === '已确认联系人')
      await chooseDemoOption(page, '字段编辑方式', '直接编辑')
      await page.screenshot({ path: `${output}/${brand}-form.png`, fullPage: true })
      await writeFile(`${output}/${brand}-computed.json`, JSON.stringify(samples, null, 2))
      await page.getByText('纯阅读', { exact: true }).click()
      assert.equal(await page.getByRole('textbox', { name: '联系人', exact: true }).count(), 0)
      await page.getByText('纯阅读', { exact: true }).click()
      await page.setViewportSize({ width: 844, height: 390 })
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      await page.evaluate(() => {
        const { setTheme } = window.brandTest
        setTheme('maple', 'dark')
      })
      assert.equal(await page.locator('html').getAttribute('maple-theme'), 'dark')
      assert.equal(
        await page
          .locator('.mp-field-decorator')
          .first()
          .evaluate((el) => getComputedStyle(el).borderRadius),
        '4px',
      )
      await page.evaluate((brand) => window.brandTest.setTheme(brand), brand)
      assert.equal(await page.locator('html').getAttribute('maple-theme'), null)
      assert.deepEqual(errors, [])
      await page.close()
    },
    { timeout: 90000 },
  )
}

function contrast(a, b) {
  const luminance = (color) =>
    color
      .match(/[\d.]+/g)
      .slice(0, 3)
      .map(Number)
      .map((channel) => {
        const value = channel / 255
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
      })
      .reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0)
  const x = luminance(a),
    y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

for (const brand of ['alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    test(
      `${brand} ${mode}: four-edge controls, landscape portals, zero overrides and contrast`,
      async () => {
        const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, reducedMotion: 'reduce' })
        try {
          await page.goto(
            `http://127.0.0.1:${server.httpServer.address().port}/__brand-form?brand=${brand}&mode=${mode}`,
          )
          await page.waitForFunction(() => Boolean(window.brandTest))
          const screen = page.locator('.brand-form-screen')
          const globalBefore = await page.evaluate(() =>
            document.documentElement.style.getPropertyValue('--mp-safe-area-bottom'),
          )
          for (const [index, value] of [17, 29, 41, 13].entries()) {
            await page.locator('.brand-form-insets input').nth(index).fill(String(value))
            await page.locator('.brand-form-insets input').nth(index).press('Tab')
          }
          await page.waitForFunction(() => {
            const m = window.brandTest.form.value.measurements
            return m?.top === 17 && m.right === 29 && m.left === 13 && m.footer === 41 && m.nested === 0
          })
          await page.getByText('检查通过：未重复留白', { exact: true }).waitFor()
          const colors = await page.evaluate(() => {
            const button = [...document.querySelectorAll('button')].find((el) => el.textContent.includes('提交预约'))
            const fields = document.querySelector('.brand-form-screen-form')
            const input = document.querySelector('input[aria-label="联系人"]')
            return {
              background: getComputedStyle(fields).backgroundColor,
              text: getComputedStyle(input).color,
              action: getComputedStyle(button).backgroundColor,
              actionText: getComputedStyle(button).color,
            }
          })
          assert.ok(contrast(colors.text, colors.background) >= 4.5, 'readable form text')
          assert.ok(contrast(colors.actionText, colors.action) >= 4.5, 'readable primary action')
          assert.equal(await page.locator('html').getAttribute('maple-theme'), mode === 'dark' ? 'dark' : null)
          await page.screenshot({ path: `${output}/${brand}-${mode}-simulator.png`, fullPage: true })
          await page.getByRole('button', { name: '横屏刘海', exact: true }).click()
          await page.waitForFunction(() => window.brandTest.form.value.measurements?.footer === 21)
          const bounds = await screen.boundingBox()
          assert.equal(await screen.evaluate((el) => el.offsetWidth), 844)
          assert.equal(await screen.evaluate((el) => el.offsetHeight), 390)
          assert.ok(bounds.width <= (await page.locator('.brand-form-preview-scroll').evaluate((el) => el.clientWidth)))
          await chooseDemoOption(page, '字段编辑方式', '弹层确认后保存')
          await screen.locator('.mp-form-item').first().locator('button.mp-field-presentation__reference').click()
          const panel = screen.getByRole('region', { name: '联系人', exact: true })
          await panel.waitFor()
          await page.waitForFunction(() => window.brandTest.form.value.measurements?.panel?.[2] === 29)
          assert.deepEqual(
            await panel.evaluate((el) =>
              ['paddingLeft', 'paddingRight', 'paddingBottom'].map((key) => getComputedStyle(el)[key]),
            ),
            ['52px', '52px', '29px'],
          )
          const popupBounds = await panel.boundingBox()
          const currentBounds = await screen.boundingBox()
          assert.ok(
            popupBounds.x >= currentBounds.x &&
              popupBounds.x + popupBounds.width <= currentBounds.x + currentBounds.width + 1,
          )
          assert.ok(
            popupBounds.y >= currentBounds.y &&
              popupBounds.y + popupBounds.height <= currentBounds.y + currentBounds.height + 1,
          )
          await page.screenshot({ path: `${output}/${brand}-${mode}-landscape-popup.png`, fullPage: true })
          // Simulate a native host update while the modal owns focus. No global overrides.
          await page.evaluate(() => {
            window.brandTest.form.value.insets.bottom = 0
          })
          await page.waitForFunction(() => window.brandTest.form.value.measurements?.panel?.[2] === 8)
          assert.equal(
            await screen.locator('.brand-form-footer').evaluate((el) => getComputedStyle(el).paddingBottom),
            '0px',
          )
          assert.equal(
            await screen.locator('.brand-form-footer-nested').evaluate((el) => getComputedStyle(el).paddingBottom),
            '0px',
          )
          await panel.getByRole('button', { name: '关闭', exact: true }).click()
          await page.getByRole('button', { name: '四边归零', exact: true }).click()
          await page.waitForFunction(() => {
            const m = window.brandTest.form.value.measurements
            return m?.top === 0 && m.right === 0 && m.left === 0 && m.footer === 0 && m.nested === 0
          })
          assert.equal(
            await page.evaluate(() => document.documentElement.style.getPropertyValue('--mp-safe-area-bottom')),
            globalBefore,
          )
        } finally {
          await page.close()
        }
      },
      { timeout: 60000 },
    )
  }
}

for (const brand of ['alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    test(
      `${brand} ${mode}: calendar and time drafts, disabled options, upload retry/cancel/limits`,
      async (t) => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
        t.after(async () => {
          await page.screenshot({ path: `${output}/${brand}-${mode}-form-states.png`, fullPage: true })
          await writeFile(`${output}/${brand}-${mode}-states.html`, await page.content())
          await page.close()
        })
        const pageErrors = []
        page.on('pageerror', (error) => pageErrors.push(error.message))
        await page.route('**/*', (route) =>
          new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
        )
        await page.goto(
          `http://127.0.0.1:${server.httpServer.address().port}/__brand-form?brand=${brand}&mode=${mode}`,
          { timeout: 60000 },
        )
        await page.waitForFunction(() => Boolean(window.brandTest))
        const choose = async (name, option) => {
          await chooseDemoOption(page, name, option)
        }
        await page.getByRole('combobox', { name: '预约城市', exact: true }).click()
        assert.equal(
          await page.getByRole('option', { name: '广州（暂未开放）', exact: true }).getAttribute('aria-disabled'),
          'true',
        )
        await page.getByRole('option', { name: '北京', exact: true }).click()
        await page.waitForFunction(() => window.brandTest.form.value.model.city === 'beijing')
        await choose('字段编辑方式', '弹层确认后保存')
        const openField = async (label) => {
          await page
            .locator('.mp-form-item')
            .filter({ has: page.locator('label', { hasText: label }) })
            .locator('button.mp-field-presentation__reference, input[role=combobox]:not(:disabled)')
            .first()
            .click()
          const panel = page.getByRole('region', { name: label, exact: true })
          await panel.waitFor()
          return panel
        }
        let panel = await openField('预约城市')
        await panel.getByRole('option', { name: '上海', exact: true }).click()
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.city), 'beijing')
        await panel.getByRole('button', { name: '关闭', exact: true }).click()
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.city), 'beijing')
        panel = await openField('预约日期')
        const selected = panel.locator('.mp-day-picker__button.mp-button--status-primary').first()
        await selected.waitFor()
        const color = await selected.evaluate((el) => ({
          bg: getComputedStyle(el).backgroundColor,
          fg: getComputedStyle(el).color,
        }))
        const expected =
          mode === 'light'
            ? brand === 'alps'
              ? ['rgb(255, 61, 0)', 'rgb(9, 12, 26)']
              : ['rgb(207, 199, 255)', 'rgb(23, 34, 75)']
            : brand === 'alps'
              ? ['rgb(255, 148, 111)', 'rgb(17, 22, 37)']
              : ['rgb(207, 199, 255)', 'rgb(17, 22, 37)']
        assert.deepEqual([color.bg, color.fg], expected)
        assert.ok(contrast(color.fg, color.bg) >= 4.5, 'readable selected calendar day')
        await page.screenshot({ path: `${output}/${brand}-${mode}-calendar.png`, fullPage: true })
        await panel.getByRole('button', { name: '15', exact: true }).click()
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.date), '2026-11-01')
        await panel.getByRole('button', { name: '关闭', exact: true }).click()
        panel = await openField('预约日期')
        await panel.getByRole('button', { name: '15', exact: true }).click()
        await panel.getByRole('button', { name: '确认', exact: true }).click()
        await page.waitForFunction(() => window.brandTest.form.value.model.date === '2026-11-15')
        panel = await openField('预约时间')
        const hour = panel.getByRole('listbox').first()
        await hour.focus()
        await hour.press('ArrowDown')
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.time), '10:30:00')
        const active = panel.locator('.mp-picker__option[aria-selected="true"] .mp-picker__text').first()
        assert.equal(
          await active.evaluate((el) => getComputedStyle(el).color),
          mode === 'light'
            ? brand === 'alps'
              ? 'rgb(9, 12, 26)'
              : 'rgb(23, 34, 75)'
            : brand === 'alps'
              ? 'rgb(241, 242, 246)'
              : 'rgb(235, 238, 255)',
        )
        await panel.getByRole('button', { name: '确认', exact: true }).click()
        await page.waitForFunction(() => window.brandTest.form.value.model.time !== '10:30:00')
        await choose('字段编辑方式', '直接编辑')
        await choose('上传演示', '首次失败，重试成功')
        const upload = page.locator('.mp-upload').first()
        await upload
          .locator('input[type="file"]')
          .setInputFiles({ name: '重试.txt', mimeType: 'text/plain', buffer: Buffer.from('retry') })
        await page.waitForFunction(() => window.brandTest.form.value.model.files[0]?.status === 'error')
        await upload.getByRole('button', { name: '重试', exact: true }).click()
        await page.waitForFunction(() => window.brandTest.form.value.model.files[0]?.status === 'success')
        await upload.getByRole('button', { name: '删除', exact: true }).click()
        await choose('上传演示', '慢速进度，可取消')
        await upload
          .locator('input[type="file"]')
          .setInputFiles({ name: '取消.txt', mimeType: 'text/plain', buffer: Buffer.from('abort') })
        await upload.locator('progress').waitFor()
        await upload.getByRole('button', { name: '取消', exact: true }).click()
        await page.waitForFunction(() => window.brandTest.form.value.model.files[0]?.status === 'canceled')
        await upload.getByRole('button', { name: '删除', exact: true }).click()
        await upload
          .locator('input[type="file"]')
          .setInputFiles({ name: '超限.txt', mimeType: 'text/plain', buffer: Buffer.alloc(5 * 1024 * 1024 + 1) })
        await page.getByText('单文件不能超过 5MB', { exact: true }).waitFor()
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.files.length), 0)
        assert.deepEqual(pageErrors, [])
      },
      { timeout: 60000 },
    )
  }
}

for (const brand of ['alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    test(
      `${brand} ${mode}: replacement, real video metadata and header swipe cancellation in the full form`,
      async (t) => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
        t.after(async () => {
          await page.screenshot({ path: `${output}/${brand}-${mode}-replacement-swipe.png`, fullPage: true })
          await writeFile(`${output}/${brand}-${mode}-replacement-swipe.html`, await page.content())
          await page.close()
        })
        const errors = []
        page.on('pageerror', (error) => errors.push(error.message))
        await page.route('**/*', (route) =>
          new URL(route.request().url()).hostname === '127.0.0.1' || route.request().url().startsWith('data:')
            ? route.continue()
            : route.abort(),
        )
        await page.goto(
          `http://127.0.0.1:${server.httpServer.address().port}/__brand-form?brand=${brand}&mode=${mode}`,
          { timeout: 60000 },
        )
        await page.waitForFunction(() => Boolean(window.brandTest))
        const choose = async (name, option) => {
          await chooseDemoOption(page, name, option)
        }
        const upload = page.locator('.mp-upload').first()
        await upload
          .locator('input[type="file"]')
          .setInputFiles(
            fileURLToPath(
              new URL('../../packages/maple-ui/src/safe-area/example/demos/assets/drive.webm', import.meta.url),
            ),
          )
        await page.waitForFunction(
          () =>
            window.brandTest.form.value.model.files[0]?.status === 'success' &&
            Number.isFinite(window.brandTest.form.value.model.files[0]?.duration),
        )
        assert.equal(await upload.locator('.mp-upload__duration').innerText(), '00:02')
        const badge = upload.locator('.mp-upload__duration')
        assert.equal(await badge.evaluate((el) => getComputedStyle(el).backgroundColor), 'rgba(0, 0, 0, 0.72)')
        assert.equal(await badge.evaluate((el) => getComputedStyle(el).color), 'rgb(255, 255, 255)')
        await page.screenshot({ path: `${output}/${brand}-${mode}-video-duration.png`, fullPage: true })
        const original = await page.evaluate(() => window.brandTest.form.value.model.files[0].uid)
        await upload.locator('.mp-upload__actions').getByRole('button', { name: '预览', exact: true }).click()
        const video = page.locator('video[controls]')
        await video.waitFor()
        assert.equal(await video.evaluate((el) => Boolean(el.closest('.brand-form-screen'))), true)
        await page.keyboard.press('Escape')
        await video.waitFor({ state: 'hidden' })
        const replace = async (file) => {
          const chooser = page.waitForEvent('filechooser')
          await upload.getByRole('button', { name: '替换', exact: true }).click()
          const picker = await chooser
          assert.equal(picker.isMultiple(), false)
          await picker.setFiles(file)
        }
        await replace({ name: '超过限制.txt', mimeType: 'text/plain', buffer: Buffer.alloc(5 * 1024 * 1024 + 1) })
        await page.getByText('单文件不能超过 5MB', { exact: true }).waitFor()
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.files[0].uid), original)
        await page.getByText('保护现有附件（拒绝替换和删除）', { exact: true }).click()
        await replace({ name: '守卫拒绝.txt', mimeType: 'text/plain', buffer: Buffer.from('veto') })
        await page.waitForTimeout(100)
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.files[0].uid), original)
        await page.getByText('保护现有附件（拒绝替换和删除）', { exact: true }).click()
        await choose('上传演示', '首次失败，重试成功')
        await replace({ name: '替换后的附件.txt', mimeType: 'text/plain', buffer: Buffer.from('replacement') })
        await page.waitForFunction(() => window.brandTest.form.value.model.files[0]?.status === 'error')
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.files.length), 1)
        assert.notEqual(await page.evaluate(() => window.brandTest.form.value.model.files[0].uid), original)
        await upload.getByRole('button', { name: '重试', exact: true }).click()
        await page.waitForFunction(() => window.brandTest.form.value.model.files[0]?.status === 'success')
        await page.getByRole('textbox', { name: '联系人', exact: true }).fill('已保存联系人')
        await page.getByRole('button', { name: '横屏刘海', exact: true }).click()
        await choose('字段编辑方式', '弹层确认后保存')
        await page
          .locator('.mp-form-item')
          .filter({ has: page.locator('label', { hasText: '联系人' }) })
          .locator('button.mp-field-presentation__reference, input[role=combobox]:not(:disabled)')
          .first()
          .click()
        const panel = page.getByRole('region', { name: '联系人', exact: true })
        await panel.locator('input').fill('应该被取消的草稿')
        const header = panel.locator('[data-popup-swipe-handle]')
        const box = await header.boundingBox()
        const scale = await page
          .locator('.brand-form-screen')
          .evaluate((el) => el.getBoundingClientRect().width / el.offsetWidth)
        const drag = async (distance) => {
          const b = await header.boundingBox()
          await page.mouse.move(b.x + b.width * 0.45, b.y + b.height / 2)
          await page.mouse.down()
          await page.mouse.move(b.x + b.width * 0.45, b.y + b.height / 2 + distance * scale, { steps: 5 })
          await page.mouse.up()
        }
        assert.ok(box)
        await drag(15)
        assert.equal(await panel.isVisible(), true)
        await drag(80)
        await panel.waitFor({ state: 'hidden' })
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.name), '已保存联系人')
        assert.equal(await page.evaluate(() => window.brandTest.form.value.measurements.nested), 0)
        assert.equal(await page.evaluate(() => window.brandTest.form.value.measurements.footer), 21)
        assert.deepEqual(errors, [])
      },
      { timeout: 90000 },
    )
  }
}

for (const brand of ['alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    test(
      `${brand} ${mode}: zoned calendar, virtual months, line drafts and every async popup close source`,
      async (t) => {
        const page = await browser.newPage({
          viewport: { width: 430, height: 900 },
          timezoneId: 'Europe/London',
          reducedMotion: 'reduce',
        })
        const pageErrors = []
        page.on('pageerror', (error) => pageErrors.push(error.message))
        t.after(async () => {
          await page.screenshot({ path: `${output}/${brand}-${mode}-zoned-calendar.png`, fullPage: true })
          await page.close()
        })
        await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/__brand-form?brand=${brand}&mode=${mode}`)
        await page.waitForFunction(() => Boolean(window.brandTest))
        const choose = async (name, option) => {
          await chooseDemoOption(page, name, option)
        }
        await choose('字段编辑方式', '弹层确认后保存')
        await page.waitForFunction(
          () => document.querySelectorAll('button.mp-field-presentation__reference').length > 3,
        )
        const dateRow = page.locator('.mp-form-item').filter({ has: page.locator('label', { hasText: '预约日期' }) })
        const openDate = async () => {
          await dateRow.locator('button.mp-field-presentation__reference').click()
          return page.locator('.mp-field-presentation__panel:visible')
        }
        await page.evaluate(() => {
          window.brandTest.form.value.calendarMode = 'scroll'
        })
        let panel = await openDate()
        const viewport = panel.locator('.mp-calendar-viewport')
        await viewport.waitFor()
        assert.equal(await viewport.getAttribute('data-total-months'), '120')
        assert.ok((await viewport.locator('[data-month]').count()) <= 5)
        await panel.locator('.mp-calendar-viewport__scroll').evaluate((element) => {
          element.scrollTop = 100 * 320
        })
        await page.waitForFunction(() => document.querySelector('.mp-calendar-viewport [data-month="2029-05"]'))
        assert.ok((await viewport.locator('[data-month]').count()) <= 5)
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.date), '2026-11-01')
        await panel.getByRole('button', { name: '关闭', exact: true }).click()
        await page.evaluate(() => {
          window.brandTest.form.value.calendarMode = 'line'
        })
        panel = await openDate()
        await panel.getByRole('button', { name: '2026-11-05', exact: true }).click()
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.date), '2026-11-01')
        await panel.getByRole('button', { name: '关闭', exact: true }).click()
        panel = await openDate()
        await panel.getByRole('button', { name: '2026-11-05', exact: true }).click()
        await panel.getByRole('button', { name: '确认', exact: true }).click()
        await page.waitForFunction(() => window.brandTest.form.value.model.date === '2026-11-05')
        await page.evaluate(() => {
          window.brandTest.form.value.calendarZone = 'America/New_York'
        })
        const instantRow = page
          .locator('.mp-form-item')
          .filter({ has: page.locator('label', { hasText: '跨时区预约' }) })
        await page.waitForFunction(() => document.body.textContent.includes('2026-10-31 23:30:00'))
        assert.ok((await instantRow.innerText()).includes('2026-10-31 23:30:00'))
        assert.equal(
          await page.evaluate(() => window.brandTest.form.value.model.zonedAppointment),
          Date.parse('2026-11-01T03:30:00Z'),
        )
        await page.evaluate(() => {
          window.brandTest.form.value.guardMode = 'reject'
          window.brandTest.form.value.guardedOpen = true
        })
        const dialog = page.getByRole('dialog', { name: '异步关闭验证', exact: true })
        await dialog.waitFor()
        await dialog.getByRole('textbox', { name: '关闭验证草稿' }).fill('保留我的草稿')
        for (const reason of ['close', 'api', 'model', 'escape', 'route', 'swipe', 'overlay']) {
          if (reason === 'close') {
            await dialog.getByRole('button', { name: '关闭弹层', exact: true }).click()
          }
          if (reason === 'api') {
            await dialog.getByRole('button', { name: '实例 close()', exact: true }).click()
          }
          if (reason === 'model') {
            await dialog.getByRole('button', { name: '外部设置 open=false', exact: true }).click()
          }
          if (reason === 'escape') {
            await page.keyboard.press('Escape')
          }
          if (reason === 'route') {
            await page.evaluate(() => window.dispatchEvent(new PopStateEvent('popstate')))
          }
          if (reason === 'swipe') {
            const box = await dialog.locator('[data-popup-swipe-handle]').boundingBox()
            await page.mouse.move(box.x + box.width / 2, box.y + 10)
            await page.mouse.down()
            await page.mouse.move(box.x + box.width / 2, box.y + 90, { steps: 6 })
            await page.mouse.up()
          }
          if (reason === 'overlay') {
            const overlay = page.locator('.mp-popup__overlay:visible').last()
            const box = await overlay.boundingBox()
            await overlay.click({ position: { x: box.width / 2, y: 5 } })
          }
          await page.waitForFunction(
            (reason) => document.body.textContent.includes(`${reason}：保留弹层和草稿`),
            reason,
          )
          assert.equal(await dialog.getByRole('textbox', { name: '关闭验证草稿' }).inputValue(), '保留我的草稿')
        }
        await page.evaluate(() => {
          window.brandTest.form.value.guardMode = 'error'
        })
        await dialog.getByRole('button', { name: '关闭弹层', exact: true }).click()
        await page.waitForFunction(() => document.body.textContent.includes('检查报错：保留弹层和草稿'))
        assert.ok(await dialog.isVisible())
        await page.evaluate(() => {
          window.brandTest.form.value.guardMode = 'allow'
        })
        await dialog.getByRole('button', { name: '关闭弹层', exact: true }).click()
        await dialog.waitFor({ state: 'hidden' })
        assert.deepEqual(pageErrors, [])
      },
      { timeout: 90000 },
    )
  }
}

for (const brand of ['alps', 'firefly']) {
  for (const mode of ['light', 'dark']) {
    test(`${brand} ${mode}: datetime range DST and endpoint locks`, async (t) => {
      const page = await browser.newPage({
        viewport: { width: 430, height: 900 },
        timezoneId: 'Pacific/Honolulu',
        reducedMotion: 'reduce',
      })
      const pageErrors = []
      page.on('pageerror', (error) => pageErrors.push(error.message))
      t.after(() => page.close())
      await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/__brand-form?brand=${brand}&mode=${mode}`)
      await page.waitForFunction(() => Boolean(window.brandTest))
      const choose = async (name, option) => {
        await chooseDemoOption(page, name, option)
      }
      await choose('字段编辑方式', '弹层确认后保存')
      await page.evaluate(() => {
        const f = window.brandTest.form.value
        f.calendarZone = 'America/New_York'
        f.calendarMode = 'scroll'
        f.rangeLock = 'start'
      })
      const rangeValue = () => page.evaluate(() => [...window.brandTest.form.value.model.tripRange])
      const initial = await rangeValue()
      const openField = async (label) => {
        await page
          .locator('.mp-form-item')
          .filter({ has: page.locator('label', { hasText: label }) })
          .locator('button.mp-field-presentation__reference, input[role=combobox]:not(:disabled)')
          .first()
          .click()
        const panel = page.getByRole('region', { name: label, exact: true })
        await panel.waitFor()
        return panel
      }
      let panel = await openField('行程起止')
      assert.equal(await panel.locator('.mp-date-range-picker__summaries').count(), 1)
      await panel.locator('.mp-calendar-viewport').getByRole('button', { name: '2026-11-03', exact: true }).click()
      assert.deepEqual(await rangeValue(), initial)
      await panel.getByRole('button', { name: '关闭', exact: true }).click()
      assert.deepEqual(await rangeValue(), initial)
      panel = await openField('行程起止')
      await panel.locator('.mp-calendar-viewport').getByRole('button', { name: '2026-11-03', exact: true }).click()
      await page.locator('.brand-form-screen').screenshot({ path: `${output}/${brand}-${mode}-datetime-range.png` })
      await panel.getByRole('button', { name: '确认', exact: true }).click()
      await panel.waitFor({ state: 'hidden' })
      assert.deepEqual(await rangeValue(), [initial[0], Date.parse('2026-11-03T15:00:00Z')])
      await page.evaluate(() => {
        window.brandTest.form.value.rangeLock = 'end'
      })
      panel = await openField('行程起止')
      assert.equal(await panel.locator('.mp-date-range-picker__summaries').count(), 1)
      await panel.locator('.mp-calendar-viewport').getByRole('button', { name: '2026-10-30', exact: true }).click()
      await panel.getByRole('button', { name: '确认', exact: true }).click()
      await panel.waitFor({ state: 'hidden' })
      const saved = [Date.parse('2026-10-30T14:30:00Z'), Date.parse('2026-11-03T15:00:00Z')]
      assert.deepEqual(await rangeValue(), saved)
      await page.evaluate(() => {
        window.brandTest.form.value.rangeLock = 'both'
      })
      assert.ok(
        await page
          .locator('.mp-form-item')
          .filter({ has: page.locator('label', { hasText: '行程起止' }) })
          .locator('input[role=combobox]')
          .first()
          .isDisabled(),
      )
      await page.evaluate(() => {
        window.brandTest.form.value.rangeLock = 'end'
        window.brandTest.form.value.calendarMode = 'line'
      })
      panel = await openField('行程起止')
      await page.evaluate(() => {
        window.brandTest.form.value.calendarZone = 'Asia/Shanghai'
      })
      await panel.getByText('22:30:00', { exact: true }).first().waitFor()
      assert.deepEqual(await rangeValue(), saved)
      await panel.getByRole('button', { name: '关闭', exact: true }).click()
      assert.deepEqual(await rangeValue(), saved)
      await page.evaluate(() => {
        const f = window.brandTest.form.value
        f.dateScenario = 'dst-fold-late'
        f.calendarMode = 'scroll'
        f.rangeLock = 'start'
      })
      panel = await openField('行程起止')
      await panel.locator('.mp-calendar-viewport').getByRole('button', { name: '2026-11-02', exact: true }).click()
      await panel.getByRole('button', { name: '确认', exact: true }).click()
      await panel.waitFor({ state: 'hidden' })
      assert.deepEqual(await rangeValue(), [Date.parse('2026-11-01T06:30:00Z'), Date.parse('2026-11-02T07:30:00Z')])
      await page.evaluate(() => {
        window.brandTest.form.value.calendarMode = 'line'
      })
      panel = await openField('跨时区预约')
      await page.evaluate(() => {
        window.brandTest.form.value.calendarZone = 'UTC'
      })
      await panel.getByText('06:30:00', { exact: true }).first().waitFor()
      await page.evaluate(() => {
        window.brandTest.form.value.calendarZone = 'America/New_York'
      })
      await panel.getByText('01:30:00', { exact: true }).first().waitFor()
      await panel.getByRole('button', { name: '确认', exact: true }).click()
      await panel.waitFor({ state: 'hidden' })
      assert.equal(
        await page.evaluate(() => window.brandTest.form.value.model.zonedAppointment),
        Date.parse('2026-11-01T06:30:00Z'),
      )
      for (const [scenario, nextTime, expected] of [
        ['dst-gap', '03:00', '2026-03-08T07:00:00Z'],
        ['dst-fold', '01:00', '2026-11-01T05:00:00Z'],
        ['dst-half-hour', '02:30', '2026-10-03T15:30:00Z'],
      ]) {
        await page.evaluate((scenario) => {
          window.brandTest.form.value.dateScenario = scenario
        }, scenario)
        await page.waitForFunction((scenario) => window.brandTest.form.value.dateScenario === scenario, scenario)
        panel = await openField('跨时区预约')
        const quick = panel.locator('.mp-date-picker__quick-time')
        if (scenario === 'dst-gap') {
          assert.equal(await quick.getByRole('option', { name: /^02:/ }).count(), 0)
        }
        if (scenario === 'dst-half-hour') {
          assert.equal(await quick.getByRole('option', { name: '02:00', exact: true }).count(), 0)
          assert.equal(await quick.getByRole('option', { name: '02:30', exact: true }).count(), 1)
        }
        const before = await page.evaluate(() => window.brandTest.form.value.model.zonedAppointment)
        await quick.getByRole('listbox').focus()
        await page.keyboard.press(scenario === 'dst-fold' ? 'ArrowUp' : 'ArrowDown')
        await page.waitForFunction(
          (next) =>
            [...document.querySelectorAll('.mp-date-picker__quick-time [aria-selected="true"]')].some(
              (el) => el.textContent.trim() === next,
            ),
          nextTime,
        )
        assert.equal(await page.evaluate(() => window.brandTest.form.value.model.zonedAppointment), before)
        await panel.getByRole('button', { name: '确认', exact: true }).click()
        await panel.waitFor({ state: 'hidden' })
        assert.equal(
          await page.evaluate(() => window.brandTest.form.value.model.zonedAppointment),
          Date.parse(expected),
        )
      }
      assert.deepEqual(pageErrors, [])
    })
  }
}

test('Duo presets update viewport, inset consumption and popup constraints together', { timeout: 90000 }, async () => {
  const page = await browser.newPage({ viewport: { width: 1100, height: 950 }, reducedMotion: 'reduce' })
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  try {
    await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/__brand-form?brand=alps`)
    const presets = [
      ['Duo 外屏竖屏', 'duo-outer-portrait', 382, 580, 618, 12, 72, 34],
      ['Duo 外屏横屏', 'duo-outer-landscape', 594, 368, 406, 72, 12, 21],
      ['Duo 内屏竖屏', 'duo-inner-portrait', 669, 867, 902, 12, 72, 20],
      ['Duo 内屏横屏', 'duo-inner-landscape', 951, 585, 620, 12, 72, 20],
      ['Duo 分屏左窗', 'duo-split-left', 385, 571, 609, 0, 72, 20],
      ['Duo 分屏右窗', 'duo-split-right', 385, 571, 609, 72, 0, 20],
    ]
    for (const [label, id, width, small, large, left, right, bottom] of presets) {
      await page.getByRole('button', { name: label, exact: true }).click()
      await page.waitForFunction(
        (id) => document.querySelector('.brand-form-screen')?.dataset.viewportPreset === id,
        id,
      )
      for (const [heightMode, height] of [
        ['small', small],
        ['large', large],
      ]) {
        await page.evaluate(async (mode) => {
          window.brandTest.form.value.viewportHeightMode = mode
          await window.brandTest.nextTick()
        }, heightMode)
        const actual = await page.locator('.brand-form-screen').evaluate((screen) => {
          const style = getComputedStyle(screen)
          const shell = getComputedStyle(screen.querySelector('.brand-form-shell'))
          return {
            width: screen.style.width,
            height: screen.style.height,
            maxHeight: style.getPropertyValue('--mp-field-presentation-viewport-max-height').trim(),
            left: shell.paddingLeft,
            right: shell.paddingRight,
            bottom: getComputedStyle(screen.querySelector('.brand-form-footer')).paddingBottom,
            nested: getComputedStyle(screen.querySelector('.brand-form-footer-nested')).paddingBottom,
          }
        })
        assert.deepEqual(
          actual,
          {
            width: `${width}px`,
            height: `${height}px`,
            maxHeight: `${height}px`,
            left: `${left}px`,
            right: `${right}px`,
            bottom: `${bottom}px`,
            nested: '0px',
          },
          `${label} ${heightMode}`,
        )
      }
    }
    await page.getByRole('button', { name: 'Duo 左侧避让（模拟）', exact: true }).click()
    assert.equal(await page.locator('.brand-form-screen').evaluate((el) => el.style.width), '385px')
    await page.getByRole('button', { name: '四边归零', exact: true }).click()
    assert.equal(await page.locator('.brand-form-screen').evaluate((el) => el.style.width), '385px')
    await page.getByRole('button', { name: 'Duo 内屏横屏', exact: true }).click()
    await page.screenshot({ path: `${output}/duo-inner-landscape.png`, fullPage: true })
    assert.deepEqual(pageErrors, [])
  } finally {
    await page.close()
  }
})
