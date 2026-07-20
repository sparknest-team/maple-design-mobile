<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message, previewImage } from '@maplejs/maple-ui'
import { t, use } from './locale'

const images = ['cat.jpg', 'cat2.jpg']
const singleImage = 'cat.jpg'

const visible = ref(false)
const srcVisible = ref(false)
const currentVisible = ref(false)
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
const dataGroupVisible = ref(false)
const dataGroupCurrent = ref(1)

const menuShow = ref(false)

const actions = computed(() => [
  { name: t('operate'), icon: 'wrench' },
  { name: t('operate'), icon: 'wrench' },
])

watchLang(use)
onThemeChange()

function previewSingle() {
  previewImage(singleImage)
}

function previewWithCallback() {
  previewImage({
    images,
    onChange: (index) => {
      Message(`${t('switchedTo')} ${index + 1}`)
    },
  })
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
    <app-type>{{ t('functionCall') }}</app-type>
    <mp-button type="primary" block @click="previewSingle">{{ t('preview') }}</mp-button>
    <mp-button type="primary" block @click="previewWithCallback">{{ t('callBack') }}</mp-button>
  </div>

  <div class="image-preview-demo">
    <app-type>{{ t('componentCall') }}</app-type>

    <app-type>{{ t('previewGroup') }}</app-type>
    <app-type>{{ t('wrapImageGroup') }}</app-type>
    <mp-image-preview-group>
      <mp-space :size="['4vmin', '4vmin']">
        <mp-image src="cat.jpg" width="20vmin" height="20vmin" fit="cover" radius="8" />
        <mp-image src="cat2.jpg" width="20vmin" height="20vmin" fit="cover" radius="8" />
      </mp-space>
    </mp-image-preview-group>

    <app-type>{{ t('dataDrivenGroup') }}</app-type>
    <mp-button type="primary" block @click="openDataGroup">{{ t('openPreview') }}</mp-button>
    <mp-image-preview-group
      v-model:visible="dataGroupVisible"
      v-model:current="dataGroupCurrent"
      :images="images"
      :loop="false"
      closable
    />

    <mp-button type="warning" block @click="visible = true">{{ t('basicUse') }}</mp-button>
    <mp-image-preview v-model:visible="visible" :images="images" />

    <mp-button type="warning" block @click="srcVisible = true">{{ t('useSrc') }}</mp-button>
    <mp-image-preview v-model:visible="srcVisible" src="cat.jpg" />

    <mp-button type="warning" block @click="currentVisible = true">{{ t('specifyInitialPosition') }}</mp-button>
    <mp-image-preview v-model:visible="currentVisible" :images="images" :current="1" />

    <mp-button type="warning" block @click="closeVisible = true">{{ t('displayCloseButton') }}</mp-button>
    <mp-image-preview v-model:visible="closeVisible" :images="images" closable />

    <mp-button type="warning" block @click="closeEventVisible = true">{{ t('listenCloseEvents') }}</mp-button>
    <mp-image-preview v-model:visible="closeEventVisible" :images="images" @close="handleCloseEvent" />

    <mp-button type="warning" block @click="longPressVisible = true">{{ t('preventLongTapDefault') }}</mp-button>
    <mp-image-preview
      v-model:visible="longPressVisible"
      :images="images"
      image-prevent-default
      @long-press="handleLongPressEvent"
    />

    <mp-button type="warning" block @click="extraVisible = true">{{ t('showExtraSlots') }}</mp-button>
    <mp-image-preview v-model:visible="extraVisible" :images="images">
      <template #extra>
        <mp-icon name="menu" :size="22" color="#fff" @click="menuShow = true" />
        <mp-action-sheet v-model:show="menuShow" :actions="actions" />
      </template>
    </mp-image-preview>

    <mp-button type="warning" block @click="noLoopVisible = true">{{ t('disableLoop') }}</mp-button>
    <mp-image-preview v-model:visible="noLoopVisible" :images="images" :loop="false" />

    <mp-button type="warning" block @click="noIndicatorVisible = true">{{ t('hideIndicator') }}</mp-button>
    <mp-image-preview v-model:visible="noIndicatorVisible" :images="images" :indicator="false" />

    <mp-button type="warning" block @click="zoomVisible = true">{{ t('setZoom') }}</mp-button>
    <mp-image-preview v-model:visible="zoomVisible" :images="images" :zoom="3" />

    <mp-button type="warning" block @click="customCloseVisible = true">{{ t('customCloseIcon') }}</mp-button>
    <mp-image-preview v-model:visible="customCloseVisible" :images="images" closable>
      <template #close-icon>
        <mp-icon name="window-close" :size="24" color="#fff" @click="customCloseVisible = false" />
      </template>
    </mp-image-preview>

    <mp-button type="warning" block @click="customIndicatorVisible = true">{{ t('customIndicator') }}</mp-button>
    <mp-image-preview v-model:visible="customIndicatorVisible" :images="images">
      <template #indicator="{ index, length }">
        <div class="custom-indicator">{{ index + 1 }} / {{ length }}</div>
      </template>
    </mp-image-preview>

    <mp-button type="warning" block @click="unlockScrollVisible = true">{{ t('disableLockScroll') }}</mp-button>
    <mp-image-preview v-model:visible="unlockScrollVisible" :images="images" :lock-scroll="false" />

    <mp-button type="warning" block @click="noEscVisible = true">{{ t('disableEscClose') }}</mp-button>
    <mp-image-preview v-model:visible="noEscVisible" :images="images" :close-on-key-escape="false" closable />

    <mp-button type="warning" block @click="lifecycleVisible = true">{{ t('listenLifecycle') }}</mp-button>
    <mp-image-preview
      v-model:visible="lifecycleVisible"
      :images="images"
      @open="handleLifecycle('open')"
      @opened="handleLifecycle('opened')"
      @closed="handleLifecycle('closed')"
    />
  </div>
</template>

<style lang="less" scoped>
.image-preview-demo {
  .mp-button {
    margin-bottom: 14px;
  }
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
</style>
