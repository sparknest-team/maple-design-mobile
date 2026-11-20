# Upload 上传

通过点击或拖拽选择文件，支持图片列表、预览和受控上传。示例默认使用本地文件与模拟请求。

## 基础示例

### 基础用法

选择一个或多个本地文件，列表会随添加和删除更新。未配置 action / custom-request 时仅读取文件，不发送请求。

```demo
../example/demos/read-only.vue
```

### 列表展示方式

切换 text、picture 和 picture-card，对比同一份文件列表的三种布局。添加或删除文件后再切换，已选文件保持不变。

```demo
../example/demos/list-type.vue
```

### 上传入口位置

切换上传入口位于文件列表之前或之后，再对比三种列表类型。默认入口位于列表之后；切换入口位置时，已选文件和文件顺序保持不变。

```demo
../example/demos/trigger-position.vue
```

## 选择与校验

### 拖拽上传

点击区域选择图片，或将图片拖入区域；添加后点击缩略图预览。触屏设备可使用点击选择。

```demo
../example/demos/draggable-picture.vue
```

### 文件类型、数量与大小

仅接受图片，最多 3 张、每张不超过 2 MiB。拒绝时显示原因；满额后删除一张即可继续添加。

```demo
../example/demos/picture-limits.vue
```

### 单文件与替换

设置 max-files="1" 与 reupload，点击文件上的替换按钮更换图片。替换成功后仍只有一个文件。

```demo
../example/demos/replacement.vue
```

### 选择文件夹

选择文件夹后查看其中的文件；普通多选入口用于不支持文件夹选择的浏览器或移动设备。

```demo
../example/demos/directory.vue
```

## 预览与状态

### 图片与视频预览

预置图片可直接预览；选择本地视频后点击缩略图播放。关闭预览开关可禁止内置预览。

```demo
../example/demos/preview.vue
```

### 只读、禁用与纯阅读

在同一份数据上切换可编辑、只读、禁用和纯阅读。只读保留预览，禁用阻止交互；纯阅读展示文件值而不显示上传编辑器。

```demo
../example/demos/states.vue
```

### 自定义入口与预览

用 trigger 和 remove-button 插槽定制入口与删除操作，通过 preview 事件打开自定义预览 Dialog。

```demo
../example/demos/custom-surface.vue
```

## 上传流程

### 手动上传、进度与重试

选择文件或加入示例文件，再点击开始上传。上传中可取消；开启模拟失败后，首次失败可通过重试恢复。本例使用本地定时器模拟请求。

```demo
../example/demos/manual-upload.vue
```

### 删除前确认

点击删除先打开确认框，取消会保留文件，确认后才从列表移除。

```demo
../example/demos/remove-confirm.vue
```

### 由业务管理上传状态

通过 read 事件接管进度和结果。加入示例文件、模拟完成，观察受控列表变化；本例不使用内置请求。

```demo
../example/demos/external-state.vue
```

## 业务组合

### 外置上传按钮

隐藏内置入口，由外部按钮调用 chooseFile()。切换按钮位于列表之前或之后，不改变文件列表。

```demo
../example/demos/external-trigger.vue
```

### Dialog 中上传

点击按钮打开 Dialog，在弹窗内选择或拖入图片并预览。关闭后保留已选文件，再次打开可以继续操作。

```demo
../example/demos/dialog-upload.vue
```

### 接入剪贴板图片

将图片粘贴到输入区域，通过 useUploader.addFiles 复用文件读取与校验；普通文本仍按原生输入处理。

```demo
../example/demos/clipboard.vue
```

## 使用说明

### 文件选择与设备支持

选择照片时设置 `accept="image/*"`；不设置 `capture` 或设置 `:capture="false"` 可保留系统文件 / 相册入口。仅在需要直接拍照时使用 `capture`，具体可用入口由设备和浏览器决定。

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

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


### 异步操作反馈

before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。不同文件保持并发，加载反馈汇总所有当前守卫任务，不把普通 change/progress 事件当成任务。

`useUploader()` 提供只读 `guardPending`，汇总当前 before 钩子的等待状态；它不代表文件上传进度。

禁用或只读状态下调用 `reset()` 不执行重置，也不会清除仍未完成的钩子等待状态。 已被 reset、停用或卸载取消的 `beforeAdd` 迟到异常不会再发出拒绝通知；若异常在禁用或只读期间返回，也不会发出拒绝通知。 若 `rejected` 或 `exceed` 回调同步重置，当前批次不再继续提交已准备的文件。 若列表更新、change 或 read 回调同步重置，已失效操作的后续通知将停止。

