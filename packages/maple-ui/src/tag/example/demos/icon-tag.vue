<script setup></script>

<template>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-tag status="success">
      <template #icon><m-icon-check /></template>
      完成
    </mp-tag>
    <mp-tag status="info">
      <template #icon><m-icon-info-circle-fill /></template>
      信息
    </mp-tag>
  </mp-space>
</template>
