import { createApp, h, KeepAlive, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Switch from '..'
import { switchProps } from '../props'

test('installs the component', () => {
  const app = createApp({}).use(Switch)
  expect(app.component(Switch.name)).toBeTruthy()
})
test('renders the common contract', () => {
  const wrapper = mount(Switch)
  expect(wrapper.html()).toMatchSnapshot()
  expect(wrapper.attributes('role')).toBe('switch')
  expect(wrapper.attributes('aria-checked')).toBe('false')
  wrapper.unmount()
})
test.each(['circle', 'round', 'line', 'tonal'])('variant %s', (variant) => {
  const wrapper = mount(Switch, { props: { variant } })
  expect(wrapper.classes()).toContain('mp-switch--variant-' + variant)
  wrapper.unmount()
})
test.each(['sm', 'md', 'lg'])('size %s', (size) => {
  const wrapper = mount(Switch, { props: { size } })
  expect(wrapper.classes()).toContain('mp-switch--size-' + size)
  wrapper.unmount()
})
test('validators reject removed presets', () => {
  expect(switchProps.variant.validator('standard')).toBe(false)
  expect(switchProps.size.validator('xl')).toBe(false)
})
test('independent uncontrolled instances and custom values', async () => {
  const first = mount(Switch, { props: { defaultValue: 'yes', checkedValue: 'yes', uncheckedValue: 'no' } })
  const second = mount(Switch)
  await first.trigger('click')
  expect(first.emitted('update:modelValue')).toEqual([['no']])
  expect(first.attributes('aria-checked')).toBe('false')
  expect(second.emitted('change')).toBeUndefined()
  first.unmount()
  second.unmount()
})
test('controlled values only change after the parent updates', async () => {
  const wrapper = mount(Switch, { props: { modelValue: false } })
  await wrapper.trigger('click')
  expect(wrapper.attributes('aria-checked')).toBe('false')
  expect(wrapper.emitted('change')[0]).toEqual([true, expect.any(Event)])
  await wrapper.setProps({ modelValue: true })
  expect(wrapper.attributes('aria-checked')).toBe('true')
  wrapper.unmount()
})
test('update precedes change and all events are emitted once', async () => {
  const order = []
  const wrapper = mount(Switch, {
    props: {
      onClick: () => order.push('click'),
      'onUpdate:modelValue': () => order.push('update'),
      onChange: () => order.push('change'),
    },
  })
  await wrapper.trigger('click')
  expect(order).toEqual(['click', 'update', 'change'])
  wrapper.unmount()
})
test.each(['disabled', 'loading', 'readonly'])('%s blocks changes', async (prop) => {
  const wrapper = mount(Switch, { props: { [prop]: true } })
  await wrapper.trigger('click')
  expect(wrapper.emitted('change')).toBeUndefined()
  expect(wrapper.emitted('click')?.length ?? 0).toBe(prop === 'readonly' ? 1 : 0)
  wrapper.unmount()
})
test.each([
  false,
  () => {
    throw Error('cancel')
  },
  () => Promise.reject(Error('cancel')),
])('interceptor cancellation %s', async (result) => {
  const wrapper = mount(Switch, { props: { beforeChange: typeof result === 'function' ? result : () => result } })
  await wrapper.trigger('click')
  await flushPromises()
  expect(wrapper.emitted('change')).toBeUndefined()
  expect(wrapper.attributes('aria-busy')).toBeUndefined()
  wrapper.unmount()
})
test('pending interceptor locks repeated input and commits once', async () => {
  let resolve
  const beforeChange = vi.fn(
    () =>
      new Promise((done) => {
        resolve = done
      }),
  )
  const wrapper = mount(Switch, { props: { beforeChange } })
  await wrapper.trigger('click')
  expect(wrapper.attributes('aria-busy')).toBe('true')
  await wrapper.trigger('click')
  expect(beforeChange).toHaveBeenCalledTimes(1)
  expect(beforeChange).toHaveBeenCalledWith(true)
  resolve(true)
  await flushPromises()
  expect(wrapper.emitted('change')).toHaveLength(1)
  expect(wrapper.attributes('aria-busy')).toBeUndefined()
  wrapper.unmount()
})
test.each(['unmount', 'disabled', 'readonly', 'external'])(
  'stale pending result does not commit after %s',
  async (action) => {
    let resolve
    const wrapper = mount(Switch, {
      props: {
        beforeChange: () =>
          new Promise((done) => {
            resolve = done
          }),
      },
    })
    await wrapper.trigger('click')
    if (action === 'unmount') {
      wrapper.unmount()
    } else {
      await wrapper.setProps(action === 'external' ? { modelValue: true } : { [action]: true })
    }
    resolve(true)
    await flushPromises()
    expect(wrapper.emitted('change')).toBeUndefined()
    if (action !== 'unmount') {
      wrapper.unmount()
    }
  },
)
test('deactivation cancels a pending interceptor', async () => {
  const shown = ref(true)
  let resolve
  const change = vi.fn()
  const wrapper = mount({
    render: () =>
      h(KeepAlive, null, {
        default: () =>
          shown.value
            ? h(Switch, {
                beforeChange: () =>
                  new Promise((done) => {
                    resolve = done
                  }),
                onChange: change,
              })
            : null,
      }),
  })
  await wrapper.get('button').trigger('click')
  shown.value = false
  await nextTick()
  resolve(true)
  await flushPromises()
  expect(change).not.toHaveBeenCalled()
  wrapper.unmount()
})
test('keyboard, focus, blur and repeat suppression', async () => {
  const wrapper = mount(Switch)
  await wrapper.trigger('focus')
  await wrapper.trigger('keydown', { key: 'Enter', repeat: true })
  expect(wrapper.emitted('change')).toBeUndefined()
  await wrapper.trigger('keydown', { key: 'Enter' })
  await wrapper.trigger('keydown', { key: ' ' })
  await wrapper.trigger('blur')
  expect(wrapper.emitted('change')).toHaveLength(2)
  expect(wrapper.emitted('focus')).toHaveLength(1)
  expect(wrapper.emitted('blur')).toHaveLength(1)
  wrapper.unmount()
})
test('text, icon slots, colors, elevation and ripple are real capabilities', async () => {
  const wrapper = mount(Switch, {
    props: {
      checkedText: 'On',
      uncheckedText: 'Off',
      checkedColor: 'red',
      loadingColor: 'blue',
      handleElevation: false,
    },
    slots: { 'checked-icon': () => '✓' },
  })
  expect(wrapper.text()).toBe('Off')
  expect(wrapper.get('.mp-switch__handle').attributes('style')).toContain('box-shadow: none')
  await wrapper.trigger('click')
  expect(wrapper.text()).toContain('On')
  expect(wrapper.text()).toContain('✓')
  expect(wrapper.attributes('style')).toContain('--mp-switch-current-track: red')
  expect(wrapper.find('.mp-switch__ripple').exists()).toBe(true)
  await wrapper.setProps({ size: 'sm', ripple: false, handleElevation: 4 })
  expect(wrapper.text()).not.toContain('On')
  expect(wrapper.find('.mp-switch__ripple').exists()).toBe(false)
  expect(wrapper.get('.mp-switch__handle').attributes('style')).toContain('0 2px 5px')
  wrapper.unmount()
})
