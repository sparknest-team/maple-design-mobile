<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-format">
      <h4><span lang="zh-CN">自定义格式</span><span lang="en-US">Custom Format</span></h4>
      <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-millisecond">
      <h4><span lang="zh-CN">显示毫秒</span><span lang="en-US">Show Millisecond</span></h4>
      <mp-countdown :time="2 * 60 * 60 * 1000" format="HH:mm:ss.SSS" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-style">
      <h4><span lang="zh-CN">自定义样式</span><span lang="en-US">Custom Style</span></h4>
      <mp-countdown :time="108000000">
        <template #default="{ hours, minutes, seconds }">
          <span class="countdown-example-block">{{ hours }}</span>
          <span class="countdown-example-colon">:</span>
          <span class="countdown-example-block">{{ minutes }}</span>
          <span class="countdown-example-colon">:</span>
          <span class="countdown-example-block">{{ seconds }}</span>
        </template>
      </mp-countdown>
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
  .countdown-example-block {
    background: var(--mp-color-primary);
    color: var(--mp-color-white);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .countdown-example-colon {
    margin: 0 5px;
    font-size: 18px;
    font-weight: 500;
  }
}
.demo-comparison-case--2 {
  .countdown-example-block {
    background: var(--mp-color-primary);
    color: var(--mp-color-white);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .countdown-example-colon {
    margin: 0 5px;
    font-size: 18px;
    font-weight: 500;
  }
}
.demo-comparison-case--3 {
  .countdown-example-block {
    background: var(--mp-color-primary);
    color: var(--mp-color-white);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .countdown-example-colon {
    margin: 0 5px;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
