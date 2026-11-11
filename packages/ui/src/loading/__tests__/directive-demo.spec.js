import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { vLoading } from '..'
import Card from '../../card'
import Space from '../../space'
import Switch from '../../switch'
import Demo from '../example/demos/directive.vue'

test('directive demo stacks its controls and cleans up the toggled overlay', async () => {
  const owner = mount(Demo, {
    global: {
      components: { MpSpace: Space, MpSwitch: Switch, MpCard: Card },
      directives: { 'mp-loading': vLoading },
    },
  })
  expect(owner.findComponent(Space).props('direction')).toBe('column')
  const toggle = owner.findAllComponents(Switch)[0]
  await toggle.trigger('click')
  expect(owner.find('.mp-loading-directive').exists()).toBe(true)
  await toggle.trigger('click')
  expect(owner.find('.mp-loading-directive').exists()).toBe(false)
  owner.unmount()
})
