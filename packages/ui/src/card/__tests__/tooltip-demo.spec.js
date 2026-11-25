import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Card from '..'
import Tooltip from '../../tooltip'
import EnglishDemo from '../example/demos/en-US/tooltip.vue'
import Demo from '../example/demos/tooltip.vue'

for (const [language, component] of [
  ['zh-CN', Demo],
  ['en-US', EnglishDemo],
]) {
  it.each(['title', 'description'])(language + ' opens the full %s', async (slot) => {
    const wrapper = mount(component, {
      attachTo: document.body,
      global: { components: { 'mp-card': Card, 'mp-tooltip': Tooltip } },
    })
    try {
      const trigger = wrapper.get(`.mp-card__${slot} .long-text`)
      await trigger.trigger('click')
      await vi.waitFor(() => {
        expect(document.querySelector('[role="tooltip"]')?.textContent).toBe(trigger.text())
      })
    } finally {
      wrapper.unmount()
    }
  })
}
