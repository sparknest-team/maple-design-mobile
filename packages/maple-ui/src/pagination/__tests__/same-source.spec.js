import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Pagination from '..'
import Select from '../../select'
import PageStep from '../PageItemStep.vue'
import PageJumper from '../PageJumper.vue'
import PageOptions from '../PageOptions.vue'
import { paginationProps } from '../props'

const wrappers = []
const render = (props = {}, extra = {}) => {
  const w = mount(Pagination, { props: { total: 200, responsive: false, ...props }, ...extra })
  wrappers.push(w)
  return w
}
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  vi.restoreAllMocks()
})
const active = (w) => w.find('[aria-current="page"]').text()
const clickPage = async (w, page) => {
  const button = w.findAll('button').find((b) => b.text() === String(page))
  await button.trigger('click')
}

describe('Pagination shared contract', () => {
  test('installs and exposes aligned defaults', () => {
    const app = createApp({}).use(Pagination)
    expect(app.component(Pagination.name)).toBeTruthy()
    expect(paginationProps.size.default).toBe('md')
    expect(paginationProps.elevation.default).toBe(false)
  })
  test('uncontrolled page emits once', async () => {
    const w = render({ total: 50 })
    await clickPage(w, 2)
    expect(active(w)).toBe('2')
    expect(w.emitted('change')).toEqual([[2]])
    expect(w.emitted('update:current')).toEqual([[2]])
    await clickPage(w, 2)
    expect(w.emitted('change')).toHaveLength(1)
  })
  test('controlled page waits for parent', async () => {
    const w = render({ total: 50, current: 1 })
    await clickPage(w, 2)
    expect(active(w)).toBe('1')
    await w.setProps({ current: 2 })
    expect(active(w)).toBe('2')
  })
  test('steps and ellipsis navigate', async () => {
    const w = render({ total: 500, defaultCurrent: 10 })
    await w.findAll('.mp-pagination__item-ellipsis')[1].trigger('click')
    expect(active(w)).toBe('15')
    await w.find('.mp-pagination__previous').trigger('click')
    expect(active(w)).toBe('14')
  })
  test('all controls obey disabled including page-size props', async () => {
    const w = render({ disabled: true, showPageSize: true, showJumper: true, pageSizeProps: { disabled: false } })
    expect(w.findAll('button').every((b) => b.element.disabled)).toBe(true)
    w.findComponent(PageOptions).vm.$emit('change', 20)
    w.findComponent(PageJumper).vm.$emit('change', 2)
    await nextTick()
    expect(w.emitted('change')).toBeUndefined()
    expect(w.emitted('page-size-change')).toBeUndefined()
    expect(w.findComponent(Select).props('disabled')).toBe(true)
  })
  test('zero total and hidden single page', async () => {
    const w = render({ total: 0, hideOnSinglePage: true })
    expect(w.element.style.display).toBe('none')
    expect(w.findAll('button').every((b) => b.element.disabled)).toBe(true)
    await w.setProps({ total: 20 })
    expect(w.element.style.display).not.toBe('none')
  })
  test('page size preserves record and emits once', async () => {
    const w = render({ defaultCurrent: 5, showPageSize: true })
    w.findComponent(PageOptions).vm.$emit('change', 20)
    await nextTick()
    expect(active(w)).toBe('3')
    expect(w.emitted('page-size-change')).toEqual([[20]])
    expect(w.emitted('change')).toEqual([[3]])
  })
  test('controlled size waits for parent', async () => {
    const w = render({ pageSize: 10, defaultCurrent: 5, showPageSize: true })
    w.findComponent(PageOptions).vm.$emit('change', 20)
    await nextTick()
    expect(active(w)).toBe('5')
    await w.setProps({ pageSize: 20 })
    expect(active(w)).toBe('3')
  })
  test('simultaneous size and total clamp once', async () => {
    const w = render({ current: 18, pageSize: 10, total: 200 })
    await w.setProps({ pageSize: 20, total: 25 })
    expect(w.emitted('change')).toEqual([[2]])
    expect(w.emitted('update:current')).toEqual([[2]])
  })
  test('explicit current wins in simultaneous parent update', async () => {
    const w = render({ current: 4, pageSize: 10 })
    await w.setProps({ current: 5, pageSize: 20 })
    expect(active(w)).toBe('5')
    expect(w.emitted('change')).toBeUndefined()
  })
  test('total shrinking to zero resets to one', async () => {
    const w = render({ defaultCurrent: 18 })
    await w.setProps({ total: 0 })
    expect(w.emitted('change')).toEqual([[1]])
  })
  test('auto adjust can be disabled', async () => {
    const w = render({ defaultCurrent: 18, autoAdjust: false })
    await w.setProps({ total: 25, pageSize: 20 })
    expect(w.emitted('change')).toBeUndefined()
  })
  test('blank and invalid jumper values never navigate', async () => {
    const w = render({ simple: true, defaultCurrent: 4 })
    const input = w.find('input')
    for (const value of ['', 'abc', '2.5', '-1']) {
      await input.setValue(value)
      await input.trigger('blur')
      expect(input.element.value).toBe('4')
    }
    expect(w.emitted('change')).toBeUndefined()
  })
  test('jumper clamps and Enter plus blur emits once', async () => {
    const w = render({ simple: true, defaultCurrent: 4, total: 50 })
    const input = w.find('input')
    await input.setValue('999')
    await input.trigger('keydown', { key: 'Enter' })
    await input.trigger('blur')
    expect(w.emitted('change')).toEqual([[5]])
    expect(input.element.value).toBe('5')
  })
  test('controlled jumper restores parent value', async () => {
    const w = render({ simple: true, current: 4 })
    const input = w.find('input')
    await input.setValue('2')
    await input.trigger('blur')
    expect(w.emitted('change')).toEqual([[2]])
    expect(input.element.value).toBe('4')
  })
  test('full jumper clears after commit', async () => {
    const w = render({ showJumper: true })
    const input = w.find('input')
    await input.setValue('3')
    await input.trigger('blur')
    expect(active(w)).toBe('3')
    expect(input.element.value).toBe('')
  })
  test('styles merge and all six slots render', () => {
    const w = render(
      {
        defaultCurrent: 10,
        total: 500,
        showTotal: true,
        showJumper: true,
        pageItemStyle: { borderRadius: '8px' },
        activePageItemStyle: { fontWeight: '700' },
      },
      {
        slots: {
          total: ({ total }) => 'Records ' + total,
          'page-item': ({ page }) => 'P' + page,
          'page-item-step': ({ type }) => type,
          'page-item-ellipsis': () => 'MORE',
          'jumper-prepend': () => 'GO',
          'jumper-append': () => 'PAGE',
        },
      },
    )
    expect(w.text()).toContain('Records 500')
    for (const text of ['P10', 'previous', 'next', 'MORE', 'GO', 'PAGE']) {
      expect(w.text()).toContain(text)
    }
    const el = w.find('[aria-current]')
    expect(el.element.style.borderRadius).toBe('8px')
    expect(el.element.style.fontWeight).toBe('700')
  })
  test('size reaches selector and input', () => {
    const w = render({ size: 'xl', showJumper: true, showPageSize: true })
    expect(w.findComponent(PageJumper).props('size')).toBe('xl')
    expect(w.findComponent(Select).props('size')).toBe('xl')
    expect(w.findComponent(Select).props('autoFitPopupWidth')).toBe(false)
  })
  test('selector validates options and does not duplicate update', async () => {
    const w = render({ showPageSize: true, pageSizeOptions: [10, 20] })
    const select = w.findComponent(Select)
    select.vm.$emit('update:modelValue', 20)
    select.vm.$emit('change', 20)
    await nextTick()
    expect(w.emitted('page-size-change')).toEqual([[20]])
    select.vm.$emit('update:modelValue', 999)
    await nextTick()
    expect(w.emitted('page-size-change')).toHaveLength(1)
  })
  test('native button semantics and input accessible name', () => {
    const w = render({ simple: true })
    expect(w.element.tagName).toBe('NAV')
    expect(w.attributes('aria-label')).toBeTruthy()
    expect(w.findAll('button').every((b) => b.attributes('type') === 'button' && !!b.attributes('aria-label'))).toBe(
      true,
    )
    expect(w.find('input').attributes('inputmode')).toBe('numeric')
    expect(w.find('input').attributes('aria-label')).toBeTruthy()
  })
  test('step type remains reactive and out of range next is disabled', async () => {
    const w = mount(PageStep, { props: { type: 'previous', current: 1, pages: 5 } })
    wrappers.push(w)
    expect(w.element.disabled).toBe(true)
    await w.setProps({ type: 'next' })
    expect(w.element.disabled).toBe(false)
    await w.setProps({ current: 10 })
    expect(w.element.disabled).toBe(true)
  })
  test('container responsive mode preserves extras and cleans observer', async () => {
    const Original = globalThis.ResizeObserver
    let resize
    const disconnect = vi.fn()
    globalThis.ResizeObserver = class {
      constructor(cb) {
        resize = cb
      }
      observe() {}
      disconnect = disconnect
    }
    let width = 360
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      width,
      height: 40,
      top: 0,
      left: 0,
      right: width,
      bottom: 40,
      x: 0,
      y: 0,
      toJSON() {},
    }))
    try {
      const w = render({ responsive: true, showTotal: true, showPageSize: true, showJumper: true })
      await nextTick()
      expect(w.classes()).toContain('mp-pagination--compact')
      expect(w.findAllComponents(PageJumper)).toHaveLength(1)
      expect(w.findComponent(PageOptions).exists()).toBe(true)
      width = 640
      resize()
      await nextTick()
      expect(w.classes()).not.toContain('mp-pagination--compact')
      expect(w.find('ul').exists()).toBe(true)
      width = 280
      resize()
      await nextTick()
      await w.setProps({ responsive: false })
      expect(w.find('ul').exists()).toBe(true)
      w.unmount()
      wrappers.pop()
      expect(disconnect).toHaveBeenCalledTimes(1)
    } finally {
      globalThis.ResizeObserver = Original
    }
  })
})
