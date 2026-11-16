<template>
  <section
    :id="sectionId"
    :class="classes(n(), n(`--${variant}`), [showEndDivider && variant !== 'card', n('--end-divider')])"
    :aria-labelledby="hasTitle ? titleId : undefined"
    :aria-describedby="hasDescription ? descriptionId : undefined"
  >
    <div :class="n('surface')">
      <div v-if="hasTitle || hasDescription || $slots.extra" :class="n('header')">
        <div :class="n('heading')">
          <div v-if="hasTitle" :class="n('label')">
            <span v-if="showMarker" :class="n('marker')" aria-hidden="true" />
            <h3 :id="titleId" :class="n('title')">
              <slot name="title">{{ title }}</slot>
            </h3>
          </div>
          <span v-if="variant === 'line'" :class="n('line')" aria-hidden="true" />
          <span v-else :class="n('spacer')" aria-hidden="true" />
          <div v-if="$slots.extra" :class="n('extra')"><slot name="extra" /></div>
        </div>
        <div v-if="hasDescription" :id="descriptionId" :class="n('description')">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <div :class="classes(n('content'), [inline, n('content--inline')])"><slot /></div>
      <div v-if="showEndDivider && variant !== 'card'" :class="n('end-divider')" aria-hidden="true" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { useForm } from './provide'
import { formSectionProps, type FormSectionSlots } from './section-props'

defineOptions({ name: createNamespace('form-section').name })
defineSlots<FormSectionSlots>()
const props = defineProps(formSectionProps)
const { n, classes } = createNamespace('form-section')
const slots = useSlots()
const uniqueId = useId()
const { form } = useForm()
const inline = computed(() => form?.layout.value === 'inline')
const sectionId = computed(() => props.id ?? `mp-form-section-${uniqueId}`)
const titleId = computed(() => `${sectionId.value}-title`)
const descriptionId = computed(() => `${sectionId.value}-description`)
const hasTitle = computed(() => !!(props.title || slots.title))
const hasDescription = computed(() => !!(props.description || slots.description))
// Intentionally preserve the parent Form context, including its label registry.
// A visual section is neither a nested Form nor a FormItem.
</script>
