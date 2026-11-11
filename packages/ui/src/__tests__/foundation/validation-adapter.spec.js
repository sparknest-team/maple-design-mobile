import { h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '../../form'

test('FormItem ignores an older async failure after a newer success and after reset', async () => {
  const completions = [],
    model = reactive({ name: 'old' }),
    form = ref()
  const maple = Form.name.startsWith('Mp')
  const rules = maple
    ? [() => new Promise((resolve) => completions.push((message) => resolve(message ?? true)))]
    : [
        {
          validator: (value, callback) => {
            completions.push(callback)
          },
        },
      ]
  const wrapper = mount({
    render: () =>
      h(Form, { model, ref: form }, { default: () => h(FormItem, { field: 'name', rules }, () => h('input')) }),
  })
  try {
    await nextTick()
    const first = form.value.validate()
    await nextTick()
    model.name = 'new'
    await nextTick()
    const second = form.value.validate()
    await nextTick()
    completions[1]()
    await second
    completions[0]('obsolete error')
    await first
    await nextTick()
    expect(wrapper.text()).not.toContain('obsolete error')
    const pending = form.value.validate()
    await nextTick()
    form.value.clearValidate()
    completions[2]('reset error')
    await pending
    await nextTick()
    expect(wrapper.text()).not.toContain('reset error')
  } finally {
    wrapper.unmount()
  }
})
