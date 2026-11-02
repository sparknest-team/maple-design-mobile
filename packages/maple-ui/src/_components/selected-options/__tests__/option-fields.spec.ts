import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AutoComplete from '../../../auto-complete'
import type { FieldEditMode } from '../../field-presentation/context'
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
for (const editMode of ['popup'] as FieldEditMode[]) {
  describe(`option field editor ${editMode}`, () => {
    it('renders suggestions directly and confirms only the final text', async () => {
      const wrapper = mount(AutoComplete, {
        props: { editMode, defaultOpen: true, shouldOpen: () => true, options: ['Alpha', 'Beta'] },
        global,
      })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        const editor = wrapper.get(`.${p}-selection-editor`)
        expect(editor.findAll('input')).toHaveLength(1)
        expect(editor.findAll('[role=option]')).toHaveLength(2)
        expect(editor.find(`.${p}-trigger`).exists()).toBe(false)
        await editor
          .findAll('[role=option]')
          .find((option) => option.text() === 'Beta')!
          .trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await wrapper.get(`.${p}-field-presentation__footer button`).trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('Beta')
      } finally {
        wrapper.unmount()
      }
    })
    it('keeps remote search and refreshed options in the same editor', async () => {
      const wrapper = mount(AutoComplete, {
        props: { editMode, defaultOpen: true, shouldOpen: () => true, filterOption: false, options: [] },
        global,
      })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        await wrapper.get('input').setValue('Beta')
        await flushPromises()
        expect(wrapper.emitted('search')?.[0][0]).toBe('Beta')
        await wrapper.setProps({ options: ['Beta result'] })
        expect(wrapper.get('[role=option]').text()).toBe('Beta result')
        await wrapper.get(`.${p}-field-presentation__close`).trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    })
  })
}
