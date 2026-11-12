import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { useModalFocus } from '../../utils/modal-focus'

it('finishes opening without stealing focus moved away during the transition', async () => {
  const opener = document.createElement('button')
  const external = document.createElement('button')
  document.body.append(opener, external)
  opener.focus()
  let controls: ReturnType<typeof useModalFocus>
  const root = ref<HTMLElement>()
  const wrapper = mount(
    {
      setup() {
        controls = useModalFocus(
          () => root.value,
          () => true,
          () => true,
        )
        return () => h('div', { ref: root, tabindex: -1 })
      },
    },
    { attachTo: document.body },
  )
  try {
    await nextTick()
    await nextTick()
    expect(document.activeElement).toBe(root.value)
    opener.focus()
    controls!.focusAfterEnter()
    expect(document.activeElement).toBe(root.value)
    external.focus()
    controls!.focusAfterEnter()
    expect(document.activeElement).toBe(external)
  } finally {
    wrapper.unmount()
    opener.remove()
    external.remove()
  }
})
