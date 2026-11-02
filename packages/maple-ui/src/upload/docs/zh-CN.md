# Upload 上传

读取、队列和请求采用两端独立复制的同源实现；未配置 action/custom-request 时仅读取，供业务自行管理进度与结果。

## 基础示例

### 只读取文件

```demo
../example/demos/read-only.vue
```

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 外观与状态

### 动态只读与禁用

预置本地合成图片，启用 readPrettyonly 与 disabled，比较预览、删除和选择入口的行为。选择按钮只记录 request-choose 次数，不打开文件框或发送请求。只读保留预览，禁用同时阻止预览；解除限制后可重新操作。恢复示例由父级更新模型。

```demo
../example/demos/state-controls.vue
```

### 所有队列状态

```demo
../example/demos/state.vue
```

### 交互状态对比

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于附件列表展示与本地选取。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 图卡、插槽与自定义预览

```demo
../example/demos/custom-surface.vue
```

### 自定义文件项

```demo
../example/demos/custom-render.vue
```

### 自定义删除按钮

```demo
../example/demos/remove-button-slot.vue
```

### 自定义选择按钮

```demo
../example/demos/style.vue
```

### 自定义预览

```demo
../example/demos/custom-preview.vue
```

### 图片和视频预览

```demo
../example/demos/preview.vue
```

## 文件来源与约束

### 目录选择与多文件回退

使用现有 addFiles 接入粘贴事件；移动端保留普通多选入口。本例只读取本地数据。

```demo
../example/demos/directory.vue
```

### 接管文件选择

```demo
../example/demos/click-action.vue
```

### 剪贴板图片与读取校验

```demo
../example/demos/clipboard.vue
```

### 替换后的约束校验

反向返回顺序：旧任务等待时重置并加入新文件，先点“返回最新缩略图”接受新项，再“拒绝最早缩略图”。旧失败只结清旧任务，不能再显示read-error、删除新项或增加解码数；最后重置清空列表和计数。这仍是本地回调竞争，不是原生读取器异常。

加入小图片前开启 FileReader/data-url 开关，接受的替换 File 会经过浏览器原生 FileReader。16px图片用于核对解码；Data URLs 是当前data-url项目数，Decoded images 是自上次重置以来累计load事件数。删除移除对应图片但不递减累计计数，重置清零两者；类型拒绝发生在读取前。使用本地生成File，不代表原生文件选择器或网络上传已验收。

开关仅影响后续新增项，不会重新读取既有项目；可按 file/data-url/file 顺序混合加入三项。满额后再加入会报告 max-files，图片和解码计数不变；删除 data-url 项后重新加入会读取新文件，累计解码数继续增加，重置清空整个混合队列。

```demo
../example/demos/replacement-validation.vue
```

### 批次筛选

```demo
../example/demos/before-add.vue
```

### 读取前确认

```demo
../example/demos/before-read.vue
```

### 文件大小与数量限制

分别选择超出大小和数量限制的本地文件，观察拒绝反馈；选择限制与请求前处理、上传队列是独立阶段。

```demo
../example/demos/selection-limits-comparison.vue
```

## 队列与进度

### 外部管理进度

可直接加入本地示例项观察 40% 的外部进度，再模拟完成。完成操作只更新仍在上传的项；取消项保持 canceled，已删除的项不会重新出现。外部托管模式隐藏内置请求重试按钮，使用“模拟外部重试”恢复取消或失败项，再由业务端完成。示例不发送网络请求。

```demo
../example/demos/external-state.vue
```

### 外部上传进度

```demo
../example/demos/use-progress.vue
```

### 手动队列和可取消请求

可直接“加入示例文件”，也可选择本地文件；两种方式均不访问网络。点击提交后观察进度，取消会停止活动请求，重试会重新上传。开启“首次请求失败”时，同一文件首次失败、重试成功。活动请求数在完成、取消、失败及离开 Demo 后清零。

```demo
../example/demos/queue-request.vue
```

## 异步钩子与请求

### 删除前确认

开启“手动异步确认”后忽略同步允许开关，删除等待“确认删除 / 取消删除”。同一文件等待时重复点击不会新增钩子；取消保留文件，等待中禁用后再确认也不会删除，解除禁用后需重新发起。计数核对列表、等待任务、钩子和 remove 通知；停用或卸载结清本地等待，不访问网络。

