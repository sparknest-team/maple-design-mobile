import { h } from 'vue'
import { VerificationCode as Root } from '@maple-design/ui-vue'
import type {
  VerificationCodeEmits,
  VerificationCodeExpose,
  VerificationCodeInstance,
  VerificationCodeProps,
  VerificationCodeSlots,
} from '@maple-design/ui-vue'
import Default, { VerificationCode as Named } from '@maple-design/ui-vue/verification-code'
import type { VerificationCodeProps as SubProps } from '@maple-design/ui-vue/verification-code'

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
const same: Equal<VerificationCodeProps, SubProps> = true
const props: VerificationCodeProps = {
  modelValue: null,
  emptyValue: () => null,
  type: 'digit',
  align: 'start',
  gutter: 0,
  beforeCommit(payload, done, context) {
    void [payload.value, payload.previousValue, context.signal.aborted]
    done(true)
  },
}
h(Root, props)
h(Named, props)
h(Default, props)
declare const instance: VerificationCodeInstance
const exposed: VerificationCodeExpose = instance
exposed.focus(1)
exposed.blur()
exposed.reset()
instance.$emit('update:modelValue', null)
instance.$emit('change', null)
instance.$emit('finish', '1234')
instance.$emit('update:open', true)
instance.$emit('open-change', false)
type ReadScope = Parameters<NonNullable<VerificationCodeSlots['read']>>[0]
const read: Equal<ReadScope, { value: string | null; text: string }> = true
const finish: Equal<VerificationCodeEmits['finish'], [value: string]> = true
// @ts-expect-error completion is always a complete string code
instance.$emit('finish', null)
// @ts-expect-error arbitrary clear objects violate the code model
const badClear: VerificationCodeProps = { emptyValue: { id: 1 } }
// @ts-expect-error no blanket loading property
const badLoading: VerificationCodeProps = { loading: true }
// @ts-expect-error invalid enum
const badType: VerificationCodeProps = { type: 'number' }
void [same, props, read, finish, badClear, badLoading, badType]
