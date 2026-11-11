import { mount } from '@vue/test-utils'
import Button from '..'
import { expectNoAccessibilityViolations } from '../../../test-utils/accessibility'

describe('Button accessibility', () => {
  it('has no detectable accessibility violations in its default state', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    const wrapper = mount(Button, { attachTo: host, slots: { default: 'Submit' } })
    await expectNoAccessibilityViolations(wrapper.element)
    wrapper.unmount()
    host.remove()
  })
})
