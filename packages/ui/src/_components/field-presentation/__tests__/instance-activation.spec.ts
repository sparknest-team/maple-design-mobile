import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Code from '../../../verification-code'
import { fieldEditModeProp, type FieldEditMode } from '../context'
import EditorPanel from '../EditorPanel.vue'

test('controlled-open editor accepts a new explicit focus after KeepAlive activation', async () => {
  const active = ref(true),
    code = ref<any>()
  const mode = (fieldEditModeProp.validator('click') ? 'click' : 'popup') as FieldEditMode
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, null, () =>
          active.value ? h(Code, { ref: code, editMode: mode, open: true, defaultValue: '1234' }) : null,
        ),
    }),
    { attachTo: document.body },
  )
  try {
    await flushPromises()
    const focus = code.value.focus
    active.value = false
    await flushPromises()
    active.value = true
    await flushPromises()
    focus(2)
    await flushPromises()
    expect(document.activeElement).toBe(owner.getComponent(EditorPanel).findAll('input')[2].element)
  } finally {
    owner.unmount()
  }
})
