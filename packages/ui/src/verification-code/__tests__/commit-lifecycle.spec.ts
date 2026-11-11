import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import VerificationCode from '..'
import { fieldEditModeProp } from '../../_components/field-presentation/context'
import FieldPresentation from '../../_components/field-presentation/FieldPresentation.vue'
import type { VerificationCodeProps } from '../props'

const mode = (fieldEditModeProp.validator('click') ? 'click' : 'popup') as Exclude<
  VerificationCodeProps['editMode'],
  undefined
>

test('deactivation after accepted model update retires a queued finish and activation never replays it', async () => {
  const shown = ref(true),
    model = ref<string | null>('1234'),
    finish = vi.fn()
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h(KeepAlive, null, () =>
          shown.value
            ? h(VerificationCode, {
                editMode: mode,
                popupContainer: false,
                modelValue: model.value,
                length: 4,
                'onUpdate:modelValue': (value: string | null) => {
                  model.value = value
                },
                onChange: () => {
                  shown.value = false
                },
                onFinish: finish,
              })
            : null,
        ),
    }),
    { attachTo: document.body },
  )
  try {
    const field = owner.getComponent(VerificationCode)
    ;(field.vm as any).focus()
    await flushPromises()
    const input = field.get('input').element
    input.value = '5678'
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertReplacementText', data: '5678' }))
    await flushPromises()
    field.getComponent(FieldPresentation).vm.$emit('confirm')
    await flushPromises()
    expect(model.value).toBe('5678')
    expect(finish).not.toHaveBeenCalled()
    shown.value = true
    await flushPromises()
    expect(finish).not.toHaveBeenCalled()
  } finally {
    owner.unmount()
  }
})
