import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Switch from '..'
import Form, { FormItem } from '../../form'

const wrappers = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
const render = (state, controlProps = {}, itemProps = {}) => {
  const wrapper = mount({
    setup: () => () =>
      h(Form, { model: {}, ...state.value }, () =>
        h(FormItem, { field: 'value', ...itemProps }, () => h(Switch, { editMode: 'direct', ...controlProps })),
      ),
  })
  wrappers.push(wrapper)
  return { wrapper, control: wrapper.findComponent(Switch), button: wrapper.get('button[role="switch"]') }
}

describe('Switch published form-state contract', () => {
  test.each(['disabled', 'readonly'])('inherits %s and permits an explicit false override', async (key) => {
    const state = ref({ [key]: true })
    const inherited = render(state)
    const overridden = render(state, { [key]: false })
    await inherited.button.trigger('click')
    expect(inherited.control.emitted('change')).toBeUndefined()
    expect(inherited.button.attributes(key === 'disabled' ? 'disabled' : 'aria-readonly')).toBeDefined()
    await overridden.button.trigger('click')
    expect(overridden.control.emitted('update:modelValue')).toEqual([[true]])
    expect(overridden.control.emitted('change')).toHaveLength(1)
    state.value[key] = false
    await nextTick()
    await inherited.button.trigger('click')
    expect(inherited.control.emitted('update:modelValue')).toEqual([[true]])
  })
  test.each(['disabled', 'readonly'])('inherits %s directly from Form without FormItem', async (key) => {
    const wrapper = mount({
      render: () => h(Form, { model: {}, [key]: true }, () => h(Switch, { editMode: 'direct' })),
    })
    wrappers.push(wrapper)
    await wrapper.get('button[role="switch"]').trigger('click')
    expect(wrapper.findComponent(Switch).emitted('change')).toBeUndefined()
  })
  test.each(['disabled', 'readonly'])('FormItem %s overrides Form and is inherited by Switch', async (key) => {
    const enabled = render(ref({ [key]: true }), {}, { [key]: false })
    await enabled.button.trigger('click')
    expect(enabled.control.emitted('change')).toHaveLength(1)
    const blocked = render(ref({ [key]: false }), {}, { [key]: true })
    await blocked.button.trigger('click')
    expect(blocked.control.emitted('change')).toBeUndefined()
  })
  test.each(['disabled', 'readonly'])('parent %s invalidates a pending beforeChange', async (key) => {
    let finish
    const state = ref({ [key]: false })
    const { control, button } = render(state, {
      beforeChange: () =>
        new Promise((resolve) => {
          finish = resolve
        }),
    })
    await button.trigger('click')
    expect(button.attributes('aria-busy')).toBe('true')
    state.value[key] = true
    await nextTick()
    finish(true)
    await flushPromises()
    expect(control.emitted('change')).toBeUndefined()
    expect(button.attributes('aria-checked')).toBe('false')
  })
})
