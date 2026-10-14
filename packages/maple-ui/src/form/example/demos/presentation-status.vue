<script setup lang="ts">
import { ref } from 'vue'
import type { FormItemValidateStatus } from '@maplejs/maple-ui'

const status = ref<FormItemValidateStatus>('warning')
const statuses: FormItemValidateStatus[] = ['success', 'warning', 'error', 'validating']
</script>

<template>
  <div class="status-demo">
    <mp-space wrap>
      <mp-button v-for="item in statuses" :key="item" @click="status = item">{{ item }}</mp-button>
    </mp-space>
    <mp-form layout="vertical">
      <mp-form-item label="展示状态" feedback :validate-status="status" help="显式状态只控制外观，不改变实际校验结果。">
        <mp-input placeholder="切换上方状态" />
      </mp-form-item>
    </mp-form>
  </div>
</template>

<style scoped>
.status-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
