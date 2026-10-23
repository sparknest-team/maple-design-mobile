import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Button from '../../button'
import Radio, { RadioGroup } from '../../radio'
import Space from '../../space'
import Demo from '../example/demos/async-devices.vue'
import Select from '../select'
import SelectMenu from '../SelectMenu'
import { getKeyFromValue } from '../utils'

test.each(['inline', 'popup'])(
  'async devices demo preserves IDs and commits %s selections with limit feedback',
  async (presentation) => {
    const wrapper = mount(Demo, {
      global: {
        components: { MpSelect: Select, MpButton: Button, MpSpace: Space, MpRadioGroup: RadioGroup, MpRadio: Radio },
      },
    })
    try {
      const devices = wrapper.findComponent(Select)
      const mode = wrapper.findComponent(RadioGroup)
      expect(wrapper.findAllComponents(Select)).toHaveLength(1)
      expect(mode.props('modelValue')).toBe('inline')
      expect(devices.props('modelValue')).toEqual([2])
      expect(devices.props('options')).toEqual([])
      await wrapper
        .findAll('button')
        .find((button) => button.text() === '加载设备列表')
        .trigger('click')
      await flushPromises()
      expect(devices.text()).toContain('设备 2')
      expect(devices.props('modelValue')).toEqual([2])
      mode.vm.$emit('update:modelValue', presentation)
      await flushPromises()
      expect(devices.props('presentation')).toBe(presentation)
      const controller = devices.findComponent(SelectMenu).props('controller')
      controller.handleOpenChange(true)
      await flushPromises()
      for (const id of [3, 5, 6, 4]) {
        controller.handleSelect(getKeyFromValue(id), new Event('click'))
        await flushPromises()
      }
      expect(wrapper.get('[role=status]').text()).toContain('最多选择三个设备')
      if (presentation !== 'inline') {
        expect(devices.props('modelValue')).toEqual([2])
        controller.session.commit()
        await flushPromises()
      }
      expect(devices.props('modelValue')).toEqual([2, 3, 5])
      expect(wrapper.text()).toMatch(/已提交 ID：\[\s*2,\s*3,\s*5\s*\]/)
    } finally {
      wrapper.unmount()
    }
  },
)
