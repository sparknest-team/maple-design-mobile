import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import Radio, { RadioGroup } from '../../radio'
import Checkbox, { CheckboxGroup } from '../index'

const language = vi.hoisted(() => ({ callbacks: [] }))
vi.mock('@maple-design/cli/client', () => ({
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
        ? (await import('../example/demos/group-declaration-comparison.vue')).default
        : (await import('../../radio/example/demos/group-declaration-comparison.vue')).default
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
    const panel = wrapper.get(`[data-comparison-scene="${kind}-group-options"]`)
    const group = wrapper
      .findAllComponents(kind === 'checkbox' ? CheckboxGroup : RadioGroup)
      .find((group) => panel.element.contains(group.element))
    expect(panel.text()).toContain('Eat')
    const input = panel.find('input')
    input.element.checked = true
    await input.trigger('change')
    await flushPromises()
    expect(group.props('modelValue')).toEqual(kind === 'checkbox' ? [0] : 0)
    language.callbacks.forEach((callback) => callback('zh-CN'))
    await nextTick()
    expect(panel.text()).toContain('吃饭')
    expect(panel.find('input').element.checked).toBe(true)
    expect(group.props('modelValue')).toEqual(kind === 'checkbox' ? [0] : 0)
    wrapper.unmount()
  })
}
