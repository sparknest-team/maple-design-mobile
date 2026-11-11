import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Space from '../../space'
import Demo from '../example/demos/step.vue'
import TimeRange from '../index'

useDemoControls()

it('12-hour step demo changes presentation without rewriting the formatted model or intervals', async () => {
  const wrapper = mount(Demo, { global: { components: { MpTimeRange: TimeRange, MpSpace: Space } } })
  const field = wrapper.getComponent(TimeRange)
  await wrapper.get('input[type="checkbox"]').setValue(true)
  expect(field.props('use12Hours')).toBe(true)
  expect(field.props('format')).toBe('HH:mm:ss')
  expect(field.props('step')).toEqual({ hour: 1, minute: 15, second: 10 })
  expect(field.props('modelValue')).toEqual(['09:30:00', '17:00:00'])
  wrapper.unmount()
})
