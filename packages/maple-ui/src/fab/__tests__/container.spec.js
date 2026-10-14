import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Fab from '..'
import Switch from '../../switch'
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
    expect(wrapper.emitted('update:active')).toEqual([[true]])
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

test('the real drag demo teleports viewport mode out of the scrolling preview', async () => {
  const wrapper = mount(DragDemo, { global: { components: { MpFab: Fab, MpSwitch: Switch } } })
  try {
    await nextTick()
    expect(wrapper.find('.mp-drag--local').exists()).toBe(true)
    await wrapper.get('[role="switch"]').trigger('click')
    await nextTick()
    const trigger = document.body.querySelector('.mp-fab__trigger')
    expect(trigger).toBeTruthy()
    expect(wrapper.find('.mp-fab__trigger').exists()).toBe(false)
    expect(trigger.closest('.mp-drag').classList.contains('mp-drag--local')).toBe(false)
    expect(trigger.closest('.mp-drag').parentElement).toBe(document.body)
    await wrapper.get('[role="switch"]').trigger('click')
    await nextTick()
    expect(wrapper.find('.mp-fab__trigger').exists()).toBe(true)
    expect(wrapper.find('.mp-drag--local').exists()).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
