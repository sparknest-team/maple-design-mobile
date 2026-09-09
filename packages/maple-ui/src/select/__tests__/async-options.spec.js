import { computed, h, nextTick, ref, shallowRef } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { useSelectController } from '../useSelectController'

test('selected object labels update when providers change without changing their count', async () => {
  const value = { id: 1 },
    text = ref('old'),
    providers = shallowRef([])
  let controller
  const provider = (label) => ({ value: computed(() => value), label: computed(() => label.value), sync() {} })
  providers.value = [provider(text)]
  const wrapper = mount({
    setup() {
      controller = useSelectController({
        modelValue: () => value,
        multiple: () => false,
        optionProviders: () => providers.value,
        optionProvidersLength: () => providers.value.length,
      })
      return () => h('span', controller.label.value)
    },
  })
  try {
    expect(wrapper.text()).toBe('old')
    text.value = 'edited'
    await nextTick()
    expect(wrapper.text()).toBe('edited')
    providers.value = [provider(ref('replaced'))]
    await nextTick()
    expect(wrapper.text()).toBe('replaced')
  } finally {
    wrapper.unmount()
  }
})
