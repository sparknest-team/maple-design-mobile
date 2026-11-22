<template>
  <colgroup>
    <!-- 对齐 Element Plus：auto 模式下不渲染任何 col，完全交给浏览器按内容分配 -->
    <template v-if="tableLayout === 'fixed'">
      <col v-for="item of orderedColumns" :key="item.key" :class="item.class" :width="item.width" />
    </template>
  </colgroup>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue'
import { createNamespace, getPrefixCls } from '../utils/components'
import { orderPhysicalColumns } from './column-direction'
import { tableInjectionKey } from './context'
import { getColumnLayoutKey } from './extra-column'
import { DEFAULT_OPERATION_WIDTH } from './hooks/use-columns-layout'
import { TableColumnData, TableOperationColumn } from './types'

const prefixCls = getPrefixCls('table')

export default defineComponent({
  name: createNamespace('col-group').name,
  props: {
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      required: true,
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true,
    },
    columnWidth: {
      type: Object as PropType<Record<string, number>>,
    },
    columnRealWidth: {
      type: Object as PropType<Record<string, number>>,
    },
    /** fixed：使用布局计算结果；auto：不渲染 col，交给浏览器按内容分配 */
    tableLayout: {
      type: String as PropType<'fixed' | 'auto'>,
      default: 'fixed',
    },
  },
  setup(props) {
    const context = inject(tableInjectionKey, undefined)
    // 对齐 Element Plus：fixed 模式只写 width 属性（非 style）。
    // 列宽由 use-columns-layout 计算且总和等于 table 像素宽，
    // 不存在剩余空间分配，无需 min/max-width 兜底
    const getColWidth = (item: TableColumnData) => {
      const key = getColumnLayoutKey(item)
      const resized = (key && props.columnWidth?.[key]) ?? item._resizeWidth
      return (key && props.columnRealWidth?.[key]) || resized || item._realWidth || item.width
    }

    const orderedColumns = computed(() =>
      orderPhysicalColumns(
        [
          ...props.operations.map((item) => ({
            key: `operation-${item.name}`,
            class: [`${prefixCls}-${item.name}-col`, { [`${prefixCls}-col-default-width`]: item.width == null }],
            width: item.width ?? DEFAULT_OPERATION_WIDTH,
            fixed: item.fixed ? ('left' as const) : undefined,
          })),
          ...props.dataColumns.map((item) => ({
            key: `data-${getColumnLayoutKey(item)}`,
            class: undefined,
            width: getColWidth(item),
            fixed: item.fixed,
          })),
        ],
        (item) => item.fixed,
        context?.readingDirection,
      ),
    )
    return {
      orderedColumns,
      getColWidth,
      prefixCls,
      DEFAULT_OPERATION_WIDTH,
    }
  },
})
</script>
