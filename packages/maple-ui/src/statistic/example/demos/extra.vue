<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="营收" :value="9280" prefix="$" show-group-separator extra="较昨日 +12.8%" />
    <mp-statistic title="新用户" :value="1280" show-group-separator>
      <template #extra>
        <span style="color: var(--mp-color-success)">较上周 +8.4%</span>
      </template>
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
