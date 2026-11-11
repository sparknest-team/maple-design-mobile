import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { CheckboxGroup } from '..'
import { fieldEditModeProp } from '../../_components/field-presentation/context'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'

test('retained group methods return independent copies of the accepted value after disposal', () => {
  const owner = mount(CheckboxGroup, { props: { editMode: 'direct', modelValue: ['a'], options: ['a', 'b'] } })
  const checkAll = (owner.vm as any).checkAll,
    inverseAll = (owner.vm as any).inverseAll
  owner.unmount()
  const result = checkAll()
  expect(result).toEqual(['a'])
  result.push('changed')
  expect(checkAll()).toEqual(['a'])
  expect(inverseAll()).toEqual(['a'])
  expect(owner.emitted('change')).toBeUndefined()
})
test('closed deferred group methods return the current value without opening or changing it', async () => {
  const editMode = fieldEditModeProp.validator('click') ? 'click' : 'popup'
  const owner = mount(CheckboxGroup, { props: { editMode: editMode as any, modelValue: ['a'], options: ['a', 'b'] } })
  try {
    const checkAll = (owner.vm as any).checkAll
    expect(checkAll()).toEqual(['a'])
    await owner.setProps({ modelValue: ['b'] })
    expect(checkAll()).toEqual(['b'])
    await flushPromises()
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
    expect(owner.emitted('change')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})
