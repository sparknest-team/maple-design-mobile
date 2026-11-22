import { defineAsyncComponent, defineComponent, h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Trigger, { type TriggerInstance } from '..'

it('tracks a component slot that resolves late and subsequently replaces its native root', async () => {
  const useLink = ref(false)
  const button = defineComponent({
    setup: () => () => h(useLink.value ? 'a' : 'button', { 'aria-describedby': 'inside' }, 'Anchor'),
  })
  let resolve!: (component: typeof button) => void
  const pending = new Promise<typeof button>((done) => {
    resolve = done
  })
  const asyncButton = defineAsyncComponent(() => pending)
  const wrapper = mount(Trigger, {
    props: { trigger: 'manual', popupContainer: false, referenceAttrs: { 'aria-describedby': 'auto' } },
    slots: { default: () => h(asyncButton) },
    attachTo: document.body,
  })
  try {
    resolve(button)
    await flushPromises()
    const first = wrapper.get('button').element
    const vm = wrapper.vm as unknown as TriggerInstance
    expect(vm.getReference()).toBe(first)
    expect(first.getAttribute('aria-describedby')).toBe('inside auto')
    useLink.value = true
    await nextTick()
    await flushPromises()
    const second = wrapper.get('a').element
    expect(vm.getReference()).toBe(second)
    expect(second.getAttribute('aria-describedby')).toBe('inside auto')
    expect(first.getAttribute('aria-describedby')).toBe('inside')
  } finally {
    wrapper.unmount()
  }
})
