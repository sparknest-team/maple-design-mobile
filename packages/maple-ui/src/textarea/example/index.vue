<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const basicValue = ref('')
const trimValue = ref('')
const limitedValue = ref('')
const errorOnlyValue = ref('超过长度的内容会保留')
const autoValue = ref('第一行\n第二行')
const clearValue = ref('可清空内容')
const eventValue = ref('Maple')
const lastEvent = ref('')
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const sizeValues = reactive(Object.fromEntries(sizes.map((size) => [size, ''])))

function record(name, value) {
  lastEvent.value = value === undefined ? name : `${name}: ${value}`
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-textarea v-model="basicValue" :placeholder="t('controlled')" />
    <mp-textarea :default-value="t('initialValue')" :placeholder="t('uncontrolled')" />
    <mp-textarea v-model.trim="trimValue" :placeholder="t('trim')" />
  </mp-space>

  <app-type>{{ t('variants') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-textarea variant="outlined" :placeholder="t('outlined')" />
    <mp-textarea variant="filled" :placeholder="t('filled')" />
    <mp-textarea variant="standard" :placeholder="t('standard')" />
  </mp-space>

  <app-type>{{ t('sizes') }}</app-type>
  <template v-for="size in sizes" :key="size">
    <div class="textarea-example__caption">{{ size }}</div>
    <mp-textarea v-model="sizeValues[size]" :size="size" :rows="2" :placeholder="size" />
  </template>

  <app-type>{{ t('length') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-textarea v-model="limitedValue" :max-length="10" show-word-limit clearable />
    <mp-textarea v-model="errorOnlyValue" :max-length="{ length: 10, errorOnly: true }" show-word-limit />
  </mp-space>

  <app-type>{{ t('height') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-textarea :rows="3" :placeholder="t('rows')" />
    <mp-textarea v-model="autoValue" :auto-size="{ minRows: 2, maxRows: 5 }" :placeholder="t('autoSize')" />
    <mp-textarea resize :rows="3" :placeholder="t('manualResize')" />
  </mp-space>

  <app-type>{{ t('slots') }}</app-type>
  <mp-textarea v-model="clearValue" clearable>
    <template #prefix>{{ t('prefix') }}</template>
    <template #suffix>Markdown</template>
    <template #clear-icon="{ clear }">
      <button type="button" class="textarea-example__clear" :aria-label="t('clear')" @click="clear">×</button>
    </template>
  </mp-textarea>

  <app-type>{{ t('states') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-textarea model-value="Readonly" readonly />
    <mp-textarea model-value="Disabled" disabled />
    <mp-textarea :placeholder="t('error')" error />
  </mp-space>

  <app-type>{{ t('nativeAttrs') }}</app-type>
  <mp-textarea
    :aria-label="t('feedback')"
    :textarea-attrs="{ name: 'feedback', autocomplete: 'off', 'aria-describedby': 'feedback-help' }"
  />
  <div id="feedback-help" class="textarea-example__caption">{{ t('help') }}</div>

  <app-type>{{ t('events') }}</app-type>
  <mp-textarea
    v-model="eventValue"
    clearable
    @input="record('input', $event)"
    @change="record('change', $event)"
    @keydown="record('keydown')"
    @clear="record('clear')"
    @blur="record('blur')"
  />
  <div class="textarea-example__caption">{{ t('lastEvent') }}: {{ lastEvent || '-' }}</div>

  <div class="textarea-example__bottom-space" />
</template>

<style scoped lang="less">
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__clear {
    border: 0;
    background: transparent;
    color: inherit;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
