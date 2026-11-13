import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test('nested no-style fields follow their visible error help without crossing siblings', async () => {
  const noStyle = ref(true)
  const parentStatus = ref<'error' | 'success'>('error')
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { editMode: 'direct', model: { first: '', second: '' } },
    slots: {
      default: () => [
        h(FormItem, { label: 'Parent', validateStatus: parentStatus.value, help: 'Parent help' }, () =>
          h(FormItem, { field: 'first', noStyle: noStyle.value, validateStatus: 'error', help: 'Child help' }, () =>
            h(Input, { 'aria-describedby': 'external-a' }),
          ),
        ),
        h(FormItem, { field: 'second', label: 'Second', validateStatus: 'error', help: 'Second help' }, () =>
          h(Input, { 'aria-describedby': 'external-b' }),
        ),
      ],
    },
  })
  const descriptions = () => wrapper.findAll('input').map((input) => input.attributes('aria-describedby')!.split(/\s+/))
  try {
    let [first, second] = descriptions()
    expect(first[0]).toBe('external-a')
    expect(second[0]).toBe('external-b')
    expect(first[1]).not.toBe(second[1])
    expect(document.getElementById(first[1])?.textContent).toContain('Parent help')
    expect(document.getElementById(second[1])?.textContent).toContain('Second help')
    parentStatus.value = 'success'
    await nextTick()
    expect(descriptions()[0]).toEqual(['external-a'])
    expect(descriptions()[1]).toEqual(second)
    parentStatus.value = 'error'
    noStyle.value = false
    await nextTick()
    ;[first, second] = descriptions()
    expect(document.getElementById(first[1])?.textContent).toContain('Child help')
    expect(document.getElementById(second[1])?.textContent).toContain('Second help')
    noStyle.value = true
    await nextTick()
    ;[first, second] = descriptions()
    expect(document.getElementById(first[1])?.textContent).toContain('Parent help')
    expect(document.getElementById(second[1])?.textContent).toContain('Second help')
  } finally {
    wrapper.unmount()
  }
})
