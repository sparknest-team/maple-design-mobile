<template>
  <form :class="n()" @submit="handleSubmit" @reset="handleReset">
    <slot />
  </form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { call, find, normalizeToArray, preventDefault } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTop, scrollTo, toPxNum } from '../utils/elements'
import { linear } from '../utils/shared'
import { props } from './props'
import { useFormItems, type FormProvider } from './provide'

const { name, n } = createNamespace('form')

export default defineComponent({
  name,
  props,
  emits: ['submit', 'reset'],
  setup(props, { emit }) {
    const disabled = computed(() => props.disabled)
    const readonly = computed(() => props.readonly)
    const model = computed(() => props.model)
    const layout = computed(() => props.layout)
    const { formItems, bindFormItems } = useFormItems()

    const formProvider: FormProvider = {
      disabled,
      readonly,
      model,
      layout,
    }

    bindFormItems(formProvider)

    function scroll(formItemElement: HTMLElement) {
      // wait form-details animation end
      setTimeout(() => {
        const scroller = getParentScroller(formItemElement)
        const scrollerTop = scroller === window ? 0 : getTop(scroller as HTMLElement)
        const top = getTop(formItemElement) - scrollerTop - toPxNum(props.scrollToErrorOffsetY)

        scrollTo(scroller, {
          top,
          animation: linear,
        })
      }, 300)
    }

    async function handleSubmit(event: Event) {
      preventDefault(event)
      const valid = await validate()
      emit('submit', valid)
    }

    function handleReset(event: Event) {
      preventDefault(event)
      resetFields()
      emit('reset')
    }

    function matchFormItems(field?: string | string[]) {
      if (field == null) {
        return formItems
      }

      const fields = normalizeToArray(field)
      return formItems.filter((item) => item.field && fields.includes(item.field))
    }

    // expose
    async function validate(field?: string | string[]) {
      const items = matchFormItems(field)
      const res = await Promise.all(items.map(({ validate: validateItem }) => validateItem()))

      if (props.scrollToError) {
        const [, errorIndex] = find(res, (r) => r === false, props.scrollToError)
        const hasError = errorIndex > -1

        if (hasError) {
          const formItemElement = items[errorIndex].instance.proxy?.$el
          scroll(formItemElement)
        }

        return !hasError
      }

      return res.every((result) => result === true)
    }

    // expose
    function validateField(field: string | string[]) {
      return validate(field)
    }

    // expose
    function resetFields(field?: string | string[]) {
      matchFormItems(field).forEach(({ reset }) => reset())
    }

    // expose
    function clearValidate(field?: string | string[]) {
      matchFormItems(field).forEach(({ resetValidation }) => resetValidation())
    }

    // expose
    function scrollToField(field: string) {
      const item = formItems.find((formItem) => formItem.field === field)
      const formItemElement = item?.instance.proxy?.$el

      if (formItemElement) {
        scroll(formItemElement)
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
      scrollToField,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './form';
</style>
