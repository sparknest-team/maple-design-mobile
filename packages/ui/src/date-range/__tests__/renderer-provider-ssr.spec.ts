import { createSSRApp, h, nextTick } from 'vue'
import { expect, test } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import DatePicker from '../../date/DatePicker.vue'
import DateRangePicker from '../DateRangePicker.vue'

test.each([
  ['range picker', DateRangePicker, {}],
  ['date picker range', DatePicker, { range: true }],
])('hydrates %s with selected dates intact', async (_name, component, extra) => {
  const warnings: string[] = []
  const create = () => {
    const app = createSSRApp({
      render: () =>
        h(component as any, {
          ...extra,
          presentation: 'calendar',
          modelValue: ['2026-11-12', '2026-11-16'],
          pickerValue: ['2026-11-01', '2026-11-01'],
        }),
    })
    app.config.warnHandler = (message) => warnings.push(message)
    return app
  }
  const html = await renderToString(create())
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const firstButton = container.querySelector('button')
  const app = create()
  try {
    app.mount(container)
    await nextTick()
    expect(container.querySelector('button')).toBe(firstButton)
    expect(container.textContent).toContain('2026')
    expect(container.textContent).toContain('12')
    expect(container.textContent).toContain('16')
    expect(warnings).toEqual([])
  } finally {
    app.unmount()
    container.remove()
  }
})
