import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Checkbox from '../../../checkbox'
import Slider from '../../../slider'
import Switch from '../../../switch'
import Upload from '../../../upload'
import FieldPresentation from '../FieldPresentation.vue'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
for (const [name, Component, initial] of [
  ['Switch', Switch, true],
  ['Checkbox', Checkbox, true],
  ['Slider', Slider, 25],
  ['Upload', Upload, [{ name: 'a.txt', uid: 'a', status: 'done' }]],
] as const) {
  test(`${name} popup clear is a nullable draft; cancelling preserves the model and confirming commits once`, async () => {
    const owner = mount(Component as any, {
      props: {
        editMode: 'popup',
        defaultValue: initial,
        defaultOpen: true,
        clearable: true,
        emptyValue: null,
        popupContainer: false,
      },
    })
    owners.push(owner)
    await flushPromises()
    const field = owner.getComponent(FieldPresentation)
    field.vm.$emit('clear')
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    field.vm.$emit('cancel')
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    field.vm.$emit('open', true)
    await flushPromises()
    field.vm.$emit('clear')
    field.vm.$emit('confirm')
    await flushPromises()
    expect(owner.emitted('update:modelValue')).toEqual([[null]])
  })
}
