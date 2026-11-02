import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Checkbox from '../../checkbox'
import Input from '../../input'
import { RadioGroup } from '../../radio'
import Space from '../../space'
import EnglishDemo from '../example/demos/en-US/layout-comparison.vue'
import Demo from '../example/demos/layout-comparison.vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

it.each([Demo, EnglishDemo])('switches form and item layouts without losing entered values', async (component) => {
  const wrapper = mount(component, {
    global: {
      components: {
        MpForm: Form,
        MpCheckbox: Checkbox,
        MpFormItem: FormItem,
        MpInput: Input,
        MpRadioGroup: RadioGroup,
        MpSpace: Space,
      },
    },
  })
  try {
    const form = wrapper.get('.layout-comparison-form')
    await form.findAll('input')[0].setValue('Maple')
    const controls = wrapper.findAllComponents(RadioGroup)
    const items = () => form.findAllComponents(FormItem)
    for (const layout of ['vertical', 'horizontal', 'inline']) {
      await controls[0].get(`input[value="${layout}"]`).setValue(true)
      for (const item of items()) {
        expect(item.classes()).toContain(`mp-form-item--${layout}`)
      }
      expect(form.findAll('input')[0].element.value).toBe('Maple')
      for (const override of ['vertical', 'horizontal', 'inline']) {
        await controls[1].get(`input[value="${override}"]`).setValue(true)
        expect(items()[0].classes()).toContain(`mp-form-item--${layout}`)
        expect(items()[2].classes()).toContain(`mp-form-item--${override}`)
        expect(items()[2].get('.mp-form-item__help').text()).not.toBe('')
      }
      await controls[1].get('input[value="inherit"]').setValue(true)
      expect(items()[2].classes()).toContain(`mp-form-item--${layout}`)
    }
    expect(wrapper.get('[role="status"]').text()).toContain('Maple')
  } finally {
    wrapper.unmount()
  }
})

it.each([Demo, EnglishDemo])(
  'toggles readPretty independently for every presentation, layout and alignment',
  async (component) => {
    const wrapper = mount(component, {
      global: {
        components: {
          MpForm: Form,
          MpFormItem: FormItem,
          MpInput: Input,
          MpRadioGroup: RadioGroup,
          MpSpace: Space,
          MpCheckbox: Checkbox,
        },
      },
    })
    try {
      const form = wrapper.get('.layout-comparison-form')
      await form.findAll('input')[0].setValue('Alignment preview')
      const controls = wrapper.findAllComponents(RadioGroup)
      const toggle = wrapper.get('input[type="checkbox"]')
      for (const layout of ['vertical', 'horizontal', 'inline']) {
        await controls[0].get(`input[value="${layout}"]`).setValue(true)
        for (const editMode of ['direct', 'popup']) {
          await controls[2].get(`input[value="${editMode}"]`).setValue(true)
          for (const readPretty of [false, true]) {
            await toggle.setValue(readPretty)
            await flushPromises()
            expect(wrapper.findAllComponents(Form)[1].props('editMode')).toBe(editMode)
            expect(wrapper.findAllComponents(Form)[1].props('readPretty')).toBe(readPretty)
            expect((controls[2].get(`input[value="${editMode}"]`).element as HTMLInputElement).checked).toBe(true)
            expect(form.findAllComponents(FormItem)).toHaveLength(3)
            for (const item of form.findAllComponents(FormItem)) {
              expect(item.classes()).toContain(`mp-form-item--${layout}`)
            }
            if (readPretty) {
              expect(form.findAll('.mp-field-presentation__read')).toHaveLength(3)
              expect(form.findAll('.mp-field-presentation__reference')).toHaveLength(0)
              expect(form.findAll('input')).toHaveLength(0)
            } else if (editMode === 'direct') {
              expect(form.findAll('input')[0].element.value).toBe('Alignment preview')
              expect(form.findAll('.mp-field-presentation__read')).toHaveLength(0)
            } else {
              expect(form.findAll('.mp-field-presentation__reference')).toHaveLength(3)
            }
            for (const align of ['left', 'center', 'right']) {
              await controls[3].get(`input[value="${align}"]`).setValue(true)
              for (const content of form.findAll('.mp-form-item__content')) {
                expect((content.element as HTMLElement).style.textAlign).toBe(align)
              }
            }
            expect(form.get('.mp-form-item__help').text()).not.toBe('')
            expect(wrapper.get('[role="status"]').text()).toContain('Alignment preview')
            expect((toggle.element as HTMLInputElement).disabled).toBe(false)
          }
        }
      }
      await toggle.setValue(false)
      await controls[2].get('input[value="direct"]').setValue(true)
      expect(form.findAll('input')[0].element.value).toBe('Alignment preview')
    } finally {
      wrapper.unmount()
    }
  },
)
