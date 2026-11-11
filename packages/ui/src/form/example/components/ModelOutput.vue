<template>
  <pre class="form-model-output"><slot /></pre>
</template>
<style scoped>
.form-model-output {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  max-height: 240px;
  margin: 0;
  padding: 12px;
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  border-radius: 6px;
  background: var(--mp-color-fill-1);
  color: var(--mp-color-text-2);
  font-size: 12px;
  line-height: 1.6;
}
</style>
