import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Button from '..'
import Form, { FormItem } from '../../form'
import { RadioGroup } from '../../radio'
import Space from '../../space'
import LoadingDemo from '../example/demos/loading.vue'

test('loading demo exposes its few options and disables only the inapplicable size control', async () => {
  const wrapper = mount(LoadingDemo, {
    global: {
      components: { MpForm: Form, MpFormItem: FormItem, MpRadioGroup: RadioGroup, MpSpace: Space, MpButton: Button },
    },
  })
  try {
    expect(wrapper.findAll('[role="radiogroup"]')).toHaveLength(2)
    expect(wrapper.find('[role="combobox"]').exists()).toBe(false)
    await wrapper.get('[aria-label="Loading mode"] input[value="line"]').setValue(true)
    expect(wrapper.findAllComponents(Button)).toHaveLength(1)
    expect(wrapper.findComponent(Button).props('loadingMode')).toBe('line')
    expect(wrapper.get('[aria-label="Loading size"]').attributes('aria-disabled')).toBe('true')
    expect(wrapper.findAll('[aria-label="Loading size"] input').every((input) => input.element.disabled)).toBe(true)
    await wrapper.get('[aria-label="Loading mode"] input[value="fill"]').setValue(true)
    await wrapper.get('[aria-label="Loading size"] input[value="xl"]').setValue(true)
    expect(wrapper.findAllComponents(Button)).toHaveLength(5)
    for (const button of wrapper.findAllComponents(Button)) {
      expect(button.props('loadingMode')).toBe('fill')
      expect(button.props('loadingSize')).toBe('xl')
    }
  } finally {
    wrapper.unmount()
  }
})
