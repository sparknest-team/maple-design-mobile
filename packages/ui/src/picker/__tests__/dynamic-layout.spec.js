import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Picker from '../Picker.vue'
import { setRenderedTranslations } from './rendered-translation'

const owners = []
const media = window.matchMedia
beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
})
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
  vi.stubGlobal('matchMedia', media)
})
const columns = [
  [
    { text: 'A', value: 'a' },
    { text: 'B', value: 'b', disabled: true },
    { text: 'C', value: 'c' },
  ],
  [
    { text: 'X', value: 'x' },
    { text: 'Y', value: 'y' },
  ],
]
function fixture(props = {}) {
  const w = mount(Picker, { attachTo: document.body, props: { columns, modelValue: ['c', 'y'], ...props } })
  owners.push(w)
  return w
}
test('controlled values seed candidates; rejected candidate notifications remain local until external replacement', async () => {
  const w = fixture({ modelValue: ['a', 'x'] })
  await w.get('[role="listbox"]').trigger('keydown', { key: 'ArrowDown' })
  expect(w.props('modelValue')).toEqual(['a', 'x'])
  setRenderedTranslations(w.element)
  w.vm.confirm()
  expect(w.emitted('confirm').at(-1)[0]).toEqual(['c', 'x'])
  await w.setProps({ modelValue: ['a', 'y'] })
  setRenderedTranslations(w.element)
  w.vm.confirm()
  expect(w.emitted('confirm').at(-1)[0]).toEqual(['a', 'y'])
})
test('changing geometry recenters existing candidates while preserving native focus and the model', async () => {
  const w = fixture(),
    box = w.get('[role="listbox"]').element
  box.focus()
  expect(document.activeElement).toBe(box)
  expect(w.get('.mp-picker__scroller').element.style.transform).toBe('translateY(22px)')
  await w.setProps({ optionHeight: 88, optionCount: 8 })
  expect(w.get('.mp-picker__scroller').element.style.transform).toBe('translateY(132px)')
  expect(document.activeElement).toBe(box)
  expect(w.props('modelValue')).toEqual(['c', 'y'])
  expect(w.emitted('change')).toBeUndefined()
  expect(w.emitted('update:modelValue')).toBeUndefined()
})
test('column count updates without replacing columns or remounting retained focused columns', async () => {
  const w = fixture({ columnsCount: 2 }),
    box = w.get('[role="listbox"]').element
  box.focus()
  await w.setProps({ columnsCount: 1 })
  expect(w.findAll('[role="listbox"]')).toHaveLength(1)
  expect(document.activeElement).toBe(box)
  await w.setProps({ columnsCount: 2 })
  expect(w.findAll('[role="listbox"]')).toHaveLength(2)
  expect(document.activeElement).toBe(box)
  setRenderedTranslations(w.element)
  w.vm.confirm()
  expect(w.emitted('confirm').at(-1)[0]).toEqual(['c', 'y'])
  expect(w.emitted('update:modelValue')).toBeUndefined()
})
test('layout changes preserve an unaccepted draft instead of reverting to controlled seed values', async () => {
  const w = fixture({ modelValue: ['a', 'x'] })
  await w.get('[role="listbox"]').trigger('keydown', { key: 'ArrowDown' })
  await w.setProps({ optionHeight: 88, optionCount: 8, columnsCount: 1 })
  expect(w.get('[role="option"][aria-selected="true"]').text()).toContain('C')
  expect(w.get('.mp-picker__scroller').element.style.transform).toBe('translateY(132px)')
  setRenderedTranslations(w.element)
  w.vm.confirm()
  expect(w.emitted('confirm').at(-1)[0]).toEqual(['c'])
  expect(w.props('modelValue')).toEqual(['a', 'x'])
  expect(w.emitted('change')).toHaveLength(1)
  expect(w.emitted('update:modelValue')).toHaveLength(1)
})
test('cascading count changes retain the current parent and rebuild children from that candidate', async () => {
  const w = fixture({
    cascade: true,
    modelValue: ['a', 'a1'],
    columnsCount: 2,
    columns: [
      { text: 'A', value: 'a', children: [{ text: 'A1', value: 'a1' }] },
      { text: 'B', value: 'b', children: [{ text: 'B1', value: 'b1' }] },
    ],
  })
  const box = w.get('[role="listbox"]').element
  box.focus()
  await w.get('[role="listbox"]').trigger('keydown', { key: 'End' })
  await w.setProps({ columnsCount: 1 })
  expect(w.findAll('[role="listbox"]')).toHaveLength(1)
  await w.setProps({ columnsCount: 2 })
  expect(w.findAll('[role="listbox"]')).toHaveLength(2)
  expect(document.activeElement).toBe(box)
  setRenderedTranslations(w.element)
  w.vm.confirm()
  expect(w.emitted('confirm').at(-1)[0]).toEqual(['b', 'b1'])
})
test('resizing retires an old transition without emitting a late selection', async () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
  const w = fixture({ modelValue: ['a', 'x'] })
  await w.findAll('[role="option"]')[2].trigger('click')
  expect(w.get('.mp-picker__scroller').element.style.transitionDuration).not.toBe('0ms')
  await w.setProps({ optionHeight: 88 })
  expect(w.get('.mp-picker__scroller').element.style.transitionDuration).toBe('0ms')
  await w.get('.mp-picker__scroller').trigger('transitionend', { propertyName: 'transform' })
  expect(w.emitted('change')).toBeUndefined()
  setRenderedTranslations(w.element)
  w.vm.confirm()
  expect(w.emitted('confirm').at(-1)[0]).toEqual(['c', 'x'])
})
