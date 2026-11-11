import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Card from '../Card.vue'

test('floating card locks its own iframe document and leaves the outer document alone', async () => {
  const iframe = document.createElement('iframe')
  document.body.append(iframe)
  const body = iframe.contentDocument!.body
  const wrapper = mount(Card, { attachTo: body, props: { floating: false, ripple: false } })
  try {
    await wrapper.setProps({ floating: true })
    expect(body.style.overflow).toBe('hidden')
    expect(document.body.style.overflow).not.toBe('hidden')
    await wrapper.setProps({ floating: false })
    expect(body.style.overflow).toBe('')
    expect(document.body.style.overflow).not.toBe('hidden')
  } finally {
    wrapper.unmount()
    iframe.remove()
  }
})
