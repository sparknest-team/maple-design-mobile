<script setup>
import { ref } from 'vue'

const active = ref(false)
</script>

<template>
  <mp-button status="primary" @click.stop="active = !active">切换</mp-button>
  <span class="fab-demo-label">active: {{ active }}</span>
  <div class="fab-demo-stage">
    <mp-fab v-model:active="active" :fixed="false" :popup-container="false" status="primary">
      <mp-button status="info" icon-container @click="active = false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" icon-container @click="active = false"
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
      ></mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-label {
  margin-left: 8px;
}
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
