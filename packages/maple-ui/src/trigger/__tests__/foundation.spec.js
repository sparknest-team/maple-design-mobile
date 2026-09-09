import { createSSRApp, defineComponent, Fragment, h, nextTick, reactive, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Trigger from '..'
import { useTriggerState } from '../state'

const triggerSlots = {
  default: () => h('button', { 'data-reference': '' }, 'reference'),
  content: () => h('div', 'panel'),
}

describe('Trigger shared state and node contract', () => {
  test('controlled requests do not change actual visibility until accepted', async () => {
    const wrapper = mount(Trigger, {
      props: { trigger: 'click', open: false, popupContainer: false },
      slots: triggerSlots,
    })
    try {
      await wrapper.get('button').trigger('click')
      expect(wrapper.emitted('update:open')).toEqual([[true]])
      expect(wrapper.emitted('open-change')).toEqual([[true]])
      expect(wrapper.emitted('open')).toBeUndefined()
      await wrapper.setProps({ open: true })
      expect(wrapper.emitted('open')).toHaveLength(1)
      expect(wrapper.emitted('update:open')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('defaultOpen initializes an uncontrolled instance that can close', async () => {
    const wrapper = mount(Trigger, {
      props: { trigger: 'click', defaultOpen: true, closeOnClickReference: true, popupContainer: false },
      slots: triggerSlots,
    })
    try {
      expect(wrapper.emitted('open')).toHaveLength(1)
      await wrapper.get('button').trigger('click')
      expect(wrapper.emitted('update:open')).toEqual([[false]])
      expect(wrapper.emitted('close')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('SVG component roots inside fragments work without a span and preserve refs', async () => {
    const iconRef = ref()
    const Icon = defineComponent({
      render: () =>
        h(Fragment, [h('svg', { 'data-icon': '', viewBox: '0 0 16 16' }, [h('circle', { cx: 8, cy: 8, r: 3 })])]),
    })
    const wrapper = mount(Trigger, {
      props: { trigger: 'click', popupContainer: false },
      slots: { ...triggerSlots, default: () => h(Fragment, [h(Icon, { ref: iconRef })]) },
    })
    try {
      await nextTick()
      expect(iconRef.value).toBeTruthy()
      await wrapper.get('svg').trigger('click')
      expect(wrapper.emitted('open')).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })
  test('changing a slot root detaches the previous DOM target', async () => {
    const tag = ref('button')
    const wrapper = mount(Trigger, {
      props: { trigger: 'click', popupContainer: false },
      slots: { ...triggerSlots, default: () => h(tag.value, { key: tag.value }, 'reference') },
    })
    try {
      const old = wrapper.get('button').element
      tag.value = 'svg'
      await nextTick()
      await nextTick()
      old.dispatchEvent(new MouseEvent('click'))
      expect(wrapper.emitted('open')).toBeUndefined()
      await wrapper.get('svg').trigger('click')
      expect(wrapper.emitted('open')).toHaveLength(1)
      expect(old.isConnected).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  test('state requests deduplicate and external changes do not echo', async () => {
    const options = reactive({ open: undefined, defaultOpen: false, disabled: false })
    const emit = vi.fn()
    let state
    const wrapper = mount({
      setup() {
        state = useTriggerState(options, emit)
        return () => h('div')
      },
    })
    try {
      state.request(true)
      state.request(true)
      expect(emit.mock.calls).toEqual([
        ['update:open', true],
        ['open-change', true],
      ])
      options.open = false
      await nextTick()
      expect(state.visible.value).toBe(false)
      expect(emit).toHaveBeenCalledTimes(2)
    } finally {
      wrapper.unmount()
    }
  })
  test('pending delayed open is cancelled by leave, external state, disable and unmount', async () => {
    vi.useFakeTimers()
    const emit = vi.fn()
    const options = reactive({ open: undefined, disabled: false })
    let state
    const wrapper = mount({
      setup() {
        state = useTriggerState(options, emit)
        return () => h('div')
      },
    })
    try {
      state.request(true, 100)
      state.request(false)
      vi.advanceTimersByTime(150)
      expect(emit).not.toHaveBeenCalled()
      state.request(true, 100)
      options.open = false
      await nextTick()
      vi.advanceTimersByTime(150)
      expect(emit).not.toHaveBeenCalled()
      options.open = undefined
      await nextTick()
      state.request(true, 100)
      options.disabled = true
      await nextTick()
      vi.advanceTimersByTime(150)
      expect(emit).not.toHaveBeenCalled()
      options.disabled = false
      await nextTick()
      state.request(true, 100)
      wrapper.unmount()
      vi.advanceTimersByTime(150)
      expect(emit).not.toHaveBeenCalled()
    } finally {
      wrapper.unmount()
      vi.useRealTimers()
    }
  })
  test('rapid instance changes remain isolated', async () => {
    const wrapper = mount({
      render: () =>
        h('div', [
          h(Trigger, { trigger: 'click', popupContainer: false }, triggerSlots),
          h(Trigger, { trigger: 'click', popupContainer: false }, triggerSlots),
        ]),
    })
    try {
      const groups = wrapper.findAllComponents(Trigger)
      await groups[0].get('button').trigger('click')
      expect(groups[0].emitted('open')).toHaveLength(1)
      expect(groups[1].emitted('open')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  test('SSR supports SVG and defaultOpen without DOM access', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () =>
          h(Trigger, { defaultOpen: true }, { ...triggerSlots, default: () => h('svg', { 'data-ssr-icon': '' }) }),
      }),
    )
    expect(html).toContain('data-ssr-icon')
  })
  test('external reference overrides the slot and can be reset through the public method', async () => {
    const external = document.createElement('button')
    external.id = 'external-trigger-target'
    document.body.appendChild(external)
    const wrapper = mount(Trigger, {
      props: { trigger: 'click', reference: '#external-trigger-target', popupContainer: false },
      slots: triggerSlots,
    })
    try {
      await nextTick()
      await nextTick()
      expect(wrapper.vm.getReference()).toBe(external)
      await wrapper.get('[data-reference]').trigger('click')
      expect(wrapper.emitted('update:open')).toBeUndefined()
      external.click()
      await nextTick()
      expect(wrapper.emitted('update:open')).toEqual([[true]])
      await wrapper.setProps({ reference: undefined })
      expect(wrapper.vm.getReference()).toBe(wrapper.get('[data-reference]').element)
      external.click()
      await nextTick()
      // External click is outside now, not a reference toggle.
      expect(wrapper.emitted('click-outside')).toHaveLength(1)
      wrapper.vm.setReference(external)
      expect(wrapper.vm.getReference()).toBe(external)
      wrapper.vm.setReference()
      expect(wrapper.vm.getReference()).toBe(wrapper.get('[data-reference]').element)
    } finally {
      wrapper.unmount()
      external.remove()
    }
  })
})
