import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Form, { FormItem } from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
function fixture() {
  const model = ref<Record<string, any>>({ nested: { name: 'allowed' }, other: 0 })
  const tasks: { value: unknown; finish: (valid: boolean) => void }[] = []
  const rule = (value: unknown) =>
    new Promise<boolean | string>((resolve) =>
      tasks.push({ value, finish: (valid) => resolve(valid ? true : 'Old failure') }),
    )
  const rules = ref<any>({ 'nested.name': [rule] })
  const itemRules = ref<any>(undefined)
  const field = ref('nested.name')
  const visible = ref(true)
  const extra = ref(false)
  const required = ref(false)
  const owner = mount({
    setup: () => () =>
      h(Form, { model: model.value, rules: rules.value }, () => [
        visible.value
          ? h(
              FormItem,
              { field: field.value, required: required.value, rules: itemRules.value, validateTrigger: [] },
              () => h('input'),
            )
          : h('span', 'No field'),
        extra.value ? h(FormItem, { field: 'other', rules: [rule], validateTrigger: [] }, () => h('input')) : null,
      ]),
  })
  owners.push(owner)
  const form = owner.getComponent(Form)
  const submit = async () => {
    await owner.get('form').trigger('submit')
    await flushPromises()
  }
  return { model, tasks, rules, itemRules, field, visible, extra, required, owner, form, submit, rule }
}
for (const oldValid of [true, false]) {
  for (const change of [
    'field value',
    'other field',
    'model replacement',
    'ABA',
    'form rules',
    'item rules',
    'required',
    'field identity',
    'field removal',
    'field addition',
  ]) {
    test(`${change} invalidates a waiting native submit (${oldValid ? 'old success' : 'old failure'})`, async () => {
      const f = fixture()
      await f.submit()
      expect(f.tasks).toHaveLength(1)
      expect(f.tasks[0].value).toBe('allowed')
      expect(f.form.emitted('submit')).toBeUndefined()
      if (change === 'field value') {
        f.model.value.nested.name = 'unvalidated'
      }
      if (change === 'other field') {
        f.model.value.other++
      }
      if (change === 'model replacement') {
        f.model.value = { nested: { name: 'unvalidated' }, other: 1 }
      }
      if (change === 'ABA') {
        f.model.value.nested.name = 'changed'
        f.model.value.nested.name = 'allowed'
      }
      if (change === 'form rules') {
        f.rules.value = { 'nested.name': [f.rule, f.rule] }
      }
      if (change === 'item rules') {
        f.itemRules.value = [f.rule]
      }
      if (change === 'required') {
        f.required.value = true
      }
      if (change === 'field identity') {
        f.field.value = 'other'
      }
      if (change === 'field removal') {
        f.visible.value = false
      }
      if (change === 'field addition') {
        f.extra.value = true
      }
      await nextTick()
      f.tasks[0].finish(oldValid)
      await flushPromises()
      expect(f.form.emitted('submit-success')).toBeUndefined()
      expect(f.form.emitted('submit-failed')).toBeUndefined()
      expect(f.form.emitted('submit')).toBeUndefined()
    })
  }
}
test('a fresh submission validates the new values and succeeds once after invalidation', async () => {
  const f = fixture()
  await f.submit()
  f.model.value.nested.name = 'new value'
  await nextTick()
  f.tasks[0].finish(true)
  await flushPromises()
  await f.submit()
  expect(f.tasks[1].value).toBe('new value')
  f.tasks[1].finish(true)
  await flushPromises()
  expect(f.form.emitted('submit-success')).toHaveLength(1)
  expect(f.form.emitted('submit-success')![0][0]).toEqual(f.model.value)
  expect(f.form.emitted('submit')).toHaveLength(1)
})

test('old completion cannot release the newer submission input ownership', async () => {
  const f = fixture()
  await f.submit()
  f.model.value.nested.name = 'second'
  await nextTick()
  await f.submit()
  f.tasks[0].finish(true)
  await flushPromises()
  f.model.value.nested.name = 'third'
  await nextTick()
  f.tasks[1].finish(true)
  await flushPromises()
  expect(f.form.emitted('submit')).toBeUndefined()
  await f.submit()
  f.tasks[2].finish(true)
  await flushPromises()
  expect(f.form.emitted('submit-success')).toHaveLength(1)
  expect(f.form.emitted('submit')).toHaveLength(1)
})
