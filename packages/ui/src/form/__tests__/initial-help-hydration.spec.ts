import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test, vi } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('SSR help hydrates before validation feedback takes ownership', async () => {
  const form = ref<any>()
  const Fixture = defineComponent({
    setup: () => () =>
      h('main', [
        h('span', { id: 'external-help' }, 'External help'),
        h(Form, { ref: form, editMode: 'direct', model: { name: '' } }, () =>
          h(FormItem, { field: 'name', label: 'Name', help: 'Initial help' }, () =>
            h(Input, { 'aria-describedby': 'external-help' }),
          ),
        ),
        h('button', { id: 'sibling' }, 'Sibling'),
      ]),
  })
  const html = await renderToString(createSSRApp(Fixture))
  expect(html).toContain('Initial help')
  expect(html).not.toMatch(/<template\b/i)
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const input = container.querySelector('input')!
  const sibling = container.querySelector('#sibling')!
  expect(input).toBeTruthy()
  const warnings: string[] = []
  const errors: unknown[] = []
  const app = createSSRApp(Fixture)
  app.config.warnHandler = (message) => warnings.push(message)
  app.config.errorHandler = (error) => errors.push(error)
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    app.mount(container)
    expect(container.querySelector('input')).toBe(input)
    expect(container.querySelector('#sibling')).toBe(sibling)
    expect(warnings).toEqual([])
    expect(errors).toEqual([])
    expect(consoleError).not.toHaveBeenCalled()
    form.value.setFields({ name: { message: 'Invalid name' } })
    await nextTick()
    const ids = input.getAttribute('aria-describedby')!.split(/\s+/)
    expect(ids).toContain('external-help')
    expect(ids.some((id) => document.getElementById(id)?.textContent?.includes('Invalid name'))).toBe(true)
    form.value.clearValidate()
    await nextTick()
    expect(input.getAttribute('aria-describedby')).toBe('external-help')
  } finally {
    app.unmount()
    container.remove()
    consoleError.mockRestore()
  }
})

test('SSR explicit error status associates the initial help through hydration and later validation', async () => {
  const form = ref<any>()
  const Fixture = defineComponent({
    setup: () => () =>
      h('main', [
        h('span', { id: 'external-help' }, 'External help'),
        h(Form, { ref: form, editMode: 'direct', model: { name: '' } }, () =>
          h(FormItem, { field: 'name', label: 'Name', validateStatus: 'error', help: 'Initial error help' }, () =>
            h(Input, { 'aria-describedby': 'external-help' }),
          ),
        ),
        h('button', { id: 'sibling' }, 'Sibling'),
      ]),
  })
  const html = await renderToString(createSSRApp(Fixture))
  expect(html).toContain('Initial error help')
  expect(html).not.toMatch(/<template\b/i)
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const input = container.querySelector('input')!
  const sibling = container.querySelector('#sibling')!
  const describedText = () =>
    (input.getAttribute('aria-describedby') || '').split(/\s+/).map((id) => document.getElementById(id)?.textContent)
  expect(describedText()).toContain('Initial error help')
  expect(describedText()).toContain('External help')
  const warnings: string[] = []
  const errors: unknown[] = []
  const app = createSSRApp(Fixture)
  app.config.warnHandler = (message) => warnings.push(message)
  app.config.errorHandler = (error) => errors.push(error)
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    app.mount(container)
    expect(container.querySelector('input')).toBe(input)
    expect(container.querySelector('#sibling')).toBe(sibling)
    expect(describedText()).toContain('Initial error help')
    form.value.setFields({ name: { message: 'Invalid name' } })
    await nextTick()
    expect(describedText()).toContain('External help')
    expect(describedText()).toContain('Invalid name')
    form.value.clearValidate()
    await nextTick()
    expect(describedText()).toContain('Initial error help')
    expect(warnings).toEqual([])
    expect(errors).toEqual([])
    expect(consoleError).not.toHaveBeenCalled()
  } finally {
    app.unmount()
    container.remove()
    consoleError.mockRestore()
  }
})
