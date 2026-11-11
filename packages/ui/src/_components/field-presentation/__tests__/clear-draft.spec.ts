import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import DateField from '../../../date'
import DateRange from '../../../date-range'
import FieldPresentation from '../FieldPresentation.vue'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
for (const [kind, Component, initial] of [
  ['date', DateField, '2026-10-19'],
  ['date-range', DateRange, ['2026-10-19', '2026-10-22']],
] as const) {
  test(`${kind}: shared draft clear can confirm the configured empty value without bypassing the guard`, async () => {
    const beforeCommit = vi.fn(() => false)
    const owner = mount(Component as any, {
      props: {
        editMode: 'popup',
        modelValue: initial,
        valueFormat: 'YYYY-MM-DD',
        emptyValue: null,
        beforeCommit,
        popupContainer: false,
      },
    })
    owners.push(owner)
    const presentation = owner.getComponent(FieldPresentation)
    presentation.vm.$emit('open', true)
    await flushPromises()
    presentation.vm.$emit('clear')
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(presentation.props('confirmDisabled')).toBe(false)
    await presentation.props('commit')!()
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    presentation.vm.$emit('cancel')
    await flushPromises()
    presentation.vm.$emit('open', true)
    await flushPromises()
    await presentation.props('commit')!()
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  })
}
test('untouched empty date range and half selected ranges still require complete endpoints', async () => {
  const owner = mount(DateRange, {
    props: { editMode: 'popup', modelValue: [], valueFormat: 'YYYY-MM-DD', popupContainer: false },
  })
  owners.push(owner)
  const presentation = owner.getComponent(FieldPresentation)
  presentation.vm.$emit('open', true)
  await flushPromises()
  expect(presentation.props('confirmDisabled')).toBe(true)
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})
