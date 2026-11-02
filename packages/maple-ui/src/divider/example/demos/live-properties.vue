<script setup>
import { ref } from 'vue'

const vertical = ref(false)
const text = ref(false)
const invisible = ref(false)
const hairline = ref(false)
</script>

<template>
  <section class="divider-live-demo">
    <div class="controls">
      <mp-checkbox v-model="vertical" edit-mode="direct">Vertical divider</mp-checkbox>
      <mp-checkbox v-model="text" edit-mode="direct">Divider text</mp-checkbox>
      <mp-checkbox v-model="invisible" edit-mode="direct">Zero opacity</mp-checkbox>
      <mp-checkbox v-model="hairline" edit-mode="direct">Hairline divider</mp-checkbox>
    </div>
    <p role="status">Orientation: {{ vertical ? 'vertical' : 'horizontal' }}; opacity: {{ invisible ? 0 : 1 }}</p>
    <div class="preview" :class="{ vertical }">
      <span>Before</span>
      <mp-divider
        data-testid="live-divider"
        :orientation="vertical ? 'vertical' : 'horizontal'"
        :opacity="invisible ? 0 : 1"
        :hairline="hairline"
        :thickness="4"
        :inset="[8, 16]"
        :spacing="[12, 20]"
        ><template v-if="text" #default>Section</template></mp-divider
      >
      <span>After</span>
    </div>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.preview {
  display: flex;
  flex-direction: column;
  min-height: 160px;
}
.preview.vertical {
  flex-direction: row;
  align-items: center;
}
</style>
