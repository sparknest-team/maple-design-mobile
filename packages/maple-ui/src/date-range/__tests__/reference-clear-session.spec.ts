import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import DateRange from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import PickerField from '../../_components/picker-field/PickerField.vue'

const owners: ReturnType<typeof mount>[] = []
const initial = ['2026-10-19', '2026-10-22']
function fixture(extra = {}) {
  const owner = mount(DateRange, {
    attachTo: document.body,
    props: {
      modelValue: initial,
      editMode: 'popup',
      clearable: true,
      valueFormat: 'YYYY-MM-DD',
      popupContainer: false,
      ...extra,
    },
  })
  owners.push(owner)
  return owner
}
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
async function clear(owner: ReturnType<typeof mount>) {
  owner.getComponent(PickerField).vm.$emit('clear')
  await flushPromises()
}
const button = (owner: ReturnType<typeof mount>, label: string) =>
  owner
    .getComponent(EditorPanel)
    .findAll('button')
    .find((item) => item.text() === label)!
for (const [name, emptyValue, expected] of [
  ['null', null, null],
  ['array', [], []],
  ['factory', () => null, null],
  ['undefined factory', () => undefined, undefined],
] as const) {
  test(`reference clearing ${name} is a draft and only the confirmed guard publishes it`, async () => {
    let finish!: (allowed?: boolean) => void
    const beforeCommit = vi.fn(
      (_context: { value: unknown; previousValue: unknown }) =>
        new Promise<boolean | undefined>((resolve) => {
          finish = resolve
        }),
    )
    const owner = fixture({ emptyValue, beforeCommit })
    await clear(owner)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('change')).toBeUndefined()
    expect(beforeCommit).not.toHaveBeenCalled()
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
    expect(button(owner, '确认').attributes('disabled')).toBeUndefined()
    await button(owner, '确认').trigger('click')
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    expect(beforeCommit.mock.calls[0][0].value).toEqual(expected)
    expect(beforeCommit.mock.calls[0][0].previousValue).toEqual(initial)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    finish(true)
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toEqual([[expected]])
    expect(owner.emitted('change')).toHaveLength(1)
  })
}
test('canceling a clear restores the original range and rejecting a guard keeps the draft', async () => {
  const beforeCommit = vi.fn(() => false),
    owner = fixture({ emptyValue: null, beforeCommit })
  await clear(owner)
  owner.getComponent(FieldPresentation).vm.$emit('cancel')
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  await owner.get('input[aria-haspopup=dialog]').trigger('click')
  await flushPromises()
  expect(button(owner, '确认').attributes('disabled')).toBeUndefined()
  await button(owner, '确认').trigger('click')
  await flushPromises()
  expect(beforeCommit).not.toHaveBeenCalled()
  await clear(owner)
  await button(owner, '确认').trigger('click')
  await flushPromises()
  expect(beforeCommit).toHaveBeenCalledTimes(1)
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
})
test('rejected controlled opening cannot clear the model or run its guard', async () => {
  const beforeCommit = vi.fn(),
    owner = fixture({ emptyValue: null, open: false, beforeCommit })
  await clear(owner)
  expect(owner.emitted('update:open')?.[0]).toEqual([true])
  expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  expect(beforeCommit).not.toHaveBeenCalled()
})
for (const extra of [
  { disabled: true },
  { readonly: true },
  { disabled: [true, false] },
  { disabled: [false, true] },
]) {
  test(`reference clear preserves lock ${JSON.stringify(extra)}`, async () => {
    const beforeCommit = vi.fn(),
      owner = fixture({ ...extra, beforeCommit })
    await clear(owner)
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('update:open')).toBeUndefined()
    expect(beforeCommit).not.toHaveBeenCalled()
  })
}
