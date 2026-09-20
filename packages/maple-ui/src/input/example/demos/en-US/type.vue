<script setup>
import { ref } from 'vue'

const textValue = ref('')
const numberValue = ref('')
const telValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="textValue" type="text" placeholder="Enter text" />
    <mp-input v-model="numberValue" type="number" placeholder="Enter a number" />
    <mp-input v-model="telValue" type="tel" placeholder="Enter phone number" />
    <mp-input v-model="emailValue" type="email" placeholder="Enter your email" />
    <mp-input v-model="passwordValue" type="password" placeholder="Enter password" />
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
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
