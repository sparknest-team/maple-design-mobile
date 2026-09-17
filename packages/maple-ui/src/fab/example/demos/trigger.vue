<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-radio-group v-model="trigger">
    <mp-radio value="click">click</mp-radio>
    <mp-radio value="hover">hover</mp-radio>
  </mp-radio-group>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :trigger="trigger" status="primary">
      <mp-button status="info" icon-container
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" icon-container
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
      ></mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
