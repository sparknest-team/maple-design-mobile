<template>
  <mp-tabs
    default-active="overview"
    item-class="custom-tab-content"
    :item-style="{ padding: '16px' }"
    item-wrapper-class="custom-tab-panel"
    :item-wrapper-style="{ border: '1px solid currentColor', borderRadius: '8px' }"
    tab-class="custom-tab-label"
    :tab-style="{ borderRadius: '8px' }"
  >
    <mp-tabs-navs :style="{ paddingInline: 0 }">
      <mp-tab-nav key="overview" title="概览" />
      <mp-tab-nav key="details" title="详情" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item key="overview">统一设置导航、内容和内容外层样式。</mp-tab-item>
      <mp-tab-item key="details">自定义类名保留内置选中状态，样式支持响应式更新。</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
