# Upload 上传

读取、队列和请求采用两端独立复制的同源实现；未配置 action/custom-request 时仅读取，供业务自行管理进度与结果。

## 案例

### 只读取文件

<demo src="../example/demos/read-only.vue"></demo>

### 手动队列和可取消请求

可直接“加入示例文件”，也可选择本地文件；两种方式均不访问网络。点击提交后观察进度，取消会停止活动请求，重试会重新上传。开启“首次请求失败”时，同一文件首次失败、重试成功。活动请求数在完成、取消、失败及离开 Demo 后清零。

<demo src="../example/demos/queue-request.vue"></demo>

### 替换后的约束校验

<demo src="../example/demos/replacement-validation.vue"></demo>

### 图卡、插槽与自定义预览

<demo src="../example/demos/custom-surface.vue"></demo>

### 外部管理进度

<demo src="../example/demos/external-state.vue"></demo>

### 基本使用

<demo src="../example/demos/basic-usage.vue"></demo>

### 批次筛选

<demo src="../example/demos/before-add.vue"></demo>

### 读取前确认

<demo src="../example/demos/before-read.vue"></demo>

### 删除前确认

<demo src="../example/demos/before-remove.vue"></demo>

### 接管文件选择

<demo src="../example/demos/click-action.vue"></demo>

### 自定义预览

<demo src="../example/demos/custom-preview.vue"></demo>

### 自定义文件项

<demo src="../example/demos/custom-render.vue"></demo>

### 禁用

<demo src="../example/demos/disabled.vue"></demo>

### 单文件大小限制

<demo src="../example/demos/max-file-size.vue"></demo>

### 文件数量限制

<demo src="../example/demos/max-files.vue"></demo>

### 图片和视频预览

<demo src="../example/demos/preview.vue"></demo>

### 只读

<demo src="../example/demos/readonly.vue"></demo>

### 自定义删除按钮

<demo src="../example/demos/remove-button-slot.vue"></demo>

### 所有队列状态

<demo src="../example/demos/state.vue"></demo>

### 自定义选择按钮

<demo src="../example/demos/style.vue"></demo>

### 外部上传进度

<demo src="../example/demos/use-progress.vue"></demo>

## API

### Props

| 属性 | 类型 | 默认值/说明 |
| --- | --- | --- |
| model-value / default-value | UploadFileItem[] | 受控值 / 非受控初值[] |
| accept / capture | string / 原生capture | 未指定 |
| multiple / directory / draggable | boolean | false |
| disabled / readonly | boolean | undefined，继承Form，显式false优先 |
| action / method | string | 无 / post |
| headers / data | object 或 async(file) => object | 请求准备阶段仍可取消 |
| name | string / (file) => string | file |
| with-credentials | boolean | false |
| custom-request | (UploadRequestOptions) => UploadRequest / Promise / void | 自定义transport，可返回abort |
| auto-upload | boolean | true；必须同时有action或custom-request才启动 |
| max-files / max-file-size / max-total-size | number | 未指定；大小单位字节，max-files>0生效 |
| resolve-type | file / data-url / object-url | object-url；所有文件生成url，图片生成thumbnailUrl |
| create-thumbnail-url | (options) => string / Promise | 自定义URL归调用方所有，不自动回收 |
| before-add | async(files) => File[] | 批次筛选/替换 |
| before-read | async(file) => boolean / File | false/reject拒绝；替换后重新校验 |
| before-upload | async(item) => boolean / File / Blob | false/reject取消准备；替换后重新校验 |
| before-remove | async(item,list) => boolean | false/reject不删除 |
| is-success-response | (xhr,item) => boolean | 默认HTTP2xx |
| request-choose | (chooseFile,event) => void / Promise | 接管选择入口，异常不会自动打开文件框 |
| list-type | text / picture / picture-card | text，两端均支持 |
| image-fit | fill / contain / cover / none / scale-down | cover；item.fit优先 |
| preview | boolean | true |
| show-file-list / show-upload-button / show-remove-button | boolean | true |
| show-retry-button / show-cancel-button / show-preview-button | boolean | true |
| show-download-button | boolean | false；禁用时不可操作 |
| elevation / ripple | boolean或number / boolean | false / true |

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

| 变量 | 默认值 |
| --- | --- |
| --mp-upload-gap | var(--mp-sys-space-4) |
| --mp-upload-trigger-min-height | var(--mp-sys-control-height-md) |
| --mp-upload-trigger-padding-horizontal | var(--mp-sys-space-6) |
| --mp-upload-trigger-draggable-min-height | calc(var(--mp-sys-control-height-md) * 2) |
| --mp-upload-card-size | calc(var(--mp-sys-control-height-md) * 2) |
| --mp-upload-item-min-height | var(--mp-sys-control-height-md) |
| --mp-upload-item-padding | var(--mp-sys-space-4) |
| --mp-upload-thumb-size | var(--mp-sys-control-height-lg) |
| --mp-upload-border-radius | var(--mp-sys-radius-md) |
| --mp-upload-border-color | var(--mp-sys-color-border-default) |
| --mp-upload-background | var(--mp-sys-color-surface-default) |
| --mp-upload-text-color | var(--mp-sys-color-content-primary) |
| --mp-upload-secondary-text-color | var(--mp-sys-color-content-secondary) |
| --mp-upload-hover-background | var(--mp-sys-color-state-hover) |
| --mp-upload-active-color | var(--mp-sys-color-action-primary) |
| --mp-upload-error-color | var(--mp-sys-color-content-danger) |
| --mp-upload-action-size | var(--mp-sys-control-touch-target) |
| --mp-upload-progress-height | var(--mp-sys-space-2) |
| --mp-upload-disabled-opacity | .56 |
| --mp-upload-font-size | var(--mp-sys-font-size-md) |
