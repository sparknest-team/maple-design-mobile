import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Button from '..'

const wrappers = []
const render = (props = {}, slots = { default: 'Action' }) => {
  const wrapper = mount(Button, { props, slots, global: { config: { errorHandler: vi.fn() } } })
  wrappers.push(wrapper)
  return wrapper
}
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})

describe('Button shared contract', () => {
  it('disabled custom colors yield to disabled tokens and restore when enabled', async () => {
    for (const variant of ['default', 'text', 'outline', 'tonal']) {
      const w = render({ variant, color: '#123456', textColor: '#abcdef' })
      expect(w.element.style.color).toBe('rgb(171, 205, 239)')
      await w.setProps({ disabled: true })
      expect(w.element.style.color).toBe('')
      expect(w.element.style.background).toBe('')
      expect(w.element.style.borderColor).toBe('')
      await w.trigger('focus')
      expect(w.classes().some((c) => c.endsWith('--focus'))).toBe(false)
      await w.setProps({ disabled: false })
      expect(w.element.style.color).toBe('rgb(171, 205, 239)')
    }
  })
  it('loading inherits the button foreground unless explicitly customized', async () => {
    const w = render({ loading: true, status: 'warning' })
    const indicator = w.findComponent({ name: 'CLoading' }).exists()
      ? w.findComponent({ name: 'CLoading' })
      : w.findComponent({ name: 'MpLoading' })
    expect(indicator.props('color')).toBe('currentColor')
    await w.trigger('focus')
    expect(w.classes().some((c) => c.endsWith('--focus'))).toBe(false)
    await w.setProps({ loadingColor: '#123456' })
    expect(indicator.props('color')).toBe('#123456')
  })
  it('renders native button with a safe default type', () => {
    const w = render()
    expect(w.element.tagName).toBe('BUTTON')
    expect(w.attributes('type')).toBe('button')
  })
  it.each(['submit', 'reset'])('supports native %s', (type) => {
    expect(render({ htmlType: type }).attributes('type')).toBe(type)
  })
  it('forwards attrs and fires click only once', async () => {
    const onClick = vi.fn()
    const w = render({ onClick, 'aria-label': 'Save', id: 'save' })
    await w.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(w.attributes('aria-label')).toBe('Save')
    expect(w.attributes('id')).toBe('save')
  })
  it('supports icon slot', () => {
    const w = render({}, { default: 'Save', icon: '<b data-icon>+</b>' })
    expect(w.find('[data-icon]').exists()).toBe(true)
  })
  it('detects icon-only content and keeps icon/text labels visible', async () => {
    const iconOnly = render({}, { icon: () => h('svg') })
    expect(iconOnly.classes().some((c) => c.endsWith('--icon-only'))).toBe(true)
    const labeled = render({}, { icon: () => h('svg'), default: 'Save' })
    expect(labeled.classes().some((c) => c.endsWith('--icon-only'))).toBe(false)
    expect(labeled.text()).toBe('Save')
    await labeled.setProps({ stacked: true })
    expect(labeled.text()).toBe('Save')
  })
  it('applies elevation and can turn it off', () => {
    expect(
      render({ variant: 'default' })
        .classes()
        .some((c) => /elevation--\d/.test(c)),
    ).toBe(false)
    expect(render({ variant: 'default', elevation: true }).classes()).toContain('mp-elevation--1')
    expect(
      render({ variant: 'default', elevation: 4 })
        .classes()
        .some((c) => c.endsWith('elevation--4')),
    ).toBe(true)
    expect(
      render({ variant: 'default', elevation: false })
        .classes()
        .some((c) => /elevation--\d/.test(c)),
    ).toBe(false)
  })
  it('supports autofocus and opts out of sequential focus', () => {
    const w = render({ autofocus: true, focusable: false })
    expect(w.attributes('autofocus')).toBeDefined()
    expect(w.attributes('tabindex')).toBe('-1')
  })
  it('uses accessible shared interaction defaults', () => {
    const w = render()
    expect(w.props('focusable')).toBe(true)
    expect(w.props('ripple')).toBe(true)
  })
  it('blocks native button while loading', () => {
    const w = render({ loading: true })
    expect(w.attributes('disabled')).toBeDefined()
    expect(w.attributes('aria-busy')).toBe('true')
  })
  it.each([{ disabled: true }, { loading: true }])('blocks link navigation for %o', async (state) => {
    const click = vi.fn()
    const w = render({ ...state, component: 'a', href: '#target', onClick: click })
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    w.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
    expect(click).not.toHaveBeenCalled()
    expect(w.attributes('aria-disabled')).toBe('true')
    expect(w.attributes('tabindex')).toBe('-1')
    expect(w.attributes('type')).toBeUndefined()
  })
  it('allows enabled links', async () => {
    const click = vi.fn()
    const w = render({ component: 'a', href: '#target', onClick: click })
    await w.trigger('click')
    expect(click).toHaveBeenCalledTimes(1)
    expect(w.attributes('href')).toBe('#target')
  })
  it('inherits group state, keeps block and supports explicit override', async () => {
    const onClick = vi.fn()
    const w = mount(Button.Group, {
      props: { disabled: true, size: 'lg', status: 'primary', stacked: true },
      slots: {
        default: () => [
          h(Button, { component: 'a', href: '#target', block: true, onClick }),
          h(Button, { disabled: false, onClick }, () => 'Override'),
        ],
      },
    })
    wrappers.push(w)
    const [a, b] = w.findAllComponents(Button)
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    a.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
    expect(a.classes().some((c) => c.endsWith('--block'))).toBe(true)
    expect(a.classes().some((c) => c.endsWith('--stacked'))).toBe(true)
    expect(a.classes().some((c) => c.endsWith('--size-lg'))).toBe(true)
    await b.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it.each(['default', 'fill', 'line'])('supports loading mode %s and preserves content', (mode) => {
    const w = render({ loading: true, loadingMode: mode })
    expect(w.classes().some((c) => c.endsWith(`--loading-${mode}`))).toBe(true)
    expect(w.text()).toContain('Action')
  })
  it('supports spinner type, size and color', () => {
    const w = render({ loading: true, loadingType: 'wave', loadingSize: 28, loadingColor: 'red' })
    const loading = w.findComponent({ name: 'CLoading' }).exists()
      ? w.findComponent({ name: 'CLoading' })
      : w.findComponent({ name: 'MpLoading' })
    expect(loading.exists()).toBe(true)
    expect(loading.props()).toMatchObject({ type: 'wave', size: 28, color: 'red' })
  })
})

describe('Button icon layout', () => {
  it('does not add an empty text box to an icon-only button', () => {
    const wrapper = render({ round: true }, { icon: () => h('svg') })
    expect(wrapper.find('.mp-button__content').exists()).toBe(false)
  })
  it('reuses the icon position while a stacked action is pending', async () => {
    const wrapper = render({ stacked: true, ripple: false }, { icon: () => h('svg'), default: 'Save' })
    const count = wrapper.element.childElementCount
    await wrapper.setProps({ loading: true })
    expect(wrapper.element.childElementCount).toBe(count)
    expect(wrapper.findAll('.mp-button__loading')).toHaveLength(1)
    expect(wrapper.get('.mp-button__content').text()).toBe('Save')
    expect(wrapper.get('.mp-button__loading').attributes('aria-hidden')).toBe('true')
    await wrapper.setProps({ loading: false })
    expect(wrapper.element.childElementCount).toBe(count)
    expect(wrapper.find('.mp-button__loading').exists()).toBe(false)
  })
})

it('focus keeps the keyboard focus hook without a persistent fill overlay', async () => {
  const w = render({ variant: 'default' })
  await w.trigger('focus')
  expect(w.classes()).toContain('mp-button--focus')
  expect(w.find('.mp-hover-overlay--focusing').exists()).toBe(false)
  await w.trigger('blur')
  expect(w.classes()).not.toContain('mp-button--focus')
})
