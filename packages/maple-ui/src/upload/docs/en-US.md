# Upload

Both libraries maintain independent copies of the upload queue, file reader and request core. Without action/custom-request, reading only creates ready items for application-managed uploads.

## Examples

### read-only

<demo src="../example/demos/en-US/read-only.vue"></demo>

### queue-request

Add a generated example file or choose a local file; neither sends a network request. Submit manually, observe progress, cancel, and retry. Enable the first-attempt failure option to exercise error recovery. Active requests return to zero after completion, cancellation, failure, or leaving the demo.

<demo src="../example/demos/en-US/queue-request.vue"></demo>

### replacement-validation

<demo src="../example/demos/en-US/replacement-validation.vue"></demo>

### custom-surface

<demo src="../example/demos/en-US/custom-surface.vue"></demo>

### external-state

<demo src="../example/demos/en-US/external-state.vue"></demo>

### Basic usage

<demo src="../example/demos/en-US/basic-usage.vue"></demo>

### Batch filtering

<demo src="../example/demos/en-US/before-add.vue"></demo>

### Before reading

<demo src="../example/demos/en-US/before-read.vue"></demo>

### Before removing

<demo src="../example/demos/en-US/before-remove.vue"></demo>

### Custom file chooser

<demo src="../example/demos/en-US/click-action.vue"></demo>

### Custom preview

<demo src="../example/demos/en-US/custom-preview.vue"></demo>

### Custom file item

<demo src="../example/demos/en-US/custom-render.vue"></demo>

### Disabled

<demo src="../example/demos/en-US/disabled.vue"></demo>

### File size limit

<demo src="../example/demos/en-US/max-file-size.vue"></demo>

### File count limit

<demo src="../example/demos/en-US/max-files.vue"></demo>

### Image and video preview

<demo src="../example/demos/en-US/preview.vue"></demo>

### Readonly

<demo src="../example/demos/en-US/readonly.vue"></demo>

### Custom remove button

<demo src="../example/demos/en-US/remove-button-slot.vue"></demo>

### Queue states

<demo src="../example/demos/en-US/state.vue"></demo>

### Custom trigger

<demo src="../example/demos/en-US/style.vue"></demo>

### External progress

<demo src="../example/demos/en-US/use-progress.vue"></demo>

## API

Controlled model-value takes precedence over default-value. File items require uid/status/percent; metadata, raw file, URLs, fit, response and error are optional. States: ready, reading, uploading, success, error, canceled, removed.

File selection: accept, capture, multiple, directory, draggable, disabled, readonly, request-choose. Form state is inherited; explicit false overrides it. request-choose receives chooseFile/event and may be async.

Reading: resolve-type=file/data-url/object-url (default object-url), create-thumbnail-url, before-add(files), before-read(file), max-files, max-file-size and max-total-size (bytes). Replacement files are validated again; only accepted items count toward size limits.

Requests: action, method=post, headers/data (objects or async functions), name=file, with-credentials=false, custom-request, auto-upload=true, before-upload, is-success-response. No configured transport means no request. before-upload may replace with File/Blob, subject to renewed validation. before-remove may reject removal. False/rejected hooks do not produce unhandled failures.

Appearance: list-type=text/picture/picture-card (default text), image-fit=cover (item.fit overrides it), elevation=false, ripple=true, preview=true. show-file-list, show-upload-button, show-remove-button, show-retry-button, show-cancel-button and show-preview-button default true; show-download-button defaults false.

### Events

update:model-value(files) then change(files, changedFile?) reports queue proposals and one Form change notification. read(item) means reading completed, not server success. rejected(items) provides reasons accept/before-add/before-read/read-error/max-file-size/max-total-size/max-files; exceed(files,list) reports count overflow. progress(item,event?), success(item), error(item), remove(item) report current operations. preview(item,event) receives UploadPreviewEvent; preventDefault() cancels built-in preview even for programmatic calls, originalEvent is optional.

### Slots and exposed methods

trigger({chooseFile,dragOver,disabled}), item({file,index,remove,retry,abort}), remove-button with the same item scope.

chooseFile(), submit(file?), abort(file?), retry(file), remove(file), reset(), clearSuccess(), clearError(), getFiles(status?), preview(file), closePreview(). useUploader(options) additionally exposes addFiles(files) and native picker/drag handlers.

### Controlled state and cleanup

Rejected additions never auto-upload. A delayed accepted uid starts auto-upload once. Same-tick proposals merge transactionally; across ticks the parent's actual list remains authoritative, and parents own consistency of delayed list replacements. Generated object URLs are owned by the uploader; supplied/custom URLs are never revoked. Remove pending proposals, reset or unmount to release unaccepted resources. Active previews retain their URLs until closed.

Cancellation covers before-upload, async headers/data/name and pending custom request handles. Retry and external File identity replacement invalidate old callbacks. Concurrent accepted replacement preparations reserve total size. KeepAlive deactivation invalidates preparation and cancels current requests; activation allows new work. Disabled/readonly prevent changes; readonly still allows preview/download. Each instance only closes its own preview handle.

## Types

UploadProps, UploadEmits, UploadSlots, UploadExpose, UploadPublicMethods, UploadFileItem, UploadStatus, UploadListType, UploadResolveType, UploadImageFit, UploadCapture, UploadRejectedFile, UploadRejectedReason, UploadRequestOptions, UploadRequest, UploadCustomRequest, UploadProgressEvent, UploadData, UploadHeaders, UploadBeforeRead, UploadBeforeUpload, UploadBeforeRemove, UploadCreateThumbnailUrl, UploadIsSuccessResponse, UploadRequestChoose, UploadPreviewEvent, UseUploaderOptions, UploadInstance.

## Style variables

| Token | Default |
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
