import { defineComponent, h, type PropType } from 'vue'
import { IconChevronDown } from '@maplejs/icons-vue'
import Icon from '../icon'
import { createNamespace } from '../utils/components'
import type { ExpandIconPosition } from './props'

const { n } = createNamespace('collapse-item')

export const DefaultExpandIcon = defineComponent({
  name: 'DefaultExpandIcon',
  props: {
    active: Boolean,
    disabled: Boolean,
    position: String as PropType<ExpandIconPosition>,
  },
  setup() {
    return () => h(Icon, { class: n('expand-icon') }, { default: () => h(IconChevronDown) })
  },
})
