<script setup>
import { reactive } from 'vue'

const values = reactive({ inlineSelect: ['a'], popupSelect: ['a'], inlineCascader: ['a'], popupCascader: ['a'] })
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
</script>

<template>
  <div class="selection-summary-demo">
    <p>inline 下拉只显示选项，已选标签与清空留在输入框；popup 编辑面板保留已选与清空，确认后提交。</p>
    <mp-form :model="values">
      <mp-form-item label="选择器 · 内联" field="inlineSelect">
        <mp-select
          v-model="values.inlineSelect"
          edit-mode="direct"
          multiple
          clearable
          :options="options"
          aria-label="选择器内联已选项示例"
        />
      </mp-form-item>
      <mp-form-item label="选择器 · 弹层" field="popupSelect">
        <mp-select
          v-model="values.popupSelect"
          edit-mode="popup"
          multiple
          clearable
          :options="options"
          aria-label="选择器弹层已选项示例"
        />
      </mp-form-item>
      <mp-form-item label="级联选择器 · 内联" field="inlineCascader">
        <mp-cascader
          v-model="values.inlineCascader"
          edit-mode="direct"
          multiple
          clearable
          :options="options"
          aria-label="级联选择器内联已选项示例"
        />
      </mp-form-item>
      <mp-form-item label="级联选择器 · 弹层" field="popupCascader">
        <mp-cascader
          v-model="values.popupCascader"
          edit-mode="popup"
          multiple
          clearable
          :options="options"
          aria-label="级联选择器弹层已选项示例"
        />
      </mp-form-item>
    </mp-form>
  </div>
</template>
