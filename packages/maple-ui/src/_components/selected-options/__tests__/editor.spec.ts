import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Cascader from '../../../cascader'
import Select from '../../../select'
import type { FieldPresentation } from '../../field-presentation/context'
import { mobile } from '../platform'

const p = mobile ? 'mp' : 'c'
const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const global = {
  stubs: {
    CTrigger: Surface,
    Trigger: Surface,
    MpTrigger: Surface,
    CDialog: Surface,
    Dialog: Surface,
    MpDialog: Surface,
    Popup: Surface,
    MpPopup: Surface,
    teleport: true,
  },
}
for (const presentation of ['popup'] as FieldPresentation[]) {
  describe(`selection editor ${presentation}`, () => {
    it('uses a full list without inline checkboxes and commits the draft only on confirmation', async () => {
      const wrapper = mount(Select, {
        props: {
          presentation,
          defaultOpen: true,
          multiple: true,
          modelValue: [1],
          options: [
            { value: 1, label: 'A' },
            { value: 2, label: 'B' },
          ],
        },
        global,
      })
      try {
        expect(wrapper.find(`.${p}-selection-editor`).exists()).toBe(true)
        expect(wrapper.find(`.${p}-select-option .${p}-selection-indicator`).exists()).toBe(false)
        await wrapper
          .findAll('[role=option]')
          .find((option) => option.text() === 'B')!
          .trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await wrapper.get(`.${p}-field-presentation__footer button`).trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')?.[0][0]).toEqual([1, 2])
      } finally {
        wrapper.unmount()
      }
    })
    it('navigates cascade levels in its dedicated editor and keeps selection deferred', async () => {
      const options = [
        {
          value: 'east',
          label: '华东',
          children: [{ value: 'zhejiang', label: '浙江', children: [{ value: 'ningbo', label: '宁波' }] }],
        },
      ]
      const wrapper = mount(Cascader, { props: { presentation, options }, global })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        const choose = async (label: string) => {
          await wrapper
            .findAll('[role=menuitem]')
            .find((option) => option.text() === label)!
            .trigger('click')
          await flushPromises()
        }
        await choose('华东')
        await choose('浙江')
        const columns = wrapper.findAll(`.${p}-cascader-panel-column`).filter((column) => column.isVisible())
        expect(columns).toHaveLength(mobile ? 1 : 3)
        expect(wrapper.findAll(`.${p}-cascader-editor-panel__step`)).toHaveLength(3)
        await choose('宁波')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await wrapper.get(`.${p}-field-presentation__footer button`).trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('ningbo')
      } finally {
        wrapper.unmount()
      }
    })
  })
}
