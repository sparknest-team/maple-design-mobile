<template>
  <mp-tabs default-active="overview" lazy-load>
    <mp-tabs-navs aria-label="详情分类">
      <mp-tab-nav key="overview" title="概览" />
      <mp-tab-nav key="details" title="详情" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item key="overview">概览首次打开时挂载。</mp-tab-item>
      <mp-tab-item key="details" destroy-on-hide>详情离开时卸载，再次打开会重新挂载。</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
