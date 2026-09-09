import { h, KeepAlive, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Button from '..'

const wrappers = []
const render = (props = {}, slots = { default: 'Action' }) => {
  const wrapper = mount(Button, { props, slots })
  wrappers.push(wrapper)
  return wrapper
}
const deferred = () => {
  let resolve, reject
  const promise = new Promise((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})

describe('Button shared contract', () => {
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
  it('makes icon-container effective', () => {
    expect(
      render({ iconContainer: true })
        .classes()
        .some((c) => c.endsWith('--icon-container')),
    ).toBe(true)
  })
  it('applies elevation and can turn it off', () => {
    expect(
      render({ elevation: 4 })
        .classes()
        .some((c) => c.endsWith('elevation--4')),
    ).toBe(true)
    expect(
      render({ elevation: false })
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
  it('notifies touchstart once', async () => {
    const onTouchstart = vi.fn()
    await render({ onTouchstart }).trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    expect(onTouchstart).toHaveBeenCalledTimes(1)
  })
  it('does not enter automatic loading for synchronous handlers', async () => {
    const w = render({ autoLoading: true, onClick: () => undefined })
    w.element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(w.attributes('aria-busy')).toBeUndefined()
    expect(w.classes().some((c) => c.endsWith('--loading'))).toBe(false)
  })
  it('waits for async click and blocks reentry immediately', async () => {
    const job = deferred(),
      onClick = vi.fn(() => job.promise)
    const w = render({ autoLoading: true, onClick })
    w.element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    w.element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(w.attributes('aria-busy')).toBe('true')
    job.resolve()
    await flushPromises()
    expect(w.attributes('aria-busy')).toBeUndefined()
  })
  it('clears loading after rejected promises', async () => {
    const job = deferred()
    const w = render({ autoLoading: true, onClick: () => job.promise })
    await w.trigger('click')
    job.reject(new Error('expected rejection'))
    await flushPromises()
    expect(w.classes().some((c) => c.endsWith('--loading'))).toBe(false)
  })
  it('waits for all listeners even if one rejects early', async () => {
    const first = deferred(),
      second = deferred()
    const w = render({ autoLoading: true, onClick: [() => first.promise, () => second.promise] })
    await w.trigger('click')
    first.reject(new Error('first failed'))
    await flushPromises()
    expect(w.attributes('aria-busy')).toBe('true')
    second.resolve()
    await flushPromises()
    expect(w.attributes('aria-busy')).toBeUndefined()
  })
  it('auto-loads touchstart handlers too', async () => {
    const job = deferred()
    const w = render({ autoLoading: true, onTouchstart: () => job.promise })
    await w.trigger('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
    expect(w.attributes('aria-busy')).toBe('true')
    job.resolve()
    await flushPromises()
    expect(w.attributes('aria-busy')).toBeUndefined()
  })
  it('does not mutate state after unmount', async () => {
    const job = deferred(),
      w = render({ autoLoading: true, onClick: () => job.promise })
    await w.trigger('click')
    w.unmount()
    job.resolve()
    await flushPromises()
  })
  it.each(['default', 'fill', 'line'])('supports loading mode %s and preserves content', (mode) => {
    const w = render({ loading: true, loadingMode: mode })
    expect(w.classes().some((c) => c.endsWith(`--loading-${mode}`))).toBe(true)
    expect(w.text()).toContain('Action')
  })
  it('supports spinner type, size, color and radius', () => {
    const w = render({ loading: true, loadingType: 'wave', loadingSize: 28, loadingColor: 'red', loadingRadius: 5 })
    const loading = w.findComponent({ name: 'CLoading' }).exists()
      ? w.findComponent({ name: 'CLoading' })
      : w.findComponent({ name: 'MpLoading' })
    expect(loading.exists()).toBe(true)
    expect(loading.props()).toMatchObject({ type: 'wave', size: 28, color: 'red', radius: 5 })
  })
})

it('keeps a new async operation busy after an old deactivated operation completes', async () => {
  const visible = ref(true),
    oldJob = deferred(),
    newJob = deferred()
  const onClick = vi.fn().mockReturnValueOnce(oldJob.promise).mockReturnValueOnce(newJob.promise)
  const host = mount({
    render: () =>
      h(KeepAlive, null, {
        default: () => (visible.value ? h(Button, { autoLoading: true, onClick }, () => 'Action') : null),
      }),
  })
  wrappers.push(host)
  await host.findComponent(Button).trigger('click')
  visible.value = false
  await nextTick()
  visible.value = true
  await nextTick()
  expect(host.findComponent(Button).attributes('aria-busy')).toBeUndefined()
  await host.findComponent(Button).trigger('click')
  oldJob.resolve()
  await flushPromises()
  expect(host.findComponent(Button).attributes('aria-busy')).toBe('true')
  newJob.resolve()
  await flushPromises()
  expect(host.findComponent(Button).attributes('aria-busy')).toBeUndefined()
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
    expect(wrapper.text()).toBe('Save')
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
