import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/demos/default-state.vue'

// This test covers the demo's parent proposal gates, independent of panel open normalization.
const TimeRange = defineComponent({
  name: 'MpTimeRange',
  props: ['modelValue', 'open'],
  emits: ['update:modelValue', 'update:open'],
  template: '<div />',
})

useDemoControls()

it('controlled demo rejects proposals without mutating parent state, then accepts new requests', async () => {
  const wrapper = mount(Demo, {
    attachTo: document.body,
    global: { components: { MpTimeRange: TimeRange } },
  })
  const field = wrapper.findAllComponents(TimeRange).find((item) => item.props('modelValue') !== undefined)
  const controls = wrapper.findAll('input[type="checkbox"]')
  await controls[0].setValue(false)
  await controls[1].setValue(false)
  field.vm.$emit('update:modelValue', ['11:00', '12:00'])
  field.vm.$emit('update:open', true)
  await nextTick()
  expect(field.props('modelValue')).toEqual(['09:00', '10:00'])
  expect(field.props('open')).toBe(false)
  expect(wrapper.get('output[aria-label="Controlled proposals"]').text()).toBe(
    '{"value":["11:00","12:00"],"open":true}',
  )
  await controls[0].setValue(true)
  await controls[1].setValue(true)
  field.vm.$emit('update:modelValue', ['11:00', '12:00'])
  field.vm.$emit('update:open', true)
  await nextTick()
  expect(field.props('modelValue')).toEqual(['11:00', '12:00'])
  expect(field.props('open')).toBe(true)
  wrapper.unmount()
})
