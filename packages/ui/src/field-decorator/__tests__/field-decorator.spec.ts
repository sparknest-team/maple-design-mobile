import { readFileSync } from 'node:fs'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import FieldDecorator from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('field-decorator')
const originalGlobals = {
  ResizeObserver: globalThis.ResizeObserver,
  requestAnimationFrame: globalThis.requestAnimationFrame,
  cancelAnimationFrame: globalThis.cancelAnimationFrame,
}
afterEach(() => {
  Object.assign(globalThis, originalGlobals)
  vi.useRealTimers()
})

describe('field decorator', () => {
  test('browser autofill floats the hint and opens its outline notch before a model update', () => {
    const styles = readFileSync('src/field-decorator/style/field-decorator.less', 'utf8')
    expect(styles).toMatch(/&:has\(input:autofill\) &__placeholder\s*\{\s*top: 0;/)
    expect(styles).toMatch(/&:has\(input:autofill\) &__legend\s*\{\s*max-width:/)
  })
  test('recognizes zero as content and empty arrays as empty', async () => {
    const wrapper = mount(FieldDecorator, {
      props: { value: [], hint: true, placeholder: 'Resource', clearable: true },
    })
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.classes()).not.toContain(n('--floating'))
    await wrapper.setProps({ value: 0 })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.classes()).toContain(n('--floating'))
    await wrapper.setProps({ readonly: true })
    expect(wrapper.find('button').exists()).toBe(false)
    await wrapper.setProps({ readonly: false, disabled: true })
    expect(wrapper.find('button').exists()).toBe(false)
    wrapper.unmount()
  })

  test('clears without bubbling a click into a picker opener', async () => {
    const click = vi.fn()
    const wrapper = mount(FieldDecorator, { props: { value: 'a', clearable: true }, attrs: { onClick: click } })
    expect(wrapper.get('button').attributes('type')).toBe('button')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(click).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  test('remeasures the content column after a hidden container opens and releases its observer', async () => {
    vi.useFakeTimers()
    const observers: { callback: () => void; disconnect: ReturnType<typeof vi.fn> }[] = []
    vi.stubGlobal(
      'ResizeObserver',
      class {
        disconnect = vi.fn()
        observe = vi.fn()
        constructor(callback: () => void) {
          observers.push({ callback, disconnect: this.disconnect })
        }
      },
    )
    vi.stubGlobal('requestAnimationFrame', (callback: () => void) => setTimeout(callback, 16))
    vi.stubGlobal('cancelAnimationFrame', (handle: ReturnType<typeof setTimeout>) => clearTimeout(handle))
    const wrapper = mount(FieldDecorator, {
      props: { hint: true, placeholder: 'Account' },
      slots: { prefix: () => h('span', 'Prefix'), default: () => h('input') },
    })
    const root = wrapper.element as HTMLElement
    const middle = wrapper.get(`.${n('middle')}`).element as HTMLElement
    Object.defineProperty(root, 'clientWidth', { configurable: true, value: 320 })
    Object.defineProperty(middle, 'offsetLeft', { configurable: true, value: 48 })
    Object.defineProperty(middle, 'offsetWidth', { configurable: true, value: 240 })
    observers[0].callback()
    vi.runOnlyPendingTimers()
    await nextTick()
    expect(root.style.getPropertyValue('--mp-internal-field-content-offset')).toBe('48px')
    expect(root.style.getPropertyValue('--mp-internal-field-content-width')).toBe('240px')
    wrapper.unmount()
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1)
  })
})
