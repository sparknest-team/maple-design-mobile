import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Rate from '..'

test('a repeated pointer choice uses emptyValue while keyboard Home retains its numeric meaning', async () => {
  const owner = mount(Rate, { props: { editMode: 'direct', defaultValue: 3, clearable: true, emptyValue: 1 } })
  try {
    await owner.findAll('.mp-rate__content').at(2)!.trigger('click')
    expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([1])
    await owner.trigger('keydown', { key: 'Home' })
    expect(owner.emitted('update:modelValue')?.at(-1)).toEqual([0])
  } finally {
    owner.unmount()
  }
})
