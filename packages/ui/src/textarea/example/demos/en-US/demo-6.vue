<script setup></script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea model-value="Readonly" readonly :rows="3" />
    <mp-textarea model-value="Disabled" disabled :rows="3" />
  </mp-space>

  <div class="textarea-example__bottom-space" />
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
