import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '..'

test('trigger renders content without popover styles', async () => {
  const root = document.createElement('div')
  document.body.appendChild(root)
  const wrapper = mount(Trigger, {
    attachTo: root,
    props: { open: true, popupContainer: false },
    slots: { default: '<button>reference</button>', content: '<div class="panel">content</div>' },
  })

  await nextTick()
  const popup = wrapper.find('.panel').element.parentElement

  expect(popup?.classList.contains('mp-popover__content')).toBe(false)
  expect(wrapper.text()).toContain('content')
  wrapper.unmount()
  root.remove()
})

test('trigger does not render a host element or forward visual attributes', async () => {
  const root = document.createElement('div')
  const onReferenceClick = vi.fn()
  const onOpen = vi.fn()
  document.body.appendChild(root)

  const wrapper = mount(Trigger, {
    attachTo: root,
    attrs: { class: 'should-not-leak', style: 'display: none' },
    props: { trigger: 'click', popupContainer: false, onOpen },
    slots: {
      default: () => h('button', { class: 'reference', onClick: onReferenceClick }, 'reference'),
      content: '<div>content</div>',
    },
  })

  const reference = wrapper.get('.reference')
  expect(wrapper.find('.mp-trigger').exists()).toBe(false)
  expect(reference.classes()).not.toContain('should-not-leak')
  expect(reference.attributes('style')).toBeUndefined()

  await reference.trigger('click')
  expect(onReferenceClick).toHaveBeenCalledTimes(1)
  expect(onOpen).toHaveBeenCalledTimes(1)

  wrapper.unmount()
  root.remove()
})
