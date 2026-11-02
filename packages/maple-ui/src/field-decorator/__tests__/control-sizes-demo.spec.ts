import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Button from '../../button'
import Cascader from '../../cascader'
import Checkbox from '../../checkbox'
import Input from '../../input'
import Radio, { RadioGroup } from '../../radio'
import Select from '../../select'
import Space from '../../space'
import Textarea from '../../textarea'
import Demo from '../example/demos/control-sizes.vue'

test('selected controls retain size and support clear, tag removal and restoring values', async () => {
  const wrapper = mount(Demo, {
    global: {
      components: {
        MpInput: Input,
        MpCheckbox: Checkbox,
        MpTextarea: Textarea,
        MpButton: Button,
        MpSelect: Select,
        MpCascader: Cascader,
        MpRadio: Radio,
        MpRadioGroup: RadioGroup,
        MpSpace: Space,
      },
      stubs: {
        MpDate: true,
        MpTime: true,
        MpDateRange: true,
        MpTimeRange: true,
        MpInputNumber: true,
        MpAutoComplete: true,
      },
    },
  })
  const cell = (name: string) => wrapper.get(`[data-control="${name}"]`)
  const controls = [
    'InputValue',
    'SelectValue',
    'CascaderValue',
    'SelectMultiple',
    'CascaderMultiple',
    'SelectOverflow',
    'CascaderOverflow',
  ]
  try {
    const groups = wrapper.findAllComponents(RadioGroup)
    for (const variant of ['outline', 'filled', 'standard']) {
      groups[1].vm.$emit('update:modelValue', variant)
      for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
        groups[0].vm.$emit('update:modelValue', size)
        await nextTick()
        for (const name of controls) {
          const field = cell(name).get('.mp-field-decorator')
          expect(field.classes()).toContain(`mp-field-decorator--size-${size}`)
          expect(field.classes()).toContain(`mp-field-decorator--variant-${variant}`)
        }
        for (const name of ['SelectMultiple', 'CascaderMultiple', 'SelectOverflow', 'CascaderOverflow']) {
          expect(cell(name).get('.mp-selection-field').classes()).toContain('mp-selection-field--nowrap')
        }
      }
    }
    for (const name of ['SelectMultiple', 'CascaderMultiple']) {
      expect(cell(name).findAll('.mp-tag')).toHaveLength(2)
      await cell(name).findAll('.mp-tag__close-btn')[0].trigger('click')
      expect(cell(name).findAll('.mp-tag')).toHaveLength(1)
    }
    for (const name of controls) {
      await cell(name).get('.mp-field-decorator__clear-btn').trigger('click')
      expect(cell(name).find('.mp-field-decorator__clear-btn').exists()).toBe(false)
      expect(cell(name).get('.mp-field-decorator').classes()).toContain('mp-field-decorator--size-xl')
    }
    await wrapper.get('.control-size-comparison__states').findComponent(Button).trigger('click')
    for (const name of controls) {
      expect(cell(name).find('.mp-field-decorator__clear-btn').exists()).toBe(true)
    }
    for (const name of ['SelectMultiple', 'CascaderMultiple']) {
      expect(cell(name).findAll('.mp-tag')).toHaveLength(2)
    }
    for (const name of ['SelectOverflow', 'CascaderOverflow']) {
      expect(cell(name).findAll('.mp-tag')).toHaveLength(3)
    }
  } finally {
    wrapper.unmount()
  }
})
