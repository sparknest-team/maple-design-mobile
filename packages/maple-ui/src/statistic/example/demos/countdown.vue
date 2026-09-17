<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="倒计时">
      <mp-countdown :time="2 * 60 * 60 * 1000" />
    </mp-statistic>
    <mp-statistic title="活动倒计时">
      <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
    </mp-statistic>
  </mp-space>
</template>

<style scoped>
.statistic-example__hint {
  margin: 0 0 12px;
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
  line-height: 1.5;
}
</style>
