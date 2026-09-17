<script setup>
import { reactive } from 'vue'

const demoText = {
  filled: 'Filled',
  outline: 'Outline',
  standard: 'Standard',
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const variants = ['filled', 'outline', 'standard']
const sizeValues = reactive(
  Object.fromEntries(sizes.flatMap((size) => variants.map((variant) => [`${size}-${variant}`, '']))),
)
</script>

<template>
  <template v-for="size in sizes" :key="size">
    <div class="input-example__caption">{{ size }}</div>
    <mp-space direction="column" :size="[12, 0]">
      <mp-input
        v-for="variant in variants"
        :key="variant"
        v-model="sizeValues[`${size}-${variant}`]"
        :size="size"
        :variant="variant"
        :placeholder="demoText[variant] ?? String(variant)"
      />
    </mp-space>
  </template>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
