<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="活跃用户">
      <mp-count-to :from="0" :to="125670" :duration="2000" />
    </mp-statistic>
    <mp-statistic title="转化率" suffix="%">
      <mp-count-to :from="0" :to="36.8" :duration="2000" :precision="1" />
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
