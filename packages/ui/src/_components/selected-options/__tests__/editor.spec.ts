import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AutoComplete from '../../../auto-complete'
import Cascader from '../../../cascader'
import Select from '../../../select'
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
  },
}
for (const editMode of ['popup'] as FieldEditMode[]) {
  describe(`selection editor ${editMode}`, () => {
    it('keeps AutoComplete search, empty state and candidates in the standard list surface', async () => {
      const wrapper = mount(AutoComplete, {
        props: {
          needConfirm: true,
          editMode,
          options: ['Alpha', 'Beta'],
        },
        attrs: {
          class: 'compact-field',
          style: `width: 140px; max-width: 140px; --${p}-auto-complete-option-height: 40px`,
        },
        slots: { empty: () => 'No matching candidates' },
        global,
      })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        const editor = wrapper.get(`.${p}-selection-editor--auto-complete`)
        expect(wrapper.get('[aria-haspopup=dialog]').classes()).toContain('compact-field')
        expect(wrapper.get('[aria-haspopup=dialog]').attributes('style')).toContain('max-width: 140px')
        expect(editor.find('.compact-field').exists()).toBe(false)
        expect(editor.get(`.${p}-auto-complete`).attributes('style') ?? '').not.toContain('140px')
        expect(editor.get(`.${p}-auto-complete`).attributes('style')).toContain(
          `--${p}-auto-complete-option-height: 40px`,
        )
        expect(editor.findAll('input')).toHaveLength(1)
        expect(editor.get(`.${p}-select-dropdown-empty`).text()).toContain('No matching candidates')
        await editor.get('input').setValue('Be')
        await flushPromises()
        expect(
          editor
            .findAll('[role=option]')
            .filter((option) => option.isVisible())
            .map((option) => option.text()),
        ).toEqual(['Beta'])
        await editor.get('[role=option]').trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await wrapper.get(`.${p}-field-presentation__footer button`).trigger('click')
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe('Beta')
      } finally {
        wrapper.unmount()
      }
    })
    it('uses a full list without inline checkboxes and commits the draft only on confirmation', async () => {
      const wrapper = mount(Select, {
        props: {
          needConfirm: true,
          editMode,
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
      const wrapper = mount(Cascader, {
        attachTo: document.body,
        props: { editMode, options, needConfirm: true },
        global,
      })
      try {
        await wrapper.get('[aria-haspopup=dialog]').trigger('click')
        await flushPromises()
        const choose = async (label: string) => {
          const option = wrapper.findAll('[role=menuitem], [role=menuitemradio]').find((item) => item.text() === label)
          expect(option?.attributes('role')).toBe(label === '宁波' ? 'menuitemradio' : 'menuitem')
          await option!.trigger('click')
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

describe('inline selection menus', () => {
  for (const [name, component, options, value] of [
    [
      'Select',
      Select,
      [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
      ['a'],
    ],
    [
      'Cascader',
      Cascader,
      [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
      ['a'],
    ],
  ] as const) {
    it(`${name} keeps selected values in the field and omits the duplicate summary/clear`, async () => {
      const wrapper = mount(component as any, {
        props: {
          editMode: 'direct',
          multiple: true,
          defaultOpen: true,
          clearable: true,
          options,
          modelValue: value,
        },
        global,
      })
      try {
        await flushPromises()
        expect(wrapper.find(`.${p}-selected-options__summary`).exists()).toBe(false)
        expect(wrapper.find(`.${p}-selected-options__tags`).exists()).toBe(false)
        expect(wrapper.find(`.${p}-selected-options__details`).exists()).toBe(false)
        expect(wrapper.get(`.${p}-selection-field`).text()).toContain('Alpha')
        const role = name === 'Select' ? 'option' : 'menuitemcheckbox'
        const selectedState = name === 'Select' ? 'aria-selected' : 'aria-checked'
        const choices = wrapper.findAll(`[role=${role}]`)
        expect(choices.map((option) => option.text())).toEqual(['Alpha', 'Beta'])
        expect(choices.map((option) => option.attributes(selectedState))).toEqual(['true', 'false'])
      } finally {
        wrapper.unmount()
      }
    })
  }
})
