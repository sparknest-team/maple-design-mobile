import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DateField from '../../date'
import Select from '../../select'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const cases = [
  ['date', DateField],
  ['select', Select],
] as const

test.each(cases)('%s associates an explicit label with the icon editor button', async (_name, component) => {
  const id = ref('field-a')
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { value: null } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Field', labelAttrs: { for: id.value } }, () =>
          h(component as any, { id: id.value, editMode: 'popup', openTriggerTarget: 'icon' }),
        ),
    },
  })
  try {
    const button = () => wrapper.get('button.mp-field-presentation__' + 'open-trigger')
    const label = () => wrapper.get('label').element as HTMLLabelElement
    expect(label().control).toBe(button().element)
    expect(wrapper.findAll('[id="field-a"]')).toHaveLength(1)
    id.value = 'field-b'
    await nextTick()
    expect(label().control).toBe(button().element)
    expect(wrapper.findAll('[id="field-b"]')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})
