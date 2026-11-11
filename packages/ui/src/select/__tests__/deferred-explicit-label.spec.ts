import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Select from '..'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'

test('explicit label follows the deferred select through open and close', async () => {
  const id = ref('choice-a')
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { model: { value: null } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Choose item', labelAttrs: { for: id.value } }, () =>
          h(Select, {
            id: id.value,
            editMode: 'popup',
            popupContainer: false,
            options: [{ label: 'One', value: 'one' }],
          }),
        ),
    },
  })
  try {
    const reference = () => wrapper.get('button.mp-field-presentation__reference')
    const label = () => wrapper.get('label').element as HTMLLabelElement
    expect(label().control).toBe(reference().element)
    expect(reference().attributes('id')).toBe('choice-a')
    id.value = 'choice-b'
    await nextTick()
    expect(label().control).toBe(reference().element)
    expect(reference().attributes('id')).toBe('choice-b')
    await reference().trigger('click')
    await flushPromises()
    await new Promise((resolve) => setTimeout(resolve, 30))
    await flushPromises()
    expect(wrapper.findAll('[id="choice-b"]')).toHaveLength(1)
    expect(label().control).toBe(reference().element)
    wrapper.getComponent(FieldPresentation).vm.$emit('cancel')
    await flushPromises()
    expect(label().control).toBe(reference().element)
    expect(wrapper.findAll('[id="choice-b"]')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})