新增操作均不访问网络：“异常拒绝删除”拒绝本地Promise，文件保留且后续可重试；“替换同 UID 文件”生成新的本地File，旧删除确认不得移除替换项。“重置上传队列”调用公开reset，旧确认不再产生remove；“激活上传组件”通过KeepAlive停用/恢复Upload，等待任务保留在外层Demo用于手动返回，旧结果不得影响恢复后的实例。停用Upload不等于取消外部业务Promise；离开整个Demo才结清其本地等待。

```demo
../example/demos/before-remove.vue
```

### 上传前准备与取消竞争

取消后重试合计大小组合：双项进入准备后取消，再次提交会保留四个待返回任务（含两次已失效尝试）。统一返回时仍只启动一次有效请求；超限项保留取消前的原文件和 `canceled` 状态，不误算为新失败或自动恢复为 ready。删除成功项后可再次提交剩余项并成功；旧准备结果不占用额外容量。

合计大小组合：空队列选择“每项替换600B，合计上限1024B”，连续加入两个62B合成图片，再准备并统一完成。每项均满足单文件1024B限制，但两项替换后总量超限，因此只有一项发起本地请求，另一项保留ready原文件并报告max-total-size。删除成功项后，再准备剩余项可成功；重置清空队列、等待和请求计数。此处验证本地before-upload替换，不涉及原生文件选择或真实网络上传。

点击“准备并提交”后，`before-upload` 保持等待；重复提交不会重复创建同一尝试。取消准备后可以再次提交，再点击“完成准备”同时返回旧、新结果，只有当前有效尝试能发起请求。选择文本或超大图片替换时会再次检查类型和 1 KiB 大小限制，拒绝后保持 ready，可改为有效副本后重试。本示例使用公开 useUploader 和本地即时请求，不访问网络；重置、停用和卸载会释放等待任务。

```demo
../example/demos/prepare-request.vue
```

### 异步请求元数据

填写你控制的本地接收接口后，分别手动返回 headers 和 data，观察默认 XHR 的准备与取消。只返回一项时仍不发送；取消后再返回另一项不得启动请求。成功响应显示在示例下方，可由接收端核对 `X-Demo-Upload`、`auditMarker` 和 `attachment` 文件字段。接口地址默认留空，不预设外部上传服务；接收器必须允许文档站来源的 CORS。本例仅使用生成的合成文本，不选择真实文件。

使用“拒绝 headers / 拒绝 data”模拟准备失败，当前尝试只进入一次 error。可在另一项旧 Promise 未结清时重试，观察旧结果不会覆盖新尝试；取消后再拒绝不增加错误计数。返回/拒绝按钮会结清该类所有等待任务（包括旧尝试），便于验证竞争；重置会释放等待任务。准备失败不等同 HTTP 错误。

```demo
../example/demos/metadata-request.vue
```

### 请求句柄迟到与取消

本地模拟 custom-request 返回 Promise。取消后再返回旧句柄会立即调用其 abort；返回旧成功回调不会恢复已取消项。取消后再次发起、统一返回句柄和成功回调时，只接受当前尝试一次。计数展示回调是否被内核接受，不代表真实传输；本例不访问网络，重置/停用/卸载释放本地等待。

```demo
../example/demos/late-request.vue
```

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Props

| 属性                                                         | 类型                                                     | 默认值/说明                                       |
| ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------- |
| model-value / default-value                                  | UploadFileItem[]                                         | 受控值 / 非受控初值[]                             |
| accept / capture                                             | string / 原生capture                                     | 未指定                                            |
| multiple / directory / draggable                             | boolean                                                  | false                                             |
| disabled / readonly                                          | boolean                                                  | undefined，继承Form，显式false优先                |
| action / method                                              | string                                                   | 无 / post                                         |
| headers / data                                               | object 或 async(file) => object                          | 请求准备阶段仍可取消                              |
| name                                                         | string / (file) => string                                | file                                              |
| with-credentials                                             | boolean                                                  | false                                             |
| custom-request                                               | (UploadRequestOptions) => UploadRequest / Promise / void | 自定义transport，可返回abort                      |
| auto-upload                                                  | boolean                                                  | true；必须同时有action或custom-request才启动      |
| max-files / max-file-size / max-total-size                   | number                                                   | 未指定；大小单位字节，max-files>0生效             |
| resolve-type                                                 | file / data-url / object-url                             | object-url；所有文件生成url，图片生成thumbnailUrl |
| create-thumbnail-url                                         | (options) => string / Promise                            | 自定义URL归调用方所有，不自动回收                 |
| before-add                                                   | async(files) => File[]                                   | 批次筛选/替换                                     |
| before-read                                                  | async(file) => boolean / File                            | false/reject拒绝；替换后重新校验                  |
| before-upload                                                | async(item) => boolean / File / Blob                     | false/reject取消准备；替换后重新校验              |
| before-remove                                                | async(item,list) => boolean                              | false/reject不删除                                |
| is-success-response                                          | (xhr,item) => boolean                                    | 默认HTTP2xx                                       |
| request-choose                                               | (chooseFile,event) => void / Promise                     | 接管选择入口，异常不会自动打开文件框              |
| list-type                                                    | text / picture / picture-card                            | text，两端均支持                                  |
| image-fit                                                    | fill / contain / cover / none / scale-down               | cover；item.fit优先                               |
| preview                                                      | boolean                                                  | true                                              |
| show-file-list / show-upload-button / show-remove-button     | boolean                                                  | true                                              |
| show-retry-button / show-cancel-button / show-preview-button | boolean                                                  | true                                              |
| show-download-button                                         | boolean                                                  | false；禁用时不可操作                             |
| elevation / ripple                                           | boolean或number / boolean                                | false / true                                      |

