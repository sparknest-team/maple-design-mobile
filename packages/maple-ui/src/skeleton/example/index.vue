<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import Animation from './Animation.vue'
import AvatarAndCard from './AvatarAndCard.vue'
import Basic from './Basic.vue'
import CustomTemplate from './CustomTemplate.vue'
import Fullscreen from './Fullscreen.vue'
import { t, use } from './locale'
import TitleAndRows from './TitleAndRows.vue'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type
  ><basic /> <app-type>{{ t('customRowsWidth') }}</app-type
  ><title-and-rows /> <app-type>{{ t('displayCard') }}</app-type
  ><avatar-and-card /> <app-type>{{ t('customTemplate') }}</app-type
  ><custom-template /> <app-type>{{ t('animation') }}</app-type
  ><animation /> <app-type>{{ t('fullscreenMode') }}</app-type
  ><fullscreen />
</template>
