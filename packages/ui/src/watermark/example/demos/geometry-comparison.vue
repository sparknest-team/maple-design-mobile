<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-gap">
      <h4><span lang="zh-CN">自定义间距</span><span lang="en-US">Custom Gap</span></h4>
      <mp-watermark content="Maple" :gap="[40, 40]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-offset">
      <h4><span lang="zh-CN">自定义偏移量</span><span lang="en-US">Custom Offset</span></h4>
      <mp-watermark content="Maple" :offset="[20, 20]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-rotate">
      <h4><span lang="zh-CN">自定义旋转角度</span><span lang="en-US">Custom Rotate</span></h4>
      <mp-watermark content="Maple" :rotate="22" :offset="[0, 20]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
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
.demo-comparison-case--1 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
.demo-comparison-case--2 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
.demo-comparison-case--3 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
</style>
