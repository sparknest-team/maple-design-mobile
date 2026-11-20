import { createSSRApp, h, KeepAlive, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('a dynamic no-style field follows its owning visible error through both directions', async () => {
  const noStyle = ref(true)
  const description = ref('first-help')
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { outer: '', inner: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'outer', label: 'Outer' }, () =>
          h(FormItem, { field: 'inner', noStyle: noStyle.value, label: 'Inner' }, () =>
            h(Input, { 'aria-describedby': description.value }),
          ),
        ),
    },
  })
  try {
    const form = wrapper.vm as any
    const input = () => wrapper.get('input')
    const expectDescription = (message: string, help: string) => {
      const ids = input().attributes('aria-describedby')!.split(/\s+/)
      expect(ids).toHaveLength(2)
      expect(ids[0]).toBe(help)
      expect(wrapper.get(`[id="${ids[1]}"]`).text()).toContain(message)
      return ids[1]
    }
    form.setFields({ outer: { message: 'Outer error' }, inner: { message: 'Inner error' } })
    await nextTick()
    const outerId = expectDescription('Outer error', 'first-help')
    noStyle.value = false
    await nextTick()
    const innerId = expectDescription('Inner error', 'first-help')
    expect(innerId).not.toBe(outerId)
    description.value = 'second-help'
    await nextTick()
    expect(expectDescription('Inner error', 'second-help')).toBe(innerId)
    noStyle.value = true
    await nextTick()
    expect(expectDescription('Outer error', 'second-help')).toBe(outerId)
    form.clearValidate()
    await nextTick()
    expect(input().attributes('aria-describedby')).toBe('second-help')
  } finally {
    wrapper.unmount()
  }
})

test.each([true, false])('SSR does not reference a missing error message with noStyle=%s', async (noStyle) => {
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(
          Form,
          { editMode: 'direct', model: { outer: '', inner: '' } },
          {
            default: () =>
              h(FormItem, { field: 'outer', validateStatus: 'error' }, () =>
                h(FormItem, { field: 'inner', noStyle, validateStatus: 'error' }, () =>
                  h(Input, { 'aria-describedby': 'external' }),
                ),
              ),
          },
        ),
    }),
  )
  expect(html).toContain('aria-describedby="external"')
  expect(html).not.toContain('mp-form-error-')
  expect(html).not.toContain('role="alert"')
})

test('reusing and unmounting a field does not expose its previous error to another field', async () => {
  const field = ref('first')
  const shown = ref(true)
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { first: '', second: '' } },
    slots: {
      default: () =>
        shown.value ? h(FormItem, { field: field.value }, () => h(Input, { 'aria-describedby': 'help' })) : null,
    },
  })
  try {
    const form = wrapper.vm as any
    const input = () => wrapper.get('input')
    form.setFields({ first: { message: 'First error' } })
    await nextTick()
    const firstId = input().attributes('aria-describedby')!.split(/\s+/)[1]
    expect(wrapper.get(`[id="${firstId}"]`).text()).toContain('First error')
    field.value = 'second'
    await nextTick()
    expect(input().attributes('aria-describedby')).toBe('help')
    expect(wrapper.text()).not.toContain('First error')
    form.setFields({ second: { message: 'Second error' } })
    await nextTick()
    const secondId = input().attributes('aria-describedby')!.split(/\s+/)[1]
    expect(wrapper.get(`[id="${secondId}"]`).text()).toContain('Second error')
    shown.value = false
    await nextTick()
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.find(`[id="${secondId}"]`).exists()).toBe(false)
    shown.value = true
    await nextTick()
    expect(input().attributes('aria-describedby')).toBe('help')
  } finally {
    wrapper.unmount()
  }
})

test('unmounting a no-style subtree clears every delegated source for the same field', async () => {
  const visible = ref(true)
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { shared: '', kept: '' } },
    slots: {
      default: () =>
        h(FormItem, { label: 'Outer' }, () => [
          h(FormItem, { field: 'kept', noStyle: true }, () => h(Input)),
          visible.value &&
            h(FormItem, { field: 'shared', noStyle: true }, () =>
              h(FormItem, { field: 'shared', noStyle: true }, () => h(Input)),
            ),
        ]),
    },
  })
  try {
    const form = wrapper.vm as any
    form.setFields({ kept: { message: 'Remaining error' }, shared: { message: 'Removed error' } })
    await nextTick()
    const describedText = () => {
      const id = wrapper.get('input').attributes('aria-describedby')
      expect(id).toBeTruthy()
      return wrapper.get(`[id="${id}"]`).text()
    }
    expect(describedText()).toContain('Removed error')
    visible.value = false
    await nextTick()
    expect(describedText()).toContain('Remaining error')
    expect(describedText()).not.toContain('Removed error')
    form.clearValidate('kept')
    await nextTick()
    expect(wrapper.get('input').attributes('aria-describedby')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('cached no-style feedback follows the active field and restores its latest error', async () => {
  const shown = ref(true)
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { kept: '', cached: '' } },
    slots: {
      default: () =>
        h(FormItem, { label: 'Outer' }, () => [
          h(FormItem, { field: 'kept', noStyle: true }, () => h(Input)),
          h(KeepAlive, null, () =>
            shown.value ? h(FormItem, { field: 'cached', noStyle: true }, () => h(Input)) : null,
          ),
        ]),
    },
  })
  try {
    const form = wrapper.vm as any
    const description = () => {
      const id = wrapper.get('input').attributes('aria-describedby')
      return id ? wrapper.get(`[id="${id}"]`).text() : ''
    }
    form.setFields({ kept: { message: 'Kept error' }, cached: { message: 'First error' } })
    await nextTick()
    expect(description()).toContain('First error')
    shown.value = false
    await nextTick()
    expect(description()).toBe('Kept error')
    form.setFields({ cached: { message: 'New error' } })
    await nextTick()
    expect(description()).toBe('Kept error')
    form.clearValidate('kept')
    await nextTick()
    expect(wrapper.get('input').attributes('aria-describedby')).toBeUndefined()
    shown.value = true
    await nextTick()
    expect(description()).toBe('New error')
    form.clearValidate()
    await nextTick()
    expect(description()).toBe('')
  } finally {
    wrapper.unmount()
  }
})
