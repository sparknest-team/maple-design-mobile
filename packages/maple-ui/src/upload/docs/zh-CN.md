# 文件上传

### 介绍

提供了文件读取、图片/视频预览能力。通过监听 `after-read` 事件获取文件上传服务器。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const files = ref([])

function handleAfterRead(file) { 
  console.log(file)
}
</script>

<template>
  <mp-upload v-model="files" @after-read="handleAfterRead"/>
</template>
```

### 文件预览

通过分析文件的 url 后缀名判断文件类型，支持图片和视频预览。

```html
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'example-0',
    status: 'ready',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg'
  },
  {
    uid: 'example-1',
    status: 'ready',
    percent: 0,

    url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    thumbnailUrl: 'https://maplejs.org/cover.jpg'
  }
])
</script>

<template>
  <mp-upload v-model="files"/>
</template>
```

### 自定义预览

```html
<script setup>
import { ref } from 'vue'
import { Dialog } from '@maplejs/maple-ui'

const files = ref([
  {
    uid: 'example-2',
    status: 'ready',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg'
  }
])

function handlePreview(file) {
  Dialog({
    title: '自定义预览',
    message: file.url.slice(0, 100)
  })
}
</script>

<template>
  <mp-upload v-model="files" prevent-default-preview @preview="handlePreview"/>
</template>
```

### 上传状态

提供了 `loading`、 `success`、 `error` 三种上传状态，并提供了工具函数快速获取对应状态的文件。

```html
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'example-3',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg',
    status: 'uploading'
  },
  {
    uid: 'example-4',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg',
    status: 'success'
  },
  {
    uid: 'example-5',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg',
    status: 'error'
  }
])

function handleAfterRead(file) {
  file.status = 'uploading'

  setTimeout(() => {
    file.status = 'success'
  }, 1000)
}
</script>

<template>
  <mp-upload v-model="files" @after-read="handleAfterRead"/>
</template>
```

### 使用进度条

```html
<script setup>
import { ref, onUnmounted } from 'vue'

const files = ref([])
let timer

function handleAfterRead(file) {
  file.status = 'uploading'

  timer = window.setInterval(() => {
    if (file.percent === 100) {
      window.clearInterval(timer)
      file.status = 'success'
      return
    }

    file.percent += 10
  }, 250)
}

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <mp-upload v-model="files" @after-read="handleAfterRead"/>
</template>
```

### 文件数量限制

```html
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <mp-upload v-model="files" :max-files="1"/>
</template>
```

### 文件大小限制

超过限制会被阻止读取，可以通过监听 `oversize` 事件获取文件。

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const files = ref([])
</script>

<template>
  <mp-upload v-model="files" :max-file-size="1024" @oversize="Message.warning('文件大小超出限制')" />
</template>
```

### 文件列表过滤

通过 `before-add` 钩子过滤原生 `File[]`，返回新的 `File[]`（支持 Promise）。

```html
<script setup>
import { ref } from 'vue'

const files = ref([])

function handleBeforeFilter(files) {
  return files.filter(file => file.name.endsWith('png'))
}
</script>

<template>
  <mp-upload v-model="files" multiple :before-add="handleBeforeFilter" />
</template>

```

### 上传预处理

通过注册 `before-read` 钩子对文件进行操作，返回假值阻止文件读取。

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const files = ref([])

function handleBeforeRead(file) {
  if (file.size <= 1 * 1024 * 1024) {
    Message.success('文件小于1M，上传成功')
    return true
  } else {
    Message.warning('文件大于1M，不能上传')
    return false
  }
}
</script>

<template>
  <mp-upload v-model="files" :before-read="handleBeforeRead"/>
</template>
```

### 上传按钮点击事件

通过注册 `click-action` 事件可以拦截上传按钮的点击行为，通过回调中的 `chooseFile` 方法进行手动触发浏览器选择文件操作。

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const files = ref([])

function handleClickAction(chooseFile) {
  Message.loading('delay 1s')

  window.setTimeout(() => {
    Message.clear()
    chooseFile()
  }, 1000)
}
</script>

<template>
  <mp-upload v-model="files" @click-action="handleClickAction" />
</template>
```

### 禁用

```html
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <mp-upload disabled v-model="files"/>
</template>
```

### 只读

