import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import ProgressGroup from '..'

test.each(['line', 'circle'] as const)('%s tooltip remains over pointer and returns to focused item', async (mode) => {
  vi.useFakeTimers()
  const schedule = vi.spyOn(globalThis, 'setTimeout')
  const cancel = vi.spyOn(globalThis, 'clearTimeout')
  const wrapper = mount(ProgressGroup, {
    props: {
      mode,
      items: [
        { label: 'A', value: 30 },
        { label: 'B', value: 30 },
      ],
    },
  })
  try {
    const segments = wrapper.findAll('[role="progressbar"]')
    await segments[1].trigger('focus')
    await segments[0].trigger('mouseenter')
    expect(wrapper.get('[role="tooltip"]').text()).toContain('A:')
    await segments[0].trigger('mouseleave')
    vi.advanceTimersByTime(100)
    await wrapper.get('[role="tooltip"]').trigger('mouseenter')
    vi.advanceTimersByTime(500)
    await nextTick()
    expect(wrapper.get('[role="tooltip"]').text()).toContain('A:')
    await wrapper.get('[role="tooltip"]').trigger('mouseleave')
    vi.advanceTimersByTime(250)
    await nextTick()
    expect(wrapper.get('[role="tooltip"]').text()).toContain('B:')
    await segments[1].trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
    await segments[0].trigger('mouseenter')
    await segments[0].trigger('mouseleave')
    const index = schedule.mock.calls.findLastIndex((call) => call[1] === 250)
    const pending = schedule.mock.results[index].value
    wrapper.unmount()
    expect(cancel).toHaveBeenCalledWith(pending)
  } finally {
    wrapper.unmount()
    vi.restoreAllMocks()
    vi.useRealTimers()
  }
})

test('orientation affects line layout only and item class and dynamic slot fallback remain available', async () => {
  const wrapper = mount(ProgressGroup, {
    props: {
      mode: 'circle',
      orientation: 'vertical',
      items: [{ label: 'Alpha', value: 20, class: 'custom-item', slot: 'custom' }],
    },
    slots: {
      text: ({ percent }: { percent: number }) => `total ${percent}`,
      'item-label': () => 'generic',
      'custom-leading': () => 'leading',
    },
  })
  expect(wrapper.classes().some((name) => name.endsWith('--horizontal'))).toBe(true)
  expect(wrapper.classes().some((name) => name.endsWith('--vertical'))).toBe(false)
  expect(wrapper.get('.custom-item').text()).toContain('Alpha')
  expect(wrapper.get('.custom-item').text()).toContain('leading')
  expect(wrapper.get('.custom-item').text()).not.toContain('generic')
  expect(wrapper.text()).toContain('total 20')
  await wrapper.setProps({ mode: 'line' })
  expect(wrapper.classes().some((name) => name.endsWith('--vertical'))).toBe(true)
  wrapper.unmount()
})

test('Escape dismisses a hover-only tooltip even when focus is elsewhere', async () => {
  const wrapper = mount(ProgressGroup, { props: { items: [{ label: 'Alpha', value: 20 }] }, attachTo: document.body })
  await wrapper.get('[role="progressbar"]').trigger('mouseenter')
  expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  await nextTick()
  expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  wrapper.unmount()
})

test('KeepAlive deactivation cancels pending hover and clears stale focus', async () => {
  vi.useFakeTimers()
  const active = ref(true)
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, null, () => (active.value ? h(ProgressGroup, { items: [{ label: 'Alpha', value: 20 }] }) : null)),
    }),
    { attachTo: document.body },
  )
  try {
    const segment = wrapper.get('[role="progressbar"]')
    await segment.trigger('focus')
    await segment.trigger('mouseenter')
    await segment.trigger('mouseleave')
    active.value = false
    await nextTick()
    vi.advanceTimersByTime(500)
    active.value = true
    await nextTick()
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  } finally {
    wrapper.unmount()
    vi.useRealTimers()
  }
})

test('a cancelled hover timeout cannot hide a newer tooltip', async () => {
  const callbacks: Array<() => void> = []
  const original = globalThis.setTimeout
  const schedule = vi.spyOn(globalThis, 'setTimeout').mockImplementation(((
    callback: TimerHandler,
    delay?: number,
    ...args: unknown[]
  ) => {
    if (delay === 250) {
      callbacks.push(callback as () => void)
    }
    return original(callback, delay, ...args)
  }) as typeof setTimeout)
  const wrapper = mount(ProgressGroup, {
    props: {
      items: [
        { label: 'A', value: 30 },
        { label: 'B', value: 30 },
      ],
    },
  })
  try {
    const segments = wrapper.findAll('[role="progressbar"]')
    await segments[0].trigger('mouseenter')
    await segments[0].trigger('mouseleave')
    expect(callbacks).toHaveLength(1)
    await segments[1].trigger('mouseenter')
    callbacks[0]()
    await nextTick()
    expect(wrapper.get('[role="tooltip"]').text()).toContain('B:')
  } finally {
    wrapper.unmount()
    schedule.mockRestore()
  }
})
