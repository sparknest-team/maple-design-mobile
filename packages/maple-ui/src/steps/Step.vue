<template>
  <div role="listitem" :class="cls" @click="handleClick">
    <div v-if="showTail" :class="`${prefixCls}-tail`" />
    <div v-if="type !== 'arrow'" :class="`${prefixCls}-node`">
      <slot name="node" v-bind="slotScope">
        <div v-if="type !== 'dot'" :class="iconCls">
          <slot name="icon" v-bind="slotScope">
            <component :is="finishIcon" v-if="computedStatus === 'finish' && finishIcon" />
            <icon-check v-else-if="computedStatus === 'finish'" />
            <component :is="errorIcon" v-else-if="computedStatus === 'error' && errorIcon" />
            <icon-close v-else-if="computedStatus === 'error'" />
            <template v-else>{{ internalIndex }}</template>
          </slot>
        </div>
      </slot>
    </div>
    <div :class="`${prefixCls}-content`">
      <div v-if="title || $slots.title || $slots.default" :class="`${prefixCls}-title`">
        <slot name="title" v-bind="slotScope">
          <slot v-bind="slotScope">{{ title }}</slot>
        </slot>
      </div>
      <div v-if="description || $slots.description" :class="`${prefixCls}-description`">
        <slot name="description" v-bind="slotScope">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { IconCheck, IconWindowClose as IconClose } from '@maplejs/icons-vue'
import { createNamespace } from '../utils/components'
import { stepsInjectionKey } from './context'
import { stepProps } from './props'

const { name } = createNamespace('step')
const stepsNamespace = createNamespace('steps')

export default defineComponent({
  name,
  components: { IconCheck, IconClose },
  props: stepProps,
  setup(props) {
    const steps = inject(stepsInjectionKey)
    const prefixCls = `${stepsNamespace.n()}-item`
    const iconCls = `${stepsNamespace.n()}-icon`
    const computedStatus = computed(
      () => steps?.getStatus(props.internalIndex, props.status) ?? props.status ?? 'process',
    )
    const active = computed(() => props.internalIndex === steps?.current.value)
    const showTail = computed(() =>
      Boolean(
        steps?.showLine.value && (steps.contentPlacement.value === 'bottom' || steps.direction.value === 'vertical'),
      ),
    )
    const slotScope = computed(() => ({
      index: props.internalIndex,
      status: computedStatus.value,
      active: active.value,
      disabled: props.disabled,
    }))
    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${computedStatus.value}`,
      {
        [`${prefixCls}-active`]: active.value,
        [`${prefixCls}-next-error`]: props.internalNextStatus === 'error',
        [`${prefixCls}-disabled`]: props.disabled,
      },
    ])
    const handleClick = (event: Event) => {
      if (!props.disabled) {
        steps?.select(props.internalIndex, event)
      }
    }

    return {
      prefixCls,
      iconCls,
      cls,
      computedStatus,
      internalIndex: computed(() => props.internalIndex),
      title: computed(() => props.title),
      description: computed(() => props.description),
      type: computed(() => steps?.type.value ?? 'default'),
      showTail,
      slotScope,
      finishIcon: steps?.slots['finish-icon'],
      errorIcon: steps?.slots['error-icon'],
      handleClick,
    }
  },
})
</script>
