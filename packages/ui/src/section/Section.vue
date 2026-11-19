<template>
  <section
    :id="sectionId"
    :class="
      classes(n(), n(`--${variant}`), [!!form, n('--form')], [showEndDivider && variant !== 'card', n('--end-divider')])
    "
    :aria-labelledby="title || $slots.title ? titleId : undefined"
    :aria-describedby="description || $slots.description ? descriptionId : undefined"
  >
    <div :class="n('surface')">
      <div v-if="title || $slots.title || description || $slots.description || $slots.extra" :class="n('header')">
        <div :class="n('heading')">
          <div v-if="title || $slots.title" :class="n('label')">
            <span v-if="showMarker" :class="n('marker')" aria-hidden="true" />
            <component :is="`h${headingLevel}`" :id="titleId" :class="n('title')">
              <slot name="title">{{ title }}</slot>
            </component>
          </div>
          <span v-if="variant === 'line'" :class="n('line')" aria-hidden="true" />
          <span v-else :class="n('spacer')" aria-hidden="true" />
          <div v-if="$slots.extra" :class="n('extra')"><slot name="extra" /></div>
        </div>
        <div v-if="description || $slots.description" :id="descriptionId" :class="n('description')">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <div :class="classes(n('content'), [inline, n('content--inline')])"><slot /></div>
      <div v-if="showEndDivider && variant !== 'card'" :class="n('end-divider')" aria-hidden="true" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from '../form/provide'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { sectionProps, type SectionSlots } from './props'

defineOptions({ name: createNamespace('section').name })
defineSlots<SectionSlots>()
const props = defineProps(sectionProps)
const { n, classes } = createNamespace('section')
const uniqueId = useId()
const { form } = useForm()
const variant = computed(() => props.variant ?? (form ? 'line' : 'plain'))
const headingLevel = computed(() => props.headingLevel ?? (form ? 3 : 2))
const showMarker = computed(() => props.showMarker ?? !!form)
const inline = computed(() => form?.layout.value === 'inline')
const sectionId = computed(() => props.id ?? `mp-section-${uniqueId}`)
const titleId = computed(() => `${sectionId.value}-title`)
const descriptionId = computed(() => `${sectionId.value}-description`)
// Intentionally preserve the parent Form context, including its label registry.
// A visual section is neither a nested Form nor a FormItem.
</script>
