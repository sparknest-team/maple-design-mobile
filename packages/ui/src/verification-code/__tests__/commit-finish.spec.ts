import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import VerificationCode from '..'
import { fieldEditModeProp } from '../../_components/field-presentation/context'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import type { VerificationCodeProps } from '../props'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const mode = (fieldEditModeProp.validator('click') ? 'click' : 'popup') as Exclude<
  VerificationCodeProps['editMode'],
  undefined
>
async function fixture(props: Record<string, unknown> = {}) {
  const owner = mount(VerificationCode, {
    props: { editMode: mode, defaultValue: '1234', length: 4, popupContainer: false, ...props },
    attachTo: document.body,
  })
  owners.push(owner)
  ;(owner.vm as any).focus()
  await flushPromises()
  const presentation = owner.getComponent(FieldPresentation)
  const input = owner.get('input')
  input.element.value = '5678'
  input.element.dispatchEvent(
    new InputEvent('input', { bubbles: true, inputType: 'insertReplacementText', data: '5678' }),
  )
  await flushPromises()
  return { owner, presentation }
}
test('full deferred draft is not a committed finish', async () => {
  const { owner } = await fixture()
  expect(owner.emitted('finish')).toBeUndefined()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})
test('finish waits for guard acceptance and follows model/change exactly once', async () => {
  let done!: (allow?: boolean) => void
  const order: string[] = []
  const { owner, presentation } = await fixture({
    beforeCommit: (_payload: unknown, resolve: typeof done) => {
      done = resolve
    },
    'onUpdate:modelValue': () => order.push('model'),
    onChange: () => order.push('change'),
    onFinish: () => order.push('finish'),
  })
  presentation.vm.$emit('confirm', new MouseEvent('click'))
  await flushPromises()
  expect(owner.emitted('finish')).toBeUndefined()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  done(true)
  await flushPromises()
  expect(owner.emitted('finish')).toEqual([['5678']])
  expect(order).toEqual(['model', 'change', 'finish'])
})
test('rejected or canceled full drafts never notify finish', async () => {
  const rejected = await fixture({ beforeCommit: () => false })
  rejected.presentation.vm.$emit('confirm')
  await flushPromises()
  expect(rejected.owner.emitted('finish')).toBeUndefined()
  expect(rejected.owner.emitted('change')).toBeUndefined()
  rejected.presentation.vm.$emit('cancel')
  await flushPromises()
  expect(rejected.owner.emitted('finish')).toBeUndefined()
})
test('a full draft followed by reset cannot finish a different accepted value', async () => {
  const { owner, presentation } = await fixture()
  ;(owner.vm as any).reset()
  await flushPromises()
  presentation.vm.$emit('confirm')
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toEqual([['']])
  expect(owner.emitted('finish')).toBeUndefined()
})
test('disabled state retires pending finish and stale acceptance', async () => {
  let done!: (allow?: boolean) => void
  const { owner, presentation } = await fixture({
    beforeCommit: (_payload: unknown, resolve: typeof done) => {
      done = resolve
    },
  })
  presentation.vm.$emit('confirm')
  await flushPromises()
  await owner.setProps({ disabled: true })
  done(true)
  await flushPromises()
  expect(owner.emitted('finish')).toBeUndefined()
  expect(owner.emitted('change')).toBeUndefined()
})
test('direct complete accepted code retains immediate finish', async () => {
  const owner = mount(VerificationCode, { props: { editMode: 'direct', defaultValue: '1234', length: 4 } })
  owners.push(owner)
  const input = owner.get('input')
  input.element.value = '5678'
  input.element.dispatchEvent(
    new InputEvent('input', { bubbles: true, inputType: 'insertReplacementText', data: '5678' }),
  )
  await flushPromises()
  expect(owner.emitted('finish')).toEqual([['5678']])
})

test('explicit null is an empty controlled code and never revives a default', () => {
  const owner = mount(VerificationCode, {
    props: { editMode: 'direct', modelValue: null, defaultValue: '9999', length: 4 } as any,
  })
  owners.push(owner)
  expect(owner.findAll('input').map((input) => input.element.value)).toEqual(['', '', '', ''])
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('explicit nullable presentation clear is typed as an empty model, not a completed code', async () => {
  const { owner, presentation } = await fixture({ emptyValue: null })
  presentation.vm.$emit('clear')
  await flushPromises()
  presentation.vm.$emit('confirm')
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toEqual([[null]])
  expect(owner.emitted('finish')).toBeUndefined()
})
test('a finish listener Promise never takes ownership of the edit session', async () => {
  const { owner, presentation } = await fixture({ onFinish: () => new Promise(() => {}) })
  presentation.vm.$emit('confirm')
  await flushPromises()
  expect(owner.emitted('finish')).toEqual([['5678']])
  expect(presentation.props('open')).toBe(false)
})

test('controlled parent rejection after guard approval does not finish', async () => {
  const { owner, presentation } = await fixture({ modelValue: '1234', beforeCommit: () => true })
  presentation.vm.$emit('confirm')
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toEqual([['5678']])
  expect(owner.emitted('finish')).toBeUndefined()
})
