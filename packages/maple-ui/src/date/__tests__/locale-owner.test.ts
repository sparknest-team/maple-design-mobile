import { defineComponent, nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { add, enUS, use as setLocale } from '../../locale'
import DateField from '../DateField.vue'
import type { DateFieldState } from '../field-state'

add('en-US', enUS)

const Content = defineComponent({ props: ['state'], template: '<div />' })
afterEach(() => setLocale('zh-CN'))
describe('date locale owner integration', () => {
  it('switches display language without invalidating a model and parses localized input separately', async () => {
    setLocale('zh-CN')
    const wrapper = shallowMount(DateField, {
      props: {
        fieldProps: {
          modelValue: '2025 January 15',
          valueFormat: 'YYYY MMMM DD',
          format: 'YYYY MMMM DD',
        },
      },
      global: { stubs: { DateFieldContent: Content } },
    })
    const state = wrapper.getComponent(Content).props('state') as DateFieldState
    expect(state.controlProps.value.texts).toEqual(['2025 一月 15'])
    expect(state.canConfirm.value).toBe(true)
    setLocale('en-US')
    await nextTick()
    expect(state.controlProps.value.texts).toEqual(['2025 January 15'])
    expect(state.canConfirm.value).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('select')).toBeUndefined()
    setLocale('zh-CN')
    await nextTick()
    state.commitText(['2025 二月 15'])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2025 February 15'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['2025 February 15', new Date(2025, 1, 15), '2025 二月 15'])
    wrapper.unmount()
  })
})
