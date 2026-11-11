import { h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Input from '..'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
test('Input default-open starts its editor without an initialization close request', async () => {
  const owner = mount(Input, { props: { editMode: 'popup', defaultOpen: true, popupContainer: false } })
  owners.push(owner)
  await flushPromises()
  expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
  expect(owner.emitted('update:open')).toBeUndefined()
})
test('Input controlled open starts true without rewriting the owner on initialization', async () => {
  const open = ref(true)
  const owner = mount({
    setup: () => () =>
      h(Input, {
        editMode: 'popup',
        open: open.value,
        'onUpdate:open': (next: boolean) => (open.value = next),
        popupContainer: false,
      }),
  })
  owners.push(owner)
  await flushPromises()
  expect(open.value).toBe(true)
  expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
})
test('Input default-open remains creation-only', async () => {
  const owner = mount(Input, { props: { editMode: 'popup', defaultOpen: false, popupContainer: false } })
  owners.push(owner)
  await owner.setProps({ defaultOpen: true })
  await flushPromises()
  expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
})
