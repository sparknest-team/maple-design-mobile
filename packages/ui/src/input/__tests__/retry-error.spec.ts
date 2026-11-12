import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Input from '..'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'

it('clears an earlier save error when an input draft is retried', async () => {
  let resolve!: (allowed: boolean) => void
  let calls = 0
  const wrapper = mount(Input, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      modelValue: 'old',
      beforeCommit: () => {
        calls++
        if (calls === 1) {
          throw new Error('Old error')
        }
        return new Promise<boolean>((done) => {
          resolve = done
        })
      },
    },
  })
  try {
    await flushPromises()
    await wrapper.get('input').setValue('draft')
    wrapper.getComponent(FieldPresentation).vm.$emit('confirm')
    await flushPromises()
    expect(wrapper.getComponent(FieldPresentation).props('error')).toBe('Old error')
    wrapper.getComponent(FieldPresentation).vm.$emit('confirm')
    await flushPromises()
    expect(wrapper.getComponent(FieldPresentation).props('error')).toBeFalsy()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    resolve(false)
    await flushPromises()
    expect(wrapper.get('input').element.value).toBe('draft')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
