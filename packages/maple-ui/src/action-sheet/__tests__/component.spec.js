import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import VarActionSheet from '../ActionSheet'
import ActionSheet from '../index'

test('action-sheet component plugin', () => {
  const app = createApp({}).use(ActionSheet.Component)
  expect(app.component(ActionSheet.Component.name)).toBeTruthy()
})

test('action-sheet styles', () => {
  const wrapper = mount(VarActionSheet, {
    props: {
      popupContainer: false,
      actions: [
        {
          name: 'Item 01',
          icon: 'user-circle-fill',
          iconSize: '30px',
          color: '#4caf50',
          className: 'customClass',
        },
        {
          name: 'Item 02',
          icon: 'user-circle-fill',
          disabled: true,
        },
      ],
      open: true,
      safeArea: true,
    },
  })
  const dialog = wrapper.get('[role="dialog"]')
  expect(dialog.attributes('data-modal-focus-root')).toBeDefined()
  expect(dialog.attributes('aria-modal')).toBe('true')
  expect(dialog.classes()).toContain('mp-popup--safe-area-inset-bottom')
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})
