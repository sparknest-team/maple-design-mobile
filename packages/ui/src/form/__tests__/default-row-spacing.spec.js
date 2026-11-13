import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Row from '../../row/Row.vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('horizontal FormItem keeps its own spacing instead of inheriting Row gutters', () => {
  const owner = mount(Form, {
    props: { layout: 'horizontal' },
    slots: { default: () => h(FormItem, { label: 'Name' }, () => h('input')) },
  })
  try {
    expect(owner.getComponent(Row).props('gutter')).toBe(0)
    expect(owner.get('.mp-form-item').element.style.marginBottom).toBe('')
  } finally {
    owner.unmount()
  }
})

test('explicit FormItem row gutter remains an override', () => {
  const owner = mount(Form, {
    props: { layout: 'horizontal' },
    slots: { default: () => h(FormItem, { label: 'Name', rowProps: { gutter: [12, 8] } }, () => h('input')) },
  })
  try {
    expect(owner.getComponent(Row).props('gutter')).toEqual([12, 8])
    expect(owner.get('.mp-form-item').element.style.marginBottom).toBe('-4px')
  } finally {
    owner.unmount()
  }
})
