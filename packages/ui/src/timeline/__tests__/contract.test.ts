import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Timeline, { TimelineItem } from '..'

describe('timeline public contract', () => {
  it('renders the pending slot in preference to the pending text, including when added dynamically', async () => {
    const showSlot = ref(false)
    const wrapper = mount({
      setup: () => () =>
        h(
          Timeline,
          { pending: 'Fallback' },
          {
            ...(showSlot.value ? { pending: () => h('strong', 'Slot content') } : {}),
          },
        ),
    })
    expect(wrapper.text()).toContain('Fallback')
    showSlot.value = true
    await nextTick()
    expect(wrapper.text()).toContain('Slot content')
    expect(wrapper.text()).not.toContain('Fallback')
    showSlot.value = false
    await nextTick()
    expect(wrapper.text()).toContain('Fallback')
    wrapper.unmount()

    const slotOnly = mount(Timeline, { slots: { pending: () => 'Slot only' } })
    expect(slotOnly.findAll('[role="listitem"]')).toHaveLength(1)
    expect(slotOnly.text()).toContain('Slot only')
    slotOnly.unmount()
  })

  it('renders pending without a default slot and retains it when data arrives', async () => {
    const empty = mount(Timeline, { props: { pending: 'Waiting' }, slots: { dot: () => 'Custom dot' } })
    expect(empty.findAll('[role="listitem"]')).toHaveLength(1)
    expect(empty.text()).toContain('Waiting')
    expect(empty.text()).toContain('Custom dot')
    await empty.setProps({ pending: false })
    expect(empty.findAll('[role="listitem"]')).toHaveLength(0)
    empty.unmount()

    const loaded = ref(false)
    const wrapper = mount({
      setup: () => () =>
        h(
          Timeline,
          { pending: true },
          {
            default: () => (loaded.value ? [h(TimelineItem, null, () => 'First')] : []),
          },
        ),
    })
    expect(wrapper.findAll('[role="listitem"]')).toHaveLength(1)
    loaded.value = true
    await nextTick()
    expect(wrapper.findAll('[role="listitem"]')).toHaveLength(2)
    expect(wrapper.text()).toContain('First')
    wrapper.unmount()
  })

  it('exports a namespaced component', () => {
    expect(Timeline).toBeTruthy()
    expect(Timeline.name).toMatch(/^Mp/)
  })

  it('only hides the connecting line of the last item', async () => {
    const wrapper = mount(Timeline, {
      slots: {
        default: () => [
          h(TimelineItem, null, () => 'First'),
          h(TimelineItem, null, () => 'Second'),
          h(TimelineItem, null, () => 'Third'),
        ],
      },
    })

    await nextTick()

    const items = wrapper.findAll('.mp-timeline-item')
    expect(items).toHaveLength(3)
    expect(items[0].classes()).not.toContain('mp-timeline-item-last')
    expect(items[1].classes()).not.toContain('mp-timeline-item-last')
    expect(items[2].classes()).toContain('mp-timeline-item-last')
  })
})

it('contentPlacement follows orientation while preserving timeline items', async () => {
  const placement: { value: import('../types').TimelineItemContentPlacement } = { value: 'right' }
  const wrapper = mount(Timeline, {
    props: { mode: 'alternate', orientation: 'vertical' },
    slots: { default: () => h(TimelineItem, { contentPlacement: placement.value }, () => 'Milestone') },
  })
  try {
    await nextTick()
    expect(wrapper.find('.mp-timeline-item').classes()).toContain('mp-timeline-item-vertical-left')
    placement.value = 'bottom'
    await wrapper.setProps({ orientation: 'horizontal' })
    expect(wrapper.find('.mp-timeline-item').classes()).toContain('mp-timeline-item-horizontal-top')
    expect(wrapper.text()).toContain('Milestone')
  } finally {
    wrapper.unmount()
  }
})
