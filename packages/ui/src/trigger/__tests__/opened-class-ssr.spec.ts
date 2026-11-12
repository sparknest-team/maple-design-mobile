import { createSSRApp, Fragment, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '../trigger'

function reference(onClick?: () => void) {
  return h(Fragment, null, [h('button', { class: 'original', onClick }, 'Choose'), h('span', 'Other')])
}

test('opened class is present in server output on the first reference only', async () => {
  const app = createSSRApp({
    render: () =>
      h(
        Trigger,
        { open: true, openedClass: 'expanded', popupContainer: false },
        {
          default: () => [reference()],
          content: () => 'Content',
        },
      ),
  })
  const html = await renderToString(app)
  expect(html).toMatch(/<button[^>]*class="[^"]*original[^"]*expanded[^"]*"[^>]*>Choose<\/button>/)
  expect(html).toContain('<span>Other</span>')
})

test('opened class follows controlled state without replacing the reference or losing its listener', async () => {
  const click = vi.fn()
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: false, openedClass: 'expanded', popupContainer: false },
    slots: { default: () => [reference(click)], content: () => 'Content' },
  })
  try {
    const button = wrapper.get('button')
    const element = button.element
    expect(button.classes()).toContain('original')
    expect(button.classes()).not.toContain('expanded')
    await wrapper.setProps({ open: true })
    expect(wrapper.get('button').element).toBe(element)
    expect(wrapper.get('button').classes()).toContain('expanded')
    expect(wrapper.get('span').classes()).not.toContain('expanded')
    await wrapper.get('button').trigger('click')
    expect(click).toHaveBeenCalledTimes(1)
    await wrapper.setProps({ open: false })
    expect(wrapper.get('button').element).toBe(element)
    expect(wrapper.get('button').classes()).not.toContain('expanded')
  } finally {
    wrapper.unmount()
  }
})
