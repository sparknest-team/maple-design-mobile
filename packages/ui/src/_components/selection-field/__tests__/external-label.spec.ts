import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PickerField from '../../picker-field/PickerField.vue'
import SelectionField from '../SelectionField.vue'

describe('field naming and floating hints', () => {
  it('preserves an external label and an explicit accessible name for selection controls', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    host.innerHTML = '<label for="choice">Visible choice</label><div id="mount"></div>'
    const wrapper = mount(SelectionField, {
      attachTo: host.querySelector('#mount')!,
      props: { id: 'choice', placeholder: 'Choose', items: [{ key: 'a', value: 'a', label: 'A' }] },
    })
    const input = wrapper.get('input').element as HTMLInputElement
    expect(Array.from(input.labels!, (label) => label.textContent)).toEqual(['Visible choice'])
    expect(input.getAttribute('aria-label')).toBeNull()
    expect(input.placeholder).toBe('Choose')
    expect(input.className).toContain('hide-placeholder')
    await wrapper.setProps({ hint: false, items: [] })
    expect(input.className).not.toContain('hide-placeholder')
    await wrapper.setProps({ 'aria-label': 'Custom name' } as never)
    expect(input.getAttribute('aria-label')).toBe('Custom name')
    wrapper.unmount()
    host.remove()
  })

  it('keeps each range placeholder as a fallback without overriding an external label', () => {
    const host = document.createElement('div')
    document.body.append(host)
    host.innerHTML = '<label for="dates">Travel dates</label><div id="mount"></div>'
    const wrapper = mount(PickerField, {
      attachTo: host.querySelector('#mount')!,
      props: { id: 'dates', range: true, placeholders: ['Start', 'End'] },
    })
    const inputs = wrapper.findAll('input').map((node) => node.element as HTMLInputElement)
    expect(inputs.map((input) => input.placeholder)).toEqual(['Start', 'End'])
    expect(inputs.map((input) => input.getAttribute('aria-label'))).toEqual([null, null])
    expect(Array.from(inputs[0].labels!, (label) => label.textContent)).toEqual(['Travel dates'])
    expect(inputs[1].labels!.length).toBe(0)
    wrapper.unmount()
    host.remove()
  })
})
