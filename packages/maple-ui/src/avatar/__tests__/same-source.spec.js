import { createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { Avatar, AvatarGroup } from '../index'

describe('Avatar same source', () => {
  test('renders on the server without starting browser work', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(AvatarGroup, { maxCount: 1, size: 32 }, () => [
            h(Avatar, null, () => 'A'),
            h(Avatar, { imageUrl: '/a.png', alt: 'Ada' }),
          ]),
      }),
    )
    expect(html).toContain('mp-avatar')
    expect(html).toContain('mp-avatar-group')
    expect(html).toContain('mp-avatar--circle')
    expect(html).toContain('+1')
  })

  test('group size reaches children and z-index follows zIndexAscend', () => {
    const wrapper = mount(AvatarGroup, {
      props: { size: 48, zIndexAscend: true },
      slots: {
        default: () => h(Fragment, [h(Avatar), h(Avatar)]),
      },
    })
    const items = wrapper.findAll('.mp-avatar')
    expect(items).toHaveLength(2)
    expect(items[0].attributes('style')).toContain('width: 48px')
    expect(items[0].attributes('style')).toContain('z-index: 1')
    expect(items[1].attributes('style')).toContain('z-index: 2')
    wrapper.unmount()
  })
})

test('updates slotted image mode when content changes', async () => {
  const image = ref(true)
  const wrapper = mount({
    render: () => h(Avatar, null, () => (image.value ? h('img', { alt: 'Portrait' }) : 'Long name')),
  })
  await nextTick()
  expect(wrapper.find('.mp-avatar__image').exists()).toBe(true)
  image.value = false
  await nextTick()
  await nextTick()
  expect(wrapper.find('.mp-avatar__text').text()).toBe('Long name')
  image.value = true
  await nextTick()
  await nextTick()
  expect(wrapper.find('.mp-avatar__image img').exists()).toBe(true)
  wrapper.unmount()
})

test('preserves image alternative on default error fallback only when provided', async () => {
  const named = mount(Avatar, { props: { imageUrl: '/missing', alt: 'Alice' } })
  await named.get('img').trigger('error')
  expect(named.get('[role="img"]').attributes('aria-label')).toBe('Alice')
  expect(named.findAll('[role="img"]:not([aria-hidden="true"])')).toHaveLength(1)
  const decorative = mount(Avatar, { props: { imageUrl: '/missing', alt: '' } })
  await decorative.get('img').trigger('error')
  expect(decorative.find('[role="img"]:not([aria-hidden="true"])').exists()).toBe(false)
  expect(decorative.get('.mp-avatar__image-icon').attributes('aria-hidden')).toBe('true')
  named.unmount()
  decorative.unmount()
})

test('orders summary with group layers and respects unlimited maxCount', async () => {
  const wrapper = mount(AvatarGroup, {
    props: { maxCount: 1, zIndexAscend: true },
    slots: { default: () => [h(Avatar, null, () => 'A'), h(Avatar, null, () => 'B')] },
  })
  expect(wrapper.get('.mp-avatar-group__max-count-avatar').attributes('style')).toContain('z-index: 2')
  await wrapper.setProps({ zIndexAscend: false })
  expect(wrapper.get('.mp-avatar-group__max-count-avatar').attributes('style')).toContain('z-index: 1')
  await wrapper.setProps({ maxCount: 0 })
  expect(wrapper.find('.mp-avatar-group__max-count-avatar').exists()).toBe(false)
  expect(wrapper.findAll('.mp-avatar')).toHaveLength(2)
  wrapper.unmount()
})

test('invalid numeric group options safely use defaults', () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = mount(AvatarGroup, {
    props: { maxCount: 1.5, size: Infinity, offset: NaN },
    slots: { default: () => [h(Avatar, null, () => 'A'), h(Avatar, null, () => 'B')] },
  })
  expect(wrapper.findAll('.mp-avatar')).toHaveLength(2)
  expect(wrapper.find('.mp-avatar-group__max-count-avatar').exists()).toBe(false)
  expect(wrapper.attributes('style') || '').not.toContain('NaN')
  expect(wrapper.get('.mp-avatar').attributes('style') || '').not.toContain('Infinity')
  expect(warn).toHaveBeenCalled()
  wrapper.unmount()
  warn.mockRestore()
})

test('trigger icon provides keyboard activation without nesting a supplied button', async () => {
  const action = vi.fn()
  const w = mount(Avatar, {
    props: { triggerAriaLabel: 'Edit avatar', onClick: action },
    slots: { 'trigger-icon': () => '+' },
  })
  await nextTick()
  expect(w.attributes('role')).toBe('button')
  expect(w.attributes('aria-label')).toBe('Edit avatar')
  await w.trigger('keydown', { key: 'Enter' })
  await w.trigger('keydown', { key: ' ' })
  expect(action).toHaveBeenCalledTimes(2)
  w.unmount()
  const nested = mount(Avatar, { attrs: { id: 'custom-avatar' }, slots: { 'trigger-icon': () => h('button', 'Edit') } })
  await nextTick()
  expect(nested.attributes('role')).toBeUndefined()
  expect(nested.attributes('id')).toBe('custom-avatar')
  expect(nested.get('button').text()).toBe('Edit')
  nested.unmount()
})

test('tracks controls inserted by a component inside the trigger slot', async () => {
  const interactive = ref(false)
  const Child = { render: () => (interactive.value ? h('button', 'Edit') : h('span', '+')) }
  const wrapper = mount(Avatar, { slots: { 'trigger-icon': () => h(Child) } })
  await nextTick()
  expect(wrapper.attributes('role')).toBe('button')
  interactive.value = true
  await nextTick()
  await nextTick()
  expect(wrapper.find('button').exists()).toBe(true)
  expect(wrapper.attributes('role')).toBeUndefined()
  interactive.value = false
  await nextTick()
  await nextTick()
  expect(wrapper.attributes('role')).toBe('button')
  wrapper.unmount()
})
