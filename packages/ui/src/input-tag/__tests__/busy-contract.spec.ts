import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import InputTag from '..'

test('loading overrides and then restores the caller busy state', async () => {
  const loading = ref(false)
  const busy = ref<boolean | undefined>(false)
  const wrapper = mount(
    defineComponent({
      setup: () => () => h(InputTag, { editMode: 'direct', loading: loading.value, 'aria-busy': busy.value }),
    }),
  )
  try {
    const input = wrapper.get('input')
    expect(input.attributes('aria-busy')).toBe('false')
    loading.value = true
    await nextTick()
    expect(input.attributes('aria-busy')).toBe('true')
    loading.value = false
    await nextTick()
    expect(input.attributes('aria-busy')).toBe('false')
    busy.value = undefined
    await nextTick()
    expect(input.attributes('aria-busy')).toBeUndefined()
    busy.value = true
    await nextTick()
    expect(input.attributes('aria-busy')).toBe('true')
  } finally {
    wrapper.unmount()
  }
})
