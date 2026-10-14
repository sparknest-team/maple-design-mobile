<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
const choices = ref(['read'])
</script>
<template>
  <div class="checkbox-native-demo">
    <p>按 Tab 聚焦，按空格或 Enter 切换。禁用项跳过，只读项可聚焦。</p>
    <mp-checkbox v-model="value" name="agreement">接受协议：{{ value ? '已接受' : '未接受' }}</mp-checkbox>
    <mp-checkbox indeterminate aria-label="部分选中" />
    <mp-checkbox :default-value="true" readonly>只读已选</mp-checkbox>
    <mp-checkbox disabled>禁用</mp-checkbox>
    <mp-checkbox error>错误状态</mp-checkbox>
    <mp-checkbox-group
      v-model="choices"
      name="permissions"
      aria-label="权限"
      :max="2"
      :options="[
        { label: '读取', value: 'read' },
        { label: '编辑', value: 'edit' },
        { label: '管理', value: 'admin' },
      ]"
    />
    <p>最多选择两项：{{ choices.join(', ') }}</p>
  </div>
</template>
<style scoped>
.checkbox-native-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.checkbox-native-demo p {
  margin: 0;
}
</style>
