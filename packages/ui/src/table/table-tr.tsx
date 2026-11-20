import { computed, defineComponent, createVNode, PropType, inject, isVNode, Fragment } from 'vue'
import { getPrefixCls, createNamespace } from '../utils/components'
import { tableInjectionKey } from './context'
import { orderPhysicalColumns } from './column-direction'
import { firstStructuralNode } from './structural-slot'
import { TableDataWithRaw } from './types'


const { name } = createNamespace('tr')

export default defineComponent({
  name,
  props: {
    expand: {
      type: Boolean,
    },
    empty: {
      type: Boolean,
    },
    checked: {
      type: Boolean,
    },
    rowIndex: Number,
    record: {
      type: Object as PropType<TableDataWithRaw>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const context = inject(tableInjectionKey, undefined)
    const prefixCls = getPrefixCls('table')

    const cls = computed(() => [
      `${prefixCls}-tr`,
      {
        [`${prefixCls}-tr-expand`]: props.expand,
        [`${prefixCls}-tr-empty`]: props.empty,
        [`${prefixCls}-tr-checked`]: props.checked,
      },
    ])

    return () => {
      return createVNode(
        firstStructuralNode(slots.tr?.({
          rowIndex: props.rowIndex,
          record: props.record?.raw,
        })) ?? 'tr',
        { class: cls.value },
        {
          default: () => {
            const flatten = (nodes: any[]): any[] => nodes.flatMap(node => Array.isArray(node) ? flatten(node) : isVNode(node) && node.type === Fragment && node.key == null && Array.isArray(node.children) ? flatten(node.children) : [node])
            const children = flatten(slots.default?.() ?? [])
            if (context?.readingDirection !== 'rtl') return children
            return orderPhysicalColumns(children, node => {
              if (!isVNode(node)) return undefined
              return node.props?.column?.fixed ?? (node.props?.operationColumn?.fixed ? 'left' : undefined)
            }, context.readingDirection)
          },
        },
      )
    }
  },
})
