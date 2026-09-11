import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import SplitButton from '..'
import Button from '../../button'
import DropdownMenu, { MenuOption } from '../../dropdown-menu'

const wrappers = []
function render(props = {}, slots = {}) {
  const host = document.createElement('div')
  document.body.append(host)
  const wrapper = mount(SplitButton, {
    attachTo: host,
    props: { popupContainer: host, ...props },
    slots: { default: 'Publish', ...slots },
  })
  wrappers.push({ wrapper, host })
  return wrapper
}
afterEach(() => {
  wrappers.splice(0).forEach(({ wrapper, host }) => {
    wrapper.unmount()
    host.remove()
  })
})

describe('SplitButton copied contract', () => {
  test.each(['outline', 'text', 'tonal'])('arrow preserves the %s variant without default icon fill', (variant) => {
    const wrapper = render({ variant, status: 'primary' })
    const arrow = wrapper.findAll('button')[1]
    expect(arrow.classes().some((name) => name.endsWith('--variant-' + variant))).toBe(true)
    expect(arrow.classes().some((name) => name.endsWith('--icon-container'))).toBe(true)
    expect(arrow.classes().some((name) => name.endsWith('--icon-container-primary'))).toBe(false)
  })

  test('keep-open selection still emits feedback', async () => {
    const onSelect = vi.fn()
    const wrapper = render(
      { hideOnSelect: false, onSelect },
      {
        content: () => h(MenuOption, { value: 'save', label: 'Save' }),
      },
    )
    await wrapper.findAll('button')[1].trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 40))
    document.querySelector('[data-dropdown-menu-item]').click()
    await nextTick()
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('button')[1].attributes('aria-expanded')).toBe('true')
  })

  test('primary action forwards each handler once, bubbles and does not open menu', async () => {
    const onClick = vi.fn(),
      nestedClick = vi.fn(),
      bubble = vi.fn()
    const wrapper = render({ onClick, buttonProps: { onClick: nestedClick } })
    wrapper.element.addEventListener('click', bubble)
    await wrapper.find('button').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(nestedClick).toHaveBeenCalledTimes(1)
    expect(bubble).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })

  test('awaits both async callbacks and blocks repeat clicks until all settle', async () => {
    let resolveMain, resolveNested
    const onClick = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveMain = resolve
        }),
    )
    const nestedClick = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveNested = resolve
        }),
    )
    const wrapper = render({ autoLoading: true, onClick, buttonProps: { onClick: nestedClick } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').attributes('aria-busy')).toBe('true')
    await wrapper.find('button').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    resolveMain()
    await flushPromises()
    expect(wrapper.find('button').attributes('aria-busy')).toBe('true')
    resolveNested()
    await flushPromises()
    expect(wrapper.find('button').attributes('aria-busy')).not.toBe('true')
  })

  test('trigger opens, icon receives state and menu selection is forwarded', async () => {
    const onSelect = vi.fn()
    const wrapper = render(
      { onSelect },
      {
        icon: ({ open }) => `open:${open}`,
        content: () => h(MenuOption, { value: 'save', label: 'Save' }),
      },
    )
    expect(wrapper.text()).toContain('open:false')
    await wrapper.findAll('button')[1].trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:open')[0]).toEqual([true])
    expect(wrapper.text()).toContain('open:true')
    await new Promise((resolve) => setTimeout(resolve, 40))
    await nextTick()
    const option = document.querySelector('[data-dropdown-menu-item]')
    expect(option).toBeTruthy()
    option.click()
    await nextTick()
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect.mock.calls[0][0]).toBe('save')
    expect(wrapper.findAll('button')[1].attributes('aria-expanded')).toBe('false')
  })

  test('controlled open only requests updates; methods and instances are independent', async () => {
    const controlled = render({ open: false }),
      first = render(),
      second = render()
    controlled.vm.open()
    first.vm.open()
    await nextTick()
    expect(controlled.emitted('update:open')[0]).toEqual([true])
    expect(controlled.findAll('button')[1].attributes('aria-expanded')).toBe('false')
    expect(first.findAll('button')[1].attributes('aria-expanded')).toBe('true')
    expect(second.findAll('button')[1].attributes('aria-expanded')).toBe('false')
    first.vm.close()
    const resize = vi.spyOn(first.findComponent(DropdownMenu).vm.$.exposed, 'resize')
    first.vm.resize()
    expect(resize).toHaveBeenCalledTimes(1)
    await nextTick()
    expect(first.findAll('button')[1].attributes('aria-expanded')).toBe('false')
  })

  test('disabled blocks primary action and programmatic opening', async () => {
    const onClick = vi.fn(),
      wrapper = render({
        disabled: true,
        onClick,
        buttonProps: { disabled: false },
        triggerButtonProps: { disabled: false },
      })
    await wrapper.find('button').trigger('click')
    wrapper.vm.open()
    await nextTick()
    expect(onClick).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })

  test('renders the two buttons during SSR', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(SplitButton, {}, { default: () => 'Publish' }) }))
    expect(html).toContain('Publish')
    expect(html.match(/<button\b/g)).toHaveLength(2)
  })

  test('forwards floating props and puts the default arrow in the icon slot', () => {
    const wrapper = render({ popupClass: 'custom-menu', offsetX: '12px', offsetY: -4, hideOnSelect: false })
    expect(wrapper.findComponent(DropdownMenu).props()).toMatchObject({
      popupClass: 'custom-menu',
      offsetX: '12px',
      offsetY: -4,
      hideOnSelect: false,
    })
    expect(wrapper.findAllComponents(Button)[1].vm.$slots.icon).toBeTruthy()
  })
})
