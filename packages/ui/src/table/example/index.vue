<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicDemo from './demos/basic.vue'
import ColumnSizingDemo from './demos/column-sizing.vue'
import ColumnsChildrenDemo from './demos/columns-children.vue'
import EmptyStateDemo from './demos/empty-state.vue'
import ColumnSizingDemoEn from './demos/en-US/column-sizing.vue'
import OrderSummaryDemoEn from './demos/en-US/order-summary.vue'
import PagedSelectionDemoEn from './demos/en-US/paged-selection.vue'
import TabsFrozenDemoEn from './demos/en-US/tabs-frozen.vue'
import VirtualDetailsDemoEn from './demos/en-US/virtual-details.vue'
import FixedColumnAndHeaderDemo from './demos/fixed-column-and-header.vue'
import LoadingDemo from './demos/loading.vue'
import OrderSummaryDemo from './demos/order-summary.vue'
import PagedSelectionDemo from './demos/paged-selection.vue'
import SortPaginationDemo from './demos/sort-pagination.vue'
import TabsFrozenDemo from './demos/tabs-frozen.vue'
import VirtualDetailsDemo from './demos/virtual-details.vue'
import VirtualListPropsDemo from './demos/virtual-list-props.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="table">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic table' : '基础表格' }}</app-type><BasicDemo />
  </section>

  <section data-demo="column-sizing">
    <app-type>{{ english ? 'Adaptive column widths' : '列宽自适应' }}</app-type><component
      :is="english ? ColumnSizingDemoEn : ColumnSizingDemo"
    />
  </section>

  <section data-demo="columns-children">
    <app-type>{{ english ? 'Grouped headers' : '分组表头' }}</app-type><ColumnsChildrenDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="fixed-columns-and-scrolling">
    <span lang="zh-CN">冻结与滚动</span>
    <span lang="en-US">Fixed columns and scrolling</span>
  </h2>

  <section data-demo="tabs-frozen">
    <app-type>{{ english ? 'Frozen column inside swipeable tabs' : '标签页内横滑与冻结列' }}</app-type><component
      :is="english ? TabsFrozenDemoEn : TabsFrozenDemo"
    />
  </section>

  <section data-demo="fixed-column-and-header">
    <app-type>{{ english ? 'Fixed columns and header' : '固定列和表头' }}</app-type><FixedColumnAndHeaderDemo />
  </section>

  <section data-demo="virtual-list-props">
    <app-type>{{ english ? 'Virtual scrolling' : '千行虚拟滚动' }}</app-type><VirtualListPropsDemo />
  </section>

  <section data-demo="virtual-details">
    <app-type>{{ english ? 'Virtual scrolling with expandable rows' : '虚拟滚动与展开详情' }}</app-type><component
      :is="english ? VirtualDetailsDemoEn : VirtualDetailsDemo"
    />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="data-and-states">
    <span lang="zh-CN">数据操作与状态</span>
    <span lang="en-US">Data and states</span>
  </h2>

  <section data-demo="sort-pagination">
    <app-type>{{ english ? 'Sorting and pagination' : '排序与分页' }}</app-type><SortPaginationDemo />
  </section>

  <section data-demo="paged-selection">
    <app-type>{{ english ? 'Selection across pages' : '跨页行选择' }}</app-type><component
      :is="english ? PagedSelectionDemoEn : PagedSelectionDemo"
    />
  </section>

  <section data-demo="order-summary">
    <app-type>{{ english ? 'Order status and totals' : '订单状态与金额汇总' }}</app-type><component
      :is="english ? OrderSummaryDemoEn : OrderSummaryDemo"
    />
  </section>

  <section data-demo="empty-state">
    <app-type>{{ english ? 'Empty state' : '空数据' }}</app-type><EmptyStateDemo />
  </section>

  <section data-demo="loading">
    <app-type>{{ english ? 'Loading' : '加载中' }}</app-type><LoadingDemo />
  </section>
</template>
