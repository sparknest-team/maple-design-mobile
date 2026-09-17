<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="下载量" :value="125670" show-group-separator />
    <mp-statistic title="评论数" extra="较昨日" :value="40509" :precision="2" />
    <mp-statistic title="活跃用户" value="1.28k" />
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
