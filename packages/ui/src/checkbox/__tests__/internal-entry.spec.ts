import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('base controls share public identities, defaults and group installation', async () => {
  const Button = (await import('../../button/base')).default
  const Checkbox = (await import('../base')).default
  const { buttonProps } = await import('../../button/props')
  const { checkboxProps } = await import('../props')
  expect(Button).not.toHaveProperty('Group')
  expect(Checkbox).not.toHaveProperty('Group')
  const oldSize = buttonProps.size
  const oldRipple = checkboxProps.ripple
  Button.setPropsDefaults({ size: 'sm' })
  Checkbox.setPropsDefaults({ ripple: false })
  const preButton = mount(Button)
  const preCheckbox = mount(Checkbox)
  expect(preButton.props('size')).toBe('sm')
  expect(preCheckbox.props('ripple')).toBe(false)
  preButton.unmount()
  preCheckbox.unmount()
  const buttonPublic = await import('../../button')
  const checkboxPublic = await import('../index')
  expect(Button).toBe(buttonPublic.default)
  expect(Checkbox).toBe(checkboxPublic.default)
  try {
    buttonPublic.default.setPropsDefaults({ size: 'sm' })
    checkboxPublic.default.setPropsDefaults({ ripple: false })
    const b = mount(Button)
    const c = mount(Checkbox)
    expect(b.props('size')).toBe('sm')
    expect(c.props('ripple')).toBe(false)
    b.unmount()
    c.unmount()
    const app = createApp({})
    app.use(buttonPublic.default)
    app.use(checkboxPublic.default)
    expect(app.component(buttonPublic.ButtonGroup.name!)).toBe(buttonPublic.ButtonGroup)
    expect(app.component(checkboxPublic.CheckboxGroup.name!)).toBe(checkboxPublic.CheckboxGroup)
  } finally {
    buttonProps.size = oldSize
    checkboxProps.ripple = oldRipple
  }
}, 20000)
