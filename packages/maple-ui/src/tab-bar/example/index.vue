<script setup>
import { ref } from 'vue'
import {
  IconBellFill as MIconBellFill,
  IconHeartFill as MIconHeartFill,
  IconHomeFill as MIconHomeFill,
  IconPlus as MIconPlus,
  IconSearch as MIconSearch,
  IconUserCircleFill as MIconUserCircleFill,
} from '@maplejs/icons-vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import {
  Message,
  Button as MpButton,
  Dialog as MpDialog,
  Icon as MpIcon,
  Space as MpSpace,
  Switch as MpSwitch,
  Textarea as MpTextarea,
} from '@maplejs/maple-ui'
import { TabBar as MpTabBar, TabBarItem as MpTabBarItem } from '..'
import AsyncChangeDemo from './demos/async-change.vue'
import CustomLabelDemo from './demos/custom-label.vue'
import NumericNameDemo from './demos/numeric-name.vue'
import UncontrolledDemo from './demos/uncontrolled.vue'
import { t, use } from './locale'

const basicUsage = ref(0)
const matchByName = ref('home-fill')
const showBadge = ref(0)
const badgeVariant = ref(false)
const badgeProps = {
  status: 'primary',
  content: 66,
}
const customColor = ref(0)
const changeEvent = ref(0)
const clickEvent = ref(0)
const fab = ref(0)
const isEven = ref(true)
const composerOpen = ref(false)
const draft = ref('')
const variant = ref(0)

watchLang(use)
onThemeChange()

function handleChange(active) {
  Message.info(`changed to ${active}`)
}

function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-tab-bar v-model:active="basicUsage">
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>

  <app-type>{{ t('matchByName') }}</app-type>
  <mp-tab-bar v-model:active="matchByName">
    <mp-tab-bar-item name="home-fill" :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="search" :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="heart-fill" :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="user" :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>

  <app-type>{{ t('showBadge') }}</app-type>
  <p>{{ t('badgeHelp') }}</p>
  <mp-switch v-model="badgeVariant" :aria-label="t('variant')" /> {{ t('variant') }}
  <mp-tab-bar v-model:active="showBadge" :variant="badgeVariant">
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')" badge>
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')" :badge="badgeProps">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')" :badge="{ content: 125, max: 99 }">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>

  <app-type>{{ t('customColor') }}</app-type>
  <mp-tab-bar v-model:active="customColor" active-color="var(--mp-color-warning)">
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>

  <app-type>{{ t('changeEvent') }}</app-type>
  <mp-tab-bar v-model:active="changeEvent" @change="handleChange">
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>

  <app-type>{{ t('clickEvent') }}</app-type>
  <mp-tab-bar v-model:active="clickEvent">
    <mp-tab-bar-item :label="t('label')" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>

  <app-type>{{ t('fab') }}</app-type>
  <p>{{ t('fabDescription') }}</p>
  <mp-space wrap role="group" :aria-label="t('fabLayout')">
    <mp-button :variant="isEven ? 'default' : 'outline'" :aria-pressed="isEven" @click="isEven = true">{{
      t('fabCenter')
    }}</mp-button>
    <mp-button :variant="isEven ? 'outline' : 'default'" :aria-pressed="!isEven" @click="isEven = false">{{
      t('fabRight')
    }}</mp-button>
  </mp-space>
  <mp-tab-bar
    v-model:active="fab"
    style="margin-top: 40px"
    :fab-props="{ 'aria-label': t('publish') }"
    @fab-click="composerOpen = true"
  >
    <template #fab
      ><mp-icon :size="24"><m-icon-plus /></mp-icon
    ></template>
    <mp-tab-bar-item :label="t('home')">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('discover')">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('favorites')">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('messages')">
      <template #icon
        ><mp-icon :size="22"><m-icon-bell-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item v-if="!isEven" :label="t('profile')">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
  <mp-dialog
    v-model:open="composerOpen"
    :title="t('publish')"
    :confirm-button-text="t('publish')"
    @confirm="
      Message.success(t('published'))
      draft = ''
    "
  >
    <p>{{ t('composerDescription') }}</p>
    <mp-textarea v-model="draft" :placeholder="t('draftPlaceholder')" :aria-label="t('draftPlaceholder')" />
  </mp-dialog>

  <app-type>{{ t('variant') }}</app-type>
  <mp-tab-bar v-model:active="variant" variant>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="t('label')">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
  <app-type>{{ t('uncontrolled') }}</app-type>
  <UncontrolledDemo />
  <app-type>{{ t('numeric-name') }}</app-type>
  <NumericNameDemo />
  <app-type>{{ t('custom-label') }}</app-type>
  <CustomLabelDemo />
  <app-type>{{ t('async-change') }}</app-type>
  <AsyncChangeDemo />
</template>
