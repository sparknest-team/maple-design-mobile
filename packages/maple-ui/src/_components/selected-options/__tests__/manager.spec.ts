import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Cascader from '../../../cascader'
import Select from '../../../select'
import SelectMenu from '../../../select/SelectMenu'
import type { FieldEditMode } from '../../field-presentation/context'
import { selectionEditorSurface } from '../context'
import { mobile } from '../platform'
import SelectedOptions from '../SelectedOptions.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const global = {
  stubs: {
    CTrigger: Surface,
    CDialog: Surface,
    Dialog: Surface,
    MpDialog: Surface,
    Popup: Surface,
    MpPopup: Surface,
    Trigger: Surface,
    MpTrigger: Surface,
    teleport: true,
  },
}
const dismissible = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('button').filter((button) => button.text() === '×')

describe('selected options presentation', () => {
  it('uses distinct keys for duplicate labels and keeps locked items', async () => {
    const wrapper = mount(SelectedOptions, {
      global: { provide: { [selectionEditorSurface as symbol]: { mobile } } },
      props: {
        multiple: true,
        items: [
          { key: 0, label: 'Same' },
          { key: 1, label: 'Same', closable: false },
        ],
      },
    })
    if (mobile) {
      await wrapper.find('[aria-expanded]').trigger('click')
    }
    expect(dismissible(wrapper)).toHaveLength(2)
    expect(dismissible(wrapper)[1].attributes('disabled')).toBeDefined()
    await dismissible(wrapper)[0].trigger('click')
    expect(wrapper.emitted('remove')).toEqual([[0]])
    await wrapper.setProps({ disabled: true })
    expect(dismissible(wrapper)[0].attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })
  it('returns to options when an editor panel closes, without mutating the options slot', async () => {
    const wrapper = mount(SelectedOptions, {
      global: { provide: { [selectionEditorSurface as symbol]: { mobile } } },
      props: { multiple: true, open: true, items: [] },
      slots: { default: '<input value="search" />' },
      attachTo: document.body,
    })
    if (mobile) {
      await wrapper.find('[aria-expanded]').trigger('click')
      expect(wrapper.find('input').isVisible()).toBe(false)
      await wrapper.setProps({ open: false })
      await flushPromises()
      expect(wrapper.find('input').isVisible()).toBe(true)
      expect(wrapper.find('input').element.value).toBe('search')
    }
    wrapper.unmount()
  })
})

for (const editMode of ['popup' as FieldEditMode] as const) {
  describe(`multi selection ${editMode}`, () => {
    it('Select removes and clears the draft, preserves disabled values and commits once', async () => {
      const wrapper = mount(Select, {
        props: {
          editMode,
          multiple: true,
          defaultOpen: true,
          modelValue: [1, 2],
          clearable: false,
          options: [
            { value: 1, label: 'A' },
            { value: 2, label: 'B', disabled: true },
            { value: 3, label: 'C' },
          ],
        },
        global,
      })
      await flushPromises()
      const manager = wrapper.getComponent(SelectedOptions)
      expect(manager.props('items')).toHaveLength(2)
      if (!mobile) {
        expect(wrapper.find('[class$="-checkbox"]').exists()).toBe(false)
      }
      manager.vm.$emit('remove', manager.props('items')[0].key)
      await flushPromises()
      expect(manager.props('items')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      manager.vm.$emit('clear', new MouseEvent('click'))
      await flushPromises()
      expect(manager.props('items')).toHaveLength(1)
      const controller = wrapper.getComponent(SelectMenu).props('controller')
      await controller.session.commit()
      expect(wrapper.emitted('update:modelValue')).toEqual([[[2]]])
      wrapper.unmount()
    })
    it('Select keeps a rejected draft and disables selected actions while awaiting confirmation', async () => {
      let finish: (value: false) => void = () => {}
      const wrapper = mount(Select, {
        props: {
          editMode,
          multiple: true,
          defaultOpen: true,
          modelValue: [1, 2],
          options: [
            { value: 1, label: 'A' },
            { value: 2, label: 'B' },
          ],
          beforeCommit: () =>
            new Promise<false>((resolve) => {
              finish = resolve
            }),
        },
        global,
      })
      await flushPromises()
      const manager = wrapper.getComponent(SelectedOptions)
      manager.vm.$emit('remove', manager.props('items')[0].key)
      await flushPromises()
      const controller = wrapper.getComponent(SelectMenu).props('controller')
      expect(manager.props('items')).toHaveLength(1)
      expect(controller.computedOpen).toBe(true)
      const pending = controller.session.commit()
      await flushPromises()
      expect(manager.props('disabled')).toBe(true)
      finish(false)
      await pending
      await flushPromises()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(manager.props('items')).toHaveLength(1)
      controller.cancelSession()
      await flushPromises()
      controller.handleOpenChange(true)
      await flushPromises()
      expect(wrapper.getComponent(SelectedOptions).props('items')).toHaveLength(2)
      wrapper.unmount()
    })
    it('Cascader clears only the editor draft and cancellation restores the selection', async () => {
      const wrapper = mount(Cascader, {
        props: {
          editMode,
          multiple: true,
          modelValue: ['a', 'b'],
          clearable: false,
          options: [
            {
              value: 'p',
              label: 'Parent',
              children: [
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
              ],
            },
          ],
        },
        global,
      })
      await wrapper.get('[aria-haspopup="dialog"]').trigger('click')
      await flushPromises()
      const manager = wrapper.getComponent(SelectedOptions)
      expect(manager.props('items')).toHaveLength(2)
      manager.vm.$emit('clear', new MouseEvent('click'))
      await flushPromises()
      expect(manager.props('items')).toHaveLength(0)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper.get('header button').trigger('click')
      await flushPromises()
      await wrapper.get('[aria-haspopup="dialog"]').trigger('click')
      await flushPromises()
      expect(wrapper.getComponent(SelectedOptions).props('items')).toHaveLength(2)
      wrapper.unmount()
    })
  })
}
