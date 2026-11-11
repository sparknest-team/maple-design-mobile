import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import Input from '../index'

test.each(['prop', 'inputAttrs'] as const)(
  'the explicit input name from %s takes precedence over the form label in deferred editing',
  async (source) => {
    const name = ref<string | undefined>('Account nickname')
    const wrapper = mount(Form, {
      props: { model: { value: '' } },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: 'Account' }, () =>
            h(Input, {
              editMode: 'popup',
              ...(source === 'prop' ? { ariaLabel: name.value } : { inputAttrs: { 'aria-label': name.value } }),
            }),
          ),
      },
    })
    try {
      const reference = () => wrapper.get('button.mp-field-presentation__reference')
      expect(reference().attributes('aria-label')).toBe('Account nickname')
      name.value = 'Login nickname'
      await nextTick()
      expect(reference().attributes('aria-label')).toBe('Login nickname')
      name.value = undefined
      await nextTick()
      expect(reference().attributes('aria-label')).toBe('Account')
    } finally {
      wrapper.unmount()
    }
  },
)
