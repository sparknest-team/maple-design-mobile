import { h, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Select from '../select'
import SelectMenu from '../SelectMenu'
import { getKeyFromValue } from '../utils'

describe('Select field integration', () => {
  for (const presentation of ['inline', 'popup']) {
    test(`${presentation}: removes the selected identity, not the first matching label`, async () => {
      const wrapper = mount(Select, {
        props: {
          presentation,
          multiple: true,
          showTags: true,
          modelValue: [1, 2],
          options: [
            { value: 1, label: '设备' },
            { value: 2, label: '设备' },
          ],
        },
      })
      await nextTick()
      if (presentation === 'inline') {
        await wrapper.findAll('.mp-tag__close-btn')[1].trigger('click')
      } else {
        const controller = wrapper.findComponent(SelectMenu).props('controller')
        controller.handleOpenChange(true)
        await flushPromises()
        controller.handleSelect(getKeyFromValue(2), new Event('click'))
        expect(wrapper.emitted('change')).toBeUndefined()
        await controller.session.commit()
      }
      expect(wrapper.emitted('update:modelValue')).toEqual([[[1]]])
      expect(wrapper.emitted('change')).toEqual([[[1]]])
      wrapper.unmount()
    })
  }

  test('renders formatted labels in a popup field', () => {
    const wrapper = mount(Select, {
      props: {
        presentation: 'popup',
        modelValue: 1,
        options: [{ value: 1, label: '设备' }],
        formatLabel: (option) => `设备 ${option.value} true`,
      },
    })
    expect(wrapper.text()).toContain('设备 1 true')
    wrapper.unmount()
  })

  test('focuses the real input once and preserves custom clear slots', async () => {
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: { modelValue: 1, clearable: true, options: [{ value: 1, label: '设备' }] },
    })
    await wrapper.get('input').trigger('focus')
    expect(wrapper.emitted('focus')).toHaveLength(1)
    await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
})

test('passes committed values and plain option text to the read slot', async () => {
  const read = vi.fn(({ text }) => h('span', { 'data-read-text': '' }, text))
  const wrapper = mount(Select, {
    props: {
      multiple: true,
      modelValue: [1, 2],
      options: [
        { value: 1, label: '设备' },
        { value: 2, label: '设备' },
      ],
      readPretty: true,
      separator: ' / ',
    },
    slots: { label: () => h('strong', 'custom label'), read },
  })
  expect(wrapper.get('[data-read-text]').text()).toBe('设备 / 设备')
  expect(read.mock.calls.at(-1)?.[0]).toMatchObject({ value: [1, 2], text: '设备 / 设备' })
  await wrapper.setProps({ modelValue: [2] })
  expect(wrapper.get('[data-read-text]').text()).toBe('设备')
  wrapper.unmount()
})
