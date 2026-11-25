import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import AutoComplete from '..'
import FieldDecorator, { fieldDecoratorProps } from '../../field-decorator'
import Input from '../../input'
import InputNumber from '../../input-number'
import Textarea from '../../textarea'
import Trigger, { triggerProps } from '../../trigger'

test('embedded fields and trigger honor defaults configured on the public components', () => {
  const hint = fieldDecoratorProps.hint.default
  const delay = triggerProps.mouseEnterDelay.default
  const wrappers = []
  try {
    FieldDecorator.setPropsDefaults({ hint: true })
    Trigger.setPropsDefaults({ mouseEnterDelay: 318 })
    const decorator = mount(FieldDecorator)
    wrappers.push(decorator)
    expect(decorator.props('hint')).toBe(true)
    for (const component of [Input, InputNumber, Textarea]) {
      const wrapper = mount(component, { props: { editMode: 'direct' } })
      wrappers.push(wrapper)
      expect(wrapper.getComponent(FieldDecorator).props('hint')).toBe(true)
    }
    const wrapper = mount(AutoComplete, { props: { editMode: 'direct' } })
    wrappers.push(wrapper)
    expect(wrapper.getComponent(Trigger).props('mouseEnterDelay')).toBe(318)
  } finally {
    wrappers.forEach((wrapper) => wrapper.unmount())
    FieldDecorator.setPropsDefaults({ hint })
    Trigger.setPropsDefaults({ mouseEnterDelay: delay })
  }
})
