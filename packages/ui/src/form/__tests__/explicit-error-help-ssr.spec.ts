import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, test, vi } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test.each(['prop', 'slot'] as const)(
  'explicit error help (%s) describes the field on SSR and after hydration',
  async (mode) => {
    const form = ref<any>()
    const status = ref<'error' | 'success'>('error')
    const showHelp = ref(true)
    const Fixture = defineComponent({
      setup: () => () =>
        h(Form, { ref: form, editMode: 'direct', model: { name: '' } }, () =>
          h(
            FormItem,
            {
              field: 'name',
              extra: 'Persistent guidance',
              validateStatus: status.value,
              help: mode === 'prop' && showHelp.value ? 'Server error' : undefined,
            },
            {
              default: () => h(Input, { 'aria-describedby': 'external' }),
              ...(mode === 'slot' && showHelp.value ? { help: () => h('strong', 'Server error') } : {}),
            },
          ),
        ),
    })
    const html = await renderToString(createSSRApp(Fixture))
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.append(container)
    const input = container.querySelector('input')!
    const errorId = input
      .getAttribute('aria-describedby')
      ?.split(/\s+/)
      .find((id) => id !== 'external')
    expect(errorId).toBeTruthy()
    expect(Array.from(container.querySelectorAll('[id]')).filter((el) => el.id === errorId)).toHaveLength(1)
    expect(document.getElementById(errorId!)?.textContent).toContain('Server error')
    const warnings: string[] = []
    const app = createSSRApp(Fixture)
    app.config.warnHandler = (message) => warnings.push(message)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      app.mount(container)
      expect(container.querySelector('input')).toBe(input)
      expect(warnings).toEqual([])
      expect(consoleError).not.toHaveBeenCalled()
      form.value.setFields({ name: { message: 'Validation error' } })
      await nextTick()
      const currentId = input
        .getAttribute('aria-describedby')!
        .split(/\s+/)
        .find((id) => id !== 'external')!
      expect(document.getElementById(currentId)?.textContent).toContain('Validation error')
      expect(currentId).not.toBe(errorId)
      form.value.clearValidate()
      await nextTick()
      expect(Array.from(container.querySelectorAll('[id]')).filter((el) => el.id === errorId)).toHaveLength(1)
      expect(input.getAttribute('aria-describedby')?.split(/\s+/)).toContain(errorId)
      status.value = 'success'
      await nextTick()
      expect(input.getAttribute('aria-describedby')).toBe('external')
      status.value = 'error'
      await nextTick()
      expect(input.getAttribute('aria-describedby')?.split(/\s+/)).toContain(errorId)
      showHelp.value = false
      await nextTick()
      expect(input.getAttribute('aria-describedby')).toBe('external')
      status.value = 'success'
      await nextTick()
      expect(input.getAttribute('aria-describedby')).toBe('external')
    } finally {
      app.unmount()
      container.remove()
      consoleError.mockRestore()
    }
  },
)
