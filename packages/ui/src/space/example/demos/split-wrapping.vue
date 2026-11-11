<script setup lang="ts">
import { ref } from 'vue'

const wrap = ref(true)
const direction = ref<'row' | 'column'>('row')
const items = ref(['A', 'B', 'C'])
</script>
<template>
  <mp-space wrap :size="8">
    <mp-button data-space-toggle-wrap @click="wrap = !wrap">换行 / Wrap</mp-button>
    <mp-button data-space-toggle-direction @click="direction = direction === 'row' ? 'column' : 'row'"
      >方向 / Direction</mp-button
    >
    <mp-button data-space-reorder @click="items = [...items].reverse()">重排 / Reorder</mp-button>
  </mp-space>
  <p>输入草稿后切换布局或重排，文字仍跟随对应项。Drafts stay with their items.</p>
  <div style="max-width: 100%; overflow: auto">
    <mp-space
      data-space-split-demo
      :size="12"
      :wrap="wrap"
      :direction="direction"
      style="width: 260px; max-width: 100%"
    >
      <template v-for="item in items" :key="item">
        <label class="space-split-field">
          <span>Item {{ item }}</span>
          <mp-input edit-mode="direct" :aria-label="'Draft ' + item" placeholder="草稿 / Draft" />
        </label>
      </template>
      <template #split><span aria-hidden="true">/</span></template>
    </mp-space>
  </div>
  <p>分隔符跟随前项，允许位于行尾。Separators stay with the preceding item.</p>
</template>
<style scoped>
.space-split-field {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  width: 110px;
}
.space-split-field :deep(input) {
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
