<script lang="ts">
import { cloneVNode, Comment, computed, defineComponent, Fragment, h, provide, type VNode } from 'vue'
import Popover from '../popover'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import Avatar from './Avatar.vue'
import { avatarGroupInjectionKey } from './context'
import { props } from './group-props'

const { name, n, classes } = createNamespace('avatar-group')

function flattenChildren(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Comment) {
      return []
    }
    if (child.type === Fragment && Array.isArray(child.children)) {
      return flattenChildren(child.children as VNode[])
    }
    return child
  })
}

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    provide(avatarGroupInjectionKey, {
      shape: computed(() => props.shape),
      size: computed(() => props.size),
      autoFixFontSize: computed(() => props.autoFixFontSize),
    })

    return () => {
      const children = flattenChildren(slots.default?.() ?? [])
      const visible = props.maxCount > 0 ? children.slice(0, props.maxCount) : children
      const hidden = props.maxCount > 0 ? children.slice(props.maxCount) : []
      const rendered = visible.map((child, index) =>
        cloneVNode(child, {
          style: [child.props?.style, { zIndex: props.zIndexAscend ? index + 1 : children.length - index }],
        }),
      )

      if (hidden.length) {
        const summary = h(
          Avatar,
          { class: n('max-count-avatar'), style: props.maxStyle },
          { default: () => `+${hidden.length}` },
        )
        rendered.push(
          h(Popover, props.maxPopoverProps, {
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
