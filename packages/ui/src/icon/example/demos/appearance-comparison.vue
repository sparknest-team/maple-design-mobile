<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="icon-size">
      <h4><span lang="zh-CN">图标尺寸</span><span lang="en-US">Icon Size</span></h4>
      <mp-space wrap align="center" :size="24">
        <mp-icon size="20"><m-icon-check-circle /></mp-icon>
        <mp-icon size="28"><m-icon-check-circle /></mp-icon>
        <mp-icon size="36"><m-icon-check-circle /></mp-icon>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="icon-color">
      <h4><span lang="zh-CN">图标颜色</span><span lang="en-US">Icon Color</span></h4>
      <mp-space wrap :size="24">
        <mp-icon size="28" color="var(--mp-color-primary)"><m-icon-check-circle /></mp-icon>
        <mp-icon size="28" color="var(--mp-color-success)"><m-icon-check-circle /></mp-icon>
      </mp-space>
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
