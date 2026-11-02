import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Fab from '..'
import Switch from '../../switch'
import { triggerDrag } from '../../utils/test'
import DragDemo from '../example/demos/drag.vue'

test('default container renders a visible trigger and allows expanding actions', async () => {
  const wrapper = mount(Fab, { slots: { default: () => h('button', 'Action') } })
  try {
    await nextTick()
    const trigger = document.body.querySelector('.mp-fab__trigger')
    expect(trigger).toBeTruthy()
    expect(trigger.querySelector('svg')).toBeTruthy()
    trigger.click()
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[true]])
    expect(document.body.querySelector('.mp-fab__actions').style.display).not.toBe('none')
  } finally {
    wrapper.unmount()
  }
})

test('popupContainer=false renders in the preview container', async () => {
  const wrapper = mount(Fab, { props: { popupContainer: false, fixed: false } })
  try {
    await nextTick()
    expect(wrapper.find('.mp-fab__trigger').exists()).toBe(true)
    expect(wrapper.find('.mp-fab--absolute').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('switching preview to viewport drag and back preserves the trigger', async () => {
  const wrapper = mount(Fab, { props: { popupContainer: false, fixed: false, drag: false } })
  try {
    await nextTick()
    const trigger = wrapper.find('.mp-fab__trigger').element
    await wrapper.setProps({ popupContainer: 'body', fixed: true, drag: true })
    expect(document.body.querySelector('.mp-fab__trigger')).toBe(trigger)
    expect(trigger.closest('.mp-fab--absolute')).toBeNull()
    trigger.click()
    await wrapper.setProps({ popupContainer: false, fixed: false, drag: false })
    expect(wrapper.find('.mp-fab__trigger').element).toBe(trigger)
    expect(wrapper.find('.mp-fab--absolute').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('the drag demo keeps its preview and trigger visible while toggling touch dragging', async () => {
  const wrapper = mount(DragDemo, { global: { components: { MpFab: Fab, MpSwitch: Switch } } })
  try {
    await nextTick()
    const stage = wrapper.get('.fab-demo-stage').element
    const drag = wrapper.get('.mp-drag').element
    const trigger = wrapper.get('.mp-fab__trigger').element
    Object.defineProperties(drag, { offsetParent: { configurable: true, value: stage } })
    Object.defineProperties(stage, {
      clientWidth: { configurable: true, value: 320 },
      clientHeight: { configurable: true, value: 240 },
    })
    vi.spyOn(stage, 'getBoundingClientRect').mockReturnValue({ top: 100, left: 20, width: 320, height: 240 })
    vi.spyOn(drag, 'getBoundingClientRect').mockReturnValue({ top: 120, left: 40, width: 56, height: 56 })
    await triggerDrag(drag, 40, 30)
    expect(drag.style.transform).toBe('')

    await wrapper.get('[role="switch"]').trigger('click')
    expect(wrapper.get('.fab-demo-stage').element).toBe(stage)
    expect(wrapper.get('.mp-fab__trigger').element).toBe(trigger)
    expect(drag.parentElement).toBe(stage)
    expect(drag.classList.contains('mp-drag--local')).toBe(true)
    expect(trigger.style.display).not.toBe('none')
    expect(document.body.querySelector('.mp-fab__trigger')).toBeNull()
    await triggerDrag(drag, 40, 30)
    expect(drag.style.transform).toBe('translate(60px, 50px)')
    await triggerDrag(drag, 1000, 1000)
    expect(drag.style.transform).toBe('translate(264px, 184px)')

    await wrapper.get('[role="switch"]').trigger('click')
    expect(wrapper.get('.fab-demo-stage').element).toBe(stage)
    expect(wrapper.get('.mp-fab__trigger').element).toBe(trigger)
    await triggerDrag(drag, 40, 30)
    expect(drag.style.transform).toBe('translate(264px, 184px)')
  } finally {
    wrapper.unmount()
    vi.restoreAllMocks()
  }
})

test('drag axis and action expansion can change independently', async () => {
  const wrapper = mount(Fab, {
    props: { popupContainer: false, drag: { axis: 'x' }, placement: 'left' },
    slots: { default: () => h('button', 'Action') },
  })
  try {
    const drag = wrapper.findComponent({ name: 'MpDrag' })
    expect(drag.props('axis')).toBe('x')
    expect(wrapper.find('.mp-fab--direction-left').exists()).toBe(true)
    await wrapper.setProps({ drag: { axis: 'y' }, placement: 'bottom' })
    expect(drag.props('axis')).toBe('y')
    expect(wrapper.find('.mp-fab--direction-bottom').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
