# 文件上传

### 介绍

提供了文件读取、图片/视频预览能力。通过监听 `after-read` 事件获取文件上传服务器。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 文件预览

通过分析文件的 url 后缀名判断文件类型，支持图片和视频预览。

```demo
../example/demos/preview.vue
```

### 自定义预览

```demo
../example/demos/custom-preview.vue
```

### 上传状态

提供了 `loading`、 `success`、 `error` 三种上传状态，并提供了工具函数快速获取对应状态的文件。

```demo
../example/demos/state.vue
```

### 使用进度条

```demo
../example/demos/use-progress.vue
```

### 文件数量限制

```demo
../example/demos/max-files.vue
```

### 文件大小限制

超过限制会被阻止读取，可以通过监听 `oversize` 事件获取文件。

```demo
../example/demos/max-file-size.vue
```

### 文件列表过滤

通过 `before-add` 钩子过滤原生 `File[]`，返回新的 `File[]`（支持 Promise）。

```demo
../example/demos/before-add.vue
```

### 上传预处理

通过注册 `before-read` 钩子对文件进行操作，返回假值阻止文件读取。

```demo
../example/demos/before-read.vue
```

### 上传按钮点击事件

通过注册 `click-action` 事件可以拦截上传按钮的点击行为，通过回调中的 `chooseFile` 方法进行手动触发浏览器选择文件操作。

```demo
../example/demos/click-action.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

### 删除前处理

删除文件之前会触发 `before-remove` 钩子，返回假值阻止删除操作。

```demo
../example/demos/before-remove.vue
```

### 自定义上传样式



> 上传组件的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/style.vue
```

### 自定义渲染

通过 `show-file-list` 隐藏组件的文件列表，自定义文件列表的渲染逻辑。

```demo
../example/demos/custom-render.vue
```

### 自定义删除按钮

```demo
../example/demos/remove-button-slot.vue
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
