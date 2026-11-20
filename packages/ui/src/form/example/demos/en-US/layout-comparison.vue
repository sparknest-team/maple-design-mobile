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
    label: { direct: 'Direct', popup: 'Popup' }[value],
    value,
  })),
)
const model = reactive({
  name: 'Alex',
  department: 'Product design',
  notes: 'Review progress every Wednesday and confirm the weekly plan.',
})
const layouts = ['vertical', 'horizontal', 'inline'] as const
const layoutOptions = layouts.map((value) => ({ label: value, value }))
const modeDescription = {
  direct: 'Edit values directly in the form.',
  popup: 'Click a value to edit it in a popup; confirm to save.',
  readPretty: 'Show saved values as text. Compare alignment and wrapping with the labels.',
}
const description = {
  vertical: 'Labels appear above controls, with each field on its own row.',
  horizontal: 'Labels appear beside controls, with each field on its own row.',
  inline: 'Fields flow alongside one another and wrap when space runs out.',
}
const itemLayoutOptions = computed(() => [{ label: 'Inherit', value: 'inherit' }, ...layoutOptions])
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16" data-config-comparison="form-layout">
    <mp-form layout="vertical" edit-mode="direct">
      <mp-form-item label="Form layout">
        <mp-radio-group v-model="layout" aria-label="Form layout" :options="layoutOptions" variant="button" size="sm" />
      </mp-form-item>
      <mp-form-item label="Notes layout">
        <mp-radio-group v-model="itemLayout" aria-label="Notes layout" :options="itemLayoutOptions" size="sm" />
      </mp-form-item>
      <mp-form-item label="Edit mode">
        <mp-radio-group v-model="mode" aria-label="Edit mode" :options="modeOptions" variant="button" size="sm" />
      </mp-form-item>
      <mp-form-item label="Content alignment">
        <mp-radio-group
          v-model="contentAlign"
          aria-label="Content alignment"
          :options="contentAlignOptions"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item label="Read only display (readPretty)">
        <mp-checkbox v-model="readPretty" data-read-pretty-toggle>readPretty</mp-checkbox>
      </mp-form-item>
    </mp-form>
    <p>
      Switch between direct and popup editing and toggle readPretty independently. Switch content-align to compare value
      alignment; Notes can also override the form layout.<br />{{ description[layout] }}<br />{{
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
      <mp-form-item field="name" label="Name" required>
        <mp-input v-model="model.name" placeholder="Enter a value" />
      </mp-form-item>
      <mp-form-item field="department" label="Team">
        <mp-input v-model="model.department" placeholder="Enter a value" />
      </mp-form-item>
      <mp-form-item
        field="notes"
        label="Notes"
        :layout="itemLayout === 'inherit' ? undefined : itemLayout"
        help="Help stays below the control as the layout changes."
      >
        <mp-input v-model="model.notes" placeholder="Enter a value" />
      </mp-form-item>
    </mp-form>
    <p role="status">Current values：{{ JSON.stringify(model) }}</p>
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
