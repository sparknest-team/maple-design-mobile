<script setup lang="ts">
import { ref } from 'vue'
import type { FormItemValidateStatus } from '@maple-design/ui-vue'

const status = ref<FormItemValidateStatus>('warning')
const statuses: FormItemValidateStatus[] = ['success', 'warning', 'error', 'validating']
</script>

<template>
  <div class="status-demo">
    <mp-space wrap>
      <mp-button v-for="item in statuses" :key="item" @click="status = item">{{ item }}</mp-button>
    </mp-space>
    <mp-form layout="vertical">
      <mp-form-item
        label="Presentation status"
        feedback
        :validate-status="status"
        help="Explicit status controls presentation, not validation results."
      >
        <mp-input placeholder="Choose a status above" />
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
