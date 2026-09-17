<template>
  <mp-collapse :default-active-names="['1', 2]">
    <template #expand-icon="{ active }">
      <span>{{ active ? '▼' : '▶' }}</span>
    </template>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #expand-icon="{ active }">
        <span>{{ active ? '^^' : 'vv' }}</span>
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
