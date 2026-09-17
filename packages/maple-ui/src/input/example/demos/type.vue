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
    <mp-input v-model="textValue" type="text" placeholder="请输入文本" />
    <mp-input v-model="numberValue" type="number" placeholder="请输入数字" />
    <mp-input v-model="telValue" type="tel" placeholder="请输入手机号" />
    <mp-input v-model="emailValue" type="email" placeholder="请输入邮箱" />
    <mp-input v-model="passwordValue" type="password" placeholder="请输入密码" />
  </mp-space>
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
