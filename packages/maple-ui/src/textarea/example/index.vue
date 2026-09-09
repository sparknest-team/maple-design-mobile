<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maplejs/maple-cli/client'

const basicValue = ref('')
const filledValue = ref('')
const outlineValue = ref('')
const standardValue = ref('')
const hintValue = ref('')
const noHintValue = ref('')
const limitedValue = ref('')
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const sizeValues = reactive(Object.fromEntries(sizes.map((size) => [size, ''])))

onThemeChange()
</script>

<template>
  <app-type>基础用法</app-type>
  <mp-textarea v-model="basicValue" :rows="4" placeholder="请输入多行文本" />

  <app-type>外观</app-type>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="filledValue" :rows="3" variant="filled" placeholder="填充外观" />
    <mp-textarea v-model="outlineValue" :rows="3" variant="outline" placeholder="描边外观" />
    <mp-textarea v-model="standardValue" :rows="3" variant="standard" placeholder="标准外观" />
  </mp-space>

  <app-type>Hint</app-type>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="hintValue" :rows="3" placeholder="聚焦或有值时上浮" />
    <mp-textarea v-model="noHintValue" :hint="false" :rows="3" placeholder="作为原生占位符展示" />
  </mp-space>

  <app-type>尺寸</app-type>
  <template v-for="size in sizes" :key="size">
    <div class="textarea-example__caption">{{ size }}</div>
    <mp-textarea v-model="sizeValues[size]" :rows="2" :size="size" variant="outline" :placeholder="`${size} 尺寸`" />
  </template>

  <app-type>字数限制与调整高度</app-type>
  <mp-textarea
    v-model="limitedValue"
    clearable
    :max-length="100"
    placeholder="最多输入 100 个字符"
    resize
    :rows="4"
    variant="outline"
  />

  <app-type>状态</app-type>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea model-value="只读状态" readonly :rows="3" />
    <mp-textarea model-value="禁用状态" disabled :rows="3" />
  </mp-space>

  <div class="textarea-example__bottom-space" />
</template>

<style scoped lang="less">
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
