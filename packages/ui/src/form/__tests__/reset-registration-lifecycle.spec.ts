import { h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('a deliberately removed and later re-added field captures the current model value', async () => {
  const model = reactive({ value: 'original' })
  const visible = ref(true)
  const owner = mount({
    setup: () => () =>
      h(Form, { model }, () => (visible.value ? h(FormItem, { field: 'value' }, () => h('input')) : null)),
  })
  try {
    model.value = 'edited'
    visible.value = false
    await nextTick()
    visible.value = true
    await nextTick()
    model.value = 'edited again'
    owner.getComponent(Form).vm.resetFields()
    await nextTick()
    expect(model.value).toBe('edited')
  } finally {
    owner.unmount()
  }
})

test('two simultaneously mounted items can capture different reset baselines for the same field', async () => {
  const model = reactive({ value: 'original' })
  const second = ref(false)
  const first = ref(true)
  const owner = mount({
    setup: () => () =>
      h(Form, { model }, () => [
        first.value ? h(FormItem, { field: 'value', key: 'first' }, () => h('input')) : null,
        second.value ? h(FormItem, { field: 'value', key: 'second' }, () => h('input')) : null,
      ]),
  })
  try {
    model.value = 'edited'
    second.value = true
    await nextTick()
    first.value = false
    await nextTick()
    model.value = 'edited again'
    owner.getComponent(Form).vm.resetFields()
    await nextTick()
    expect(model.value).toBe('edited')
  } finally {
    owner.unmount()
  }
})

test('a keyed subtree replaced during a layout change captures a new reset baseline', async () => {
  const model = reactive({ value: 'original' })
  const version = ref(0)
  const owner = mount({
    setup: () => () =>
      h(Form, { model }, () =>
        h(FormItem, { label: 'Layout', noStyle: Boolean(version.value) }, () =>
          h('section', { key: version.value }, [
            h(FormItem, { field: 'value', key: 'unchanged-field-key' }, () => h('input')),
          ]),
        ),
      ),
  })
  try {
    model.value = 'replacement baseline'
    version.value++
    await nextTick()
    model.value = 'later edit'
    owner.getComponent(Form).vm.resetFields()
    await nextTick()
    expect(model.value).toBe('replacement baseline')
  } finally {
    owner.unmount()
  }
})

test.each([false, true])('a field on the layout owner keeps its baseline when noStyle starts at %s', async (initial) => {
  const model = reactive({ value: 'original' })
  const noStyle = ref(initial)
  const owner = mount({
    setup: () => () =>
      h(Form, { model }, () => h(FormItem, { field: 'value', noStyle: noStyle.value }, () => h('input'))),
  })
  try {
    model.value = 'edited'
    noStyle.value = !initial
    await nextTick()
    owner.getComponent(Form).vm.resetFields()
    await nextTick()
    expect(model.value).toBe('original')
  } finally {
    owner.unmount()
  }
})
