import { describe, expect, it } from 'vitest'
import SelectMenu from '../SelectMenu'

type MenuProps = InstanceType<typeof SelectMenu>['$props']
type NotAny<T> = 0 extends 1 & T ? never : true
const typedController: NotAny<MenuProps['controller']> = true
// @ts-expect-error the controller remains required
const missingController: MenuProps = {}
// @ts-expect-error an empty object is not a complete selection controller
const invalidController: MenuProps = { controller: {} }

describe('selection menu declaration contract', () => {
  it('retains the required typed controller and runtime prop validation', () => {
    expect(typedController).toBe(true)
    expect(SelectMenu.props.controller.required).toBe(true)
  })
})
void [missingController, invalidController]
