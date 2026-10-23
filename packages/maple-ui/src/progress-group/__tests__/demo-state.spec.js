import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ProgressGroup from '..'
import Button from '../../button'
import Space from '../../space'
import Demo from '../example/demos/overflow-keyboard.vue'

test('capacity demo updates both shapes and restores cleared data', async () => {
  const owner = mount(Demo, {
    global: { components: { MpProgressGroup: ProgressGroup, MpButton: Button, MpSpace: Space } },
  })
  const groups = owner.findAllComponents(ProgressGroup)
  const buttons = owner.findAllComponents(Button)
  expect(groups[0].find('[role="progressbar"][aria-label="B"]').attributes('style')).toContain('width: 30%')
  await buttons[0].trigger('click')
  expect(groups.map((group) => group.props('max'))).toEqual([200, 200])
  expect(groups[0].text()).toContain('65%')
  await buttons[2].trigger('click')
  expect(groups.every((group) => !group.props('tooltip'))).toBe(true)
  expect(owner.findAll('[tabindex="0"]')).toHaveLength(0)
  await buttons[1].trigger('click')
  expect(owner.findAll('[role="progressbar"]')).toHaveLength(0)
  await buttons[1].trigger('click')
  expect(owner.findAll('[role="progressbar"]')).toHaveLength(6)
  expect(owner.text()).toContain('Items: 3; capacity: 200; tooltips: off')
  owner.unmount()
})
