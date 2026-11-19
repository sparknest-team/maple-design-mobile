import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('a read-pretty no-style field delegates only its current visible error', async () => {
  const pretty = ref(false)
  const wrapper = mount(Form, {
    props: { model: { account: '', email: '' }, editMode: 'direct' },
    slots: {
      default: () =>
        h(FormItem, { label: 'Contact' }, () => [
          h(FormItem, { field: 'account', noStyle: true, readPretty: pretty.value }, () => h(Input)),
          h(FormItem, { field: 'email', noStyle: true }, () => h(Input, { id: 'contact-email' })),
        ]),
    },
  })
  try {
    const form = wrapper.vm
    form.setFields({ account: { message: 'Account required' }, email: { message: 'Email required' } })
    await nextTick()
    const description = () => {
      const id = wrapper.get('input#contact-email').attributes('aria-describedby')
      return wrapper.get('[id="' + id + '"]').text()
    }
    expect(description()).toContain('Account required')
    pretty.value = true
    await nextTick()
    expect(description()).toContain('Email required')
    expect(description()).not.toContain('Account required')
    form.setFields({ account: { message: 'Account updated' } })
    await nextTick()
    expect(description()).not.toContain('Account updated')
    pretty.value = false
    await nextTick()
    expect(description()).not.toContain('Account updated')
    form.setFields({ account: { message: 'New validation error' } })
    await nextTick()
    expect(description()).toContain('New validation error')
    expect(description()).toContain('Email required')
  } finally {
    wrapper.unmount()
  }
})
