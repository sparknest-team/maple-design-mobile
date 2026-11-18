import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import SplitButton from '..'
import Button from '../../button'
import Menu, { MenuOption } from '../../menu'

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
  test.each(
    ['default', 'outline', 'text', 'tonal'].flatMap((variant) =>
      ['default', 'primary', 'info', 'success', 'warning', 'danger', 'secondary', 'tertiary'].map((status) => [
        variant,
        status,
      ]),
    ),
  )('both segments inherit %s / %s with a shared palette', (variant, status) => {
    const wrapper = render({ variant, status })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    for (const button of buttons) {
      expect(button.classes().some((name) => name.endsWith('--variant-' + variant))).toBe(true)
      expect(button.classes().some((name) => name.endsWith('--status-' + status))).toBe(true)
      expect(button.classes().some((name) => name.includes('--icon-container'))).toBe(false)
    }
    expect(wrapper.findAllComponents(Button)[1].vm.$slots.icon).toBeTruthy()
  })

  test('both segments react to group appearance changes and inherit custom colors', async () => {
    const wrapper = render({ status: 'primary' })
    await wrapper.setProps({ variant: 'tonal', status: 'danger', color: '#123456', textColor: '#ffffff' })
    for (const button of wrapper.findAll('button')) {
      expect(button.classes().some((name) => name.endsWith('--variant-tonal'))).toBe(true)
      expect(button.classes().some((name) => name.endsWith('--status-danger'))).toBe(true)
    }
    await wrapper.setProps({ variant: 'default' })
    const buttons = wrapper.findAll('button')
    expect(buttons[1].attributes('style')).toBe(buttons[0].attributes('style'))
    expect(buttons[1].element.style.background).toBe('rgb(18, 52, 86)')
    expect(buttons[1].element.style.color).toBe('rgb(255, 255, 255)')
  })

  test('explicit trigger appearance remains configurable', () => {
    const wrapper = render({
      status: 'primary',
      triggerButtonProps: { variant: 'outline', status: 'danger', round: true },
    })
    const arrow = wrapper.findAll('button')[1]
    expect(arrow.classes().some((name) => name.endsWith('--variant-outline'))).toBe(true)
    expect(arrow.classes().some((name) => name.endsWith('--status-danger'))).toBe(true)
    expect(arrow.classes().some((name) => name.endsWith('--round'))).toBe(true)
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
    document.querySelector('[data-menu-item]').click()
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

  test('primary loading is controlled through buttonProps', async () => {
    const observer = vi.fn()
    const wrapper = render({ onClick: observer, buttonProps: { loading: true } })
    await wrapper.find('button').trigger('click')
    expect(observer).not.toHaveBeenCalled()
    expect(wrapper.find('button').attributes('aria-busy')).toBe('true')
    await wrapper.setProps({ buttonProps: { loading: false } })
    await wrapper.find('button').trigger('click')
    expect(observer).toHaveBeenCalledTimes(1)
    expect(wrapper.find('button').attributes('aria-busy')).toBeUndefined()
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
    const option = document.querySelector('[data-menu-item]')
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
    const resize = vi.spyOn(first.findComponent(Menu).vm.$.exposed, 'resize')
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

  test.each(['default', 'outline', 'text', 'tonal'])(
    'disabled %s uses Button disabled state and clears custom colors',
    async (variant) => {
      const wrapper = render({
        variant,
        status: 'primary',
        disabled: true,
        elevation: 2,
        color: '#123456',
        textColor: '#ffffff',
      })
      for (const button of wrapper.findAll('button')) {
        expect(button.attributes('disabled')).toBeDefined()
        expect(button.classes().some((name) => name.endsWith('--disabled'))).toBe(true)
        expect(button.element.style.color).toBe('')
        expect(button.element.style.background).toBe('')
        await button.trigger('focus')
        expect(button.classes().some((name) => name.endsWith('--focus'))).toBe(false)
      }
      expect(wrapper.classes().some((name) => name.includes('elevation--'))).toBe(false)
      expect(wrapper.findComponent(Menu).props('disabled')).toBe(true)
      await wrapper.setProps({ disabled: false })
      for (const button of wrapper.findAll('button')) {
        expect(button.attributes('disabled')).toBeUndefined()
        expect(button.classes().some((name) => name.endsWith('--disabled'))).toBe(false)
      }
      if (variant === 'default') {
        expect(wrapper.classes().some((name) => name.includes('elevation--'))).toBe(true)
        expect(wrapper.findAll('button')[1].element.style.background).toBe('rgb(18, 52, 86)')
      }
    },
  )

  test('disabled trigger blocks menu methods and keyboard opening while main action stays enabled', async () => {
    const onClick = vi.fn()
    const wrapper = render({ triggerButtonProps: { disabled: true }, onClick })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeUndefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
    expect(wrapper.findComponent(Menu).props('disabled')).toBe(true)
    await buttons[0].trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.vm.open()
    wrapper.findComponent(Menu).vm.open()
    await buttons[1].trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await wrapper.setProps({ triggerButtonProps: { disabled: false } })
    wrapper.vm.open()
    await nextTick()
    expect(buttons[1].attributes('aria-expanded')).toBe('true')
    await wrapper.setProps({ triggerButtonProps: { disabled: true } })
    await nextTick()
    expect(buttons[1].attributes('aria-expanded')).toBe('false')
  })

  test('disabled main action leaves menu available', async () => {
    const onClick = vi.fn()
    const wrapper = render({ buttonProps: { disabled: true }, onClick })
    expect(wrapper.findComponent(Menu).props('disabled')).toBe(false)
    await wrapper.findAll('button')[0].trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    wrapper.vm.open()
    await nextTick()
    expect(wrapper.findAll('button')[1].attributes('aria-expanded')).toBe('true')
  })

  test('renders the two buttons during SSR', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(SplitButton, {}, { default: () => 'Publish' }) }))
    expect(html).toContain('Publish')
    expect(html.match(/<button\b/g)).toHaveLength(2)
  })

  test('forwards floating props and puts the default arrow in the icon slot', () => {
    const wrapper = render({ popupClass: 'custom-menu', offsetX: '12px', offsetY: -4, hideOnSelect: false })
    expect(wrapper.findComponent(Menu).props()).toMatchObject({
      popupClass: 'custom-menu',
      offsetX: '12px',
      offsetY: -4,
      hideOnSelect: false,
    })
    expect(wrapper.findAllComponents(Button)[1].vm.$slots.icon).toBeTruthy()
  })
})
