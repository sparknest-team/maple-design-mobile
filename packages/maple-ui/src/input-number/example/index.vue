<template>
  <app-type>{{ pack.basicUsage }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="value" clearable placeholder="请输入" />
    <mp-input-number v-model="errorValue" clearable error placeholder="error" />
    <mp-input-number v-model="disabledValue" clearable disabled placeholder="disabled" />
    <mp-input-number v-model="errorDisabledValue" clearable error disabled placeholder="error disabled" />
  </div>

  <app-type>{{ pack.range }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="rangeValue" :min="2" :max="10" clearable placeholder="请输入" />
    <mp-input-number v-model="rangeDisabledValue" :min="2" :max="10" clearable disabled placeholder="disabled" />
  </div>

  <app-type>{{ pack.controlType }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="stackedValue" clearable placeholder="stacked" />
    <mp-input-number v-model="splitValue" clearable control-type="split" placeholder="split" />
    <mp-input-number
      v-model="splitRangeValue"
      :min="2"
      :max="10"
      clearable
      control-type="split"
      placeholder="split range"
    />
    <mp-input-number
      v-model="splitDisabledValue"
      clearable
      control-type="split"
      disabled
      placeholder="split disabled"
    />
  </div>

  <app-type>{{ pack.size }}</app-type>
  <div class="input-number-example">
    <mp-input-number size="xs" placeholder="xs" />
    <mp-input-number size="sm" placeholder="sm" />
    <mp-input-number size="md" placeholder="md" />
    <mp-input-number size="lg" placeholder="lg" />
    <mp-input-number size="xs" control-type="split" placeholder="xs split" />
    <mp-input-number size="sm" control-type="split" placeholder="sm split" />
    <mp-input-number size="md" control-type="split" placeholder="md split" />
    <mp-input-number size="lg" control-type="split" placeholder="lg split" />
  </div>

  <app-type>{{ pack.stepAndPrecision }}</app-type>
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

  <app-type>{{ pack.prefixAndSuffix }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="prefixValue" clearable placeholder="请输入">
      <template #prefix>+86</template>
      <template #suffix><span>RMB</span></template>
    </mp-input-number>
    <mp-input-number v-model="prefixSplitValue" clearable control-type="split" placeholder="请输入">
      <template #prefix>
        <mp-icon name="refresh" />
      </template>
      <template #suffix><span>RMB</span></template>
    </mp-input-number>
  </div>

  <app-type>{{ pack.customIcon }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="customIconValue" clearable placeholder="Please enter something">
      <template #plus>
        <mp-icon name="plus" />
      </template>
      <template #minus>
        <mp-icon name="minus" />
      </template>
    </mp-input-number>
  </div>

  <app-type>{{ pack.format }}</app-type>
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

  <app-type>{{ pack.hideControls }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="inputOnlyValue" :controls="false" clearable placeholder="请输入数量" />
  </div>

  <app-type>{{ pack.modelEvent }}</app-type>
  <div class="input-number-example">
    <mp-input-number v-model="modelEventValue" :min="10" :max="100" model-event="input" placeholder="Please Enter" />
    <div class="input-number-example__value">value: {{ modelEventValue }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AppType } from '@maplejs/maple-cli/client'
import { pack } from './locale'

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
    color: var(--mp-field-decorator-text-color);
    font-size: 14px;
  }
}
</style>
