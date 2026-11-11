<template>
  <form :id="id" ref="formElement" :class="n()" @submit="handleSubmit" @reset="handleReset">
    <slot />
  </form>
</template>

<script lang="ts">
import type { SlotsType } from 'vue'
import { computed, defineComponent, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import { getScrollLeft, getScrollTop, preventDefault } from '@maple-design/shared-vue'
import { provideFormPresentation } from '../_components/field-presentation/context'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTop, toPxNum } from '../utils/elements'
import { provideEmptyValues } from '../utils/empty-value'
import { linear } from '../utils/shared'
import { createFormController, type FormFieldController } from './form-controller'
import { props, type FormScrollToError } from './props'
import { provideForm, type FormProvider } from './provide'
import { waitForFormDetails } from './scroll-completion'
import type { FieldData, FormEmits, FormSlots, FormValidateErrors, ValidatedError } from './types'
import { useFormLabelWidths } from './use-form-label-width'

const { name, n } = createNamespace('form')

export default defineComponent({
  name,
  props,
  slots: Object as SlotsType<FormSlots>,
  emits: {
    submit: (..._args: FormEmits['submit']) => true,
    'submit-success': (..._args: FormEmits['submit-success']) => true,
    'submit-failed': (..._args: FormEmits['submit-failed']) => true,
    reset: (..._args: FormEmits['reset']) => true,
  },
  setup(props, { emit }) {
    provideEmptyValues(props)
    const presentationState = provideFormPresentation(
      () => props.editMode,
      () => props.readPretty,
    )
    const id = computed(() => props.id)
    const disabled = computed(() => props.disabled)
    const readonly = computed(() => props.readonly)
    const size = computed(() => props.size)
    const rules = computed(() => props.rules)
    const model = computed(() => props.model)
    const layout = computed(() => props.layout)
    const labelWidths = useFormLabelWidths()
    const layoutOptions = computed(() => ({ ...props, maxLabelWidth: labelWidths.maxLabelWidth.value }))
    const formElement = ref<HTMLFormElement>()
    let cancelScrollPreparation: (() => void) | undefined
    let scrollGeneration = 0
    let scrollMounted = false
    let scrollActive = true
    let scrollDisposed = false
    let cancelScrollAnimation: (() => void) | undefined
    let automaticScroll = false
    let validationScrollVersion = 0
    let invalidScrollContext: { version: number; generation: number; mode: FormScrollToError | undefined } | undefined
    const canScroll = () => scrollMounted && scrollActive && !scrollDisposed
    const cancelScroll = () => {
      scrollGeneration++
      cancelScrollPreparation?.()
      cancelScrollPreparation = undefined
      automaticScroll = false
      cancelScrollAnimation?.()
    }
    const invalidateAutomaticScroll = () => {
      validationScrollVersion++
      if (automaticScroll) {
        cancelScroll()
      }
    }
    watch(() => props.scrollToError, invalidateAutomaticScroll, { flush: 'sync' })
    onMounted(() => {
      scrollMounted = true
    })
    onActivated(() => {
      scrollActive = true
    })
    onBeforeUnmount(() => {
      scrollDisposed = true
      scrollMounted = false
      cancelScroll()
    })
    onDeactivated(() => {
      scrollActive = false
      cancelScroll()
    })

    function animateScroll(scroller: HTMLElement | Window, top: number, isCurrent: () => boolean) {
      const view = 'ownerDocument' in scroller ? scroller.ownerDocument.defaultView : scroller
      let live = true
      let frame: { pending: boolean; id?: number } | undefined
      const cancel = () => {
        if (!live) {
          return
        }
        live = false
        if (frame) {
          frame.pending = false
          if (frame.id !== undefined) {
            view?.cancelAnimationFrame(frame.id)
          }
          frame = undefined
        }
        if (cancelScrollAnimation === cancel) {
          cancelScrollAnimation = undefined
        }
      }
      cancelScrollAnimation = cancel
      const current = () => live && isCurrent()
      const started = Date.now()
      const fromTop = getScrollTop(scroller)
      const fromLeft = getScrollLeft(scroller)
      const reduced = () =>
        typeof view?.matchMedia === 'function' && view.matchMedia('(prefers-reduced-motion: reduce)').matches
      const finish = () => {
        if (current()) {
          scroller.scrollTo(0, top)
        }
        cancel()
      }
      const schedule = () => {
        if (!current()) {
          cancel()
          return
        }
        const ticket: { pending: boolean; id?: number } = { pending: true }
        frame = ticket
        ticket.id = view!.requestAnimationFrame(() => {
          if (!ticket.pending || !current()) {
            return
          }
          ticket.pending = false
          frame = undefined
          const prefersReducedMotion = reduced()
          if (!current()) {
            cancel()
            return
          }
          const progress = Math.max(0, (Date.now() - started) / 300)
          if (prefersReducedMotion || progress >= 1) {
            finish()
            return
          }
          const position = linear(progress)
          scroller.scrollTo(fromLeft * (1 - position), fromTop + (top - fromTop) * position)
          schedule()
        })
        if (!current() || !ticket.pending) {
          view!.cancelAnimationFrame(ticket.id)
        }
      }
      const initiallyReduced = reduced()
      if (!current()) {
        cancel()
      } else if (!view || initiallyReduced) {
        finish()
      } else {
        schedule()
      }
    }

    function scroll(formItemElement: HTMLElement, isEligible = () => true, automatic = false) {
      const previousGeneration = scrollGeneration
      if (!canScroll() || !isEligible() || previousGeneration !== scrollGeneration) {
        return
      }
      cancelScroll()
      automaticScroll = automatic
      const generation = scrollGeneration
      let pending = true
      const isCurrent = () =>
        canScroll() &&
        generation === scrollGeneration &&
        formItemElement.isConnected &&
        isEligible() &&
        canScroll() &&
        generation === scrollGeneration
      cancelScrollPreparation = waitForFormDetails(formElement.value!, isCurrent, () => {
        if (!pending || !isCurrent()) {
          return
        }
        pending = false
        const scroller = getParentScroller(formItemElement)
        const scrollerTop = scroller === window ? 0 : getTop(scroller as HTMLElement)
        const parsedOffset = toPxNum(props.scrollToErrorOffsetY)
        const offset = Number.isFinite(parsedOffset) ? parsedOffset : 0
        const top = getTop(formItemElement) - scrollerTop - offset
        if (!isCurrent()) {
          return
        }
        animateScroll(scroller, top, isCurrent)
      })
    }

    function scrollToInvalid(
      errors: NonNullable<FormValidateErrors>,
      items: FormFieldController<ValidatedError, FieldData>[],
    ) {
      const context = invalidScrollContext
      invalidScrollContext = undefined
      if (
        !context?.mode ||
        !canScroll() ||
        context.version !== validationScrollVersion ||
        context.generation !== scrollGeneration ||
        context.mode !== props.scrollToError
      ) {
        return
      }
      const elements = items
        .filter((item) => errors[item.field] && controller.fields.includes(item))
        .map((item) => ({ item, field: item.field, element: item.getElement?.() }))
        .filter((entry): entry is typeof entry & { element: HTMLElement } => !!entry.element)
        .sort((left, right) =>
          left.element.compareDocumentPosition(right.element) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1,
        )
      const target = context.mode === 'end' ? elements[elements.length - 1] : elements[0]
      if (target && context.generation === scrollGeneration) {
        scroll(
          target.element,
          () =>
            context.version === validationScrollVersion &&
            context.mode === props.scrollToError &&
            controller.fields.includes(target.item) &&
            target.item.field === target.field &&
            target.item.getElement?.() === target.element,
          true,
        )
      }
    }

    const controller = createFormController<ValidatedError, FieldData>({ onInvalid: scrollToInvalid })
    const validateForScroll = controller.validate
    controller.validate = (fields, callback) => {
      invalidateAutomaticScroll()
      const context = {
        version: validationScrollVersion,
        generation: scrollGeneration,
        mode: props.scrollToError,
      }
      return validateForScroll(fields, (errors) => {
        callback?.(errors)
        invalidScrollContext = context
      })
    }
    const formProvider: FormProvider = {
      id,
      disabled,
      readonly,
      size,
      rules,
      model,
      layout,
      layoutOptions,
      setLabelWidth: labelWidths.setLabelWidth,
      removeLabelWidth: labelWidths.removeLabelWidth,
      registerField: (field) => {
        if (field.field) {
          invalidateSubmitInputs()
        }
        const unregister = controller.registerField(field)
        return () => {
          if (controller.fields.includes(field)) {
            invalidateSubmitInputs()
          }
          unregister()
        }
      },
      invalidateSubmitInputs,
    }
    provideForm(formProvider)

    let submitEpoch = 0
    let pendingSubmitEpoch: number | undefined
    const invalidateSubmit = () => {
      submitEpoch++
      pendingSubmitEpoch = undefined
    }
    function invalidateSubmitInputs() {
      if (pendingSubmitEpoch === undefined) {
        return
      }
      invalidateSubmit()
      controller.invalidate()
      invalidateAutomaticScroll()
    }
    watch([() => props.model, () => props.rules], invalidateSubmitInputs, { deep: true, flush: 'sync' })
    onBeforeUnmount(invalidateSubmit)
    onDeactivated(invalidateSubmit)

    async function handleSubmit(event: Event) {
      preventDefault(event)
      invalidateSubmitInputs()
      invalidateSubmit()
      if (presentationState.blocked()) {
        emit(
          'submit-failed',
          { values: model.value ?? {}, errors: { editing: { field: 'editing', message: '请先完成当前字段编辑' } } },
          event,
        )
        return
      }
      const epoch = ++submitEpoch
      pendingSubmitEpoch = epoch
      try {
        const errors = await controller.validate()
        if (epoch !== submitEpoch) {
          return
        }
        pendingSubmitEpoch = undefined
        const values = model.value ?? {}
        if (errors) {
          emit('submit-failed', { values, errors }, event)
        } else {
          emit('submit-success', values, event)
        }
        emit('submit', { values, errors }, event)
      } finally {
        if (pendingSubmitEpoch === epoch) {
          pendingSubmitEpoch = undefined
        }
      }
    }

    function handleReset(event: Event) {
      preventDefault(event)
      resetFields()
      emit('reset', event)
    }

    function validate(callback?: (errors: FormValidateErrors) => void) {
      invalidateSubmit()
      return controller.validate(undefined, callback)
    }

    // expose
    function validateField(field: string | string[], callback?: (errors: FormValidateErrors) => void) {
      invalidateSubmit()
      return controller.validate(field, callback)
    }

    // expose
    function resetFields(field?: string | string[]) {
      invalidateSubmit()
      invalidateAutomaticScroll()
      presentationState.cancel(field)
      controller.resetFields(field)
    }

    // expose
    function clearValidate(field?: string | string[]) {
      invalidateSubmit()
      invalidateAutomaticScroll()
      controller.clearValidate(field)
    }

    function setFields(data: Record<string, FieldData>) {
      invalidateSubmit()
      invalidateAutomaticScroll()
      controller.setFields(data)
    }

    // expose
    function scrollToField(field: string) {
      const generation = scrollGeneration
      const item = controller.matchFields(field)[0]
      const element = item?.getElement?.()
      if (element && generation === scrollGeneration) {
        scroll(
          element,
          () => controller.fields.includes(item) && item.field === field && item.getElement?.() === element,
        )
      }
    }

    return {
      formElement,
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
