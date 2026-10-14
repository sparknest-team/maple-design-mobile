<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ name: '', notes: '' })
</script>

<template>
  <mp-form :model="model" layout="vertical">
    <mp-form-item
      field="name"
      label="公开名称"
      required
      show-colon
      tooltip="名称将展示在个人主页。"
      :label-attrs="{ for: 'decorated-name' }"
    >
      <mp-input id="decorated-name" v-model="model.name" placeholder="输入公开名称" />
    </mp-form-item>
    <mp-form-item
      field="notes"
      label="备注"
      label-component="div"
      :content-flex="false"
      content-class="decoration-grid"
    >
      <mp-input v-model="model.notes" placeholder="支持自定义内容布局" />
      <small>content-flex=false 后由业务自行布局。</small>
    </mp-form-item>
  </mp-form>
</template>

<style scoped>
.decoration-grid {
  display: grid;
  gap: 8px;
}
</style>
