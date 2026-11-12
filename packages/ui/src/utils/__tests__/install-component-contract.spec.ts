import { createApp } from 'vue'
import { expect, test } from 'vitest'
import Breadcrumb, { BreadcrumbItem } from '../../breadcrumb'
import Checkbox, { CheckboxGroup } from '../../checkbox'
import Menu, { MenuOption } from '../../menu'
import Radio, { RadioGroup } from '../../radio'

test('installable public entries register their component and subcomponent', () => {
  const app = createApp({})
  for (const [component, child] of [
    [Breadcrumb, BreadcrumbItem],
    [Checkbox, CheckboxGroup],
    [Menu, MenuOption],
    [Radio, RadioGroup],
  ] as const) {
    app.use(component)
    expect(app.component(component.name!)).toBe(component)
    expect(app.component(child.name!)).toBe(child)
  }
})
