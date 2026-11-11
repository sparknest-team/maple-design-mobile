<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="bordered">
      <h4><span lang="zh-CN">bordered</span><span lang="en-US">Border / Border with shadow</span></h4>
      <mp-space wrap>
        <mp-paper bordered width="25vmin" height="25vmin" />
        <mp-paper bordered :elevation="2" width="25vmin" height="25vmin" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="round">
      <h4><span lang="zh-CN">round</span><span lang="en-US">Rounded Paper</span></h4>
      <mp-paper :elevation="2" width="25vmin" height="25vmin" round />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="radius">
      <h4><span lang="zh-CN">radius</span><span lang="en-US">Custom Border Radius</span></h4>
      <mp-paper :elevation="2" :radius="8" width="25vmin" height="25vmin" />
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
