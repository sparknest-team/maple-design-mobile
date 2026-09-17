<template>
  <mp-collapse :default-active-names="['1', 2]" :bordered="false">
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup>
const customStyle = {
  borderRadius: '6px',
  marginBottom: '12px',
  overflow: 'hidden',
}
</script>
