import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Space from '..'
import Button from '../../button'
import Demo from '../example/demos/interactive-layout.vue'

test('interactive layout controls update props and keyed children', async () => {
  const owner = mount(Demo, { global: { components: { MpSpace: Space, MpButton: Button } } })
  const controls = owner.findAllComponents(Button)
  const layout = () => owner.findComponent('[data-demo-layout]')
  await controls[0].trigger('click')
  expect(layout().props('direction')).toBe('column')
  await controls[1].trigger('click')
  expect(layout().props('size')).toEqual([8, 24])
  await controls[2].trigger('click')
  expect(layout().props('wrap')).toBe(true)
  await controls[3].trigger('click')
  expect(owner.text()).toContain('items 4')
  await controls[4].trigger('click')
  expect(owner.text()).toContain('items 3')
  owner.unmount()
})
