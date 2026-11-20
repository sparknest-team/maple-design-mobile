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
    <p>
      Inline menus contain options only. The field owns tags and clearing. Popup editors retain the selected-items
      summary and clear action.
    </p>
    <mp-form :model="values">
      <mp-form-item label="Select · inline" field="inlineSelect">
        <mp-select
          v-model="values.inlineSelect"
          edit-mode="direct"
          multiple
          clearable
          :options="options"
          aria-label="Select inline summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Select · popup" field="popupSelect">
        <mp-select
          v-model="values.popupSelect"
          edit-mode="popup"
          multiple
          clearable
          :options="options"
          aria-label="Select popup summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Cascader · inline" field="inlineCascader">
        <mp-cascader
          v-model="values.inlineCascader"
          edit-mode="direct"
          multiple
          clearable
          :options="options"
          aria-label="Cascader inline summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Cascader · popup" field="popupCascader">
        <mp-cascader
          v-model="values.popupCascader"
          edit-mode="popup"
          multiple
          clearable
          :options="options"
          aria-label="Cascader popup summary demo"
        />
      </mp-form-item>
    </mp-form>
  </div>
</template>
