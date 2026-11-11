import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Popover from '../../popover'
import Trigger from '../../trigger'
import Tooltip from '../index'

const cleanups = []
afterEach(() =>
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup()),
)
const settle = async () => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 100))
  await nextTick()
}
async function create(Component, props = {}, slots = {}, attrs = {}) {
  const target = document.createElement('div')
  document.body.append(target)
  const wrapper = mount(Component, {
    global: { stubs: { transition: false } },
    attachTo: target,
    props: { trigger: 'manual', animationName: '', popupContainer: false, ...props },
    attrs,
    slots: Object.fromEntries(
      Object.entries({
        default: () => h('button', 'reference'),
        content: () => h('input', { 'data-content': '', 'aria-label': 'draft' }),
        ...slots,
      }).filter(([, value]) => value != null),
    ),
  })
  cleanups.push(() => {
    wrapper.unmount()
    target.remove()
  })
  await settle()
  return { wrapper, target, trigger: wrapper.findComponent(Trigger) }
}
for (const [name, Component] of [
  ['Tooltip', Tooltip],
  ['Popover', Popover],
]) {
  describe(`${name} wrapper contract`, () => {
    test('controlled requests are forwarded once in order and do not fabricate lifecycle events', async () => {
      const calls = []
      const { wrapper } = await create(Component, {
        open: false,
        'onUpdate:open': (value) => calls.push(['update', value]),
        onOpenChange: (value) => calls.push(['change', value]),
      })
      wrapper.vm.open()
      await settle()
      expect(calls).toEqual([
        ['update', true],
        ['change', true],
      ])
      expect(wrapper.emitted('open')).toBeUndefined()
      await wrapper.setProps({ open: true })
      await settle()
      expect(wrapper.emitted('open')).toHaveLength(1)
      expect(calls).toHaveLength(2)
      wrapper.vm.close()
      await settle()
      expect(wrapper.emitted('close')).toBeUndefined()
      await wrapper.setProps({ open: false })
      await settle()
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
    test('initial open and repeated methods have exactly one lifecycle transition', async () => {
      const { wrapper } = await create(Component, { defaultOpen: true })
      expect(wrapper.emitted('open')).toHaveLength(1)
      wrapper.vm.open()
      expect(wrapper.emitted('update:open')).toBeUndefined()
      wrapper.vm.close()
      wrapper.vm.close()
      await settle()
      expect(wrapper.emitted('update:open')).toEqual([[false]])
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
    test('all interaction and render controls reach the underlying Trigger', async () => {
      const props = {
        trigger: ['click', 'focus'],
        disabled: true,
        mouseEnterDelay: 21,
        mouseLeaveDelay: 31,
        focusDelay: 41,
        popupHoverStay: false,
        blurToClose: false,
        clickOutsideToClose: false,
        restoreFocus: false,
        escToClose: false,
        closeOnClickReference: false,
        unmountOnClose: true,
        duration: { enter: 50, leave: 70 },
        showArrow: true,
        arrowClass: 'arrow',
        popupClass: 'outer',
        popupStyle: { zIndex: 3001 },
        autoFitPopupWidth: true,
      }
      const { wrapper, trigger } = await create(Component, props)
      for (const key of Object.keys(props).filter((key) => !['arrowClass', 'popupClass'].includes(key))) {
        expect(trigger.props(key)).toEqual(props[key])
      }
      wrapper.vm.open()
      await settle()
      expect(wrapper.emitted('update:open')).toBeUndefined()
    })
    test('cache policy preserves or discards content as requested', async () => {
      const { wrapper, target } = await create(Component, { defaultOpen: true, unmountOnClose: false })
      const input = target.querySelector('[data-content]')
      input.value = 'edited'
      wrapper.vm.close()
      await settle()
      expect(target.querySelector('[data-content]')).toBe(input)
      wrapper.vm.open()
      await settle()
      expect(target.querySelector('[data-content]').value).toBe('edited')
      await wrapper.setProps({ unmountOnClose: true })
      wrapper.vm.close()
      await settle()
      expect(target.querySelector('[data-content]')).toBeNull()
      wrapper.vm.open()
      await settle()
      expect(target.querySelector('[data-content]')).not.toBe(input)
    })
    test('external reference replacement and reset preserve the original slot node', async () => {
      const { wrapper, target } = await create(Component, { trigger: 'click' })
      const original = target.querySelector('button')
      const external = document.createElement('button')
      target.append(external)
      wrapper.vm.setReference(external)
      await settle()
      expect(wrapper.vm.getReference()).toBe(external)
      external.click()
      await settle()
      expect(wrapper.emitted('open')).toHaveLength(1)
      wrapper.vm.close()
      await settle()
      wrapper.vm.setReference()
      await settle()
      expect(wrapper.vm.getReference()).toBe(original)
    })
    test('SVG component reference opens on hover and Escape restores it without duplicate events', async () => {
      const { wrapper, target } = await create(
        Component,
        { trigger: 'hover', mouseEnterDelay: 0 },
        {
          default: () => h('svg', { tabindex: 0 }, [h('circle', { r: 5 })]),
        },
      )
      target.querySelector('svg').dispatchEvent(new MouseEvent('mouseenter'))
      await settle()
      expect(wrapper.emitted('update:open')).toEqual([[true]])
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }))
      await settle()
      expect(wrapper.emitted('update:open')).toEqual([[true], [false]])
      expect(document.activeElement).toBe(target.querySelector('svg'))
    })
    test('user content classes/styles and slot priority survive the wrapper', async () => {
      const { target } = await create(
        Component,
        { defaultOpen: true, content: 'fallback', contentClass: 'custom-content', contentStyle: { color: 'red' } },
        { content: () => 'slot wins' },
      )
      expect(target.querySelector('.custom-content').textContent).toContain('slot wins')
      expect(target.querySelector('.custom-content').style.color).toBe('red')
      expect(target.textContent).not.toContain('fallback')
    })
  })
}
test('Popover supports title/content props and title slot precedence', async () => {
  const { wrapper, target } = await create(
    Popover,
    { defaultOpen: true, title: 'heading', content: 'body' },
    { content: undefined },
  )
  expect(target.textContent).toContain('heading')
  expect(target.textContent).toContain('body')
  await wrapper.setProps({ title: '' })
  expect(target.textContent).not.toContain('heading')
})
test('Tooltip places its role on the actual content element', async () => {
  const { target } = await create(Tooltip, { defaultOpen: true })
  expect(target.querySelector('[role="tooltip"] [data-content]')).toBeTruthy()
  expect(target.querySelector('button').getAttribute('role')).toBeNull()
})
