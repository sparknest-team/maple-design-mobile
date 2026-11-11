import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '../../input'
import Demo from '../example/demos/decoration.vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('repeated decoration examples associate each input with its own label', () => {
  const wrapper = mount(defineComponent({ render: () => h('div', [h(Demo), h(Demo)]) }), {
    attachTo: document.body,
    global: { components: { 'mp-form': Form, 'mp-form-item': FormItem, 'mp-input': Input } },
  })
  try {
    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(4)
    const nameInputs = [inputs[0].element, inputs[2].element]
    expect(nameInputs[0].id).not.toBe(nameInputs[1].id)
    for (const input of nameInputs) {
      expect(input.labels).toHaveLength(1)
      expect(input.labels[0].textContent).toContain('公开名称')
    }
    for (const input of [inputs[1].element, inputs[3].element]) {
      const id = input.getAttribute('aria-labelledby')
      expect(id).toBeTruthy()
      expect(document.getElementById(id).textContent).toContain('备注')
      expect(input.closest('form').contains(document.getElementById(id))).toBe(true)
    }
  } finally {
    wrapper.unmount()
  }
})
