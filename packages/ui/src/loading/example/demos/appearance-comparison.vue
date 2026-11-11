<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">大小</span><span lang="en-US">Size</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading size="sm" />
        <mp-loading type="cube" size="sm" />
        <mp-loading type="wave" size="sm" />
        <mp-loading type="rect" size="sm" />
        <mp-loading type="disappear" size="sm" />
        <mp-loading :size="32" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="color">
      <h4><span lang="zh-CN">颜色</span><span lang="en-US">Color</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading color="var(--mp-color-info)" />
        <mp-loading type="cube" color="var(--mp-color-success)" />
        <mp-loading type="wave" color="var(--mp-color-warning)" />
        <mp-loading type="rect" color="var(--mp-color-danger)" />
        <mp-loading type="disappear" color="var(--mp-color-text-disabled)" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="type">
      <h4><span lang="zh-CN">类型</span><span lang="en-US">Type</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading />
        <mp-loading type="cube" />
        <mp-loading type="wave" />
        <mp-loading type="rect" />
        <mp-loading type="disappear" />
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
.demo-comparison-case--1 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
.demo-comparison-case--2 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
.demo-comparison-case--3 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
</style>
