import { h, nextTick, ref, withDirectives } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { vLoading } from '../../loading'
import Section from '../../section/Section.vue'
import Card from '../Card.vue'
import { cardProps } from '../props'

describe('Card shared contract', () => {
  test('independent instances and supported presets', async () => {
    const a = mount(Card, { props: { title: 'first', size: 'sm', variant: 'outline', direction: 'row' } })
    const b = mount(Card, { props: { title: 'second' } })
    expect(a.classes()).toContain('mp-card--size-sm')
    expect(a.classes()).toContain('mp-card--variant-outline')
    expect(a.get('.mp-card__floater').element.style.background).toBe('transparent')
    expect(a.classes()).toContain('mp-card--direction-row')
    await a.setProps({ title: 'changed' })
    expect(b.text()).toContain('second')
    expect(b.text()).not.toContain('changed')
    a.unmount()
    b.unmount()
  })
  test('updates headings and density while preserving the nested section and description', async () => {
    const wrapper = mount(Card, {
      props: { title: 'Project', description: 'Card description' },
      slots: {
        default: () => h(Section, { title: 'Permissions', description: 'Section description', headingLevel: 3 }),
      },
    })
    expect(wrapper.get('span.mp-card__title-text').text()).toBe('Project')
    const section = wrapper.get('section').element
    const description = wrapper.get('.mp-card__description').element
    expect(description.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      await wrapper.setProps({ size })
      expect(wrapper.classes()).toContain(`mp-card--size-${size}`)
    }
    for (const headingLevel of [1, 2, 3, 4, 5, 6]) {
      await wrapper.setProps({ headingLevel })
      expect(wrapper.get(`h${headingLevel}.mp-card__title-text`).text()).toBe('Project')
      expect(wrapper.get('section').element).toBe(section)
      expect(wrapper.get('.mp-card__description').element).toBe(description)
    }
    expect(wrapper.get('section h3').text()).toBe('Permissions')
    expect(wrapper.get('section').text()).toContain('Section description')
    wrapper.unmount()
  })
  test('sets footer alignment in column and row layouts', async () => {
    const wrapper = mount(Card, { slots: { footer: 'Footer' } })
    const footer = wrapper.get('.mp-card__footer')
    expect(footer.classes()).toEqual(['mp-card__footer'])
    await wrapper.setProps({ footerAlign: 'start' })
    expect(footer.classes()).toContain('mp-card__footer--start')
    await wrapper.setProps({ direction: 'row', footerAlign: 'center' })
    expect(footer.classes()).toContain('mp-card__footer--center')
    await wrapper.setProps({ footerAlign: 'end' })
    expect(footer.classes()).toEqual(['mp-card__footer'])
    wrapper.unmount()
  })
  test('wraps a custom description without requiring a slot class', () => {
    const wrapper = mount(Card, {
      slots: {
        description: () => h('span', { class: 'long-title' }, 'Custom description'),
      },
    })
    expect(wrapper.get('.mp-card__description > .long-title').text()).toBe('Custom description')
    wrapper.unmount()
  })
  test('cover wins over src; body, footer and click stay available', async () => {
    const wrapper = mount(Card, {
      props: { imageSrc: '/unused.png' },
      slots: { cover: 'cover', footer: 'footer', default: 'body' },
    })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('cover')
    expect(wrapper.text()).toContain('footer')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.text()).toContain('body')
    expect(cardProps).not.toHaveProperty('loading')
    expect(wrapper.attributes('aria-busy')).toBeUndefined()
    wrapper.unmount()
  })
  test('composes with the loading directive without replacing content', async () => {
    const busy = ref(true)
    const onClick = vi.fn()
    const wrapper = mount({
      setup: () => () =>
        withDirectives(h(Card, { onClick }, { default: () => h('input', { value: 'retained' }) }), [
          [vLoading, busy.value],
        ]),
    })
    const input = wrapper.find('input').element
    expect(wrapper.find('.mp-loading-directive').exists()).toBe(true)
    const overlayClick = new MouseEvent('click', { bubbles: true, cancelable: true })
    wrapper.find('.mp-loading').element.dispatchEvent(overlayClick)
    expect(overlayClick.defaultPrevented).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
    busy.value = false
    await nextTick()
    expect(wrapper.find('.mp-loading-directive').exists()).toBe(false)
    expect(wrapper.find('input').element).toBe(input)
    await wrapper.find('input').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
  test('does not schedule floating work after unmount', async () => {
    await nextTick()
    const spy = vi.spyOn(globalThis, 'setTimeout')
    try {
      const wrapper = mount(Card, { props: { floating: true, ripple: true } })
      wrapper.unmount()
      await nextTick()
      expect(spy.mock.calls.some(([, delay]) => delay === 500)).toBe(false)
    } finally {
      spy.mockRestore()
    }
  })
  test('cancels its own scheduled floating timer', async () => {
    const schedule = vi.spyOn(globalThis, 'setTimeout')
    const cancel = vi.spyOn(globalThis, 'clearTimeout')
    const wrapper = mount(Card, { props: { floating: true, ripple: true } })
    try {
      await nextTick()
      const index = schedule.mock.calls.findIndex(([, delay]) => delay === 500)
      expect(index).toBeGreaterThanOrEqual(0)
      const timer = schedule.mock.results[index].value
      wrapper.unmount()
      expect(cancel).toHaveBeenCalledWith(timer)
    } finally {
      wrapper.unmount()
      schedule.mockRestore()
      cancel.mockRestore()
    }
  })
})

test('collapsed floating content remains mounted but inert', async () => {
  const wrapper = mount(Card, {
    props: { floating: false },
    slots: { 'floating-content': () => h('input', { 'aria-label': 'Draft' }) },
  })
  const area = wrapper.get('.mp-card__floating-content')
  const input = area.get('input').element
  expect(area.attributes('inert')).toBeDefined()
  expect(area.attributes('aria-hidden')).toBe('true')
  await wrapper.setProps({ floating: true })
  expect(area.attributes('inert')).toBeUndefined()
  expect(area.attributes('aria-hidden')).toBe('true')
  await wrapper.setProps({ floating: false })
  expect(area.get('input').element).toBe(input)
  expect(area.attributes('inert')).toBeDefined()
  wrapper.unmount()
})

test('invalid floating duration falls back and close name can be overridden', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = mount(Card, {
    props: { floating: true, floatingDuration: -1, closeButtonAriaLabel: 'Close details' },
    slots: { 'floating-content': () => 'Details' },
  })
  const fallback = mount(Card, { props: { floating: true } })
  expect(wrapper.get('.mp-card__floating-content').attributes('style')).toContain('500ms')
  await new Promise((resolve) => setTimeout(resolve, 60))
  await nextTick()
  expect(wrapper.get('[aria-label="Close details"]').exists()).toBe(true)
  expect(fallback.get('[aria-label="关闭"]').exists()).toBe(true)
  expect(warn).toHaveBeenCalled()
  wrapper.unmount()
  fallback.unmount()
  warn.mockRestore()
})
