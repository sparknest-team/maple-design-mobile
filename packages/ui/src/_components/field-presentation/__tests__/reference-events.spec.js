import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { formHost } from '../../../input-number/__tests__/form-host'
import Frame from '../FieldPresentation.vue'
import { fieldPresentationProps } from '../props'
import { withFieldPresentation } from '../with-field-presentation'

const mode = Frame.name?.startsWith('Mp') ? 'popup' : 'click'
const Base = defineComponent({
  name: 'ReferenceTest',
  props: {
    ...fieldPresentationProps,
    modelValue: String,
    readonly: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  },
  emits: ['focus', 'blur', 'update:modelValue', 'change'],
  setup: () => () => h('input'),
})
// Exercise the common owner's reference bridge independently of platform frame layouts.
const ReferenceFrame = defineComponent({
  inheritAttrs: false,
  props: { pending: Boolean, loading: Boolean },
  setup:
    (props, { slots }) =>
    () =>
      h('div', { 'aria-busy': props.pending || props.loading || undefined }, slots.reference?.()),
})
const NativeReference = defineComponent({
  props: { value: String, readonly: Boolean, disabled: Boolean },
  emits: ['focus', 'blur'],
  setup:
    (props, { emit }) =>
    () =>
      h('input', {
        'data-reference': '',
        value: props.value,
        readonly: props.readonly,
        disabled: props.disabled,
        onFocus: () => emit('focus'),
        onBlur: () => emit('blur'),
      }),
})
const Field = withFieldPresentation(Base, {
  reference: ({ value, emit, referenceRef, disabled, readonly }) =>
    h(NativeReference, {
      ref: referenceRef,
      value,
      disabled,
      readonly,
      onFocus: () => emit('focus'),
      onBlur: () => emit('blur'),
    }),
})
describe('Native reference event ownership', () => {
  for (const readonly of [false, true]) {
    test('public and Form focus/blur notify once per cycle readonly=' + readonly, async () => {
      const calls = [],
        once = vi.fn(() => new Promise(() => {}))
      const w = mount(
        formHost({ readonly }, { onFocus: () => calls.push('focus'), onBlur: () => calls.push('blur') }, () =>
          h('div', [
            h(Field, { editMode: mode, modelValue: 'value', onFocusOnce: once }),
            h('input', { 'data-outside': '' }),
          ]),
        ),
        { attachTo: document.body, global: { stubs: { [Frame.name]: ReferenceFrame } } },
      )
      try {
        const field = w.getComponent(Field),
          input = field.get('[data-reference]')
        expect(input.element.readOnly).toBe(readonly)
        for (let i = 0; i < 2; i++) {
          input.element.focus()
          await nextTick()
          w.get('[data-outside]').element.focus()
          await nextTick()
        }
        expect(field.emitted('focus')).toHaveLength(2)
        expect(field.emitted('blur')).toHaveLength(2)
        expect(calls).toEqual(['focus', 'blur', 'focus', 'blur'])
        expect(once).toHaveBeenCalledTimes(1)
        expect(field.find('[aria-busy="true"]').exists()).toBe(false)
        expect(field.emitted('change')).toBeUndefined()
      } finally {
        w.unmount()
      }
    })
  }
})
