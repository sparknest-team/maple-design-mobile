import { createSSRApp, h, nextTick, ref } from 'vue'
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
