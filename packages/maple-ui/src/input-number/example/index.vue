<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="value" clearable placeholder="请输入" />
    <mp-input-number v-model="errorValue" clearable error placeholder="error" />
    <mp-input-number v-model="disabledValue" clearable disabled placeholder="disabled" />
    <mp-input-number v-model="errorDisabledValue" clearable error disabled placeholder="error disabled" />
  </div>

  <app-type>{{ t('range') }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="rangeValue" :min="2" :max="10" clearable placeholder="请输入" />
    <mp-input-number v-model="rangeDisabledValue" :min="2" :max="10" clearable disabled placeholder="disabled" />
  </div>

  <app-type>{{ t('mode') }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="stackedValue" clearable placeholder="stacked" />
    <mp-input-number v-model="splitValue" clearable mode="button" placeholder="button" />
    <mp-input-number v-model="splitRangeValue" :min="2" :max="10" clearable mode="button" placeholder="button range" />
    <mp-input-number v-model="splitDisabledValue" clearable mode="button" disabled placeholder="button disabled" />
  </div>

  <app-type>{{ t('size') }}</app-type>
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

  <app-type>{{ t('stepAndPrecision') }}</app-type>
  <div class="input-number-example">
    <mp-input-number
      v-model="precisionValue"
      :step="1.2"
      :precision="2"
      clearable
      placeholder="请输入"
      :default-value="3.6"
    />
    <mp-input-number :step="1.22" clearable placeholder="请输入" :default-value="1.2" />
  </div>

  <app-type>{{ t('prefixAndSuffix') }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="prefixValue" clearable placeholder="请输入">
      <template #prepend>金额</template>
      <template #prefix>+86</template>
      <template #suffix><span>RMB</span></template>
      <template #append>含税</template>
    </mp-input-number>
    <mp-input-number v-model="prefixSplitValue" clearable mode="button" placeholder="请输入">
      <template #prefix>
        <m-icon-refresh />
      </template>
      <template #suffix><span>RMB</span></template>
    </mp-input-number>
  </div>

  <app-type>{{ t('customIcon') }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="customIconValue" clearable placeholder="Please enter something">
      <template #plus>
        <m-icon-plus />
      </template>
      <template #minus>
        <m-icon-minus />
      </template>
    </mp-input-number>
  </div>

  <app-type>{{ t('format') }}</app-type>
  <div class="input-number-example">
    <mp-input-number
      v-model="formatValue"
      placeholder="Please Enter"
      :default-value="12000"
      :min="0"
      :formatter="formatter"
      :parser="parser"
    />
  </div>

  <app-type>{{ t('hideControls') }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="inputOnlyValue" mode="input" clearable placeholder="请输入数量" />
  </div>

  <app-type>{{ t('modelEvent') }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="modelEventValue" :min="10" :max="100" model-event="input" placeholder="Please Enter" />
    <div class="input-number-example__value">value: {{ modelEventValue }}</div>
  </div>

  <app-type>{{ t('eventsAndClear') }}</app-type>
  <div class="input-number-example">
    <mp-input-number
      v-model="eventValue"
      clearable
      model-event="input"
      placeholder="输入后失焦提交 change"
      @input="handleInput"
      @change="handleChange"
      @clear="handleClear"
    />
    <div class="input-number-example__value">{{ lastEvent }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)

const value = ref()
const errorValue = ref()
const disabledValue = ref()
const errorDisabledValue = ref()
const rangeValue = ref()
const rangeDisabledValue = ref()
const stackedValue = ref()
const splitValue = ref()
const splitRangeValue = ref()
const splitDisabledValue = ref()
const precisionValue = ref()
const prefixValue = ref()
const prefixSplitValue = ref()
const customIconValue = ref()
const formatValue = ref()
const inputOnlyValue = ref(1)
const modelEventValue = ref(15)
const eventValue = ref(12)
const lastEvent = ref('-')

function handleInput(value, inputValue) {
  lastEvent.value = `input: ${inputValue} (${value ?? 'undefined'})`
}

function handleChange(value) {
  lastEvent.value = `change: ${value ?? 'undefined'}`
}

function handleClear() {
  lastEvent.value = 'clear'
}

function formatter(value) {
  const values = value.split('.')
  values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return values.join('.')
}

function parser(value) {
  return value.replace(/,/g, '')
}
</script>

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