UploadFileItem 的 uid、status、percent 必填，name/size/type/file/url/thumbnailUrl/fit/response/error 可选。status为ready/reading/uploading/success/error/canceled/removed。

### Events

- update:model-value(files)，change(files, changedFile?)：队列提议顺序，Form每次change仅一次。进度与状态更新也属于change。
- read(item)：读取完成，可自行接管业务上传；不是服务端成功。
- rejected(UploadRejectedFile[])：reason为accept/before-add/before-read/read-error/max-file-size/max-total-size/max-files。
- exceed(nativeFiles, acceptedList)：超过数量时通知。
- progress(item,event?)、success(item)、error(item)：当前有效请求通知；旧请求/取消回调不生效。
- remove(item)：通过删除钩子后的删除提议。
- preview(item, UploadPreviewEvent)：调用event.preventDefault()取消内建图片/视频预览；程序调用也可取消，originalEvent可选。

### Slots

- trigger({chooseFile,dragOver,disabled})：自定义选择入口。
- item({file,index,remove,retry,abort})：自定义整项。
- remove-button({file,index,remove,retry,abort})：自定义删除操作。

### Expose

chooseFile()、submit(file?)、abort(file?)、retry(file)、remove(file)、reset()、clearSuccess()、clearError()、getFiles(status?)、preview(file)、closePreview()。useUploader(options)提供同源无UI逻辑，另有addFiles(files)和input/drag处理接口。

### 受控与生命周期

受控父级拒绝新增时只发读取与列表提议，不自动上传；后续父级接受该uid才会自动上传一次。同tick提议事务合并，跨tick仍以实际父级列表为真源，拒绝项目不占总大小；父级负责迟到列表替换的一致性。显式remove未接受项、reset或卸载会释放其生成URL；任意外部URL不会被回收。内建预览保留自己的URL使用权至关闭，不关闭其他组件后来打开的预览。

取消覆盖before-upload、异步headers/data/name及异步custom-request句柄阶段；重试和外部同uid换File令旧回调失效。before-read和before-upload的替换会复查限制，max-total-size只累计已接受项及当前正在准备的合法批次/请求。禁用/只读禁止选择、移除、提交等更改；只读允许预览/下载。KeepAlive停用取消当前准备/请求，恢复后允许新操作。

## 类型定义

UploadProps、UploadEmits、UploadSlots、UploadExpose、UploadPublicMethods、UploadFileItem、UploadStatus、UploadListType、UploadResolveType、UploadImageFit、UploadCapture、UploadRejectedFile、UploadRejectedReason、UploadRequestOptions、UploadRequest、UploadCustomRequest、UploadProgressEvent、UploadData、UploadHeaders、UploadBeforeRead、UploadBeforeUpload、UploadBeforeRemove、UploadCreateThumbnailUrl、UploadIsSuccessResponse、UploadRequestChoose、UploadPreviewEvent、UseUploaderOptions、UploadInstance。

## 样式变量

两端公共后缀一致，所有默认值见下表（前缀分别为c/mp）。

