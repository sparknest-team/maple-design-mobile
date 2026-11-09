import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Textarea from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
for (const factory of [false, true]) {
  test(`Textarea rereads a changed empty-value ${factory ? 'factory' : 'literal'} when clearing`, async () => {
    const owner = mount(Textarea, {
      props: { editMode: 'direct', defaultValue: 'hello', clearable: true, emptyValue: factory ? () => null : null },
    })
    owners.push(owner)
    await owner.setProps({ emptyValue: factory ? () => 'CLEARED' : 'CLEARED' })
    await owner.get('textarea').trigger('focus')
    await owner.get('button').trigger('click')
    expect(owner.emitted('update:modelValue')?.at(-1)).toEqual(['CLEARED'])
  })
}
test('Textarea rereads changed empty-values when formatting its unchanged model', async () => {
  const owner = mount(Textarea, { props: { editMode: 'direct', modelValue: 'N/A', emptyValues: ['N/A'] } })
  owners.push(owner)
  expect((owner.get('textarea').element as HTMLTextAreaElement).value).toBe('')
  await owner.setProps({ emptyValues: ['OTHER'] })
  expect((owner.get('textarea').element as HTMLTextAreaElement).value).toBe('N/A')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('Textarea deferred clearing uses the latest policy and only publishes on confirm', async () => {
  const owner = mount(Textarea, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: 'hello',
      clearable: true,
      emptyValue: null,
    },
  })
  owners.push(owner)
  await flushPromises()
  await owner.setProps({ emptyValue: 'CLEARED' })
  const panel = owner.get('.mp-field-presentation__panel')
  await panel.get('textarea').trigger('focus')
  await panel.get('.mp-field-decorator__clear-btn').trigger('click')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  const confirm = panel.findAll('footer button').find((button) => /^(保存|确认|确定|Save|Confirm)$/.test(button.text()))
  expect(confirm).toBeTruthy()
  await confirm!.trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual(['CLEARED'])
})
