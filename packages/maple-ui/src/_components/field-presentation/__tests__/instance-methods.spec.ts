import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Textarea from '../../../textarea'
import VerificationCode from '../../../verification-code'
import { fieldEditModeProp, type FieldEditMode } from '../context'
import EditorPanel from '../EditorPanel.vue'
import FieldPresentation from '../FieldPresentation.vue'
import { fieldPresentationProps } from '../props'
import { withFieldPresentation } from '../with-field-presentation'

const mode = (fieldEditModeProp.validator('click') ? 'click' : 'popup') as FieldEditMode
const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
function render(component: any, props: Record<string, unknown>) {
  const owner = mount(component, { props, attachTo: document.body })
  owners.push(owner)
  return owner
}
const OptionsField = withFieldPresentation(
  defineComponent({
    name: 'OptionsInstanceFixture',
    props: { ...fieldPresentationProps, modelValue: String },
    methods: {
      focus() {
        ;(this.$el as HTMLInputElement).focus()
      },
      blur() {
        ;(this.$el as HTMLInputElement).blur()
      },
    },
    render() {
      return h('input', { value: this.modelValue })
    },
  }),
)
test('Options methods are available and focus the native editor in direct mode', async () => {
  const owner = render(OptionsField, { editMode: 'direct' })
  const instance = owner.vm as any
  expect(instance.focus).toBeTypeOf('function')
  expect(instance.blur).toBeTypeOf('function')
  const focus = instance.focus
  focus()
  await flushPromises()
  expect(document.activeElement).toBe(owner.get('input').element)
  instance.blur()
  expect(document.activeElement).not.toBe(owner.get('input').element)
})
test('VerificationCode methods exist before the first deferred editor mounts', () => {
  const owner = render(VerificationCode, { editMode: mode, defaultValue: '1234' })
  const instance = owner.vm as any
  for (const key of ['focus', 'blur', 'reset']) {
    expect(instance[key]).toBeTypeOf('function')
  }
})
test('stored focus opens the editor, preserves the requested index and forwards to the current instance', async () => {
  const owner = render(VerificationCode, { editMode: mode, defaultValue: '1234' })
  const instance = owner.vm as any
  const focus = instance.focus
  expect(focus).toBeTypeOf('function')
  focus(2)
  await flushPromises()
  let inputs = owner.getComponent(EditorPanel).findAll('input')
  expect(document.activeElement).toBe(inputs[2].element)
  const old = inputs[2].element
  owner.getComponent(EditorPanel).vm.$emit('cancel')
  await flushPromises()
  focus(1)
  await flushPromises()
  inputs = owner.getComponent(EditorPanel).findAll('input')
  expect(instance.focus).toBe(focus)
  expect(inputs[1].element).not.toBe(old)
  expect(document.activeElement).toBe(inputs[1].element)
  instance.blur()
  expect(inputs.some((input) => input.element === document.activeElement)).toBe(false)
})
test('closed deferred reset starts an empty draft without publishing until approval', async () => {
  const owner = render(VerificationCode, { editMode: mode, defaultValue: '1234' })
  const instance = owner.vm as any
  expect(instance.reset).toBeTypeOf('function')
  instance.reset()
  await flushPromises()
  const panel = owner.getComponent(EditorPanel)
  expect(
    panel
      .findAll('input')
      .map((input) => (input.element as HTMLInputElement).value)
      .join(''),
  ).toBe('')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  expect(owner.emitted('change')).toBeUndefined()
  panel.vm.$emit('confirm')
  await flushPromises()
  expect(owner.emitted('update:modelValue')).toEqual([['']])
  expect(owner.emitted('change')).toEqual([['']])
})
test('focus does not open readonly or disabled deferred fields', async () => {
  for (const state of [{ disabled: true }, { readonly: true }, { readPretty: true }]) {
    const owner = render(VerificationCode, { editMode: mode, ...state })
    const instance = owner.vm as any
    expect(instance.focus).toBeTypeOf('function')
    instance.focus()
    await flushPromises()
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
    expect(owner.findAll('input')).toHaveLength(0)
  }
})
test('a queued method cannot run after the owner unmounts', async () => {
  const owner = render(VerificationCode, { editMode: mode })
  const instance = owner.vm as any
  const focus = instance.focus
  expect(focus).toBeTypeOf('function')
  focus(2)
  owner.unmount()
  await flushPromises()
  expect(document.activeElement?.closest('[role=dialog]')).toBeNull()
  expect(() => focus()).not.toThrow()
})

test('controlled refusal leaves the editor closed and preserves a callable method', async () => {
  const owner = render(VerificationCode, { editMode: mode, open: false })
  const focus = (owner.vm as any).focus
  expect(focus).toBeTypeOf('function')
  focus(2)
  await flushPromises()
  expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
  expect(owner.findAll('input')).toHaveLength(0)
  expect(owner.emitted('update:open')).toEqual([[true]])
})
test('only the latest queued explicit focus index applies', async () => {
  const owner = render(VerificationCode, { editMode: mode, defaultValue: '1234' })
  const focus = (owner.vm as any).focus
  focus(1)
  focus(3)
  await flushPromises()
  expect(document.activeElement).toBe(owner.getComponent(EditorPanel).findAll('input')[3].element)
})
test('mode changes retire queued actions and live native refs never retain disposed inputs', async () => {
  const owner = render(Textarea, { editMode: 'direct', defaultValue: 'notes' })
  const instance = owner.vm as any
  const old = instance.textareaRef
  const focus = instance.focus
  expect(old).toBe(owner.get('textarea').element)
  await owner.setProps({ editMode: mode })
  expect(instance.textareaRef).toBeUndefined()
  focus()
  await owner.setProps({ readPretty: true })
  await flushPromises()
  expect(owner.find('textarea').exists()).toBe(false)
  expect(instance.textareaRef).toBeUndefined()
  await owner.setProps({ readPretty: false })
  focus()
  await flushPromises()
  expect(instance.focus).toBe(focus)
  expect(instance.textareaRef).not.toBe(old)
  expect(instance.textareaRef).toBe(owner.getComponent(EditorPanel).get('textarea').element)
})

test('deactivation retires a queued focus and stored methods work after activation', async () => {
  const active = ref(true),
    code = ref<any>()
  const owner = render(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, null, () =>
          active.value ? h(VerificationCode, { ref: code, editMode: mode, defaultValue: '1234' }) : null,
        ),
    }),
    {},
  )
  const focus = code.value.focus
  focus(1)
  active.value = false
  await flushPromises()
  expect(document.activeElement?.closest('[role=dialog]')).toBeNull()
  active.value = true
  await flushPromises()
  focus(3)
  await flushPromises()
  expect(document.activeElement).toBe(owner.getComponent(EditorPanel).findAll('input')[3].element)
})
