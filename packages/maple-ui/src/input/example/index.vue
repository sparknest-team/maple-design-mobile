<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const basicValue = ref('')
const defaultValue = ref('Maple default')
const clearableValue = ref('Maple Design')
const textValue = ref('')
const numberValue = ref('')
const telValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
const maxLengthValue = ref('Maple')
const errorOnlyValue = ref('超过六个字符')
const customClearValue = ref('Clear me')
const trimValue = ref('')
const eventValue = ref('Maple')
const lastEvent = ref('')
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const variants = ['filled', 'outlined', 'standard']
const sizeValues = reactive(
  Object.fromEntries(sizes.flatMap((size) => variants.map((variant) => [`${size}-${variant}`, '']))),
)

function updateEvent(name, value) {
  lastEvent.value = value === undefined ? name : `${name}：${value}`
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="basicValue" :placeholder="t('placeholder')" />
    <mp-input v-model="clearableValue" clearable :placeholder="t('clearable')" />
    <div class="input-example__value">{{ t('currentValue') }}：{{ basicValue || '-' }}</div>
  </mp-space>

  <app-type>{{ t('valueModel') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="basicValue" :placeholder="t('controlledPlaceholder')" />
    <mp-input :default-value="defaultValue" :placeholder="t('uncontrolledPlaceholder')" />
    <div class="input-example__value">{{ t('defaultValue') }}：{{ defaultValue }}</div>
  </mp-space>

  <app-type>{{ t('variant') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" :placeholder="t('filled')" />
    <mp-input variant="outlined" :placeholder="t('outlined')" />
    <mp-input variant="standard" :placeholder="t('standard')" />
  </mp-space>

  <app-type>{{ t('hint') }}</app-type>
  <div class="input-example__caption">{{ t('hintEnabled') }}</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" :placeholder="t('username')" />
    <mp-input variant="outlined" :placeholder="t('username')" />
    <mp-input variant="standard" :placeholder="t('username')" />
  </mp-space>
  <div class="input-example__caption">{{ t('hintDisabled') }}</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" :hint="false" :placeholder="t('username')" />
    <mp-input variant="outlined" :hint="false" :placeholder="t('username')" />
    <mp-input variant="standard" :hint="false" :placeholder="t('username')" />
  </mp-space>

  <app-type>{{ t('line') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input :line="true" :placeholder="t('floatingPlaceholder')" />
    <mp-input :line="false" :placeholder="t('staticPlaceholder')" />
  </mp-space>

  <app-type>{{ t('type') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="textValue" type="text" :placeholder="t('textPlaceholder')" />
    <mp-input v-model="numberValue" type="number" :placeholder="t('numberPlaceholder')" />
    <mp-input v-model="telValue" type="tel" :placeholder="t('telPlaceholder')" />
    <mp-input v-model="emailValue" type="email" :placeholder="t('emailPlaceholder')" />
    <mp-input v-model="passwordValue" type="password" :placeholder="t('passwordPlaceholder')" />
  </mp-space>

  <app-type>{{ t('size') }}</app-type>
  <template v-for="size in sizes" :key="size">
    <div class="input-example__caption">{{ size }}</div>
    <mp-space direction="column" :size="[12, 0]">
      <mp-input
        v-for="variant in variants"
        :key="variant"
        v-model="sizeValues[`${size}-${variant}`]"
        :size="size"
        :variant="variant"
        :placeholder="t(variant)"
      />
    </mp-space>
  </template>

  <app-type>{{ t('state') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input model-value="Maple Design" readonly :placeholder="t('readonly')" />
    <mp-input model-value="Maple Design" disabled :placeholder="t('disabled')" />
  </mp-space>

  <app-type>{{ t('prefixSuffix') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input :placeholder="t('telPlaceholder')"><template #prefix>+86</template></mp-input>
    <mp-input :placeholder="t('amountPlaceholder')"><template #suffix>RMB</template></mp-input>
    <mp-input :placeholder="t('searchPlaceholder')">
      <template #prefix><m-icon-magnify /></template>
      <template #suffix><m-icon-close-circle /></template>
    </mp-input>
  </mp-space>

  <app-type>{{ t('maxLength') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input
      v-model="maxLengthValue"
      :max-length="10"
      clearable
      show-word-limit
      :placeholder="t('maxLengthPlaceholder')"
    />
    <mp-input
      v-model="errorOnlyValue"
      :max-length="{ length: 6, errorOnly: true }"
      show-word-limit
      :placeholder="t('errorOnlyPlaceholder')"
    />
  </mp-space>

  <app-type>{{ t('customClearIcon') }}</app-type>
  <mp-input v-model="customClearValue" clearable :placeholder="t('clearable')">
    <template #clear-icon="{ clear }">
      <button
        type="button"
        class="input-example__clear"
        :aria-label="t('clear')"
        @click="clear"
        @keydown.enter.prevent="clear"
        @keydown.space.prevent="clear"
      >
        ×
      </button>
    </template>
  </mp-input>

  <app-type>{{ t('events') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input
      v-model="eventValue"
      clearable
      :placeholder="t('eventPlaceholder')"
      @input="updateEvent(t('inputEvent'), $event)"
      @change="updateEvent(t('changeEvent'), $event)"
      @press-enter="updateEvent(t('pressEnterEvent'))"
      @clear="updateEvent(t('clearEvent'))"
    />
    <div class="input-example__value">{{ t('lastEvent') }}：{{ lastEvent || '-' }}</div>
  </mp-space>

  <app-type>{{ t('modelModifier') }}</app-type>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model.trim="trimValue" :placeholder="t('trimPlaceholder')" />
    <div class="input-example__value">{{ t('currentValue') }}：“{{ trimValue }}”</div>
  </mp-space>

  <app-type>{{ t('nativeAttrs') }}</app-type>
  <label class="input-example__label" for="maple-email">{{ t('emailLabel') }}</label>
  <mp-input
    id="maple-email"
    autocomplete="email"
    enterkeyhint="next"
    :input-attrs="{ name: 'email', autocapitalize: 'none', 'aria-describedby': 'maple-email-help' }"
    :placeholder="t('emailPlaceholder')"
    type="email"
  />
  <div id="maple-email-help" class="input-example__value">{{ t('emailHelp') }}</div>

  <div class="input-example__bottom-space" />
</template>

<style scoped lang="less">
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__clear {
    padding: 0 4px;
    border: 0;
    color: inherit;
    font-size: 16px;
    line-height: 1;
    background: transparent;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    color: var(--mp-field-color-blur);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
