import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test, vi } from 'vitest'
import Checkbox, { CheckboxGroup } from '../../checkbox'
import DateRange from '../../date-range'
import Radio, { RadioGroup } from '../../radio'
import Rate from '../../rate'
import Slider from '../../slider'
import Switch from '../../switch'
import TimeRange from '../../time-range'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const cases = [
  ['checkbox', Checkbox, 'input[type=checkbox]', {}],
  ['radio', Radio, 'input[type=radio]', { value: 'a' }],
  ['checkbox group', CheckboxGroup, '[role=group]', { options: [{ label: 'A', value: 'a' }] }],
  ['radio group', RadioGroup, '[role=radiogroup]', { options: [{ label: 'A', value: 'a' }] }],
  ['switch', Switch, '[role=switch]', {}],
  ['slider', Slider, '[role=slider]', {}],
  ['rate', Rate, '[role=slider]', {}],
] as const

test.each(cases)(
  '%s exposes explicit error help through its SSR and hydrated interactive target',
  async (_name, Component, selector, props) => {
    const status = ref<'error' | 'success'>('error')
    const Fixture = defineComponent({
      setup: () => () =>
        h(Form, { editMode: 'direct', model: { value: null } }, () =>
          h(FormItem, { field: 'value', label: 'Value', validateStatus: status.value, help: 'Explicit error' }, () =>
            h(Component as any, { ...props, editMode: 'direct', 'aria-describedby': 'external' }),
          ),
        ),
    })
    const html = await renderToString(createSSRApp(Fixture))
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.append(container)
    const target = container.querySelector(selector)!
    expect(target).toBeTruthy()
    const id = target
      .getAttribute('aria-describedby')
      ?.split(/\s+/)
      .find((v) => v !== 'external')
    expect(id).toBeTruthy()
    expect(document.getElementById(id!)?.textContent).toContain('Explicit error')
    const app = createSSRApp(Fixture)
    const warnings: string[] = []
    app.config.warnHandler = (message) => warnings.push(message)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      app.mount(container)
      expect(container.querySelector(selector)).toBe(target)
      expect(warnings).toEqual([])
      expect(consoleError).not.toHaveBeenCalled()
      const ids = target.getAttribute('aria-describedby')!.split(/\s+/)
      expect(ids).toContain('external')
      expect(ids).toContain(id)
      if (_name.endsWith('group')) {
        container
          .querySelectorAll('input')
          .forEach((input) => expect(input.getAttribute('aria-describedby')?.split(/\s+/) ?? []).not.toContain(id))
      }
      status.value = 'success'
      await nextTick()
      expect(target.getAttribute('aria-describedby')?.split(/\s+/)).not.toContain(id)
      expect(target.getAttribute('aria-describedby')?.split(/\s+/)).toContain('external')
      status.value = 'error'
      await nextTick()
      expect(target.getAttribute('aria-describedby')?.split(/\s+/)).toContain(id)
    } finally {
      app.unmount()
      container.remove()
      consoleError.mockRestore()
    }
  },
)

// Range hydration has a separately tracked mismatch; this checks server output only.
test.each([
  ['date range', DateRange],
  ['time range', TimeRange],
] as const)('%s includes explicit error help on both server-rendered endpoints', async (_name, Component) => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(Form, { editMode: 'direct', model: { value: null } }, () =>
          h(FormItem, { field: 'value', label: 'Value', validateStatus: 'error', help: 'Explicit error' }, () =>
            h(Component as any, { editMode: 'direct', 'aria-describedby': 'external' }),
          ),
        ),
    }),
  )
  const container = document.createElement('div')
  container.innerHTML = html
  const inputs = container.querySelectorAll('[role=group] input')
  expect(inputs).toHaveLength(2)
  for (const input of Array.from(inputs)) {
    const ids = input.getAttribute('aria-describedby')?.split(/\s+/) ?? []
    expect(ids).toContain('external')
    const id = ids.find((value) => value !== 'external')
    expect(id).toBeTruthy()
    expect(container.querySelector(`[id="${id}"]`)?.textContent).toContain('Explicit error')
  }
})
