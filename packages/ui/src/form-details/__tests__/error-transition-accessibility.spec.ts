import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormDetails from '../FormDetails.vue'

function exposedAlertTexts(root: Element) {
  return Array.from(root.querySelectorAll('[role="alert"]'))
    .filter((element) => !element.closest('[aria-hidden="true"]'))
    .map((element) => element.textContent?.trim())
}

describe('form error transitions', () => {
  it.each(['', 'Persistent extra'])(
    'removes a cleared error from accessibility while preserving extra text: %s',
    async (extraMessage) => {
      const host = document.createElement('div')
      document.body.appendChild(host)
      const wrapper = mount(FormDetails, {
        attachTo: host,
        props: { errorMessage: 'First error', extraMessage },
        global: { stubs: { transition: false } },
      })
      try {
        expect(exposedAlertTexts(host)).toEqual(['First error'])
        await wrapper.setProps({ errorMessage: '' })
        expect(exposedAlertTexts(host)).toEqual([])
        if (extraMessage) {
          expect(wrapper.text()).toContain(extraMessage)
        }
        await wrapper.setProps({ errorMessage: 'Second error' })
        expect(exposedAlertTexts(host)).toEqual(['Second error'])
      } finally {
        wrapper.unmount()
        host.remove()
      }
    },
  )
  it('keeps the extra-message slot accessible when the error leaves', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const wrapper = mount(FormDetails, {
      attachTo: host,
      props: { errorMessage: 'First error' },
      slots: { 'extra-message': () => h('span', { role: 'status' }, 'Persistent slot') },
      global: { stubs: { transition: false } },
    })
    try {
      await wrapper.setProps({ errorMessage: '' })
      expect(exposedAlertTexts(host)).toEqual([])
      const status = host.querySelector('[role="status"]')
      expect(status?.textContent).toBe('Persistent slot')
      expect(status?.closest('[aria-hidden="true"]')).toBeNull()
      await wrapper.setProps({ errorMessage: 'Second error' })
      expect(exposedAlertTexts(host)).toEqual(['Second error'])
    } finally {
      wrapper.unmount()
      host.remove()
    }
  })
})
