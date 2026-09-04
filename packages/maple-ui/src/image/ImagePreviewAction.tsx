import { defineComponent } from 'vue'
import { createNamespace } from '../utils/components'

const { name, n } = createNamespace('image-preview-action')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    name: String,
    disabled: Boolean,
  },
  setup(props, { attrs, slots }) {
    return () => (
      <button {...attrs} type="button" class={[n('button'), attrs.class]} title={props.name} disabled={props.disabled}>
        {slots.default?.()}
      </button>
    )
  },
})
