import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Form, { FormItem } from '..'
import Input from '../../input'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
function fixture() {
  const tasks: { resolve: (value: boolean | string) => void; reject: (reason: Error) => void }[] = []
  const owner = mount(Form, {
    props: { model: { name: 'value' }, editMode: 'direct' },
    slots: {
      default: () =>
        h(
          FormItem,
          {
            field: 'name',
            feedback: true,
            rules: [() => new Promise<boolean | string>((resolve, reject) => tasks.push({ resolve, reject }))],
          },
          () => h(Input, { editMode: 'direct' }),
        ),
    },
  })
  owners.push(owner)
  const run = () => (owner.vm as any).validate('name').catch((error: Error) => error)
  const pending = () => owner.find('.mp-input-feedback--validating').exists()
  return { owner, tasks, run, pending }
}
test('a rejected rule remains observable and releases validating feedback', async () => {
  const f = fixture(),
    cause = new Error('rule exception'),
    result = f.run()
  await nextTick()
  expect(f.pending()).toBe(true)
  f.tasks[0].reject(cause)
  expect(await result).toBe(cause)
  await nextTick()
  expect(f.pending()).toBe(false)
})
test('a stale rejected validation cannot clear the latest pending feedback', async () => {
  const f = fixture(),
    first = f.run(),
    second = f.run(),
    cause = new Error('old rule')
  await nextTick()
  f.tasks[0].reject(cause)
  expect(await first).toBe(cause)
  await nextTick()
  expect(f.pending()).toBe(true)
  f.tasks[1].resolve(true)
  await second
  await nextTick()
  expect(f.pending()).toBe(false)
  expect(f.owner.find('.mp-input-feedback--success').exists()).toBe(true)
})
test('unexpected rule rejection preserves a known previous business error without keeping its spinner', async () => {
  const f = fixture(),
    invalid = f.run()
  f.tasks[0].resolve('Known validation message')
  await invalid
  await nextTick()
  expect(f.owner.text()).toContain('Known validation message')
  const result = f.run(),
    cause = new Error('unexpected')
  f.tasks[1].reject(cause)
  expect(await result).toBe(cause)
  await nextTick()
  expect(f.pending()).toBe(false)
  expect(f.owner.text()).toContain('Known validation message')
})
