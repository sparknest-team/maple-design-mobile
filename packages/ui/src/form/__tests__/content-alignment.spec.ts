import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FormItem from '../FormItem.vue'

afterEach(() => vi.restoreAllMocks())

describe('FormItem content alignment', () => {
  it('tracks the control height through presentation/layout changes and excludes help', async () => {
    let contentHeight = 36
    const observers: { callback: ResizeObserverCallback; disconnect: ReturnType<typeof vi.fn> }[] = []
    vi.stubGlobal(
      'ResizeObserver',
      class {
        disconnect = vi.fn()
        observe = vi.fn()
        constructor(callback: ResizeObserverCallback) {
          observers.push({ callback, disconnect: this.disconnect })
        }
      },
    )
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return { height: this.classList.contains('mp-form-item__content') ? contentHeight : 100 } as DOMRect
    })
    const wrapper = mount(FormItem, {
      props: { label: 'Name', layout: 'horizontal', editMode: 'direct', help: 'Help below the control' },
      slots: { default: () => h('input') },
    })
    try {
      await nextTick()
      const height = () =>
        (wrapper.get('.mp-form-item__label-col').element as HTMLElement).style.getPropertyValue(
          '--mp-form-item-content-height',
        )
      expect(height()).toBe('36px')
      const labelClasses = wrapper.get('.mp-form-item__label-col').classes()
      await wrapper.setProps({ editMode: 'popup' })
      expect(wrapper.get('.mp-form-item__label-col').classes()).toEqual(labelClasses)
      expect(wrapper.classes()).toContain('mp-form-item--horizontal')
      contentHeight = 52
      observers.at(-1)!.callback([], {} as ResizeObserver)
      await nextTick()
      expect(height()).toBe('52px')
      await wrapper.setProps({ layout: 'vertical' })
      expect(height()).toBe('')
      expect(observers.every((observer) => observer.disconnect.mock.calls.length > 0)).toBe(true)
      await wrapper.setProps({ layout: 'inline' })
      expect(height()).toBe('52px')
    } finally {
      wrapper.unmount()
      vi.unstubAllGlobals()
    }
    expect(observers.every((observer) => observer.disconnect.mock.calls.length > 0)).toBe(true)
  })
})
