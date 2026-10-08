import { nextTick } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import PopupPresentation from '../../_components/selection-field/PopupPresentation.vue'
import { _PickerComponent as Picker } from '../../picker'
import Select from '../../select/select'
import { getKeyFromValue } from '../../select/utils'
import Cascader from '../Cascader.vue'

enableAutoUnmount(afterEach)
const settle = async () => {
  await nextTick()
  await nextTick()
}
const click = async (selector) => {
  const element = document.querySelector(selector)
  expect(element).toBeTruthy()
  element.click()
  await settle()
}
const controller = (wrapper) => wrapper.findComponent(PopupPresentation).props('controller')
describe('Mobile presentations', () => {
  for (const Component of [Select, Cascader]) {
    const options =
      Component === Select
        ? [
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
          ]
        : [
            {
              value: 'a',
              label: 'Group',
              children: [
                { value: 1, label: 'One' },
                { value: 2, label: 'Two' },
              ],
            },
          ]
    for (const presentation of ['list', 'picker']) {
      test(Component.name + presentation + ' opens from the field and confirms a multi-select draft once', async () => {
        const wrapper = mount(Component, { props: { presentation, multiple: true, options }, attachTo: document.body })
        await wrapper.get('input').trigger('click')
        await settle()
        const c = controller(wrapper)
        expect(c.computedOpen).toBe(true)
        if (presentation === 'picker') {
          await click('.mp-selection-presentation__add')
        } else if (Component === Select) {
          await click('.mp-select-option')
        } else {
          const node = [...c.optionMap.values()].find((option) => option.value === 1)
          c.handleClickOption(node, true)
        }
        await settle()
        expect(wrapper.emitted('change')).toBeUndefined()
        await click('.mp-selection-presentation__confirm')
        expect(wrapper.emitted('change')).toEqual([[[1]]])
        expect(c.computedOpen).toBe(false)
      })
      test(Component.name + presentation + ' cancellation discards edits', async () => {
        const wrapper = mount(Component, {
          props: { presentation, multiple: true, options, defaultOpen: true, defaultValue: [] },
          attachTo: document.body,
        })
        await settle()
        if (Component === Select) {
          controller(wrapper).handleSelect(getKeyFromValue(1), new Event('click'))
        } else {
          const c = controller(wrapper)
          c.handleClickOption(
            [...c.optionMap.values()].find((option) => option.value === 1),
            true,
          )
        }
        await click('.mp-selection-presentation__cancel')
        expect(wrapper.emitted('change')).toBeUndefined()
      })
    }
    test(Component.name + ' controlled picker does not emit twice while a parent keeps it open', async () => {
      const wrapper = mount(Component, {
        props: { presentation: 'picker', options, open: true },
        attachTo: document.body,
      })
      await settle()
      await click('.mp-selection-presentation__confirm')
      await click('.mp-selection-presentation__confirm')
      expect(wrapper.emitted('change')).toEqual([[1]])
      expect(wrapper.emitted('update:open')).toEqual([[false]])
    })
    test(Component.name + ' empty picker cannot confirm an invalid default', async () => {
      const wrapper = mount(Component, {
        props: { presentation: 'picker', options: [], defaultOpen: true },
        attachTo: document.body,
      })
      await settle()
      expect(document.querySelector('.mp-selection-presentation__confirm').disabled).toBe(true)
      controller(wrapper).session.commit()
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  }
})
