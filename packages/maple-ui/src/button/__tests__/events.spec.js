import { defineComponent, h, KeepAlive, nextTick, onErrorCaptured, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Button from '..'

const wrappers = []
const render = (props = {}) => {
  const errors = []
  const w = mount(Button, {
    props,
    slots: { default: 'Save' },
    global: { config: { errorHandler: (e) => errors.push(e) } },
  })
  wrappers.push(w)
  return { w, errors }
}
afterEach(() => wrappers.splice(0).forEach((w) => w.unmount()))
describe('Button standard events and controlled loading', () => {
  it('preserves consumer class and style priority', () => {
    const { w } = render({ class: 'consumer-confirm', style: { color: 'rgb(1, 2, 3)' } })
    expect(w.attributes('class').endsWith('consumer-confirm')).toBe(true)
    expect(w.element.style.color).toBe('rgb(1, 2, 3)')
  })
  it('disabled links do not consume once', async () => {
    const observer = vi.fn()
    const { w } = render({ component: 'a', href: '#save', disabled: true, onClickOnce: observer })
    await w.trigger('click')
    expect(observer).not.toHaveBeenCalled()
    expect(w.attributes('href')).toBeUndefined()
    await w.setProps({ disabled: false })
    await w.trigger('click')
    await w.trigger('click')
    expect(w.attributes('href')).toBe('#save')
    expect(observer).toHaveBeenCalledTimes(1)
  })
  it.each(['onClick', 'onClickOnce'])('allows an async %s without automatic busy', async (key) => {
    let finish
    const observer = vi.fn(
      () =>
        new Promise((resolve) => {
          finish = resolve
        }),
    )
    const { w } = render({ [key]: observer })
    await w.trigger('click')
    expect(observer).toHaveBeenCalledTimes(1)
    expect(w.attributes('aria-busy')).toBeUndefined()
    finish()
    await flushPromises()
  })
  it.each(['reject', 'throw'])('passes an event %s through Vue exactly once', async (kind) => {
    const error = new Error('save failed')
    const { w, errors } = render({
      onClick: () => {
        if (kind === 'throw') {
          throw error
        }
        return Promise.reject(error)
      },
    })
    await w.trigger('click')
    await flushPromises()
    expect(errors).toEqual([error])
    expect(w.attributes('aria-busy')).toBeUndefined()
  })
  it('business-owned loading blocks clicks immediately and recovers', async () => {
    const saving = ref(false)
    let finish
    const task = vi.fn(
      () =>
        new Promise((resolve) => {
          finish = resolve
        }),
    )
    const Host = defineComponent({
      setup() {
        return () =>
          h(
            Button,
            {
              loading: saving.value,
              onClick: async () => {
                if (saving.value) {
                  return
                }
                saving.value = true
                try {
                  await task()
                } finally {
                  saving.value = false
                }
              },
            },
            () => 'Save',
          )
      },
    })
    const w = mount(Host)
    wrappers.push(w)
    const button = w.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(task).toHaveBeenCalledTimes(1)
    expect(button.attributes('aria-busy')).toBe('true')
    finish()
    await flushPromises()
    expect(button.attributes('aria-busy')).toBeUndefined()
  })
  it('event failures reach parent errorCaptured before app.errorHandler', async () => {
    const error = new Error('captured save')
    const captured = vi.fn(() => false)
    const appError = vi.fn()
    const Host = defineComponent({
      setup() {
        onErrorCaptured(captured)
        return () => h(Button, { onClick: () => Promise.reject(error) }, () => 'Save')
      },
    })
    const w = mount(Host, { global: { config: { errorHandler: appError } } })
    wrappers.push(w)
    await w.find('button').trigger('click')
    await flushPromises()
    expect(captured).toHaveBeenCalledTimes(1)
    expect(captured.mock.calls[0][0]).toBe(error)
    expect(appError).not.toHaveBeenCalled()
  })
  it('ignores notifications while deactivated and resumes on activation', async () => {
    const visible = ref(true)
    const observer = vi.fn()
    const host = mount({
      render: () =>
        h(KeepAlive, null, { default: () => (visible.value ? h(Button, { onClick: observer }, () => 'Save') : null) }),
    })
    wrappers.push(host)
    const button = host.findComponent(Button)
    visible.value = false
    await nextTick()
    await button.trigger('click')
    expect(observer).not.toHaveBeenCalled()
    visible.value = true
    await nextTick()
    await host.findComponent(Button).trigger('click')
    expect(observer).toHaveBeenCalledTimes(1)
  })
})
