<template>
  <div class="number-keyboard-example">
    <mp-input v-model="value" readonly placeholder="点击输入" @click="open = true" />
    <mp-number-keyboard v-model="value" v-model:open="open" :max-length="11" title="安全键盘" />

    <mp-input
      v-model="customValue"
      readonly
      placeholder="自定义主题"
      style="margin-top: 16px"
      @click="showCustom = true"
    />
    <mp-number-keyboard v-model="customValue" v-model:open="showCustom" theme="custom" extra-key="." />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NumberKeyboard from '..'

export default defineComponent({
  name: 'NumberKeyboardExample',
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
  },
  setup() {
    const value = ref('')
    const open = ref(false)
    const customValue = ref('')
    const showCustom = ref(false)

    return {
      value,
      open,
      customValue,
      showCustom,
    }
  },
})
</script>
