<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
const choices = ref(['read'])
</script>
<template>
  <div class="checkbox-native-demo">
    <p>Tab focuses; Space or Enter toggles. Disabled items are skipped; readonly items remain focusable.</p>
    <mp-checkbox v-model="value" name="agreement">Agreement: {{ value ? 'accepted' : 'not accepted' }}</mp-checkbox>
    <mp-checkbox indeterminate aria-label="Partially selected" />
    <mp-checkbox :default-value="true" readonly>Readonly checked</mp-checkbox>
    <mp-checkbox disabled>Disabled</mp-checkbox>
    <mp-checkbox error>Error state</mp-checkbox>
    <mp-checkbox-group
      v-model="choices"
      name="permissions"
      aria-label="Permissions"
      :max="2"
      :options="[
        { label: 'Read', value: 'read' },
        { label: 'Edit', value: 'edit' },
        { label: 'Admin', value: 'admin' },
      ]"
    />
    <p>Select up to two: {{ choices.join(', ') }}</p>
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