```html
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <mp-upload readonly v-model="files"/>
</template>
```

### 删除前处理

删除文件之前会触发 `before-remove` 钩子，返回假值阻止删除操作。

```html
<script setup>
import { ref } from 'vue'
import { Dialog } from '@maplejs/maple-ui'

const files = ref([
  {
    uid: 'example-6',
    status: 'ready',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg'
  }
])

async function handleBeforeRemove() {
  const action = await Dialog({
    title: '是否删除?',
    message: '删除后无法撤回'
  })

  return action === 'confirm'
}
</script>

<template>
  <mp-upload v-model="files" :before-remove="handleBeforeRemove" />
</template>
```

### 自定义上传样式

```html
<script setup>
import { ref } from 'vue'

const files = ref()
</script>

<template>
  <mp-upload v-model="files">
    <mp-button status="primary">上传</mp-button>
  </mp-upload>
</template>
```

> 上传组件的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

### 自定义渲染

通过 `show-file-list` 隐藏组件的文件列表，自定义文件列表的渲染逻辑。

```html
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'example-7',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg',
    status: 'uploading',
  },
  {
    uid: 'example-8',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg',
    status: 'success',
  },
  {
    uid: 'example-9',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg',
    status: 'error',
  },
])
</script>

<template>
  <mp-space>
    <img
      class="upload-example-file"
      v-for="f in files"
      :key="f.uid"
      :src="f.thumbnailUrl"
    />
    <mp-upload :show-file-list="false" v-model="files">
      <mp-button round status="primary">
        <m-icon-upload-fill :size="28" />
      </mp-button>
    </mp-upload>
  </mp-space>
</template>

<style>
.upload-example-file {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 12px;
  object-fit: cover;
}
</style>
```

### 自定义删除按钮