| 变量                                     | 默认值                                    |
| ---------------------------------------- | ----------------------------------------- |
| --mp-upload-gap                          | var(--mp-sys-space-4)                     |
| --mp-upload-trigger-min-height           | var(--mp-sys-control-height-md)           |
| --mp-upload-trigger-padding-horizontal   | var(--mp-sys-space-6)                     |
| --mp-upload-trigger-draggable-min-height | calc(var(--mp-sys-control-height-md) * 2) |
| --mp-upload-card-size                    | calc(var(--mp-sys-control-height-md) * 2) |
| --mp-upload-item-min-height              | var(--mp-sys-control-height-md)           |
| --mp-upload-item-padding                 | var(--mp-sys-space-4)                     |
| --mp-upload-thumb-size                   | var(--mp-sys-control-height-lg)           |
| --mp-upload-border-radius                | var(--mp-sys-radius-md)                   |
| --mp-upload-border-color                 | var(--mp-sys-color-border-default)        |
| --mp-upload-background                   | var(--mp-sys-color-surface-default)       |
| --mp-upload-text-color                   | var(--mp-sys-color-content-primary)       |
| --mp-upload-secondary-text-color         | var(--mp-sys-color-content-secondary)     |
| --mp-upload-hover-background             | var(--mp-sys-color-state-hover)           |
| --mp-upload-active-color                 | var(--mp-sys-color-action-primary)        |
| --mp-upload-error-color                  | var(--mp-sys-color-content-danger)        |
| --mp-upload-action-size                  | var(--mp-sys-control-touch-target)        |
| --mp-upload-progress-height              | var(--mp-sys-space-2)                     |
| --mp-upload-disabled-opacity             | .56                                       |
| --mp-upload-font-size                    | var(--mp-sys-font-size-md)                |

### Form 字段展示与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `direct`，保留直接编辑。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

附件确认提交的是文件列表关系，无法撤销已经发生的远程上传或永久删除；需要延迟网络副作用时配置 `auto-upload="false"`，由业务在最终提交后执行上传。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 覆盖已有附件与视频时长

`reupload` 默认 `false`。开启后，每个附件显示「替换」按钮；达到 `max-files` 后仍可替换已有项。也可调用 `replace(file, replacement?)`：未传 replacement 时选择一个文件，传入 `File` 时直接校验并提出替换。替换选择器不支持多选，且遵守 request-choose、disabled 与 readonly。

新文件先经过 before-add、before-read、accept、单文件/总大小与数量校验，再经过 before-remove。数量和总大小计算扣除被替换项。取消文件选择、校验失败、守卫拒绝或目标已被外部移除时保留原项。通过后以新 UID 原位替换并发出 `replace(next, previous)` 和 `change`，不发出 remove，也不请求删除服务器资源。受控父级决定是否接纳；接纳后旧上传回调失效。此后新上传失败会显示失败状态，可重试，不会自动恢复旧文件。

`UploadFileItem.duration?: number` 使用秒，有限且非负时显示为 `mm:ss` 或 `h:mm:ss`；0 显示 `00:00`，未知/无效值不显示。本地视频会尝试读取元数据（最多 5 秒），成功、错误、中止和卸载都会清理临时 URL、监听及定时器。远端回显记录可直接传 duration，不会为读时长主动请求远端视频。文本列表显示时长文字，图片布局显示角标。

| 新增入口                    | 类型 / 默认                                              |
| --------------------------- | -------------------------------------------------------- |
| reupload                    | boolean / false                                          |
| replace(file, replacement?) | `Promise<void>`；方法，不代表远程上传已成功              |
| replace 事件                | next: UploadFileItem, previous: UploadFileItem；模型提案 |
| item 插槽 replace           | () => void；打开当前项替换选择器                         |
| duration                    | UploadFileItem 的可选秒数                                |

示例的完整表单使用 data-url 保留本地附件草稿，切换弹层时不依赖临时 object URL。生产上传成功后应由业务写入服务器 URL；object-url 的生命周期仍由创建它的组件与预览引用管理。

| 样式变量                          | 默认值                                        |
| --------------------------------- | --------------------------------------------- |
| `--mp-upload-duration-background` | `var(--mp-sys-color-surface-tooltip)`         |
| `--mp-upload-duration-color`      | `var(--mp-sys-color-content-on-dark)`         |
| `--mp-upload-duration-radius`     | `var(--mp-sys-radius-sm)`                     |
| `--mp-upload-duration-padding`    | `var(--mp-sys-space-1) var(--mp-sys-space-2)` |
| `--mp-upload-duration-font-size`  | `var(--mp-sys-font-size-sm)`                  |

### 守卫等待反馈

before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。不同文件保持并发，加载反馈汇总所有当前守卫任务，不把普通 change/progress 事件当成任务。

`useUploader()` 新增只读 `guardPending`，汇总当前 before 钩子的等待状态；它不代表文件上传进度。
