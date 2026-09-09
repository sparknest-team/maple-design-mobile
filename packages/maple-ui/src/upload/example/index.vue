<script setup>
import { onUnmounted, reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Dialog, Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const values = reactive({
  files: [],
  files2: [
    {
      uid: 'example-1',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'ready',
    },
    {
      uid: 'example-2',
      percent: 0,
      url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
      thumbnailUrl: 'cover.jpg',
      status: 'ready',
    },
  ],
  files3: [
    {
      uid: 'example-3',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'uploading',
    },
    {
      uid: 'example-4',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'success',
    },
    {
      uid: 'example-5',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'error',
    },
  ],
  files4: [],
  files5: [],
  files6: [],
  files7: [],
  files8: [],
  files9: [],
  files11: [
    {
      uid: 'example-6',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'ready',
    },
  ],
  files12: [
    {
      uid: 'example-7',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'uploading',
    },
    {
      uid: 'example-8',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'success',
    },
    {
      uid: 'example-9',
      percent: 0,
      url: 'cat.jpg',
      thumbnailUrl: 'cat.jpg',
      status: 'error',
    },
  ],
  files13: [],
  files14: [],
  files15: [],
})

let timer

watchLang(use)
onThemeChange()

onUnmounted(() => {
  window.clearInterval(timer)
})

function handleAfterRead(file) {
  console.log(file)
}

function handleAfterRead2(file) {
  file.status = 'uploading'

  setInterval(() => {
    file.status = 'success'
  }, 1000)
}

function handleAfterRead3(file) {
  file.status = 'uploading'
  file.percent = 0

  timer = window.setInterval(() => {
    if (file.percent === 100) {
      window.clearInterval(timer)
      file.status = 'success'
      return
    }
    file.percent += 10
  }, 250)
}

function handleOversize() {
  Message.warning(t('fileSizeExceedsLimit'))
}

function handleBeforeRead(file) {
  if (file.size <= 1 * 1024 * 1024) {
    Message.success(t('fileLessThen'))
    return true
  }
  Message.warning(t('fileLargeThen'))
  return false
}

async function handleBeforeRemove() {
  const action = await Dialog({
    title: t('removeTitle'),
    message: t('removeMessage'),
  })

  return action === 'confirm'
}

function handleBeforeFilter(files) {
  return files.filter((file) => file.name.endsWith('png'))
}

function handlePreview(file) {
  Dialog({
    title: t('customPreview'),
    message: file.url.slice(0, 100),
  })
}

function handleActionClick(chooseFile) {
  Message.loading('delay 1s')

  setTimeout(() => {
    Message.clear()
    chooseFile()
  }, 1000)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-upload v-model="values.files" @after-read="handleAfterRead" />

  <app-type>{{ t('preview') }}</app-type>
  <mp-upload v-model="values.files2" />

  <app-type>{{ t('customPreview') }}</app-type>
  <mp-upload v-model="values.files11" prevent-default-preview @preview="handlePreview" />

  <app-type>{{ t('state') }}</app-type>
  <mp-upload v-model="values.files3" @after-read="handleAfterRead2" />

  <app-type>{{ t('useProgress') }}</app-type>
  <mp-upload v-model="values.files13" @after-read="handleAfterRead3" />

  <app-type>{{ t('maxFiles') }}</app-type>
  <mp-upload v-model="values.files4" :max-files="1" />

  <app-type>{{ t('maxFileSize') }}</app-type>
  <mp-upload v-model="values.files5" :max-file-size="1024" @oversize="handleOversize" />

  <app-type>{{ t('beforeAdd') }}</app-type>
  <mp-upload v-model="values.files14" multiple :before-add="handleBeforeFilter" />

  <app-type>{{ t('beforeRead') }}</app-type>
  <mp-upload v-model="values.files7" :before-read="handleBeforeRead" />

  <app-type>{{ t('clickAction') }}</app-type>
  <mp-upload v-model="values.files15" @click-action="handleActionClick" />

  <app-type>{{ t('disabled') }}</app-type>
  <mp-upload v-model="values.files8" disabled />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-upload v-model="values.files9" readonly />

  <app-type>{{ t('beforeRemove') }}</app-type>
  <mp-upload v-model="values.files11" :before-remove="handleBeforeRemove" />

  <app-type>{{ t('style') }}</app-type>
  <mp-upload v-model="values.files6">
    <mp-button status="primary">{{ t('upload-fill') }}</mp-button>
  </mp-upload>

  <app-type>{{ t('customRender') }}</app-type>
  <mp-space>
    <img v-for="f in values.files12" :key="f.uid" class="custom-upload-file" :src="f.thumbnailUrl" />
    <mp-upload v-model="values.files12" :show-file-list="false">
      <mp-button round status="primary">
        <m-icon-upload-fill :size="28" />
      </mp-button>
    </mp-upload>
  </mp-space>

  <app-type>{{ t('removeButtonSlot') }}</app-type>
  <mp-upload v-model="values.files2">
    <template #remove-button="{ remove }">
      <div class="custom-remove-button">
        <m-icon-close color="#fff" @click.stop="remove" />
      </div>
    </template>
  </mp-upload>
</template>

<style scoped lang="less">
.space {
  height: 40px;
}

.custom-upload-file {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 12px;
  object-fit: cover;
}

.custom-remove-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}
</style>
