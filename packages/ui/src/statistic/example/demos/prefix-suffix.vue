<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-statistic title="账户余额" :value="125670" prefix="$" show-group-separator />
    <mp-statistic
      title="增长率"
      :value="12.8"
      :precision="1"
      suffix="%"
      :value-style="{ color: 'var(--mp-color-success)' }"
    >
      <template #prefix>▲</template>
    </mp-statistic>
    <mp-statistic
      title="跳出率"
      :value="3.2"
      :precision="1"
      suffix="%"
      :value-style="{ color: 'var(--mp-color-danger)' }"
    >
      <template #prefix>▼</template>
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
