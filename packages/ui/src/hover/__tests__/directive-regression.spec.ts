import { defineComponent, h, nextTick, ref, withDirectives } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Hover from '../index'

test('restores original priority and complex CSS while leaving unrelated styles intact', async () => {
  const owner = mount(
    defineComponent({
      render: () =>
        withDirectives(
          h('div', {
            style: 'color: red !important; background-image: url("data:image/svg+xml;base64,AAAA"); padding: 3px',
          }),
          [[Hover, { color: 'blue', backgroundImage: 'none' }]],
        ),
    }),
  )
  try {
    const node = owner.get('div')
    await node.trigger('mouseenter')
    expect(node.element.style.color).toBe('blue')
    await node.trigger('mouseleave')
    expect(node.element.style.getPropertyValue('color')).toBe('red')
    expect(node.element.style.getPropertyPriority('color')).toBe('important')
    expect(node.element.style.backgroundImage).toContain('data:image/svg+xml;base64,AAAA')
    expect(node.element.style.padding).toBe('3px')
  } finally {
    owner.unmount()
  }
})

test('disabled initial argument can update and switching away removes listeners', async () => {
  const arg = ref('mobile')
  const value = ref('blue')
  const errors = vi.fn()
  const owner = mount(
    defineComponent({ render: () => withDirectives(h('div'), [[Hover, { color: value.value }, arg.value]]) }),
    { global: { config: { errorHandler: errors } } },
  )
  const el = owner.get('div').element as HTMLElement
  try {
    value.value = 'green'
    await nextTick()
    expect(errors).not.toHaveBeenCalled()
    arg.value = 'desktop'
    await nextTick()
    el.dispatchEvent(new MouseEvent('mouseenter'))
    expect(el.style.color).toBe('green')
    arg.value = 'mobile'
    await nextTick()
    expect(el.style.color).toBe('')
    el.dispatchEvent(new MouseEvent('mouseenter'))
    expect(el.style.color).toBe('')
  } finally {
    owner.unmount()
  }
  el.dispatchEvent(new MouseEvent('mouseenter'))
  expect(el.style.color).toBe('')
})
