<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FieldEditMode, FormContentAlign, FormLayout } from '@maple-design/ui-vue'

const props = defineProps<{ english?: boolean }>()
const layout = ref<FormLayout>('vertical')
const itemLayout = ref<FormLayout | 'inherit'>('inherit')
const mode = ref<FieldEditMode>('direct')
const readPretty = ref(false)
const contentAlign = ref<FormContentAlign>('start')
const contentAlignOptions = ['start', 'end', 'left', 'center', 'right'].map((value) => ({ label: value, value }))
const modeOptions = computed(() =>
  (['direct', 'popup'] as const).map((value) => ({
    label: (props.english ? { direct: 'Direct', popup: 'Popup' } : { direct: '直接编辑', popup: '弹窗编辑' })[value],
    value,
  })),
)
const model = reactive(
  props.english
    ? {
        name: 'Alex',
        department: 'Product design',
        notes: 'Review progress every Wednesday and confirm the weekly plan.',
      }
    : { name: '林晓', department: '产品设计', notes: '每周三同步进度，确认后更新本周安排。' },
)
const layouts = ['vertical', 'horizontal', 'inline'] as const
const layoutOptions = layouts.map((value) => ({ label: value, value }))
const copy = computed(() =>
  props.english
    ? {
        layout: 'Form layout',
        itemLayout: 'Notes layout',
        mode: 'Edit mode',
        readPretty: 'Read only display (readPretty)',
        contentAlign: 'Content alignment',
        inherit: 'Inherit',
        hint: 'Switch between direct and popup editing and toggle readPretty independently. Switch content-align to compare value alignment; Notes can also override the form layout.',
        modeDescription: {
          direct: 'Edit values directly in the form.',
          popup: 'Click a value to edit it in a popup; confirm to save.',
          readPretty: 'Show saved values as text. Compare alignment and wrapping with the labels.',
        },
        description: {
          vertical: 'Labels appear above controls, with each field on its own row.',
          horizontal: 'Labels appear beside controls, with each field on its own row.',
          inline: 'Fields flow alongside one another and wrap when space runs out.',
        },
        name: 'Name',
        department: 'Team',
        notes: 'Notes',
        placeholder: 'Enter a value',
        help: 'Help stays below the control as the layout changes.',
        model: 'Current values',
      }
    : {
        layout: '表单布局',
        itemLayout: '备注单项布局',
        mode: '编辑模式 edit-mode',
        readPretty: '纯阅读 readPretty',
        contentAlign: '内容对齐 content-align',
        inherit: '继承表单',
        hint: '组合切换表单布局与 direct / popup 编辑方式，并独立开关 readPretty；通过 content-align 切换内容左、中、右对齐；备注还可单独设置布局。',
        modeDescription: {
          direct: '直接在表单中编辑字段值。',
          popup: '点击字段值进入弹层，确认后保存。',
          readPretty: '以纯文字展示已保存的值，观察与标签的对齐及长文字换行。',
        },
        description: {
          vertical: '标签在上、控件在下，每个字段单独一行。',
          horizontal: '标签在左、控件在右，每个字段单独一行。',
          inline: '字段依次横向排列，空间不足时换行。',
        },
        name: '姓名',
        department: '部门',
        notes: '备注',
        placeholder: '请输入',
        help: '切换布局后，帮助文字仍显示在控件下方。',
        model: '当前数据',
      },
)
const itemLayoutOptions = computed(() => [{ label: copy.value.inherit, value: 'inherit' }, ...layoutOptions])
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16" data-config-comparison="form-layout">
    <mp-form layout="vertical" edit-mode="direct">
      <mp-form-item :label="copy.layout">
        <mp-radio-group
          v-model="layout"
          :aria-label="copy.layout"
          :options="layoutOptions"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item :label="copy.itemLayout">
        <mp-radio-group v-model="itemLayout" :aria-label="copy.itemLayout" :options="itemLayoutOptions" size="sm" />
      </mp-form-item>
      <mp-form-item :label="copy.mode">
        <mp-radio-group v-model="mode" :aria-label="copy.mode" :options="modeOptions" variant="button" size="sm" />
      </mp-form-item>
      <mp-form-item :label="copy.contentAlign">
        <mp-radio-group
          v-model="contentAlign"
          :aria-label="copy.contentAlign"
          :options="contentAlignOptions"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item :label="copy.readPretty">
        <mp-checkbox v-model="readPretty" data-read-pretty-toggle>readPretty</mp-checkbox>
      </mp-form-item>
    </mp-form>
    <p>
      {{ copy.hint }}<br />{{ copy.description[layout] }}<br />{{
        copy.modeDescription[readPretty ? 'readPretty' : mode]
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
      <mp-form-item field="name" :label="copy.name" required>
        <mp-input v-model="model.name" :placeholder="copy.placeholder" />
      </mp-form-item>
      <mp-form-item field="department" :label="copy.department">
        <mp-input v-model="model.department" :placeholder="copy.placeholder" />
      </mp-form-item>
      <mp-form-item
        field="notes"
        :label="copy.notes"
        :layout="itemLayout === 'inherit' ? undefined : itemLayout"
        :help="copy.help"
      >
        <mp-input v-model="model.notes" :placeholder="copy.placeholder" />
      </mp-form-item>
    </mp-form>
    <p role="status">{{ copy.model }}：{{ JSON.stringify(model) }}</p>
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
