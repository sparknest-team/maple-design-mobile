<script lang="ts">
import { defineComponent, h } from 'vue'
import { createNamespace } from '../utils/components'
import { rateProps } from './props'
import Rate from './rate-core'

export default defineComponent({
  name: createNamespace('rate-compat').name,
  inheritAttrs: false,
  props: rateProps,
  setup(props, { attrs, slots }) {
    return () => h(Rate, { ...props, ...attrs }, slots)
  },
})
</script>
