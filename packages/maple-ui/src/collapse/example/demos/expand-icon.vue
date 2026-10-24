<template>
  <mp-collapse :default-value="['1', 2]">
    <template #expand-icon="{ expanded }">
      <span>{{ expanded ? '▼' : '▶' }}</span>
    </template>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #expand-icon="{ expanded }">
        <span>{{ expanded ? '^^' : 'vv' }}</span>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
