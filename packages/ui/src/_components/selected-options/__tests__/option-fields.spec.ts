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
    it('selects in the editor and confirms only the final text', async () => {
      const host = document.createElement('div')
      document.body.append(host)
      const wrapper = mount(AutoComplete, {
        attachTo: host,
        props: { editMode, shouldOpen: () => true, options: ['Alpha', 'Beta'] },
        global,
      })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        const editor = () => wrapper.get(`.${p}-field-presentation__body`)
        await editor().get('input').trigger('focus')
        await flushPromises()
        expect(editor().findAll('input')).toHaveLength(1)
        expect(editor().findAll('[role=option]')).toHaveLength(2)
        if (mobile) {
          expect(editor().find(`.${p}-trigger`).exists()).toBe(false)
        } else {
          expect(editor().get('input').attributes('aria-expanded')).toBe('true')
        }
        await editor()
          .findAll('[role=option]')
          .find((option) => option.text() === 'Beta')!
          .trigger('click')
        await flushPromises()
        expect((editor().get('input').element as HTMLInputElement).value).toBe('Beta')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await wrapper.get(`.${p}-field-presentation__footer button`).trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('Beta')
      } finally {
        wrapper.unmount()
        host.remove()
      }
    })
    it('keeps remote search and refreshed options in the same editor', async () => {
      const host = document.createElement('div')
      document.body.append(host)
      const wrapper = mount(AutoComplete, {
        attachTo: host,
        props: { editMode, shouldOpen: () => true, filterOption: false, options: [] },
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
        host.remove()
      }
    })
  })
}
