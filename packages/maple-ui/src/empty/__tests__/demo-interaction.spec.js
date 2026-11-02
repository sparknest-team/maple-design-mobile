import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Empty from '..'
import Button from '../../button'
import Space from '../../space'
import Extra from '../example/demos/content-comparison.vue'
import Show from '../example/demos/show.vue'

const global = { components: { MpEmpty: Empty, MpSpace: Space, MpButton: Button } }

test('visibility demo toggles both regions independently', async () => {
  const owner = mount(Show, { global })
  expect(owner.findComponent(Space).props('direction')).toBe('column')
  const buttons = owner.findAllComponents(Button)
  await buttons[0].trigger('click')
  expect(owner.findComponent(Empty).props('showIcon')).toBe(false)
  expect(owner.text()).toContain('Dynamic empty state')
  await buttons[1].trigger('click')
  expect(owner.findComponent(Empty).props('showDescription')).toBe(false)
  expect(owner.text()).not.toContain('Dynamic empty state')
  owner.unmount()
})

test('extra slot provides visible local refresh feedback', async () => {
  const owner = mount(Extra, { global })
  await owner.findComponent(Button).trigger('click')
  expect(owner.text()).toContain('Local refresh attempts: 1')
  expect(owner.text()).toContain('No data. Local refresh completed.')
  owner.unmount()
})
