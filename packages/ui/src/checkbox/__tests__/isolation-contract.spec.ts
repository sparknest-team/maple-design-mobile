import { h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Checkbox, { CheckboxGroup } from '..'
import Radio, { RadioGroup } from '../../radio'

for (const [name, Control, Group, model] of [
  ['Checkbox', Checkbox, CheckboxGroup, ['a']],
  ['Radio', Radio, RadioGroup, 'a'],
] as const) {
  test(`${name} group isolation is a mount-time choice and remounting applies it without changing the group model`, async () => {
    const isolated = ref(false),
      key = ref(0)
    const owner = mount(Group as any, {
      props: { editMode: 'direct', modelValue: model },
      slots: {
        default: () =>
          h(Control as any, { editMode: 'direct', value: 'a', uninjectGroupContext: isolated.value, key: key.value }),
      },
    })
    try {
      expect(owner.get('input').element.checked).toBe(true)
      isolated.value = true
      await flushPromises()
      expect(owner.get('input').element.checked).toBe(true)
      key.value++
      await flushPromises()
      expect(owner.get('input').element.checked).toBe(false)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
    } finally {
      owner.unmount()
    }
  })
}
