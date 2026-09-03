<script lang="ts">
import { defineComponent, h } from 'vue'
import { call } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { formatStyleVars } from '../utils/elements'
import { props } from './props'

const { name, n } = createNamespace('style-provider')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    return () =>
      h(
        props.tag,
        {
          class: n(),
          style: formatStyleVars(props.styleVars),
        },
        call(slots.default),
      )
  },
})
</script>
