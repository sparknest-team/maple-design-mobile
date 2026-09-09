import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '..'
import { getArrowStyle } from '../arrow'
import { useTriggerRender } from '../render'

const waitTransition = () => new Promise((resolve) => setTimeout(resolve, 100))
const slots = { default: () => h('button', 'reference'), content: () => h('input', { 'data-content': '' }) }
const create = (props) =>
  mount(Trigger, {
    attachTo: document.body,
    props: { trigger: 'manual', popupContainer: false, animationName: '', duration: 20, ...props },
    slots,
    global: { stubs: { transition: false } },
  })

test('default lazy content survives leave and unmounts only after closed; reopening creates fresh content', async () => {
  const wrapper = create({ open: false })
  try {
    expect(wrapper.find('[data-content]').exists()).toBe(false)
    await wrapper.setProps({ open: true })
    await waitTransition()
    const input = wrapper.get('[data-content]').element
    input.value = 'draft'
    expect(wrapper.emitted('open')).toHaveLength(1)
    expect(wrapper.emitted('opened')).toHaveLength(1)
    await wrapper.setProps({ open: false })
    expect(wrapper.get('[data-content]').element).toBe(input)
    expect(wrapper.emitted('closed')).toBeUndefined()
    await waitTransition()
    expect(wrapper.find('[data-content]').exists()).toBe(false)
    expect(wrapper.emitted('closed')).toHaveLength(1)
    await wrapper.setProps({ open: true })
    await waitTransition()
    expect(wrapper.get('[data-content]').element).not.toBe(input)
    expect(wrapper.get('[data-content]').element.value).toBe('')
  } finally {
    wrapper.unmount()
  }
})

test('unmountOnClose=false retains the exact content node and draft through close/reopen', async () => {
  const wrapper = create({ open: true, unmountOnClose: false })
  try {
    await waitTransition()
    const input = wrapper.get('[data-content]').element
    input.value = 'retained'
    await wrapper.setProps({ open: false })
    await waitTransition()
    expect(wrapper.get('[data-content]').element).toBe(input)
    expect(wrapper.get('[trigger-placement]').element.style.display).toBe('none')
    await wrapper.setProps({ open: true })
    await waitTransition()
    expect(wrapper.get('[data-content]').element.value).toBe('retained')
    expect(wrapper.emitted('opened')).toHaveLength(2)
  } finally {
    wrapper.unmount()
  }
})

test('reopening during leave cancels closed and does not discard the content', async () => {
  const wrapper = create({ open: true })
  try {
    await waitTransition()
    const input = wrapper.get('[data-content]').element
    await wrapper.setProps({ open: false })
    await wrapper.setProps({ open: true })
    await waitTransition()
    expect(wrapper.get('[data-content]').element).toBe(input)
    expect(wrapper.emitted('closed')).toBeUndefined()
    expect(wrapper.emitted('opened')).toHaveLength(2)
    expect(wrapper.get('[trigger-placement]').element.style.pointerEvents).not.toBe('none')
  } finally {
    wrapper.unmount()
  }
})

test('render properties address positioning, content and decorative arrow independently', async () => {
  const wrapper = create({
    open: true,
    showArrow: true,
    popupClass: 'custom-popup',
    contentClass: 'custom-content',
    contentStyle: { padding: '7px' },
    arrowClass: 'custom-arrow',
    arrowStyle: { backgroundColor: 'red' },
  })
  try {
    await waitTransition()
    expect(wrapper.get('.custom-popup').attributes('trigger-placement')).toBeTruthy()
    expect(wrapper.get('.custom-content').element.style.padding).toBe('7px')
    expect(wrapper.get('.custom-arrow').attributes('aria-hidden')).toBe('true')
    expect(wrapper.get('.custom-arrow').element.style.backgroundColor).toBe('red')
    expect(wrapper.get('.custom-content').element.contains(wrapper.get('[data-content]').element)).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('cancelled or duplicated completion hooks emit nothing and cannot release a reopened render', async () => {
  const visible = ref(true)
  const emit = vi.fn()
  let state
  const wrapper = mount({
    setup() {
      state = useTriggerRender(visible, () => true, emit)
      return () => h('div')
    },
  })
  try {
    state.hooks.onBeforeEnter()
    visible.value = false
    state.hooks.onEnterCancelled()
    state.hooks.onAfterEnter()
    expect(emit.mock.calls.filter(([name]) => name === 'opened')).toHaveLength(0)
    state.hooks.onBeforeLeave()
    visible.value = true
    state.hooks.onLeaveCancelled()
    state.hooks.onAfterLeave()
    expect(state.rendered.value).toBe(true)
    expect(emit.mock.calls.filter(([name]) => name === 'closed')).toHaveLength(0)
    state.hooks.onBeforeEnter()
    state.hooks.onAfterEnter()
    state.hooks.onAfterEnter()
    expect(emit.mock.calls.filter(([name]) => name === 'opened')).toHaveLength(1)
  } finally {
    wrapper.unmount()
  }
})

test('arrow clamping preserves signed direction and stays inside even very small popups', () => {
  const popup = { scrollLeft: 100, scrollTop: 100, width: 80, height: 40 }
  const reference = { scrollLeft: 0, scrollTop: 0, width: 20, height: 20 }
  expect(getArrowStyle('bottom-start', reference, popup).left).toBe('8px')
  expect(getArrowStyle('right-start', reference, popup).top).toBe('8px')
  expect(getArrowStyle('top', reference, { ...popup, width: 4 }).left).toBe('2px')
  expect(getArrowStyle('left', { ...reference, scrollTop: 400 }, popup).top).toBe('32px')
})
