<script lang="ts">
import { cloneVNode, computed, defineComponent, h, provide } from 'vue'
import Popover from '../popover'
import { createNamespace } from '../utils/components'
import Avatar from './Avatar.vue'
import { avatarGroupInjectionKey } from './context'
import { getAllElements, toSizeUnit } from './platform'
import { avatarGroupProps } from './props'

const { name, n, classes } = createNamespace('avatar-group')

export default defineComponent({
  name,
  props: avatarGroupProps,
  setup(props, { slots }) {
    provide(avatarGroupInjectionKey, {
      shape: computed(() => props.shape),
      size: computed(() => props.size),
      autoFixFontSize: computed(() => props.autoFixFontSize),
    })

    return () => {
      const children = getAllElements(slots.default?.() ?? [])
      const visible = props.maxCount > 0 ? children.slice(0, props.maxCount) : children
      const hidden = props.maxCount > 0 ? children.slice(props.maxCount) : []
      const layerCount = visible.length + (hidden.length ? 1 : 0)
      const rendered = visible.map((child, index) =>
        cloneVNode(child, {
          style: [child.props?.style, { zIndex: props.zIndexAscend ? index + 1 : layerCount - index }],
        }),
      )

      if (hidden.length) {
        const summary = h(
          Avatar,
          { class: n('max-count-avatar'), style: props.maxStyle },
          { default: () => `+${hidden.length}` },
        )
        rendered.push(
          h(Popover, props.maxPopoverProps ?? {}, {
            default: () => summary,
            content: () => h('div', { class: n('popover') }, hidden),
          }),
        )
      }

      const style = props.offset == null ? undefined : { '--mp-avatar-group-offset': toSizeUnit(props.offset) }

      return h('div', { class: classes(n(), [props.vertical, n('--vertical')]), style }, rendered)
    }
  },
})
</script>
