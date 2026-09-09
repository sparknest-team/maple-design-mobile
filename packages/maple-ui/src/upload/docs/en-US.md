# Upload

### Intro

It provides the ability to read files and preview pictures and videos.
Get the file upload server by listening for `after-read` events.

### Basic Usage

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

### File Preview

By analyzing the file URL suffix name to determine the file type, support image and video preview.

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

### Custom Preview

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
    title: 'Custom Preview',
    message: file.url.slice(0, 100),
  })
}
</script>

<template>
  <mp-upload v-model="files" prevent-default-preview @preview="handlePreview"/>
</template>
```

### Upload State

Three uploading states, `loading`, `success` and `error`, are provided, and tool functions are provided to quickly obtain files with corresponding states.

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

### Use Progress

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

### File Maxlength

```html
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <mp-upload v-model="files" :max-files="1"/>
</template>
```

### File Size Limit

If the limit is exceeded, the file will be blocked. You can get the file by listening for the `oversize` event.

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const files = ref([])
</script>

<template>
  <mp-upload v-model="files" :max-file-size="1024" @oversize="Message.warning('file size exceeds limit')" />
</template>
```

### File List Filter

Use the beforeAdd prop to filter native File[] before reading; return File[] or Promise<File[]>.

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

### Upload Preprocessing

Operate on a file by registering the beforeRead prop that returns a false value to prevent the file from being read.

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const files = ref([])

function handleBeforeRead(file) {
  if (file.size <= 1 * 1024 * 1024) {
    Message.success('the file is less than 1M, the upload is successful')
    return true
  } else {
    Message.warning('the file is larger than 1M and cannot be uploaded')
    return false
  }
}
</script>

<template>
  <mp-upload v-model="files" :before-read="handleBeforeRead"/>
</template>
```

### Upload Button Click Event

By listen the `click-action` event, you can intercept the click behavior of the upload button, and manually trigger the browser to select the file through the `chooseFile` method in the callback.

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

### Disabled

```html
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <mp-upload disabled v-model="files"/>
</template>
```

### Readonly

```html
<script setup>
import { ref } from 'vue'

const files = ref([])
</script>

<template>
  <mp-upload readonly v-model="files"/>
</template>
```

### Remove Preprocessing

Before deleting the file, the beforeRemove prop is triggered, and a falsy value is returned to prevent the delete operation.

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
    title: 'Delete or not?',
    message: 'Cannot be withdrawn after deletion'
  })

  return action === 'confirm'
}
</script>

<template>
  <mp-upload v-model="files" :before-remove="handleBeforeRemove" />
</template>
```

### Customize Upload Styles

```html
<script setup>
import { ref } from 'vue'

const files = ref()
</script>

<template>
  <mp-upload v-model="files">
    <mp-button status="primary">Upload</mp-button>
  </mp-upload>
</template>
```

> For form validation of the upload, please use the [FormItem component](#/en-US/form-item).

### Custom Render File List

You can use the `show-file-list` to hide component files list, then you can render this list by custom.

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

### Custom Remove Button

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

### Props

| Prop | Description | Type | Default |
| --- | ----------------------------------------------------------------------- | --- | --- |
| `v-model`  | File list | _UploadFileItem[]_ | `[]` |
| `accept`   | Accepted file type, consistent with the native attribute | _string_ | `image/*` |
| `capture`  | Get the file, the same as the native property | _string_ | `-` |
| `multiple` | Whether to select multiple files | _boolean_ | `false` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `elevation`| Elevation level, options `true` `false` and level of `0-24`, not in simple mode | _number \| boolean_|  `true` |
| `show-remove-button` | Whether the showRemoveButton | _boolean_ | `true` |
| `max-files` | Maximum number of files | _string \| number_ | `-` |
| `max-file-size`   | Maximum file size, the unit is `byte` | _string \| number_ | `-` |
| `preview` | Whether to allow preview | _boolean_ | `true` |
| `prevent-default-preview` | Prevent default preview behavior | _boolean_ | `false` |
| `ripple`    | Whether to open ripple | _boolean_ | `true` |
| `show-file-list` | Whether to show the file list | _boolean_ | `true` |
| `resolve-type` | object-url: Blob URL; file: File only; data-url: Base64 URL | _UploadResolveType_ | `object-url` |

### Interceptor props (not notification events)

Pass functions using `:before-add`, `:before-read`, and `:before-remove`.

| Prop | Signature |
| --- | --- |
| beforeAdd | `(files: File[]) => File[] / Promise<File[]>` |
| beforeRead | `(file: File) => boolean / File / Promise<boolean / File>` |
| beforeRemove | `(file: UploadFileItem, files: UploadFileItem[]) => boolean / Promise<boolean>` |

beforeRead returning false or rejecting skips the file; a returned File replaces the source. beforeRemove must resolve true to remove a file.

### UploadFileItem

Manually created items require a unique string uid, status and percent. Object URLs belong to the component and are revoked when items are removed or the component unmounts. Maple does not send network requests; the application updates upload state. Per-file fit is a Maple extension.

| Field | Type |
| --- | --- |
| uid | string (required) |
| size | number (bytes) |
| type | string (MIME) |
| response / error | unknown |



| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `file` | Native file | _File_ | `-` |
| `name` | File name | _string_ | `-` |
| `url` | File url | _string_ | `-` |
| `thumbnailUrl` | File cover image | _string_ | `-` |
| `fit` | Cover image fill mode, Optional value is `fill` `contain` `cover` `none` `scale-down` | _string_ | `-` |
| `status` | ready / reading / uploading / success / error / canceled / removed | _UploadStatus_ | `ready` |
| `percent` | Progress 0–100 | _number_ | `0` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `chooseFile` | Trigger the file selection action and display the file list | `-` | `-` |
| `closePreview` | Close preview file popup | `-` | `-` |
| `getLoading` | Gets a collection of files for `status` is `uploading` | `-` | `UploadFileItem[]` |
| `getSuccess` | Gets a collection of files for `status` is `success` | `-` | `UploadFileItem[]` |
| `getError` |  Gets a collection of files for `status` is `error` | `-` | `UploadFileItem[]` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |


| `after-read` | Triggered after the file is read | `file: UploadFileItem` |
| `oversize` | Triggered when the file size limit is exceeded | `file: UploadFileItem` |

| `remove` | Triggered when deleting a file. There is a true value to prevent deleting a file (support promise) | `file: UploadFileItem` |
| `preview` | Triggered when a file is preview | `file: UploadFileItem` |
| `click-action`| Intercept click behavior of upload button | `chooseFile: () => void, event: Event` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Upload action content | `-` |
| `remove-button` ***3.8.0*** | Remove button | `remove: () => void` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
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
| `--upload-disabled-color`               | `#ddd`              |
| `--upload-disabled-text-color`          | `var(--color-text-disabled)`      |
| `--upload-loading-background`           | `linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))` |
