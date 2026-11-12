import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import InputTag from '..'
import Tag from '../../tag'
import { inputTagProps } from '../props'

async function enter(value: unknown[], candidate: string, props: Record<string, unknown> = {}) {
  const owner = mount(InputTag, {
    props: { editMode: 'direct', defaultValue: value as any, uniqueValue: true, ...props },
  })
  await owner.get('input').setValue(candidate)
  await owner.get('input').trigger('keydown', { key: 'Enter' })
  return owner
}
test('unique values use normalized object and custom value fields', async () => {
  for (const [value, props] of [
    [[{ value: 'same', label: 'Same' }], {}],
    [[{ id: 'same', title: 'Same' }], { fieldNames: { value: 'id', label: 'title' } }],
  ] as const) {
    const owner = await enter(value as any, 'same', props)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('press-enter')).toHaveLength(1)
    owner.unmount()
  }
})
test('typed identity preserves numeric and string values as distinct', async () => {
  const owner = await enter([1], '1')
  expect(owner.emitted('update:modelValue')?.[0][0]).toEqual([1, '1'])
  owner.unmount()
  const same = await enter([{ value: '1', label: 'one' }], '1')
  expect(same.emitted('update:modelValue')).toBeUndefined()
  same.unmount()
})
test('duplicates remain valid by default and each occurrence owns a separate node', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = mount(InputTag, { props: { editMode: 'direct', modelValue: ['a', 'x', 'x', 'b'] } })
  try {
    const initial = owner.findAllComponents(Tag).map((tag) => tag.element)
    await owner.setProps({ modelValue: ['c', 'x', 'x', 'd'] })
    const after = owner.findAllComponents(Tag).map((tag) => tag.element)
    expect(after[1]).toBe(initial[1])
    expect(after[2]).toBe(initial[2])
    expect(warn.mock.calls.flat().join(' ')).not.toContain('Duplicate keys')
    await owner.setProps({ modelValue: ['x', 'x'] })
    const remaining = owner.findAllComponents(Tag).map((tag) => tag.element)
    expect(remaining[0]).toBe(initial[1])
    expect(remaining[1]).toBe(initial[2])
  } finally {
    owner.unmount()
    warn.mockRestore()
  }
})
test('same-value objects retain separate identities on reorder and immutable replacement', async () => {
  const a = { value: 'x', label: 'A' },
    b = { value: 'x', label: 'B' }
  const owner = mount(InputTag, { props: { editMode: 'direct', modelValue: [a, b] } })
  try {
    const nodes = owner.findAllComponents(Tag).map((tag) => tag.element)
    await owner.setProps({ modelValue: [b, a] })
    const swapped = owner.findAllComponents(Tag).map((tag) => tag.element)
    expect(swapped[0]).toBe(nodes[1])
    expect(swapped[1]).toBe(nodes[0])
    await owner.setProps({ modelValue: [{ ...b }, { ...a }] })
    const replaced = owner.findAllComponents(Tag).map((tag) => tag.element)
    expect(replaced[0]).toBe(nodes[1])
    expect(replaced[1]).toBe(nodes[0])
  } finally {
    owner.unmount()
  }
})
test('numeric/string identities and overflow placeholder never collide', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = mount(InputTag, {
    props: { editMode: 'direct', modelValue: [1, '1', '__arco__more', 'tail'], maxTagCount: 3 },
  })
  try {
    const first = owner.findAllComponents(Tag).map((tag) => tag.element)
    expect(first).toHaveLength(4)
    await owner.setProps({ modelValue: ['1', 1, '__arco__more', 'other'] })
    const next = owner.findAllComponents(Tag).map((tag) => tag.element)
    expect(next[0]).toBe(first[1])
    expect(next[1]).toBe(first[0])
    expect(warn.mock.calls.flat().join(' ')).not.toContain('Duplicate keys')
  } finally {
    owner.unmount()
    warn.mockRestore()
  }
})
for (const value of [-1, 0.5, NaN, Infinity, -Infinity]) {
  test(`invalid maxTagCount ${value} diagnoses and renders safely without folding`, () => {
    expect(inputTagProps.maxTagCount.validator(value)).toBe(false)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const owner = mount(InputTag, { props: { editMode: 'direct', modelValue: ['a', 'b'], maxTagCount: value } })
    try {
      expect(owner.findAllComponents(Tag)).toHaveLength(2)
      expect(owner.text()).not.toContain('...')
    } finally {
      owner.unmount()
      warn.mockRestore()
    }
  })
}
test('finite nonnegative integer maxTagCount keeps zero unlimited and counts only hidden tags', async () => {
  expect(inputTagProps.maxTagCount.validator(0)).toBe(true)
  expect(inputTagProps.maxTagCount.validator(2)).toBe(true)
  const owner = mount(InputTag, { props: { editMode: 'direct', modelValue: ['a', 'b', 'c'], maxTagCount: 0 } })
  try {
    expect(owner.findAllComponents(Tag)).toHaveLength(3)
    await owner.setProps({ maxTagCount: 1 })
    expect(owner.text()).toContain('+2...')
  } finally {
    owner.unmount()
  }
})

test('folding retains hidden occurrence keys and TagProps cannot replace private keys', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const owner = mount(InputTag, {
    props: {
      editMode: 'direct',
      modelValue: [
        { value: 'a', label: 'A', tagProps: { key: 'same' } as any },
        { value: 'b', label: 'B', tagProps: { key: 'same' } as any },
        'c',
      ],
      maxTagCount: 1,
    },
  })
  try {
    const first = owner.findAllComponents(Tag)[0].element
    await owner.setProps({ maxTagCount: 0 })
    expect(owner.findAllComponents(Tag)[0].element).toBe(first)
    expect(owner.findAllComponents(Tag)).toHaveLength(3)
    expect(warn.mock.calls.flat().join(' ')).not.toContain('Duplicate keys')
  } finally {
    owner.unmount()
    warn.mockRestore()
  }
})
