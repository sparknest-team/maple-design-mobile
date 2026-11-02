<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="precision">
      <h4><span lang="zh-CN">精度</span><span lang="en-US">Precision</span></h4>
      <mp-count-to :to="123456" :precision="2" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-duration">
      <h4><span lang="zh-CN">自定义时长</span><span lang="en-US">Custom Duration</span></h4>
      <mp-count-to :to="123456" :duration="10000" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-animation-curve">
      <h4><span lang="zh-CN">自定义动画曲线</span><span lang="en-US">Custom Animation Curve</span></h4>
      <mp-count-to :to="123456" :timing-function="(v: number) => 1 - Math.pow(1 - v, 3)" />
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
