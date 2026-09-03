<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { imagePreview, Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const images = ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg']
const singleImage = 'https://maplejs.org/cat.jpg'

const open = ref(false)
const srcVisible = ref(false)
const currentVisible = ref(false)
const componentCurrent = ref(1)
const closeVisible = ref(false)
const noLoopVisible = ref(false)
const noIndicatorVisible = ref(false)
const zoomVisible = ref(false)
const unlockScrollVisible = ref(false)
const noEscVisible = ref(false)
const closeEventVisible = ref(false)
const lifecycleVisible = ref(false)
const longPressVisible = ref(false)
const extraVisible = ref(false)
const customCloseVisible = ref(false)
const customIndicatorVisible = ref(false)
const customActionsVisible = ref(false)
const dataGroupVisible = ref(false)
const dataGroupCurrent = ref(1)
const popupContainerVisible = ref(false)

let previewHandle

const menuShow = ref(false)

const actions = computed(() => [
  { name: t('operate'), icon: 'wrench' },
  { name: t('operate'), icon: 'wrench' },
])

watchLang(use)
onThemeChange()

function previewSingle() {
  imagePreview(singleImage)
}

function previewWithCallback() {
  imagePreview({
    images,
    onChange: (index) => {
      Message(`${t('switchedTo')} ${index + 1}`)
    },
  })
}

function previewWithHandle() {
  previewHandle = imagePreview({ images, current: 0 })
}

function nextPreviewImage() {
  previewHandle?.next()
}

function closePreview() {
  previewHandle?.close()
}

function openWithCurrent() {
  componentCurrent.value = 1
  currentVisible.value = true
}

function handleCloseEvent() {
  Message({ content: t('shutdownEvent'), duration: 1000 })
}

function handleLongPressEvent() {
  Message({ content: t('preventDefaultEvent'), duration: 1000 })
}

function handleLifecycle(type) {
  Message({ content: `${t('lifecycleEvent')}: ${type}`, duration: 800 })
}

function openDataGroup() {
  dataGroupVisible.value = true
}
</script>

<template>
  <div class="image-preview-demo">
    <h2 class="image-preview-category">{{ t('previewWays') }}</h2>
    <app-type>{{ t('functionCall') }}</app-type>
    <mp-button type="primary" block @click="previewSingle">{{ t('preview') }}</mp-button>
    <mp-button type="primary" block @click="previewWithCallback">{{ t('callBack') }}</mp-button>
    <mp-button type="primary" block @click="previewWithHandle">{{ t('previewWithHandle') }}</mp-button>
    <mp-space :size="['2vmin', '2vmin']">
      <mp-button size="small" @click="nextPreviewImage">{{ t('nextImage') }}</mp-button>
      <mp-button size="small" @click="closePreview">{{ t('closePreview') }}</mp-button>
    </mp-space>

    <h2 class="image-preview-category">{{ t('multiplePreview') }}</h2>
    <app-type>{{ t('previewGroup') }}</app-type>
    <app-type>{{ t('wrapImageGroup') }}</app-type>
    <mp-image-preview-group>
      <mp-space :size="['4vmin', '4vmin']">
        <mp-image src="https://maplejs.org/cat.jpg" width="20vmin" height="20vmin" fit="cover" radius="8" />
        <mp-image src="https://maplejs.org/cat2.jpg" width="20vmin" height="20vmin" fit="cover" radius="8" />
      </mp-space>
    </mp-image-preview-group>

    <app-type>{{ t('dataDrivenGroup') }}</app-type>
    <mp-button type="primary" block @click="openDataGroup">{{ t('openPreview') }}</mp-button>
    <mp-image-preview-group
      v-model:open="dataGroupVisible"
      v-model:current="dataGroupCurrent"
      :images="images"
      :loop="false"
      closable
    />

    <h2 class="image-preview-category">{{ t('componentPreview') }}</h2>
    <mp-button type="warning" block @click="open = true">{{ t('basicUse') }}</mp-button>
    <mp-image-preview v-model:open="open" :images="images" />

    <mp-button type="warning" block @click="srcVisible = true">{{ t('useSrc') }}</mp-button>
    <mp-image-preview v-model:open="srcVisible" src="https://maplejs.org/cat.jpg" />

    <mp-button type="warning" block @click="openWithCurrent">{{ t('specifyInitialPosition') }}</mp-button>
    <mp-image-preview v-model:open="currentVisible" v-model:current="componentCurrent" :images="images" />

    <mp-button type="warning" block @click="closeVisible = true">{{ t('hideCloseButton') }}</mp-button>
    <mp-image-preview v-model:open="closeVisible" :images="images" :closable="false" />

    <h2 class="image-preview-category">{{ t('customContent') }}</h2>

    <mp-button type="warning" block @click="extraVisible = true">{{ t('showExtraSlots') }}</mp-button>
    <mp-image-preview v-model:open="extraVisible" :images="images">
      <template #extra>
        <m-icon-menu :size="22" color="#fff" @click="menuShow = true" />
        <mp-action-sheet v-model:open="menuShow" :actions="actions" />
      </template>
    </mp-image-preview>

    <mp-button type="warning" block @click="customCloseVisible = true">{{ t('customCloseIcon') }}</mp-button>
    <mp-image-preview v-model:open="customCloseVisible" :images="images">
      <template #close-icon>
        <m-icon-window-close :size="24" color="#fff" @click="customCloseVisible = false" />
      </template>
    </mp-image-preview>

    <mp-button type="warning" block @click="customActionsVisible = true">{{ t('customActions') }}</mp-button>
    <mp-image-preview v-model:open="customActionsVisible" :images="images">
      <template #actions>
        <span class="custom-actions">{{ t('operate') }}</span>
      </template>
    </mp-image-preview>

    <h2 class="image-preview-category">{{ t('stateAndEvents') }}</h2>

    <mp-button type="warning" block @click="closeEventVisible = true">{{ t('listenCloseEvents') }}</mp-button>
    <mp-image-preview v-model:open="closeEventVisible" :images="images" @close="handleCloseEvent" />

    <mp-button type="warning" block @click="noLoopVisible = true">{{ t('disableLoop') }}</mp-button>
    <mp-image-preview v-model:open="noLoopVisible" :images="images" :loop="false" />

    <mp-button type="warning" block @click="unlockScrollVisible = true">{{ t('disableLockScroll') }}</mp-button>
    <mp-image-preview v-model:open="unlockScrollVisible" :images="images" :lock-scroll="false" />

    <mp-button type="warning" block @click="noEscVisible = true">{{ t('disableEscClose') }}</mp-button>
    <mp-image-preview v-model:open="noEscVisible" :images="images" :esc-to-close="false" closable />

    <mp-button type="warning" block @click="lifecycleVisible = true">{{ t('listenLifecycle') }}</mp-button>
    <mp-image-preview
      v-model:open="lifecycleVisible"
      :images="images"
      @open="handleLifecycle('open')"
      @opened="handleLifecycle('opened')"
      @closed="handleLifecycle('closed')"
      @key-escape="handleLifecycle('keyEscape')"
    />

    <app-type>{{ t('popupContainer') }}</app-type>
    <div id="maple-image-preview-popup-container" class="popup-container-demo">
      <mp-button type="warning" block @click="popupContainerVisible = true">{{ t('openPreview') }}</mp-button>
      <mp-image-preview
        v-model:open="popupContainerVisible"
        :images="images"
        popup-container="#maple-image-preview-popup-container"
      />
    </div>

    <h2 class="image-preview-category">{{ t('mobileFeatures') }}</h2>

    <mp-button type="warning" block @click="longPressVisible = true">{{ t('preventLongTapDefault') }}</mp-button>
    <mp-image-preview
      v-model:open="longPressVisible"
      :images="images"
      image-prevent-default
      @long-press="handleLongPressEvent"
    />

    <mp-button type="warning" block @click="noIndicatorVisible = true">{{ t('hideIndicator') }}</mp-button>
    <mp-image-preview v-model:open="noIndicatorVisible" :images="images" :indicator="false" />

    <mp-button type="warning" block @click="zoomVisible = true">{{ t('setZoom') }}</mp-button>
    <mp-image-preview v-model:open="zoomVisible" :images="images" :zoom="3" />

    <mp-button type="warning" block @click="customIndicatorVisible = true">{{ t('customIndicator') }}</mp-button>
    <mp-image-preview v-model:open="customIndicatorVisible" :images="images">
      <template #indicator="{ index, length }">
        <div class="custom-indicator">{{ index + 1 }} / {{ length }}</div>
      </template>
    </mp-image-preview>
  </div>
</template>

<style lang="less" scoped>
.image-preview-demo {
  .mp-button {
    margin-bottom: 14px;
  }
}

.image-preview-category {
  margin: 28px 0 12px;
  color: var(--mp-site-config-color-text);
  font-size: 18px;
  font-weight: 600;
}

.image-preview-category:first-child {
  margin-top: 0;
}

.custom-actions {
  display: inline-block;
  padding: 6px 12px;
  color: #fff;
  background: rgb(255 255 255 / 18%);
  border-radius: 14px;
}

.custom-indicator {
  position: absolute;
  top: 16px;
  left: 50%;
  padding: 4px 12px;
  color: #fff;
  font-size: 12px;
  background: rgb(0 0 0 / 45%);
  border-radius: 12px;
  transform: translateX(-50%);
}

.popup-container-demo {
  position: relative;
  height: 180px;
  padding: 16px;
  overflow: hidden;
  background: var(--mp-color-fill-2);
}
</style>
