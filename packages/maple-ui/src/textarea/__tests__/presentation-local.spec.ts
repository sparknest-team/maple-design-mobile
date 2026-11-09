import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Textarea from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
test('supported local editor reports one open-change notification per transition', async () => {
  const owner = mount(Textarea, { attachTo: document.body, props: { editMode: 'popup', defaultValue: 'draft' } })
  owners.push(owner)
  await owner.get('button').trigger('click')
  await flushPromises()
  expect(owner.emitted('open-change')).toEqual([[true]])
  const cancel = document.body.querySelector('[role="dialog"] footer button:last-child') as HTMLButtonElement
  expect(cancel).toBeTruthy()
  cancel.click()
  await flushPromises()
  expect(owner.emitted('open-change')).toEqual([[true], [false]])
})
test('direct native selection and element reference remain exposed', async () => {
  const owner = mount(Textarea, { attachTo: document.body, props: { editMode: 'direct', defaultValue: 'direct' } })
  owners.push(owner)
  await flushPromises()
  owner.vm.focus()
  owner.vm.select()
  const input = owner.get('textarea').element
  expect(owner.vm.textareaRef).toBe(input)
  expect([input.selectionStart, input.selectionEnd]).toEqual([0, 6])
  owner.vm.blur()
})
