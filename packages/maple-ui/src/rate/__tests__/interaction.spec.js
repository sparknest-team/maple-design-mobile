import { createSSRApp, h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Rate from '..'
import { formHost } from '../../input-number/__tests__/form-host'

describe('Rate interaction contract', () => {
  test('inherits form state and notifies form exactly once', async () => {
    const state = reactive({ disabled: true, readonly: false, error: true })
    const calls = []
    const w = mount(
      formHost(state, { onChange: () => calls.push('form') }, () => h(Rate)),
      { attachTo: document.body },
    )
    const rate = w.findComponent(Rate)
    await rate.trigger('keydown', { key: 'End' })
    expect(calls).toEqual([])
    expect(rate.attributes('aria-invalid')).toBe('true')
    state.disabled = false
    state.readonly = true
    await nextTick()
    expect(rate.attributes('aria-readonly')).toBe('true')
    await rate.trigger('keydown', { key: 'End' })
    expect(calls).toEqual([])
    state.readonly = false
    await nextTick()
    await rate.trigger('keydown', { key: 'End' })
    expect(calls).toEqual(['form'])
    w.unmount()
  })
  test('explicit false overrides inherited disabled and readonly', async () => {
    const state = reactive({ disabled: true, readonly: true })
    const w = mount(formHost(state, {}, () => h(Rate, { disabled: false, readonly: false })))
    const rate = w.findComponent(Rate)
    await rate.trigger('keydown', { key: 'End' })
    expect(rate.emitted('change')).toEqual([[5]])
    w.unmount()
  })
  test('half taps use actual geometry and keep instances independent', async () => {
    const left = mount(Rate, { props: { allowHalf: true } })
    const right = mount(Rate, { props: { allowHalf: true } })
    const item = left.findAll('[class$="rate__content"]')[1]
    item.element.getBoundingClientRect = () => ({ left: 100, width: 24 })
    await item.trigger('click', { clientX: 104 })
    expect(left.emitted('change')).toEqual([[1.5]])
    expect(right.emitted('change')).toBeUndefined()
    left.unmount()
    right.unmount()
  })
  test('uncontrolled value and default initialize only once', async () => {
    const w = mount(Rate, { props: { defaultValue: 2 } })
    await w.trigger('keydown', { key: 'ArrowRight' })
    await w.setProps({ defaultValue: 5 })
    expect(w.attributes('aria-valuenow')).toBe('3')
    expect(w.emitted('change')).toEqual([[3]])
    w.unmount()
  })
  test('controlled rejection keeps authoritative value', async () => {
    const w = mount(Rate, { props: { modelValue: 2 } })
    await w.trigger('keydown', { key: 'ArrowRight' })
    expect(w.attributes('aria-valuenow')).toBe('2')
    expect(w.emitted('update:modelValue')).toEqual([[3]])
    await w.setProps({ modelValue: 0 })
    expect(w.attributes('aria-valuenow')).toBe('0')
    expect(w.emitted('change')).toHaveLength(1)
    w.unmount()
  })
  test('clearable does not clear at keyboard boundary', async () => {
    const w = mount(Rate, { props: { defaultValue: 5, clearable: true } })
    await w.trigger('keydown', { key: 'ArrowRight' })
    await w.trigger('keydown', { key: 'End' })
    expect(w.attributes('aria-valuenow')).toBe('5')
    expect(w.emitted('change')).toBeUndefined()
    await w.findAll('.mp-rate__content')[4].trigger('click')
    expect(w.attributes('aria-valuenow')).toBe('0')
    w.unmount()
  })
  test('readonly stays focusable but is not disabled', async () => {
    const w = mount(Rate, { props: { readonly: true, defaultValue: 2 } })
    expect(w.attributes('tabindex')).toBe('0')
    expect(w.attributes('aria-readonly')).toBe('true')
    expect(w.attributes('aria-disabled')).toBeUndefined()
    await w.trigger('keydown', { key: 'End' })
    await w.find('.mp-rate__content').trigger('click')
    expect(w.emitted('change')).toBeUndefined()
    w.unmount()
  })
  test('disabled guards all interaction and tab entry', async () => {
    const w = mount(Rate, { props: { disabled: true } })
    expect(w.attributes('tabindex')).toBeUndefined()
    await w.trigger('keydown', { key: 'End' })
    await w.find('.mp-rate__content').trigger('mousemove')
    await w.find('.mp-rate__content').trigger('click')
    expect(w.emitted('change')).toBeUndefined()
    expect(w.emitted('hover-change')).toBeUndefined()
    w.unmount()
  })
  test('invalid and out-of-range values never escape ARIA range', async () => {
    const w = mount(Rate, { props: { count: Infinity, modelValue: NaN } })
    expect(w.findAll('.mp-rate__content')).toHaveLength(5)
    expect(w.attributes('aria-valuenow')).toBe('0')
    await w.setProps({ count: 3.9, modelValue: 20 })
    expect(w.attributes('aria-valuenow')).toBe('3')
    await w.setProps({ grading: true, count: 2 })
    expect(w.findAll('.mp-rate__content')).toHaveLength(5)
    expect(w.attributes('aria-valuemax')).toBe('5')
    w.unmount()
  })
  test('half step keyboard and modifier filtering', async () => {
    const w = mount(Rate, { props: { allowHalf: true, defaultValue: 2 } })
    await w.trigger('keydown', { key: 'ArrowRight', ctrlKey: true })
    expect(w.emitted('change')).toBeUndefined()
    await w.trigger('keydown', { key: 'ArrowRight' })
    expect(w.attributes('aria-valuenow')).toBe('2.5')
    await w.trigger('keydown', { key: 'Home' })
    expect(w.attributes('aria-valuenow')).toBe('0')
    w.unmount()
  })
  test('hover is transient and reset when readonly begins', async () => {
    const w = mount(Rate, { props: { defaultValue: 1 } })
    await w.findAll('.mp-rate__content')[2].trigger('mousemove')
    expect(w.emitted('hover-change')).toEqual([[3]])
    expect(w.attributes('aria-valuenow')).toBe('1')
    await w.setProps({ readonly: true })
    expect(w.emitted('hover-change')).toEqual([[3], [0]])
    w.unmount()
  })
  test('slot descendants keep keyboard ownership', async () => {
    const w = mount(Rate, { slots: { character: () => h('button', 'custom') } })
    await w.find('button').trigger('keydown', { key: 'End' })
    expect(w.emitted('change')).toBeUndefined()
    w.unmount()
  })
  test('exposes focus and blur with accessible name', async () => {
    const w = mount(Rate, { attachTo: document.body, props: { ariaLabel: 'Quality' } })
    w.vm.focus()
    await nextTick()
    expect(document.activeElement).toBe(w.element)
    expect(w.attributes('aria-label')).toBe('Quality')
    w.vm.blur()
    expect(document.activeElement).not.toBe(w.element)
    w.unmount()
  })
  test('SSR exposes normalized value without browser APIs', async () => {
    const html = await renderToString(
      createSSRApp(Rate, { modelValue: 9, count: 3, readonly: true, ariaLabel: 'Quality' }),
    )
    expect(html).toContain('aria-valuenow="3"')
    expect(html).toContain('aria-readonly="true"')
  })
  test.each([24, '24', '1.5rem', 'var(--size)'])('accepts documented size %s', (size) => {
    const w = mount(Rate, { props: { size } })
    expect(w.attributes('style')).toContain('font-size')
    w.unmount()
  })
})
