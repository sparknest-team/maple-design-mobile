import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import InputTag from '..'

test('single mode replaces the previous tag and emits a scalar', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', multiple: false, defaultValue: 'first' },
  })
  expect(owner.text()).toContain('first')
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('second')
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual(['second'])
  expect(owner.text()).toContain('second')
  expect(owner.text()).not.toContain('first')
  owner.unmount()
})

test('single mode automatically resolves a candidate to a scalar and keeps its label', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      multiple: false,
      defaultValue: 'old',
      options: async () => [{ value: 'new', label: 'New label' }],
      minSearchLength: 2,
      searchDelay: 0,
      autoCommitSingle: true,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('ne')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual(['new'])
  expect(owner.text()).toContain('New label')
  await owner.setProps({ readPretty: true })
  await flushPromises()
  expect(owner.text()).toContain('New label')
  owner.unmount()
})

test('single mode preserves zero and clears to null', async () => {
  const owner = mount(InputTag, { props: { editMode: 'direct', multiple: false, modelValue: 0, clearable: true } })
  expect(owner.text()).toContain('0')
  await owner.get('[class$="__clear-btn"]').trigger('click')
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([null])
  owner.unmount()
})

test('multi mode remains the default and emits arrays', async () => {
  const owner = mount(InputTag, { props: { editMode: 'direct', defaultValue: ['one'] } })
  const input = owner.get('input')
  await input.setValue('two')
  await input.trigger('keydown', { key: 'Enter' })
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['one', 'two']])
  owner.unmount()
})

test('single mode keeps scalar drafts through deferred confirmation', async () => {
  const { default: EditorPanel } = await import('../../_components/field-presentation/EditorPanel.vue')
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { multiple: false, modelValue: 'old', editMode: 'popup', defaultOpen: true, popupContainer: false },
  })
  await flushPromises()
  const panel = owner.getComponent(EditorPanel)
  const input = panel.get('input')
  await input.setValue('new')
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  await panel.get('footer button').trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual(['new'])
  owner.unmount()
})

test('single mode shows a scalar object in read mode', () => {
  const owner = mount(InputTag, {
    props: { multiple: false, modelValue: { value: 'id', label: 'Title' }, readPretty: true },
  })
  expect(owner.text()).toContain('Title')
  owner.unmount()
})

test('single deferred editor clears to null even with a nonempty default value', async () => {
  const { default: EditorPanel } = await import('../../_components/field-presentation/EditorPanel.vue')
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      multiple: false,
      defaultValue: 'initial',
      clearable: true,
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
    },
  })
  await flushPromises()
  const panel = owner.getComponent(EditorPanel)
  await panel.findAll('footer button')[0].trigger('click')
  await flushPromises()
  await panel.findAll('footer button')[1].trigger('click')
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([null])
  owner.unmount()
})
