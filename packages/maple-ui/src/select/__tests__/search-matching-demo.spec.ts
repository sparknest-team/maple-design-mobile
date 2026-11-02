import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Select from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import { RadioGroup } from '../../radio'
import Switch from '../../switch'
import Demo from '../example/demos/search-matching.vue'

useDemoControls()

test('search matching demo supports value OR label using searchFields and caseSensitive props', async () => {
  const owner = mount(Demo, {
    global: {
      components: { MpSelect: Select, MpSwitch: Switch },
      stubs: { MpSpace: { template: '<div><slot /></div>' } },
    },
  })
  try {
    const mode = owner.findComponent(RadioGroup)
    const field = owner.findComponent(Select)
    expect(field.props('filterable')).toBe(true)
    expect(field.props('caseSensitive')).toBe(false)
    mode.vm.$emit('update:modelValue', 'both')
    await flushPromises()
    expect(field.props('searchFields')).toEqual(['value', 'label'])
    expect(field.props('filterable')).toBe(true)
    owner.getComponent(Switch).vm.$emit('update:modelValue', true)
    await flushPromises()
    expect(field.props('caseSensitive')).toBe(true)
    expect(field.props('searchFields')).toEqual(['value', 'label'])
    field.vm.$emit('update:modelValue', 'USER_A')
    await flushPromises()
    expect(field.props('modelValue')).toBe('USER_A')
  } finally {
    owner.unmount()
  }
})
