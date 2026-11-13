<template>
  <transition :name="n()" @before-leave="hideLeaving" @leave-cancelled="restoreLeaving">
    <div v-if="errorMessage || extraMessage || $slots['extra-message']" :class="n()">
      <div :id="errorId" :class="n('error-message')">
        <transition :name="n('message')" @before-leave="hideLeaving" @leave-cancelled="restoreLeaving">
          <div v-if="errorMessage" role="alert">
            {{ errorMessage }}
          </div>
        </transition>
      </div>
      <div :class="n('extra-message')">
        <transition :name="n('message')">
          <slot name="extra-message">
            <div v-if="extraMessage">
              {{ extraMessage }}
            </div>
          </slot>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useFormErrorDescription } from '../form/error-description'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n } = createNamespace('form-details')

export default defineComponent({
  name,
  props,
  setup(_props, { attrs }) {
    const { errorId } = useFormErrorDescription()
    // Keep the visual leave animation without retaining stale live-region content.
    const hideLeaving = (element: Element) => element.setAttribute('aria-hidden', 'true')
    const restoreLeaving = (element: Element) => element.removeAttribute('aria-hidden')
    return {
      n,
      hideLeaving,
      restoreLeaving,
      errorId: computed(() => (attrs['data-form-item-feedback'] !== undefined ? errorId?.value : undefined)),
    }
  },
})
</script>
