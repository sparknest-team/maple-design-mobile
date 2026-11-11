<script setup lang="ts">
import { proxyRefs as demoProxyRefs, reactive } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const values = reactive({
      value: 3,
      value1: [24, 50],
      value2: 25,
      value3: 40,
      value4: 20,
      value5: 20,
      value6: 70,
      value7: 50,
      value9: [5, 38],
      value10: [7, 64],
      value11: 0,
      value12: 50,
      value13: [7, 64],
    })
    return { values }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const values = reactive({
      value: 3,
      value1: [24, 50],
      value2: 25,
      value3: 40,
      value4: 20,
      value5: 20,
      value6: 70,
      value7: 50,
      value9: [5, 38],
      value10: [7, 64],
      value11: 0,
      value12: 50,
      value13: [7, 64],
    })
    return { values }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-btn">
      <h4><span lang="zh-CN">自定义拇指</span><span lang="en-US">custom-btn</span></h4>
      <mp-slider v-model="scene1.values.value9" range active-color="#52af77">
        <template #button="{ currentValue }">
          <div class="slider-example__block">{{ currentValue }}</div>
        </template>
      </mp-slider>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-label">
      <h4><span lang="zh-CN">提示</span><span lang="en-US">show-label</span></h4>
      <mp-slider v-model="scene2.values.value5" :show-tooltip="false" />
      <mp-slider v-model="scene2.values.value6" />
      <mp-slider v-model="scene2.values.value7" show-tooltip="always" />
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
  .slider-example__block {
    width: 24px;
    border: 1px solid #52af77;
    color: #52af77;
    height: 24px;
    margin: 0 -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
    background-color: #fff;
  }
}
.demo-comparison-case--2 {
  .slider-example__block {
    width: 24px;
    border: 1px solid #52af77;
    color: #52af77;
    height: 24px;
    margin: 0 -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
    background-color: #fff;
  }
}
</style>
