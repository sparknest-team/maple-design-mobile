<script setup lang="ts">
import { reactive } from 'vue'

const headingLevels = [1, 2, 3, 4, 5, 6] as const
const model = reactive<{ size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; headingLevel: (typeof headingLevels)[number] }>({
  size: 'md',
  headingLevel: 4,
})
</script>

<template>
  <mp-space direction="column" align="stretch">
    <mp-form :model="model" layout="vertical" edit-mode="direct">
      <mp-form-item field="size" label="分区尺寸">
        <mp-radio-group v-model="model.size" aria-label="分区尺寸">
          <mp-radio value="xs">超紧凑 (xs)</mp-radio>
          <mp-radio value="sm">紧凑 (sm)</mp-radio>
          <mp-radio value="md">默认 (md)</mp-radio>
          <mp-radio value="lg">宽松 (lg)</mp-radio>
          <mp-radio value="xl">超宽松 (xl)</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="headingLevel" label="标题层级">
        <mp-radio-group v-model="model.headingLevel" aria-label="标题层级">
          <mp-radio v-for="level in headingLevels" :key="level" :value="level">h{{ level }}</mp-radio>
        </mp-radio-group>
      </mp-form-item>
    </mp-form>
    <output>渲染标签 <code>&lt;h{{ model.headingLevel }}&gt;</code></output>

    <mp-section :size="model.size" variant="outline" show-marker :heading-level="model.headingLevel" title="成员权限">
      <div class="section-size-content">管理员可邀请成员并修改项目设置。</div>
    </mp-section>
  </mp-space>
</template>

<style scoped>
.section-size-content {
  border: 1px dashed currentColor;
  padding: 8px;
}
</style>
