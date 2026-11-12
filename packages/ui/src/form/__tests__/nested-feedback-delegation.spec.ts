import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test.each(['vertical', 'horizontal'] as const)(
  'nested no-style errors follow the visible owner across switches and unmount (%s)',
  async (layout) => {
    const noStyle = ref(true)
    const showFirst = ref(true)
    const wrapper = mount(Form, {
      attachTo: document.body,
      props: { editMode: 'direct', layout, model: { first: '', second: '' } },
      slots: {
        default: () =>
          h(FormItem, { label: 'Outer' }, () =>
            h(FormItem, { noStyle: noStyle.value, label: 'Middle' }, () => [
              showFirst.value ? h(FormItem, { field: 'first', noStyle: true }, () => h(Input)) : null,
              h(FormItem, { field: 'second', noStyle: true }, () => h(Input)),
            ]),
          ),
      },
    })
    try {
      ;(wrapper.vm as any).setFields({ first: { message: 'First error' }, second: { message: 'Second error' } })
      await nextTick()
      const first = wrapper.findAll('input')[0].element
      first.focus()
      expect(document.activeElement).toBe(first)
      expect(wrapper.text()).toContain('First error')
      expect(wrapper.text()).toContain('Second error')
      const described = first.getAttribute('aria-describedby')!
      expect(document.getElementById(described)?.textContent).toContain('First error')
      noStyle.value = false
      await nextTick()
      expect(wrapper.findAll('input')[0].element).toBe(first)
      expect(document.activeElement).toBe(first)
      expect(document.getElementById(first.getAttribute('aria-describedby')!)?.textContent).toContain('First error')
      showFirst.value = false
      await nextTick()
      const second = wrapper.get('input').element
      expect(wrapper.text()).not.toContain('First error')
      expect(document.getElementById(second.getAttribute('aria-describedby')!)?.textContent).toContain('Second error')
      noStyle.value = true
      await nextTick()
      expect(document.getElementById(second.getAttribute('aria-describedby')!)?.textContent).toContain('Second error')
      ;(wrapper.vm as any).clearValidate()
      await nextTick()
      expect(second.getAttribute('aria-describedby')).toBeNull()
      expect(wrapper.text()).not.toContain('Second error')
    } finally {
      wrapper.unmount()
    }
  },
)

test('read-pretty no-style fields do not delegate hidden errors', async () => {
  const readPretty = ref(false)
  const wrapper = mount(Form, {
    props: { model: { field: '' } },
    slots: {
      default: () =>
        h(FormItem, { label: 'Outer' }, () =>
          h(FormItem, { field: 'field', noStyle: true, readPretty: readPretty.value }, () => h(Input)),
        ),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ field: { message: 'Hidden error' } })
    await nextTick()
    expect(wrapper.text()).toContain('Hidden error')
    readPretty.value = true
    await nextTick()
    expect(wrapper.text()).not.toContain('Hidden error')
    readPretty.value = false
    await nextTick()
    ;(wrapper.vm as any).setFields({ field: { message: 'Hidden error' } })
    await nextTick()
    expect(wrapper.text()).toContain('Hidden error')
  } finally {
    wrapper.unmount()
  }
})

test('nested forms do not delegate errors to an enclosing form item', async () => {
  const inner = ref<any>()
  const wrapper = mount(Form, {
    props: { model: {} },
    slots: {
      default: () =>
        h(FormItem, { label: 'Outer' }, () =>
          h(Form, { ref: inner, model: { field: '' } }, () =>
            h(FormItem, { label: 'Inner' }, () => h(FormItem, { field: 'field', noStyle: true }, () => h(Input))),
          ),
        ),
    },
  })
  try {
    inner.value.setFields({ field: { message: 'Inner error' } })
    await nextTick()
    const feedback = wrapper.findAll('[data-form-item-feedback]')
    expect(feedback).toHaveLength(2)
    expect(feedback[0].text()).toContain('Inner error')
    expect(feedback[1].text()).not.toContain('Inner error')
  } finally {
    wrapper.unmount()
  }
})

test('SSR hydration retains nested inputs and connects later errors', async () => {
  const { createSSRApp, defineComponent } = await import('vue')
  const { renderToString } = await import('@vue/server-renderer')
  const form = ref<any>()
  const Fixture = defineComponent({
    setup: () => () =>
      h(Form, { ref: form, model: { field: '' }, layout: 'horizontal' }, () =>
        h(FormItem, { label: 'Outer' }, () =>
          h(FormItem, { noStyle: true }, () => h(FormItem, { field: 'field', noStyle: true }, () => h(Input))),
        ),
      ),
  })
  const html = await renderToString(createSSRApp(Fixture))
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const before = container.querySelector('input')
  expect(before).toBeTruthy()
  const app = createSSRApp(Fixture)
  const warnings: string[] = []
  app.config.warnHandler = (message) => warnings.push(message)
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    app.mount(container)
    expect(container.querySelector('input')).toBe(before)
    expect(warnings).toEqual([])
    expect(consoleError).not.toHaveBeenCalled()
    form.value.setFields({ field: { message: 'Hydrated error' } })
    await nextTick()
    const id = before!.getAttribute('aria-describedby')!
    expect(document.getElementById(id)?.textContent).toContain('Hydrated error')
  } finally {
    app.unmount()
    container.remove()
    consoleError.mockRestore()
  }
})
