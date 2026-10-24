<template>
  <mp-tabs default-value="overview" lazy-load>
    <mp-tabs-navs aria-label="详情分类">
      <mp-tab-nav name="overview" title="概览" />
      <mp-tab-nav name="details" title="详情" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="overview">概览首次打开时挂载。</mp-tab-item>
      <mp-tab-item name="details" destroy-on-hide>详情离开时卸载，再次打开会重新挂载。</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
