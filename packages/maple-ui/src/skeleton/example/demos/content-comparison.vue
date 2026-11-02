<script setup lang="ts">
import SkeletonCardExample from '../AvatarAndCard.vue'
import SkeletonRowsExample from '../TitleAndRows.vue'
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-rows-width">
      <h4><span lang="zh-CN">自定义段落宽度</span><span lang="en-US">Custom Rows Width</span></h4>
      <SkeletonRowsExample />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="display-card">
      <h4><span lang="zh-CN">显示卡片</span><span lang="en-US">Display Card</span></h4>
      <SkeletonCardExample />
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
