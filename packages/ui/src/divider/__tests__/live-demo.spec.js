import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Component from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Demo from '../example/demos/live-properties.vue'

useDemoControls()

describe('divider live demo', () => {
  it('updates independent properties and restores defaults', async () => {
    const wrapper = mount(Demo, { global: { components: { 'mp-divider': Component } } })
    const component = wrapper.findComponent(Component)
    await wrapper.get('input[type="checkbox"]').setValue(true)
    expect(component.attributes('aria-orientation')).toBe('vertical')
    await wrapper.findAll('input')[1].setValue(true)
    expect(component.text()).toBe('Section')
    await wrapper.findAll('input')[1].setValue(false)
    expect(component.classes()).not.toContain('mp-divider--with-text')
    await wrapper.findAll('input')[2].setValue(true)
    expect(component.element.style.opacity).toBe('0')
    await wrapper.findAll('input')[3].setValue(true)
    expect(component.element.style.getPropertyValue('--mp-divider-border-width')).toBe('')
    await wrapper.findAll('input')[2].setValue(false)
    expect(component.element.style.opacity).toBe('1')
    wrapper.unmount()
  })
})
