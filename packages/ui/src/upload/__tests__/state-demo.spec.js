import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Upload from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/regressions/state-controls.vue'

useDemoControls()

test('the state demo toggles independent restrictions and restores its sample', async () => {
  const wrapper = mount(Demo, { global: { components: { 'mp-upload': Upload } } })
  try {
    const upload = wrapper.findComponent(Upload)
    await wrapper.findAll('input[type="checkbox"]')[0].setValue(true)
    expect(upload.props('readonly')).toBe(true)
    expect(upload.props('disabled')).toBe(false)
    await wrapper.findAll('input[type="checkbox"]')[1].setValue(true)
    expect(upload.props('disabled')).toBe(true)
    await wrapper.findAll('input[type="checkbox"]')[1].setValue(false)
    expect(upload.props('readonly')).toBe(true)
    upload.vm.$emit('update:modelValue', [])
    await wrapper.vm.$nextTick()
    expect(wrapper.get('[role="status"]').text()).toContain('Files: 0')
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('[role="status"]').text()).toBe('Files: 1; choose: 0; preview: 0')
  } finally {
    wrapper.unmount()
  }
})
