<template>
  <mp-collapse>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #extra>Extra</template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <template #extra>
        <mp-button status="primary" size="sm">Action</mp-button>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." name="3">
      <template #extra>
        <mp-tag size="sm">city</mp-tag>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
