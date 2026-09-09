<script setup lang="ts">
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AsyncActionDemo from './async-action.vue'
import BasicDemo from './basic.vue'
import ControlledDemo from './controlled.vue'
import CustomIconDemo from './custom-icon.vue'
import DisabledDemo from './disabled.vue'
import { t, use } from './locale'
import PopupDemo from './popup.vue'
import SizesDemo from './sizes.vue'
import VariantsDemo from './variants.vue'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <BasicDemo />

  <app-type>{{ t('variants') }}</app-type>
  <VariantsDemo />

  <app-type>{{ t('sizes') }}</app-type>
  <SizesDemo />

  <app-type>{{ t('disabled') }}</app-type>
  <DisabledDemo />

  <app-type>{{ t('asyncAction') }}</app-type>
  <AsyncActionDemo />

  <app-type>{{ t('customIcon') }}</app-type>
  <CustomIconDemo />

  <app-type>{{ t('controlled') }}</app-type>
  <ControlledDemo />

  <app-type>{{ t('popup') }}</app-type>
  <PopupDemo />
</template>
