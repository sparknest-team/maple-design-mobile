import { createSSRApp, h, nextTick, ref, Teleport } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('a nested form does not inherit the enclosing form error description', async () => {
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { outer: '' }, editMode: 'direct' },
    slots: {
      default: () =>
        h(FormItem, { field: 'outer', label: 'Outer' }, () => [
          h(Input),
          h(Form, { model: { inner: '' }, editMode: 'direct' }, () =>
            h(FormItem, { field: 'inner', noStyle: true }, () => h(Input)),
          ),
        ]),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ outer: { message: 'Outer error' } })
    await nextTick()
    const inputs = wrapper.findAll('input')
    const outerId = inputs[0].attributes('aria-describedby')
    expect(document.getElementById(outerId ?? '')?.textContent).toContain('Outer error')
    expect(inputs[1].attributes('aria-describedby')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('a nested form keeps its own error description', async () => {
  const inner = ref<any>()
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { outer: '' }, editMode: 'direct' },
    slots: {
      default: () =>
        h(FormItem, { field: 'outer', label: 'Outer' }, () => [
          h(Input),
          h(Form, { ref: inner, model: { inner: '' }, editMode: 'direct' }, () =>
            h(FormItem, { label: 'Inner' }, () => h(FormItem, { field: 'inner', noStyle: true }, () => h(Input))),
          ),
        ]),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ outer: { message: 'Outer error' } })
    inner.value.setFields({ inner: { message: 'Inner error' } })
    await nextTick()
    const inputs = wrapper.findAll('input')
    const outer = inputs[0].attributes('aria-describedby')
    const innerId = inputs[1].attributes('aria-describedby')
    expect(innerId).toBeTruthy()
    expect(innerId).not.toBe(outer)
    expect(document.getElementById(innerId ?? '')?.textContent).toContain('Inner error')
  } finally {
    wrapper.unmount()
  }
})

test('a teleported nested form remains an error-description boundary', async () => {
  const target = document.createElement('div')
  document.body.append(target)
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { outer: '' }, editMode: 'direct' },
    slots: {
      default: () =>
        h(FormItem, { field: 'outer', label: 'Outer' }, () => [
          h(Input),
          h(Teleport, { to: target }, [
            h(Form, { model: { inner: '' }, editMode: 'direct' }, () =>
              h(FormItem, { field: 'inner', noStyle: true }, () => h(Input)),
            ),
          ]),
        ]),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ outer: { message: 'Outer error' } })
    await nextTick()
    expect(wrapper.get('input').attributes('aria-describedby')).toBeTruthy()
    expect(target.querySelector('input')?.getAttribute('aria-describedby')).toBeNull()
  } finally {
    wrapper.unmount()
    target.remove()
  }
})

test('an inner form error is not reported by the enclosing item', async () => {
  const inner = ref<any>()
  const target = document.createElement('div')
  document.body.append(target)
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { outer: '' }, editMode: 'direct' },
    slots: {
      default: () =>
        h(FormItem, { field: 'outer', label: 'Outer' }, () => [
          h(Input),
          h(Teleport, { to: target }, [
            h(Form, { ref: inner, model: { inner: '' }, editMode: 'direct' }, () =>
              h(FormItem, { field: 'inner', noStyle: true }, () => h(Input)),
            ),
          ]),
        ]),
    },
  })
  try {
    inner.value.setFields({ inner: { message: 'Inner error' } })
    await nextTick()
    expect(wrapper.text()).not.toContain('Inner error')
    expect(wrapper.get('input').attributes('aria-describedby')).toBeUndefined()
  } finally {
    wrapper.unmount()
    target.remove()
  }
})

test('a direct control in a nested form does not inherit the outer item state', async () => {
  const innerDisabled = ref(false)
  const target = document.createElement('div')
  document.body.append(target)
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { outer: '' }, editMode: 'direct' },
    slots: {
      default: () =>
        h(FormItem, { field: 'outer', label: 'Outer', disabled: true }, () => [
          h(Input),
          h(Teleport, { to: target }, [
            h(Form, { model: {}, editMode: 'direct', disabled: innerDisabled.value }, () => h(Input)),
          ]),
        ]),
    },
  })
  try {
    ;(wrapper.vm as any).setFields({ outer: { message: 'Outer error' } })
    await nextTick()
    expect((wrapper.get('input').element as HTMLInputElement).disabled).toBe(true)
    const inner = target.querySelector('input')!
    expect(inner.disabled).toBe(false)
    expect(inner.getAttribute('aria-invalid')).not.toBe('true')
    expect(inner.getAttribute('aria-describedby')).toBeNull()
    innerDisabled.value = true
    await nextTick()
    expect(inner.disabled).toBe(true)
  } finally {
    wrapper.unmount()
    target.remove()
  }
})

test('SSR hydrates direct controls in a teleported nested form without inheriting outer state', async () => {
  const target = document.createElement('div')
  target.id = 'nested-form-hydration-target'
  document.body.append(target)
  const Fixture = {
    render: () =>
      h(Form, { model: { outer: '' }, editMode: 'direct' }, () =>
        h(FormItem, { field: 'outer', label: 'Outer', disabled: true }, () => [
          h(Input),
          h(Teleport, { to: '#nested-form-hydration-target' }, [
            h(Form, { model: {}, editMode: 'direct' }, () => h(Input)),
          ]),
        ]),
      ),
  }
  const context: { teleports?: Record<string, string> } = {}
  const html = await renderToString(createSSRApp(Fixture), context)
  target.innerHTML = context.teleports?.['#nested-form-hydration-target'] || ''
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  const outer = container.querySelector('input')!
  const inner = target.querySelector('input')!
  expect(outer.disabled).toBe(true)
  expect(inner.disabled).toBe(false)
  const app = createSSRApp(Fixture)
  const warnings: string[] = []
  app.config.warnHandler = (message) => warnings.push(message)
  const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    app.mount(container)
    expect(container.querySelector('input')).toBe(outer)
    expect(target.querySelector('input')).toBe(inner)
    expect(inner.disabled).toBe(false)
    expect(warnings).toEqual([])
    expect(errors).not.toHaveBeenCalled()
  } finally {
    app.unmount()
    errors.mockRestore()
    target.remove()
    container.remove()
  }
})
