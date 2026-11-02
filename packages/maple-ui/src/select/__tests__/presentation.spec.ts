import { h, nextTick, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Select from '../select'
import SelectMenu from '../SelectMenu'
import { getKeyFromValue } from '../utils'

describe('Select presentation contract', () => {
  for (const editMode of ['direct', 'popup', 'popup'] as const) {
    test(editMode + ' has one field and independently controlled values', async () => {
      const wrapper = mount(Select, {
        props: {
          editMode,
          multiple: true,
          modelValue: [1],
          options: [
            { value: 1, label: 'A' },
            { value: 2, label: 'B' },
          ],
        },
      })
      await nextTick()
      if (editMode === 'direct') {
        expect(wrapper.findAll('input')).toHaveLength(1)
      }
      const controller = wrapper.findComponent(SelectMenu).props('controller')
      controller.handleOpenChange(true)
      await nextTick()
      controller.handleSelect(getKeyFromValue(2), new Event('click'))
      await nextTick()
      if (editMode === 'direct') {
        expect(wrapper.emitted('change')).toEqual([[[1, 2]]])
      } else {
        expect(wrapper.emitted('change')).toBeUndefined()
        expect(controller.computedInputValue).toBe('')
        await controller.session.commit()
        await controller.session.commit()
        expect(wrapper.emitted('change')).toEqual([[[1, 2]]])
      }
      wrapper.unmount()
    })
  }
  test('popup cancellation discards draft, external updates win, and instances are isolated', async () => {
    const props = {
      editMode: 'popup' as const,
      multiple: true,
      modelValue: [1],
      options: [
        { value: 1, label: 'A' },
        { value: 2, label: 'B' },
      ],
    }
    const a = mount(Select, { props }),
      b = mount(Select, { props })
    const controller = a.findComponent(SelectMenu).props('controller')
    controller.handleOpenChange(true)
    await nextTick()
    controller.handleSelect(getKeyFromValue(2), new Event('click'))
    controller.session.cancel()
    await nextTick()
    expect(a.emitted('change')).toBeUndefined()
    expect(b.emitted('change')).toBeUndefined()
    controller.handleOpenChange(true)
    await nextTick()
    await a.setProps({ modelValue: [2] })
    controller.session.commit()
    expect(a.emitted('change')).toBeUndefined()
    a.unmount()
    b.unmount()
  })
})
