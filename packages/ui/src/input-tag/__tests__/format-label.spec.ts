import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import InputTag from '..'

test('formatLabel customizes selected text without changing search or the model', async () => {
  const options = [{ value: 'alice', label: 'Alice', department: 'Design' }]
  const formatLabel = vi.fn((item: { label?: string; department?: string }) => `${item.label} (${item.department})`)
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options, formatLabel, minSearchLength: 1 },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('Alice')
  await flushPromises()
  expect(document.querySelector('[role="option"]')?.textContent).toContain('Alice')
  expect(document.querySelector('[role="option"]')?.textContent).not.toContain('Design')
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([['alice']])
  expect(owner.text()).toContain('Alice (Design)')
  await owner.setProps({ readPretty: true })
  await flushPromises()
  expect(owner.text()).toContain('Alice (Design)')
  owner.unmount()
})

test('label slot receives data and takes precedence over formatLabel', () => {
  const owner = mount(InputTag, {
    props: { defaultValue: [{ value: 'alice', label: 'Alice', closable: true }], formatLabel: () => 'formatted' },
    slots: { label: ({ data }: any) => h('strong', { 'data-test': 'label' }, `Slot ${data.label}`) },
  })
  expect(owner.get('[data-test="label"]').text()).toBe('Slot Alice')
  expect(owner.text()).not.toContain('formatted')
  owner.unmount()
})

test('the old prop and slot are not part of the public API', async () => {
  const { inputTagProps } = await import('../props')
  expect(inputTagProps).not.toHaveProperty('formatTag')
  // Render the removed slot deliberately to verify the runtime ignores it.
  const owner = mount(() => h(InputTag, { defaultValue: ['a'] }, { tag: () => 'legacy slot' }))
  expect(owner.text()).not.toContain('legacy slot')
  owner.unmount()
})

test('initial primitive values resolve labels and formatter data from options', async () => {
  const owner = mount(InputTag, {
    props: {
      modelValue: ['alice'],
      options: [{ value: 'alice', label: 'Alice', department: 'Design' }],
      formatLabel: (item) => `${item.label} (${item.department})`,
    },
  })
  await flushPromises()
  expect(owner.text()).toContain('Alice (Design)')
  await owner.setProps({ readPretty: true })
  await flushPromises()
  expect(owner.text()).toContain('Alice (Design)')
  owner.unmount()
})

test('option labels update reactively for nested groups and numeric identities', async () => {
  const owner = mount(InputTag, {
    props: {
      modelValue: [0, '0'],
      options: [
        {
          isGroup: true,
          label: 'Group',
          options: [
            { value: 0, label: 'Zero' },
            { value: '0', label: 'String zero' },
          ],
        },
      ],
    },
  })
  await flushPromises()
  expect(owner.text()).toContain('Zero')
  expect(owner.text()).toContain('String zero')
  await owner.setProps({
    options: [
      {
        isGroup: true,
        label: 'Group',
        options: [
          { value: 0, label: 'Updated' },
          { value: '0', label: 'String zero' },
        ],
      },
    ],
  })
  await flushPromises()
  expect(owner.text()).toContain('Updated')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  owner.unmount()
})

test('an initial remote option remains displayed after later candidate searches', async () => {
  const loader = vi.fn(async (query: string) =>
    query === 'bob' ? [{ value: 'bob', label: 'Bob' }] : [{ value: 'alice', label: 'Alice' }],
  )
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', modelValue: ['alice'], options: loader, minSearchLength: 1, searchDelay: 0 },
  })
  await flushPromises()
  expect(loader).not.toHaveBeenCalled()
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('alice')
  await flushPromises()
  expect(loader.mock.calls.map(([query]) => query)).toContain('alice')
  expect(owner.text()).toContain('Alice')
  await input.setValue('bob')
  await flushPromises()
  expect(owner.text()).toContain('Alice')
  await owner.setProps({ readPretty: true })
  await flushPromises()
  expect(owner.text()).toContain('Alice')
  owner.unmount()
})

test('initial option lookup respects fieldNames and takes priority over fallback', async () => {
  const owner = mount(InputTag, {
    props: {
      multiple: false,
      modelValue: 'id-1',
      fieldNames: { value: 'id', label: 'name' },
      options: [{ id: 'id-1', name: 'From options', department: 'Design' }],
      fallbackOption: () => ({ name: 'Fallback' }),
      formatLabel: (item) => `${item.name} (${item.department})`,
    },
  })
  await flushPromises()
  expect(owner.text()).toContain('From options (Design)')
  await owner.setProps({ readPretty: true })
  await flushPromises()
  expect(owner.text()).toContain('From options (Design)')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  owner.unmount()
})
