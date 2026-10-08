<template>
  <form :class="n()" @submit="handleSubmit" @reset="handleReset">
    <slot />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onDeactivated } from 'vue'
import { preventDefault } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTop, scrollTo, toPxNum } from '../utils/elements'
import { linear } from '../utils/shared'
import { createFormController, type FormFieldController, type FormValidateErrors } from './form-controller'
import { props } from './props'
import { provideForm, type FormProvider } from './provide'

const { name, n } = createNamespace('form')

export default defineComponent({
  name,
  props,
  emits: ['submit', 'submit-success', 'submit-failed', 'reset'],
  setup(props, { emit }) {
    const disabled = computed(() => props.disabled)
    const readonly = computed(() => props.readonly)
    const size = computed(() => props.size)
    const rules = computed(() => props.rules)
    const model = computed(() => props.model)
    const layout = computed(() => props.layout)
    let pendingScroll: ReturnType<typeof setTimeout> | undefined
    const cancelScroll = () => clearTimeout(pendingScroll)
    onBeforeUnmount(cancelScroll)
    onDeactivated(cancelScroll)

    function scroll(formItemElement: HTMLElement) {
      // wait form-details animation end
      cancelScroll()
      pendingScroll = setTimeout(() => {
        if (!formItemElement.isConnected) {
          return
        }
        const scroller = getParentScroller(formItemElement)
        const scrollerTop = scroller === window ? 0 : getTop(scroller as HTMLElement)
        const parsedOffset = toPxNum(props.scrollToErrorOffsetY)
        const offset = Number.isFinite(parsedOffset) ? parsedOffset : 0
        const top = getTop(formItemElement) - scrollerTop - offset

        scrollTo(scroller, {
          top,
          animation: linear,
        })
      }, 300)
    }

    function scrollToInvalid(errors: NonNullable<FormValidateErrors>, items: FormFieldController[]) {
      if (!props.scrollToError) {
        return
      }
      const elements = items
        .filter((item) => errors[item.field])
        .map((item) => item.getElement?.())
        .filter((element): element is HTMLElement => !!element)
        .sort((left, right) => (left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1))
      const element = props.scrollToError === 'end' ? elements[elements.length - 1] : elements[0]
      if (element) {
        scroll(element)
      }
    }

    const controller = createFormController({ onInvalid: scrollToInvalid })
    const formProvider: FormProvider = {
      disabled,
      readonly,
      size,
      rules,
      model,
      layout,
      registerField: controller.registerField,
    }
    provideForm(formProvider)

    async function handleSubmit(event: Event) {
      preventDefault(event)
      const errors = await validate()
      const values = model.value ?? {}
      if (errors) {
        emit('submit-failed', { values, errors }, event)
      } else {
        emit('submit-success', values, event)
      }
      emit('submit', { values, errors }, event)
    }

    function handleReset(event: Event) {
      preventDefault(event)
      resetFields()
      emit('reset', event)
    }

    function validate(callback?: (errors: FormValidateErrors) => void) {
      return controller.validate(undefined, callback)
    }

    // expose
    function validateField(field: string | string[], callback?: (errors: FormValidateErrors) => void) {
      return controller.validate(field, callback)
    }

    // expose
    function resetFields(field?: string | string[]) {
      controller.resetFields(field)
    }

    // expose
    function clearValidate(field?: string | string[]) {
      controller.clearValidate(field)
    }

    function setFields(data: Record<string, unknown>) {
      controller.setFields(data)
    }

    // expose
    function scrollToField(field: string) {
      const element = controller.matchFields(field)[0]?.getElement?.()
      if (element) {
        scroll(element)
      }
    }

    return {
      n,
      handleSubmit,
      handleReset,
      validate,
      validateField,
      resetFields,
      clearValidate,
      setFields,
      scrollToField,
    }
  },
})
</script>
