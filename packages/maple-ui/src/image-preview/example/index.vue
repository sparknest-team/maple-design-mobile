<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { ActionSheet, ImagePreview, Snackbar } from '@maplejs/maple-ui'
import { t, use } from './locale'

const MpImagePreview = ImagePreview.Component
const MpActionSheet = ActionSheet.Component

const show = ref(false)
const currentShow = ref(false)
const closeShow = ref(false)
const closeEventShow = ref(false)
const preventEventShow = ref(false)
const imagePreventDefault = ref(true)
const extraSlotsShow = ref(false)
const menuShow = ref(false)
const images = ref(['cat.jpg', 'cat2.jpg'])
const image = ref(['cat.jpg'])
const actions = computed(() => [
  {
    name: t('operate'),
    icon: 'wrench',
  },
  {
    name: t('operate'),
    icon: 'wrench',
  },
])

watchLang(use)
onThemeChange()

function handleCloseEvent() {
  Snackbar({
    content: t('shutdownEvent'),
    duration: 1000,
  })
}

function handleLongPressEvent() {
  Snackbar({
    content: t('preventDefaultEvent'),
    duration: 1000,
  })
}

function preview() {
  ImagePreview(image.value)
}

function previewCallback() {
  ImagePreview({
    images,
    onChange: (index) => {
      Snackbar(String(index))
    },
  })
}
</script>

<template>
  <div class="image-preview-demo">
    <app-type>{{ t('functionCall') }}</app-type>
    <mp-button type="primary" block @click="preview">{{ t('preview') }}</mp-button>
    <mp-button type="primary" block @click="previewCallback">{{ t('callBack') }}</mp-button>
  </div>

  <div class="image-preview-demo">
    <app-type>{{ t('componentCall') }}</app-type>
    <mp-button type="warning" block @click="show = true">{{ t('basicUse') }}</mp-button>
    <mp-image-preview v-model:show="show" :images="image" />

    <mp-button type="warning" block @click="currentShow = true">{{ t('specifyInitialPosition') }}</mp-button>
    <mp-image-preview v-model:show="currentShow" :images="images" :initial-index="1" />

    <mp-button type="warning" block @click="closeShow = true">{{ t('displayCloseButton') }}</mp-button>
    <mp-image-preview v-model:show="closeShow" :images="images" :closeable="true" />

    <mp-button type="warning" block @click="closeEventShow = true">{{ t('listenCloseEvents') }}</mp-button>
    <mp-image-preview v-model:show="closeEventShow" :images="images" @close="handleCloseEvent" />

    <mp-button type="warning" block @click="preventEventShow = true">{{ t('preventLongTapDefault') }}</mp-button>
    <mp-image-preview
      v-model:show="preventEventShow"
      :images="images"
      :image-prevent-default="imagePreventDefault"
      @long-press="handleLongPressEvent"
    ></mp-image-preview>

    <mp-button type="warning" block @click="extraSlotsShow = true">{{ t('showExtraSlots') }}</mp-button>
    <mp-image-preview v-model:show="extraSlotsShow" :images="images">
      <template #extra>
        <mp-icon name="menu" :size="22" color="#fff" @click="menuShow = true" />
        <mp-action-sheet v-model:show="menuShow" :actions="actions" />
      </template>
    </mp-image-preview>
  </div>
</template>

<style lang="less" scoped>
.image-preview-demo {
  .mp-button {
    margin-bottom: 14px;
  }

  .extra-btn {
    margin-top: 0;
  }
}
</style>
