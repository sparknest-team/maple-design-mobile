import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import Input from '../../input/Input.vue'
import Textarea from '../../textarea/Textarea.vue'

describe('form control inheritance', () => {
  test('inherits size and readonly and permits explicit local overrides', () => {
    const wrapper = mount(
      defineComponent({
        components: { Form, FormItem, Input },
        template: `
        <Form size="xl" readonly disabled>
          <FormItem :disabled="false">
            <Input :readonly="false" />
          </FormItem>
        </Form>
      `,
      }),
    )

    const input = wrapper.get('input')
    expect(wrapper.get('.mp-field-decorator').classes()).toContain('mp-field-decorator--size-xl')
    expect(input.attributes('disabled')).toBeUndefined()
    expect(input.attributes('readonly')).toBeUndefined()
    wrapper.unmount()
  })

  test('inherits disabled and readonly when controls omit them', () => {
    const wrapper = mount(
      defineComponent({
        components: { Form, FormItem, Input },
        template: '<Form disabled readonly><FormItem><Input /></FormItem></Form>',
      }),
    )

    const input = wrapper.get('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('readonly')).toBeDefined()
    wrapper.unmount()
  })

  test('Textarea inherits form state and accepts explicit local overrides', () => {
    const wrapper = mount(
      defineComponent({
        components: { Form, FormItem, Textarea },
        template:
          '<Form size="xl" readonly disabled><FormItem><Textarea :readonly="false" :disabled="false" /></FormItem></Form>',
      }),
    )
    expect(wrapper.get('.mp-field-decorator').classes()).toContain('mp-field-decorator--size-xl')
    expect(wrapper.get('textarea').attributes('readonly')).toBeUndefined()
    expect(wrapper.get('textarea').attributes('disabled')).toBeUndefined()
    wrapper.unmount()

    const inherited = mount(
      defineComponent({
        components: { Form, FormItem, Textarea },
        template: '<Form readonly disabled><FormItem><Textarea /></FormItem></Form>',
      }),
    )
    expect(inherited.get('textarea').attributes('readonly')).toBeDefined()
    expect(inherited.get('textarea').attributes('disabled')).toBeDefined()
    inherited.unmount()
  })
})
