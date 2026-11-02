<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="right-align">
      <h4><span lang="zh-CN">靠右</span><span lang="en-US">Right Align</span></h4>
      <mp-space justify="flex-end" :size="['2.666vmin', '2.666vmin']">
        <mp-button>Button1</mp-button>
        <mp-button>Button2</mp-button>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="center">
      <h4><span lang="zh-CN">居中</span><span lang="en-US">Align Center</span></h4>
      <mp-space justify="center" :size="['2.666vmin', '2.666vmin']">
        <mp-button>Button1</mp-button>
        <mp-button>Button2</mp-button>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="between">
      <h4><span lang="zh-CN">两端对齐</span><span lang="en-US">Space Between</span></h4>
      <mp-space justify="space-between" :size="['2.666vmin', '2.666vmin']">
        <mp-button>Button1</mp-button>
        <mp-button>Button2</mp-button>
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
