<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="show-icon">
      <h4><span lang="zh-CN">显示图标</span><span lang="en-US">Show Icon</span></h4>
      <mp-cell title="这是单元格">
        <template #icon>
          <m-icon-fire />
        </template>
        <template #extra>
          <m-icon-info-circle-fill />
        </template>
      </mp-cell>
      <mp-cell title="这是单元格">
        <template #icon>
          <m-icon-fire />
        </template>
        <template #extra>
          <m-icon-info-circle-fill />
        </template>
      </mp-cell>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-desc">
      <h4><span lang="zh-CN">显示描述</span><span lang="en-US">Show Description</span></h4>
      <mp-cell title="这是单元格" description="描述">
        <template #icon>
          <m-icon-fire />
        </template>
        <template #extra>
          <m-icon-info-circle-fill />
        </template>
      </mp-cell>
      <mp-cell title="这是单元格" description="描述" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="show-border">
      <h4><span lang="zh-CN">显示边框</span><span lang="en-US">Show Border</span></h4>
      <mp-cell border> 这是单元格 </mp-cell>
      <mp-cell border> 这是单元格 </mp-cell>
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
