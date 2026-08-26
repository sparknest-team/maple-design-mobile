<template>
  <div class="verification-code-example">
    <div class="verification-code-example__title">基本使用</div>
    <mp-verification-code v-model="value" @finish="handleFinish" />

    <div class="verification-code-example__title">掩码</div>
    <mp-verification-code v-model="maskedValue" masked />

    <div class="verification-code-example__title">分隔符</div>
    <mp-verification-code v-model="sepValue" type="alphanumeric">
      <template #separator="{ index }">
        <span v-if="index === 2" style="font-size: 20px">-</span>
      </template>
    </mp-verification-code>

    <div class="verification-code-example__title">配合数字键盘</div>
    <mp-verification-code v-model="keyboardValue" readonly @click="showKeyboard = true" />
    <mp-number-keyboard v-model="keyboardValue" v-model:open="showKeyboard" :max-length="6" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
import VerificationCode from '..'
import NumberKeyboard from '../../number-keyboard'

export default defineComponent({
  name: 'VerificationCodeExample',
  components: {
    [VerificationCode.name]: VerificationCode,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  setup() {
    const value = ref('')
    const maskedValue = ref('')
    const sepValue = ref('')
    const keyboardValue = ref('')
    const showKeyboard = ref(false)

    function handleFinish(code) {
      Message.success(`输入完成：${code}`)
    }

    return {
      value,
      maskedValue,
      sepValue,
      keyboardValue,
      showKeyboard,
      handleFinish,
    }
  },
})
</script>

<style>
.verification-code-example {
  padding: 16px;
}

.verification-code-example__title {
  margin: 16px 0 8px;
  font-size: 14px;
  color: var(--mp-color-text);
}
</style>