```html
<script setup>
import { ref } from 'vue'

const files = ref([
  {
    uid: 'example-10',
    status: 'ready',
    percent: 0,

    url: 'https://maplejs.org/cat.jpg',
    thumbnailUrl: 'https://maplejs.org/cat.jpg'
  },
  {
    uid: 'example-11',
    status: 'ready',
    percent: 0,

    url: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    thumbnailUrl: 'https://maplejs.org/cover.jpg'
  }
])
</script>

<template>
  <mp-upload v-model="files">
    <template #remove-button="{ remove }">
      <div class="custom-remove-button">
        <m-icon-close color="#fff" @click.stop="remove"></m-icon-close>
      </div>
    </template>
  </mp-upload>
</template>

<style>
.custom-remove-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}
</style>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 文件列表 | _UploadFileItem[]_ | `[]` |
| `accept` | 接受的文件类型，与原生属性一致 | _string_ | `image/*` |
| `capture` | 获取文件方式，与原生属性一致 | _string_ | `-` |
| `multiple` | 是否多选文件 | _boolean_ | `false` |
| `readonly` | 是否只读 | _boolean_ | `false` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `elevation`| 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级, 不为简单模式时生效 | _number \| boolean_|   `true`    |
| `show-remove-button` | 是否可以删除 | _boolean_ | `true` |
| `max-files` | 最大文件个数 | _string \| number_ | `-` |
| `max-file-size` | 最大文件大小，单位为 `byte` | _string \| number_ | `-` |
| `preview` | 是否允许预览 | _boolean_ | `true` |
| `prevent-default-preview` | 阻止默认预览行为 | _boolean_ | `false` |
| `ripple` | 是否开启水波纹 | _boolean_ | `true` |
| `show-file-list` | 是否显示文件列表 | _boolean_ | `true` |
| `resolve-type` | object-url: Blob URL; file: File only; data-url: Base64 URL | _UploadResolveType_ | `object-url` |

### 拦截钩子（Props，不是通知事件）

使用 `:before-add`、`:before-read`、`:before-remove` 传入函数。

| Prop | Signature |
| --- | --- |
| beforeAdd | `(files: File[]) => File[] / Promise<File[]>` |
| beforeRead | `(file: File) => boolean / File / Promise<boolean / File>` |
| beforeRemove | `(file: UploadFileItem, files: UploadFileItem[]) => boolean / Promise<boolean>` |

beforeRead 返回 false 或拒绝 Promise 时跳过文件；返回 File 时替换读取对象。beforeRemove 返回 true 才允许移除；拒绝 Promise 时不移除。

### UploadFileItem

手工创建列表项必须提供唯一字符串 uid、status、percent。object-url 由组件持有，移除列表项或卸载时释放；不要跨组件长期保存此临时 URL。Maple 不发起网络上传，应用负责更新上传过程状态。fit 是 Maple 的逐文件封面扩展。

| Field | Type |
| --- | --- |
| uid | string (required) |
| size | number (bytes) |
| type | string (MIME) |
| response / error | unknown |



| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `file` | 原生文件 | _File_ | `-` |
| `name` | 文件名 | _string_ | `-` |
| `url` | 文件地址 | _string_ | `-` |
| `thumbnailUrl` | 封面图 | _string_ | `-` |
| `fit` | 封面图填充模式，可选值为 `fill` `contain` `cover` `none` `scale-down` | _string_ | `-` |
| `status` | ready / reading / uploading / success / error / canceled / removed | _UploadStatus_ | `ready` |
| `percent` | 文件上传进度，范围 [0, 100] | _number_ | `-` |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `chooseFile` | 触发选择文件动作，显示文件列表 | `-` | `-` |
| `closePreview` | 关闭预览文件弹出层 | `-` | `-` |
| `getLoading` | 获取 `status` 等于 `uploading` 的文件集合| `-` | `UploadFileItem[]` |
| `getSuccess` | 获取 `status` 等于 `success` 的文件集合| `-` | `UploadFileItem[]` |
| `getError` |  获取 `status` 等于 `error` 的文件集合 | `-` | `UploadFileItem[]` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |


| `after-read` | 文件读取后触发 | `file: UploadFileItem` |
| `oversize` | 文件超过限制大小时触发 | `file: UploadFileItem` |

| `remove` | 文件删除时触发 | `file: UploadFileItem` |
| `preview` | 文件预览时触发 | `file: UploadFileItem` |
| `click-action`| 拦截上传按钮的点击行为 | `chooseFile: () => void, event: Event` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 上传按钮内容 | `-` |
| `remove-button` ***3.8.0*** | 删除按钮 | `remove: () => void` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--upload-action-background`            | `#f7f8fa`                                                                                    |
| `--upload-action-icon-color`            | `#888`                                                                                       |
| `--upload-action-icon-size`             | `24px`                                                                                       |
| `--upload-action-margin`                | `0 10px 10px 0`                                                                              |
| `--upload-file-size`                    | `80px`                                                                                       |
| `--upload-file-margin`                  | `0 10px 10px 0`                                                                              |
| `--upload-file-name-background`         | `#f7f8fa`                                                                                    |
| `--upload-file-name-color`              | `#888`                                                                                       |
| `--upload-file-name-font-size`          | `12px`                                                                                       |
| `--upload-file-name-padding`            | `10px`                                                                                       |
| `--upload-file-border-radius`            | `0`                                                                                       |
| `--upload-file-text-align`              | `center`                                                                                     |
| `--upload-file-close-background`        | `rgba(0, 0, 0, 0.3)`                                                                         |
| `--upload-file-close-size`              | `24px`                                                                                       |
| `--upload-file-close-icon-font-size`    | `14px`                                                                                       |
| `--upload-file-close-icon-color`        | `#fff`                                                                                       |
| `--upload-file-cover-fit`               | `thumbnailUrl`                                                                                      |
| `--upload-file-cover-background`        | `#f7f8fa`                                                                                    |
| `--upload-preview-video-width`          | `100vw`                                                                                      |
| `--upload-preview-video-height`         | `100vw`                                                                                      |
| `--upload-file-indicator-height`        | `4px`                                                                                        |
| `--upload-file-indicator-normal-color`  | `var(--color-disabled)`                                                                      |
| `--upload-file-indicator-success-color` | `var(--color-success)`                                                                       |
| `--upload-file-indicator-error-color`   | `var(--color-danger)`                                                                        |
| `--upload-file-progress-color`   | `var(--color-primary)`                                                                        |
| `--upload-disabled-color`               | `#ddd`                                                                                       |
| `--upload-disabled-text-color`          | `var(--color-text-disabled)`                                                                                       |
| `--upload-loading-background`           | `linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))` |
