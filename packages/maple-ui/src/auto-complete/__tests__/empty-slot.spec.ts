import { defineComponent, h, provide, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import AutoComplete from '..'
import { fieldEditorBoundary, fieldEditorPanel } from '../../_components/field-presentation/context'
import SelectionEditor from '../../_components/selected-options/SelectionEditor.vue'
import Base from '../auto-complete'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
const empty = () => h('span', { 'data-empty-slot': '' }, 'No candidates')
test('standalone selection editor retains its existing empty slot', async () => {
  const owner = mount(
    { render: () => h(SelectionEditor, { kind: 'auto-complete' }, () => h(Base, { options: [] }, { empty })) },
    { attachTo: document.body },
  )
  owners.push(owner)
  await flushPromises()
  expect(document.querySelector('[data-empty-slot]')?.textContent).toBe('No candidates')
})
test('native field editor renders empty content without replacing its composing input when options change', async () => {
  const options = ref<string[]>([])
  const host = defineComponent({
    setup() {
      provide(fieldEditorBoundary, true)
      provide(fieldEditorPanel, true)
      return () => h(Base, { options: options.value, shouldOpen: () => true }, { empty })
    },
  })
  const owner = mount(host, { attachTo: document.body })
  owners.push(owner)
  await flushPromises()
  expect(document.querySelector('[data-empty-slot]')?.textContent).toBe('No candidates')
  const input = owner.get('input'),
    native = input.element as HTMLInputElement
  native.focus()
  await input.trigger('compositionstart')
  native.value = 'draft'
  options.value = ['Alpha']
  await flushPromises()
  expect(owner.get('input').element).toBe(native)
  expect(native.value).toBe('draft')
  expect(document.activeElement).toBe(native)
  expect(document.querySelector('[data-empty-slot]')).toBeNull()
})
test('ordinary direct suggestions keep the empty menu closed', async () => {
  const slot = vi.fn(empty)
  const owner = mount(AutoComplete, {
    props: { editMode: 'direct', options: [], shouldOpen: () => true },
    slots: { empty: slot },
    attachTo: document.body,
  })
  owners.push(owner)
  await owner.get('input').trigger('focus')
  await flushPromises()
  expect(slot).not.toHaveBeenCalled()
  expect(document.querySelector('[data-empty-slot]')).toBeNull()
  expect(owner.get('input').attributes('aria-expanded')).toBe('false')
})
