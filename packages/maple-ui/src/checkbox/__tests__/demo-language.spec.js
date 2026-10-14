import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import Radio, { RadioGroup } from '../../radio'
import Checkbox, { CheckboxGroup } from '../index'

const language = vi.hoisted(() => ({ callbacks: [] }))
vi.mock('@maplejs/maple-cli/client', () => ({
  watchLang(callback) {
    language.callbacks.push(callback)
    callback('en-US')
  },
}))

afterEach(() => {
  language.callbacks.length = 0
})

for (const kind of ['checkbox', 'radio']) {
  it(`${kind} demo translates labels without changing selected numeric identity`, async () => {
    const Demo =
      kind === 'checkbox'
        ? (await import('../example/demos/checkbox-group-options.vue')).default
        : (await import('../../radio/example/demos/radio-group-options.vue')).default
    const wrapper = mount(Demo, {
      global: {
        components: {
          MpCheckbox: Checkbox,
          MpCheckboxGroup: CheckboxGroup,
          MpRadio: Radio,
          MpRadioGroup: RadioGroup,
        },
      },
    })
    expect(wrapper.text()).toContain('Eat')
    const input = wrapper.find('input')
    input.element.checked = true
    await input.trigger('change')
    expect(wrapper.text()).toContain('0')
    language.callbacks.forEach((callback) => callback('zh-CN'))
    await nextTick()
    expect(wrapper.text()).toContain('吃饭')
    expect(wrapper.find('input').element.checked).toBe(true)
    expect(wrapper.findComponent(kind === 'checkbox' ? CheckboxGroup : RadioGroup).props('modelValue')).toEqual(
      kind === 'checkbox' ? [0] : 0,
    )
    wrapper.unmount()
  })
}
