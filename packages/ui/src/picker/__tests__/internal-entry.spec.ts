import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('internal Picker shares public component, defaults and service installation', async () => {
  const component = (await import('../base')).default
  const { props } = await import('../props')
  const original = props.optionHeight
  try {
    component.setPropsDefaults({ optionHeight: 50 })
    const first = mount(component)
    expect(first.props('optionHeight')).toBe(50)
    first.unmount()
    const api = await import('../index')
    expect(api._PickerComponent).toBe(component)
    expect(api.default.Component).toBe(component)
    expect(typeof api.default).toBe('function')
    expect(typeof api.default.close).toBe('function')
    api.default.setPropsDefaults({ optionHeight: 32 })
    const second = mount(component)
    expect(second.props('optionHeight')).toBe(32)
    second.unmount()
    const app = createApp({})
    app.use(api.default)
    expect(app.component(component.name!)).toBe(component)
  } finally {
    props.optionHeight = original
  }
}, 20000)
