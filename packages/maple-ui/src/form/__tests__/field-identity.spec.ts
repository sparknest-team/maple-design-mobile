import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Form, { FormItem } from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
function fixture(
  initial: Record<string, any> | undefined = { a: 'A initial', b: 'B initial' },
  name = 'a',
  asyncRules = false,
) {
  const model = ref(initial)
  const field = ref(name)
  const tasks: { field: string; finish: (message?: string) => void }[] = []
  const rules = ref([
    (_value: unknown) =>
      new Promise<boolean | string>((resolve) =>
        tasks.push({ field: field.value, finish: (message) => resolve(message ?? true) }),
      ),
  ])
  const owner = mount({
    setup: () => () =>
      h(Form, { model: model.value }, () =>
        h(
          FormItem,
          {
            field: field.value,
            label: 'Active field',
            required: true,
            feedback: true,
            rules: asyncRules ? rules.value : undefined,
            validateTrigger: [],
          },
          () => h('span', 'Control'),
        ),
      ),
  })
  owners.push(owner)
  const form = owner.getComponent(Form)
  return {
    owner,
    form,
    model,
    field,
    tasks,
    async switchTo(name: string) {
      field.value = name
      await nextTick()
    },
    async reset(name = field.value) {
      form.vm.resetFields(name)
      await nextTick()
    },
  }
}
test('reused item resets its new field to that field initial value', async () => {
  const f = fixture()
  f.model.value!.a = 'A edited'
  await f.switchTo('b')
  f.model.value!.b = 'B edited'
  await f.reset('b')
  expect(f.model.value).toEqual({ a: 'A edited', b: 'B initial' })
})
test('revisiting a field retains that field first captured initial value', async () => {
  const f = fixture()
  f.model.value!.a = 'A edited'
  await f.switchTo('b')
  await f.switchTo('a')
  await f.reset('a')
  expect(f.model.value!.a).toBe('A initial')
})
test('an initially empty field registers when it becomes a named required field', async () => {
  const f = fixture({}, '')
  await f.switchTo('missing')
  const errors = await f.form.vm.validate()
  expect(errors).toHaveProperty('missing')
})
test('clearing a field unregisters it and later naming it registers it again', async () => {
  const f = fixture()
  await f.switchTo('')
  expect(await f.form.vm.validate()).toBeUndefined()
  await f.switchTo('missing')
  expect(await f.form.vm.validate()).toHaveProperty('missing')
})
test('async data supplies the initial value when an unnamed item is first bound', async () => {
  const f = fixture({}, '')
  f.model.value = { late: 'Loaded initial' }
  await nextTick()
  await f.switchTo('late')
  f.model.value.late = 'Edited later'
  await f.reset('late')
  expect(f.model.value.late).toBe('Loaded initial')
})
test('a missing property in an existing initial model remains an undefined reset value', async () => {
  const f = fixture({}, 'missing')
  f.model.value!.missing = 'Later value'
  await f.reset()
  expect(f.model.value!.missing).toBeUndefined()
})
test('initial object values are cloned separately for each field identity', async () => {
  const f = fixture({ a: { value: 1 }, b: { value: 2 } })
  await f.switchTo('b')
  f.model.value!.b.value = 9
  await f.reset()
  expect(f.model.value!.b).toEqual({ value: 2 })
  f.model.value!.b.value = 10
  await f.reset()
  expect(f.model.value).toEqual({ a: { value: 1 }, b: { value: 2 } })
})
for (const value of [0, false, null]) {
  test(`new field initial ${value} is retained without a truthiness fallback`, async () => {
    const f = fixture({ a: 'old', b: value })
    await f.switchTo('b')
    f.model.value!.b = 'edited'
    await f.reset()
    expect(f.model.value!.b).toBe(value)
  })
}
test('old field completion cannot publish feedback or a controller callback for the new identity', async () => {
  const f = fixture(undefined, 'a', true)
  const callback = vi.fn()
  const pending = f.form.vm.validate(callback)
  await flushPromises()
  expect(f.tasks).toHaveLength(1)
  await f.switchTo('b')
  f.tasks[0].finish('Old A failure')
  await pending
  await flushPromises()
  expect(f.owner.text()).not.toContain('Old A failure')
  expect(callback).not.toHaveBeenCalled()
})
