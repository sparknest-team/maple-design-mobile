<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FieldEditMode, FormContentAlign, FormLayout } from '@maple-design/ui-vue'

const layout = ref<FormLayout>('vertical')
const itemLayout = ref<FormLayout | 'inherit'>('inherit')
const mode = ref<FieldEditMode>('direct')
const readPretty = ref(false)
const contentAlign = ref<FormContentAlign>('start')
const contentAlignOptions = ['start', 'end', 'left', 'center', 'right'].map((value) => ({ label: value, value }))
const modeOptions = computed(() =>
  (['direct', 'popup'] as const).map((value) => ({
    label: { direct: '直接编辑', popup: '弹窗编辑' }[value],
    value,
  })),
)
const model = reactive({ name: '林晓', department: '产品设计', notes: '每周三同步进度，确认后更新本周安排。' })
const layouts = ['vertical', 'horizontal', 'inline'] as const
const layoutOptions = layouts.map((value) => ({ label: value, value }))
const modeDescription = {
  direct: '直接在表单中编辑字段值。',
  popup: '点击字段值进入弹层，确认后保存。',
  readPretty: '以纯文字展示已保存的值，观察与标签的对齐及长文字换行。',
}
const description = {
  vertical: '标签在上、控件在下，每个字段单独一行。',
  horizontal: '标签在左、控件在右，每个字段单独一行。',
  inline: '字段依次横向排列，空间不足时换行。',
}
const itemLayoutOptions = computed(() => [{ label: '继承表单', value: 'inherit' }, ...layoutOptions])
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16" data-config-comparison="form-layout">
    <mp-form layout="vertical" edit-mode="direct">
      <mp-form-item label="表单布局">
        <mp-radio-group v-model="layout" aria-label="表单布局" :options="layoutOptions" variant="button" size="sm" />
      </mp-form-item>
      <mp-form-item label="备注单项布局">
        <mp-radio-group v-model="itemLayout" aria-label="备注单项布局" :options="itemLayoutOptions" size="sm" />
      </mp-form-item>
      <mp-form-item label="编辑模式 edit-mode">
        <mp-radio-group
          v-model="mode"
          aria-label="编辑模式 edit-mode"
          :options="modeOptions"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item label="内容对齐 content-align">
        <mp-radio-group
          v-model="contentAlign"
          aria-label="内容对齐 content-align"
          :options="contentAlignOptions"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item label="纯阅读 readPretty">
        <mp-checkbox v-model="readPretty" data-read-pretty-toggle>readPretty</mp-checkbox>
      </mp-form-item>
    </mp-form>
    <p>
      组合切换表单布局与 direct / popup 编辑方式，并独立开关 readPretty；通过 content-align
      切换内容左、中、右对齐；备注还可单独设置布局。<br />{{ description[layout] }}<br />{{
        modeDescription[readPretty ? 'readPretty' : mode]
      }}
    </p>
    <mp-form
      class="layout-comparison-form"
      :model="model"
      :layout="layout"
      :content-align="contentAlign"
      :edit-mode="mode"
      :read-pretty="readPretty"
      label-align="left"
      label-col-flex="6rem"
    >
      <mp-form-item field="name" label="姓名" required>
        <mp-input v-model="model.name" placeholder="请输入" />
      </mp-form-item>
      <mp-form-item field="department" label="部门">
        <mp-input v-model="model.department" placeholder="请输入" />
      </mp-form-item>
      <mp-form-item
        field="notes"
        label="备注"
        :layout="itemLayout === 'inherit' ? undefined : itemLayout"
        help="切换布局后，帮助文字仍显示在控件下方。"
      >
        <mp-input v-model="model.notes" placeholder="请输入" />
      </mp-form-item>
    </mp-form>
    <p role="status">当前数据：{{ JSON.stringify(model) }}</p>
  </mp-space>
</template>

<style scoped>
.layout-comparison-form :deep(.mp-form-item--inline) {
  width: min(100%, 22rem);
  margin-inline-end: 0;
}
p {
  margin: 0;
  overflow-wrap: anywhere;
}
</style>