使用字段确认模式时，文件准备或 before 钩子尚未完成期间不能确认；关闭编辑器仍可取消当前编辑。

### 准备否决与异常

`beforeUpload` 返回 `false` 或兑现为 `false` 属于业务否决：不发起请求，文件保持 `ready`，不触发 `error` 或 `rejected`。同步抛错或 Promise 拒绝属于准备异常：不发起请求，文件变为 `error`，通过已有 `error(item)` 事件报告一次，原始原因保存在 `item.error`。该事件覆盖准备和传输失败，并不代表已经发送 HTTP 请求。两种结果都允许后续以合法守卫结果重新提交；普通通知返回的 Promise 不延长准备任务，旧尝试或取消后的异常不得报告为新错误。
### 配置说明

通过 `trigger-position="before"` 或 `trigger-position="after"` 将内置上传入口放在文件列表之前或之后，默认 after。该配置同样适用于 `trigger` 插槽和拖拽入口；前后表示 DOM 顺序，不因 RTL 改写。完全外置的按钮仍可设置 `:show-upload-button="false"`，再调用实例方法 `chooseFile()`。

两端公共后缀一致，所有默认值见下表（前缀分别为c/mp）。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Upload Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| model-value | `UploadFileItem[] \| null` | `undefined` | 受控文件列表，配合 v-model 使用 |
| default-value | `UploadFileItem[]` | `[]` | 非受控文件列表的初始值 |
| accept | `string` | `undefined` | 允许选择的文件类型，例如 image/* |
| capture | `boolean \| 'user' \| 'environment'` | `false` | false 或未设置时保留相册选择；true 启用采集，user / environment 指定前 / 后摄像头，具体支持由设备和浏览器决定 |
| multiple | `boolean` | `false` | 允许多选文件 |
| reupload | `boolean` | `false` | 允许替换已选择的文件 |
| directory | `boolean` | `false` | 选择文件夹；不支持的设备可使用 multiple 作为回退 |
| draggable | `boolean` | `false` | 启用拖拽上传 |
| disabled | `boolean` | `undefined` | 禁用交互；继承 Form，显式 false 优先 |
| readonly | `boolean` | `undefined` | 只读；继承 Form，显式 false 优先 |
| read-pretty | `boolean` | `undefined` | 纯阅读模式：隐藏上传编辑器并展示字段值；继承 FormItem / Form，显式 false 覆盖父级，未配置时最终为 false |
| action | `string` | `undefined` | 上传请求地址 |
| method | `string` | `'post'` | 上传请求方法 |
| headers | `UploadHeaders` | `undefined` | 请求头对象或异步函数；请求准备阶段仍可取消 |
| data | `UploadData` | `undefined` | 附加请求数据对象或异步函数；请求准备阶段仍可取消 |
| name | `string \| ((file: UploadFileItem) => string)` | `'file'` | 上传文件的表单字段名 |
| with-credentials | `boolean` | `false` | 跨域请求是否携带凭据 |
| custom-request | `UploadCustomRequest` | `undefined` | 自定义上传请求，可返回含 abort 的对象 |
| auto-upload | `boolean` | `true` | 选取后自动上传；必须同时配置 action 或 custom-request |
| max-files | `number` | `undefined` | 最多文件数量；大于 0 时生效 |
| max-file-size | `number` | `undefined` | 单个文件的大小上限，单位字节 |
| max-total-size | `number` | `undefined` | 文件总大小上限，单位字节 |
| resolve-type | `'file' \| 'data-url' \| 'object-url'` | `'object-url'` | 文件读取方式；object-url 为文件生成 url，为图片生成 thumbnailUrl |
| create-thumbnail-url | `UploadCreateThumbnailUrl` | `undefined` | 自定义缩略图地址；URL 归调用方所有，组件不自动回收 |
| before-add | `(files: File[]) => File[] \| Promise<File[]>` | `undefined` | 批次筛选或替换待添加文件 |
| before-read | `UploadBeforeRead` | `undefined` | 读取前校验；false / reject 拒绝，替换后重新校验 |
| before-upload | `UploadBeforeUpload` | `undefined` | 上传前校验；false 保留 ready，抛错 / reject 进入 error，替换后重新校验 |
| before-remove | `UploadBeforeRemove` | `undefined` | 删除前校验；false / reject 阻止删除 |
| is-success-response | `UploadIsSuccessResponse` | `undefined` | 自定义响应成功判断；默认 HTTP 2xx 为成功 |
| request-choose | `UploadRequestChoose` | `undefined` | 接管选择入口；异常不会自动打开文件框 |
| list-type | `'text' \| 'picture' \| 'picture-card'` | `'text'` | 文件列表展示方式；两端均支持 |
| initial-trigger-interactive | `boolean` | `false` | 自定义触发插槽在首屏提供交互控件。挂载后由 Upload 检查实际内容。 |
| trigger-position | `'before' \| 'after'` | `'after'` | 上传入口在文件列表之前或之后；适用于所有 list-type、自定义 trigger 插槽和拖拽入口；前后按 DOM 顺序解释，不因 RTL 改写 |
| image-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` | 缩略图填充方式；文件项 fit 优先 |
| preview | `boolean` | `true` | 启用内建图片 / 视频预览 |
| show-file-list | `boolean` | `true` | 显示文件列表 |
| show-upload-button | `boolean` | `true` | 显示文件选择按钮 |
| show-remove-button | `boolean` | `true` | 显示删除按钮 |
| show-retry-button | `boolean` | `true` | 显示重试按钮 |
| show-cancel-button | `boolean` | `true` | 显示取消按钮 |
| show-preview-button | `boolean` | `true` | 显示预览按钮 |
| show-download-button | `boolean` | `false` | 显示下载按钮；禁用时不可操作 |
| elevation | `boolean \| number` | `false` | 上传入口的阴影层级 |
| ripple | `boolean` | `true` | 启用上传入口的涟漪效果 |

UploadFileItem 的 uid、status、percent 必填，name/size/type/file/url/thumbnailUrl/fit/response/error 可选。status为ready/reading/uploading/success/error/canceled/removed。

### Upload Events

- update:model-value(files)，change(files, changedFile?)：队列提议顺序，Form每次change仅一次。进度与状态更新也属于change。
- read(item)：读取完成，可自行接管业务上传；不是服务端成功。
- rejected(UploadRejectedFile[])：reason为accept/before-add/before-read/read-error/max-file-size/max-total-size/max-files。
- exceed(nativeFiles, acceptedList)：超过数量时通知。
- progress(item,event?)、success(item)、error(item)：当前有效请求通知；旧请求/取消回调不生效。
- remove(item)：通过删除钩子后的删除提议。
- preview(item, UploadPreviewEvent)：调用event.preventDefault()取消内建图片/视频预览；程序调用也可取消，originalEvent可选。

### Upload Slots

- trigger({chooseFile,dragOver,disabled,describedBy})：自定义选择入口。

如果 `trigger` 插槽在服务端首屏渲染可见按钮，请在 Upload 上设置 `initial-trigger-interactive`，由插槽内的按钮提供键盘入口。插槽为文字或纯展示内容时省略此属性，由外层提供入口。接管后，Upload 按实际渲染的控件及其可见性调整。视口尺寸、减少动态效果、明暗配色或强制颜色设置变化时，会重新检查触发控件。

纯展示内容由外层提供按钮角色和 Enter/Space 入口；包含按钮、链接等交互内容时，外层不再增加按钮角色或 Tab 停靠点。自定义按钮应绑定插槽的 disabled，并负责自己的键盘行为。 需要将表单错误及 Upload 的 aria-describedby 关联到该按钮时，可将插槽的 describedBy 绑定到按钮的 aria-describedby；它随错误出现和清除更新。点击时直接调用 chooseFile 即可，无需 .stop；同次点击的冒泡不会再次选择，也不会额外调用 requestChoose。依赖默认冒泡的自定义按钮仍可使用 requestChoose。

```vue
<mp-upload aria-describedby="upload-hint">
  <template #trigger="{ chooseFile, disabled, describedBy }">
    <button type="button" :disabled="disabled" :aria-describedby="describedBy" @click="chooseFile">选择文件</button>
  </template>
</mp-upload>
<p id="upload-hint">请选择文件</p>
```

异步选择判断请使用 requestChoose，或先同步 event.preventDefault() 取消默认选择，再自行等待并调用 chooseFile；普通点击事件的 Promise 不会被收集。requestChoose 收到的选择回调每次操作至多执行一次，卸载或 KeepAlive 停用后的旧回调不会在重开时恢复。
- item({file,index,remove,retry,abort,replace})：自定义整项。
- remove-button({file,index,remove,retry,abort,replace})：自定义删除操作。
- read({value,text})：字段阅读内容；value 为文件模型或 null，text 为格式化文字，与读取完成的 read 事件不同。

### Upload Methods

提供 chooseFile()、replace(file,replacement?)、submit(file?)、abort(file?)、retry(file)、remove(file)、reset()、clearSuccess()、clearError()、getFiles(status?)、preview(file)、closePreview()。useUploader(options) 提供不含界面的上传逻辑，以及 addFiles(files) 和输入、拖放处理接口。

chooseFile、replace、submit、retry、remove 返回 `Promise<void>`，保留各自准备阶段的等待；submit/retry 等待准备钩子和请求工厂创建，不承诺网络传输结束，结果由 success/error 事件报告。chooseFile 的完成不表示用户已选完文件；remove 完成也不表示受控父级已接受删除提议。item/remove-button 的 remove、retry、replace 以及 trigger 的 chooseFile 保留相同 Promise 类型。

所有公开方法在编辑器首次挂载前即保持可调用。未挂载、已关闭或停用时，getFiles(status?) 返回已接受模型的浅拷贝快照并按状态筛选；异步修改命令以空操作完成，同步修改命令为空操作。需要执行时，先通过字段交互或受控 open 打开编辑器并等待挂载，或使用 editMode="direct"。保存的方法引用在关闭/重开后转发到当前实例，编辑器取消会保留已接受模型。

### 受控与生命周期

受控父级拒绝新增时只发读取与列表提议，不自动上传；后续父级接受该uid才会自动上传一次。同tick提议事务合并，跨tick仍以实际父级列表为真源，拒绝项目不占总大小；父级负责迟到列表替换的一致性。显式remove未接受项、reset或卸载会释放其生成URL；任意外部URL不会被回收。内建预览保留自己的URL使用权至关闭，不关闭其他组件后来打开的预览。

取消覆盖before-upload、异步headers/data/name及异步custom-request句柄阶段；重试和外部同uid换File令旧回调失效。before-read和before-upload的替换会复查限制，max-total-size只累计已接受项及当前正在准备的合法批次/请求。禁用/只读禁止选择、移除、提交等更改；只读允许预览/下载。KeepAlive停用取消当前准备/请求，恢复后允许新操作。

## Types

UploadProps、UploadEmits、UploadSlots、UploadExpose、UploadPublicMethods、UploadFileItem、UploadStatus、UploadListType、UploadTriggerPosition、UploadResolveType、UploadImageFit、UploadCapture、UploadRejectedFile、UploadRejectedReason、UploadRequestOptions、UploadRequest、UploadCustomRequest、UploadProgressEvent、UploadData、UploadHeaders、UploadBeforeRead、UploadBeforeUpload、UploadBeforeRemove、UploadCreateThumbnailUrl、UploadIsSuccessResponse、UploadRequestChoose、UploadPreviewEvent、UseUploaderOptions、UploadInstance。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-upload-action-size` | `var(--mp-sys-control-touch-target)` | `height`, `width` |
| `--mp-upload-active-color` | `var(--mp-sys-color-action-primary)` | `accent-color`, `border-color`, `outline` |
| `--mp-upload-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-upload-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-upload-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-upload-card-size` | `calc(var(--mp-sys-control-height-md) * 2)` | `height`, `min-height`, `width` |
| `--mp-upload-disabled-opacity` | `0.56` | `opacity` |
| `--mp-upload-duration-background` | `var(--mp-sys-color-surface-tooltip)` | `background` |
| `--mp-upload-duration-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-upload-duration-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-upload-duration-padding` | `var(--mp-sys-space-1) var(--mp-sys-space-2)` | `padding` |
| `--mp-upload-duration-radius` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-upload-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-upload-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-upload-gap` | `var(--mp-sys-space-4)` | `gap` |
| `--mp-upload-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-upload-item-min-height` | `var(--mp-sys-control-height-md)` | `min-height` |
| `--mp-upload-item-padding` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-upload-progress-height` | `var(--mp-sys-space-2)` | `height` |
| `--mp-upload-secondary-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-upload-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-upload-thumb-size` | `var(--mp-sys-control-height-lg)` | `height`, `width` |
| `--mp-upload-trigger-draggable-min-height` | `calc(var(--mp-sys-control-height-md) * 2)` | `min-height` |
| `--mp-upload-trigger-min-height` | `var(--mp-sys-control-height-md)` | `min-height` |
| `--mp-upload-trigger-padding-horizontal` | `var(--mp-sys-space-6)` | `padding-inline` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-upload-action-size: var(--mp-sys-control-touch-target);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
