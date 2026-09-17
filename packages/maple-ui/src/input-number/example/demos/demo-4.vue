<script setup></script>

<template>
  <div class="input-number-example">
    <mp-input-number size="xs" placeholder="xs" />
    <mp-input-number size="sm" placeholder="sm" />
    <mp-input-number size="md" placeholder="md" />
    <mp-input-number size="lg" placeholder="lg" />
    <mp-input-number size="xs" mode="button" placeholder="xs button" />
    <mp-input-number size="sm" mode="button" placeholder="sm button" />
    <mp-input-number size="md" mode="button" placeholder="md button" />
    <mp-input-number size="lg" mode="button" placeholder="lg button" />
  </div>
</template>

<style lang="less">
.input-number-example {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .mp-input-number {
    width: 320px;
    max-width: 100%;
  }

  &__value {
    color: var(--mp-field-color-text);
    font-size: 14px;
  }
}
</style>
