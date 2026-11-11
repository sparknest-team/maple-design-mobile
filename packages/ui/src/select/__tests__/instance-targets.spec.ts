import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Select from '..'
import { fieldEditModeProp, type FieldEditMode } from '../../_components/field-presentation/context'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import FieldReference from '../../_components/field-presentation/FieldReference.vue'
import PeopleSelect from '../../people-select'

const deferred = (fieldEditModeProp.validator('click') ? 'click' : 'popup') as FieldEditMode
const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
function render(component: any, props: Record<string, unknown>) {
  const owner = mount(component, {
    props: { filterable: true, options: [{ value: 'a', label: 'Ada' }], ...props },
    attachTo: document.body,
  })
  owners.push(owner)
  return owner
}
test('Select direct focus and blur use its native input', async () => {
  const owner = render(Select, { editMode: 'direct' })
  const instance = owner.vm as any
  instance.focus()
  await flushPromises()
  expect(document.activeElement).toBe(owner.get('input').element)
  instance.blur()
  expect(document.activeElement).not.toBe(owner.get('input').element)
})
test('closed Select focus targets its reference without opening a panel', async () => {
  const owner = render(Select, { editMode: deferred })
  const instance = owner.vm as any
  instance.focus()
  await flushPromises()
  const presentation = owner.getComponent(FieldPresentation)
  expect(presentation.props('open')).toBe(false)
  const reference = presentation.getComponent(FieldReference).element
  expect(document.activeElement).toBe(reference.matches('button') ? reference : reference.querySelector('button'))
})
test('open Select blur uses the active editor instead of an absent outer field', async () => {
  const owner = render(Select, { editMode: deferred, open: true })
  await flushPromises()
  const input = owner.getComponent(EditorPanel).get('input')
  input.element.focus()
  expect(document.activeElement).toBe(input.element)
  ;(owner.vm as any).blur()
  expect(document.activeElement).not.toBe(input.element)
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})
test('PeopleSelect direct focus reaches the actual Select input', async () => {
  const owner = render(PeopleSelect, { editMode: 'direct' })
  ;(owner.vm as any).focus()
  await flushPromises()
  expect(document.activeElement).toBe(owner.get('input').element)
})
test('PeopleSelect direct blur reaches the manually focused Select input', async () => {
  const owner = render(PeopleSelect, { editMode: 'direct' })
  const input = owner.get('input')
  input.element.focus()
  expect(document.activeElement).toBe(input.element)
  ;(owner.vm as any).blur()
  expect(document.activeElement).not.toBe(input.element)
})
test('PeopleSelect first closed focus opens its allowed editor and blur uses that editor', async () => {
  const owner = render(PeopleSelect, { editMode: deferred })
  const instance = owner.vm as any
  instance.focus()
  await flushPromises()
  const panel = owner.getComponent(EditorPanel)
  expect(panel.element.contains(document.activeElement)).toBe(true)
  instance.blur()
  expect(panel.element.contains(document.activeElement)).toBe(false)
  expect(owner.emitted('change')).toBeUndefined()
})

for (const [name, component] of [
  ['Select', Select],
  ['PeopleSelect', PeopleSelect],
] as const) {
  test(`${name} direct readonly remains focusable without changing a value`, async () => {
    const owner = render(component, { editMode: 'direct', readonly: true })
    const input = owner.get('input')
    ;(owner.vm as any).focus()
    await flushPromises()
    expect(document.activeElement).toBe(input.element)
    expect(input.attributes('readonly')).toBeDefined()
    ;(owner.vm as any).blur()
    expect(document.activeElement).not.toBe(input.element)
    expect(owner.emitted('change')).toBeUndefined()
  })
  test(`${name} direct disabled cannot gain native focus`, async () => {
    const owner = render(component, { editMode: 'direct', disabled: true })
    ;(owner.vm as any).focus()
    await flushPromises()
    expect(document.activeElement).not.toBe(owner.get('input').element)
    expect(owner.emitted('change')).toBeUndefined()
  })
  for (const state of ['disabled', 'readonly', 'readPretty'] as const) {
    test(`${name} deferred ${state} does not open from focus`, async () => {
      const owner = render(component, { editMode: deferred, [state]: true })
      ;(owner.vm as any).focus()
      await flushPromises()
      expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
      expect(owner.emitted('change')).toBeUndefined()
    })
  }
  test(`${name} saved blur targets a reopened editor`, async () => {
    const owner = render(component, { editMode: deferred })
    const instance = owner.vm as any
    const blur = instance.blur
    const open = async () => {
      if (name === 'PeopleSelect') {
        instance.focus()
      } else {
        const reference = owner.getComponent(FieldReference)
        await (reference.element.matches('button') ? reference : reference.get('button')).trigger('click')
      }
      await flushPromises()
    }
    await open()
    const old = owner.getComponent(EditorPanel).get('input').element
    old.focus()
    blur()
    expect(document.activeElement).not.toBe(old)
    owner.getComponent(EditorPanel).vm.$emit('cancel')
    await flushPromises()
    await open()
    const input = owner.getComponent(EditorPanel).get('input').element
    expect(input.isConnected).toBe(true)
    input.focus()
    blur()
    expect(document.activeElement).not.toBe(input)
    expect(owner.emitted('change')).toBeUndefined()
  })
  test(`${name} retained focus/blur after disposal cannot steal another input focus`, async () => {
    const owner = render(component, { editMode: 'direct' })
    const instance = owner.vm as any
    const focus = instance.focus,
      blur = instance.blur
    owner.unmount()
    const external = document.createElement('input')
    document.body.append(external)
    external.focus()
    try {
      focus()
      blur()
      await flushPromises()
      expect(document.activeElement).toBe(external)
    } finally {
      external.remove()
    }
  })
}
test('controlled Select KeepAlive activation and blur use the current editor', async () => {
  const active = ref(true),
    select = ref<any>()
  const owner = render(
    defineComponent({
      setup: () => () =>
        h('div', [
          h('input', { id: 'external-activation' }),
          h(KeepAlive, null, () =>
            active.value
              ? h(Select, {
                  ref: select,
                  open: true,
                  filterable: true,
                  options: [{ value: 'a', label: 'Ada' }],
                  editMode: deferred,
                })
              : null,
          ),
        ]),
    }),
    {},
  )
  await flushPromises()
  const blur = select.value.blur
  active.value = false
  await flushPromises()
  const external = owner.get('#external-activation').element as HTMLInputElement
  external.focus()
  blur()
  expect(document.activeElement).toBe(external)
  active.value = true
  await flushPromises()
  select.value.focus()
  const input = owner.getComponent(EditorPanel).get('input').element
  expect(document.activeElement).toBe(input)
  blur()
  expect(document.activeElement).not.toBe(input)
})
