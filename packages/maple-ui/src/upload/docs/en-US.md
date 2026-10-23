# Upload

Both libraries maintain independent copies of the upload queue, file reader and request core. Without action/custom-request, reading only creates ready items for application-managed uploads.

## Examples

### Basic usage

```demo
../example/demos/en-US/basic-usage.vue
```

### Disabled

```demo
../example/demos/en-US/disabled.vue
```

### Readonly

```demo
../example/demos/en-US/readonly.vue
```

### Queue states

```demo
../example/demos/en-US/state.vue
```

### read-only

```demo
../example/demos/en-US/read-only.vue
```

### queue-request

Add a generated example file or choose a local file; neither sends a network request. Submit manually, observe progress, cancel, and retry. Enable the first-attempt failure option to exercise error recovery. Active requests return to zero after completion, cancellation, failure, or leaving the demo.

```demo
../example/demos/en-US/queue-request.vue
```

### Preparation and cancellation races

For cancellation plus total-size retry, prepare two items, cancel, then submit again: four jobs remain pending, including two obsolete attempts. Resolving all jobs starts only one valid request. The over-limit item retains its original file and canceled status; it is not counted as a new failure or automatically restored to ready. Remove the successful item and resubmit the remaining item to succeed. Obsolete preparation results consume no extra capacity.

For the total-size combination, start with an empty queue, choose “600B each, 1024B total”, add two generated 62B images, prepare and resolve both. Each 600B replacement meets the per-file limit, but both exceed the total limit. Only one local request starts; the other item remains ready with its original file and reports max-total-size. Remove the successful item and prepare the remaining item again to free capacity and succeed. Reset clears the queue, pending preparations and request count. This tests local before-upload replacement, not native file selection or real network uploading.

“Prepare and submit” pauses before-upload; repeated submission does not duplicate the same attempt. Cancel and submit again, then resolve both preparations: only the current valid attempt starts a request. Text and oversized replacements are rechecked against the image type and 1 KiB size limit. Rejected items stay ready and can be retried with a valid copy. The demo uses public useUploader and immediate local requests. Resetting, deactivation and unmounting release pending preparations.

```demo
../example/demos/en-US/prepare-request.vue
```

### Async request metadata

Configure a local receiver you control, then resolve headers and data separately to exercise the default XHR transport. Resolving only one does not send; cancel before resolving the other to prevent the request. The receiver can inspect `X-Demo-Upload`, `auditMarker` and the `attachment` file field; its response is shown below. The endpoint starts empty, with no external upload service configured. The receiver must allow the documentation origin through CORS. Only generated synthetic text is used.

Use Reject headers / Reject data to fail a preparation: the current attempt becomes error once. Retry before settling the other old Promise to verify that its late result cannot overwrite the new attempt. Rejections after cancellation do not add errors. Resolve/reject buttons settle all pending jobs of that kind, including obsolete ones, to make races observable; reset drains pending jobs. A preparation rejection is not an HTTP error.

```demo
../example/demos/en-US/metadata-request.vue
```

### Delayed request handles

The local custom-request returns a Promise. Return an old handle after cancellation to see abort called immediately; its late success cannot restore the canceled item. Cancel, start again, and return all handles and callbacks: only the current attempt succeeds once. Counters show callbacks accepted by the queue, not real transmission. No network is used; reset, deactivation and unmounting release local waits.

```demo
../example/demos/en-US/late-request.vue
```

### Validation after replacement

Reverse completion order: reset while the old task is pending, add a new file, resolve the newest thumbnail first, then reject the oldest. The stale failure only settles its task; it must not report read-error, remove the accepted new item or increment decoding counts. Reset clears the list and counters afterward. This remains local callback concurrency, not a native reader error.

Pause local thumbnail promise uses the public create-thumbnail-url callback with manual resolve/reject, not native FileReader fault injection. Reset invalidates the old transaction but retains its Demo task to demonstrate late delivery. A new addition starts immediately; resolving the stale task must not append it, while resolving the new task does. Rejection reports read-error and a subsequent addition can recover. Suspension/unmount settles Demo tasks. Reset and KeepAlive suspension detach the old serial wait chain without physically canceling a business promise; custom URLs remain caller-owned.

Enable native Blob/object-url to create local blob: URLs with URL.createObjectURL for subsequent accepted Files. It takes priority over data-url without rereading existing items. Blob URLs counts current blob items; Decoded images accumulates both image modes' load events until reset. The component releases its owned URLs on removal, reset and unmount. The browser Demo verifies decoding and list cleanup; exact revokeObjectURL calls are covered by automated regression, not inferred from an image disappearing. External custom URLs and cancellation during reading remain separate cases.

Enable the FileReader/data-url switch before adding small images to read accepted replacement Files using the browser's native FileReader. The 16px images verify decoding; Data URLs counts current data-url items, while Decoded images accumulates load events until reset. Removing an item removes its image but does not decrement that cumulative count; reset clears both. Type rejection happens before reading. Generated local Files are not native file-chooser or network-upload coverage.

The switch affects subsequent additions without rereading existing items. Add file/data-url/file items to fill the three slots: another addition reports max-files without changing the image or decoding counts. Remove the data-url item and add again to read the new file and increment the cumulative decoding count. Reset clears the mixed queue.

This demo feeds synthetic images through the public `useUploader.addFiles` method and displays the controlled queue with Upload. Add a small image, then replace an image with text or an image larger than 1 MiB to see `accept` / `max-file-size` rejections. After resetting, the third 768 KiB image exceeds the 2 MiB total limit; reset again and the fourth small image hits `max-files`. Removing an accepted item frees a slot. All checks run after `before-read` returns its replacement, with no network request.

```demo
../example/demos/en-US/replacement-validation.vue
```

### custom-surface

```demo
../example/demos/en-US/custom-surface.vue
```

### Application-managed progress

Add local sample items to see externally managed progress at 40%, then complete the active uploads. Completion only updates items that are still uploading: canceled items remain canceled and removed items do not reappear. The built-in request retry button is hidden; use “Retry externally” to restart canceled or failed items before completing them. This demo makes no network requests.

```demo
../example/demos/en-US/external-state.vue
```

### Batch filtering

```demo
../example/demos/en-US/before-add.vue
```

### Before reading

```demo
../example/demos/en-US/before-read.vue
```

### Before removing

With manual async confirmation enabled, the synchronous allow switch is ignored. Repeated removal of a pending file invokes one hook. Cancel keeps the file; resolving after disabling also keeps it, and a fresh removal is required after re-enabling. Counters expose the list, pending tasks, hook calls and remove notifications. Deactivation/unmount settles local tasks without network requests.

All extra controls are local. Reject removal rejects the pending Promise, keeps the file and allows a fresh attempt. Replace same UID file creates a new local File; an old confirmation must not remove that replacement. Reset upload queue invokes public reset without a late remove notification. Activate upload suspends/restores Upload through KeepAlive; the outer Demo keeps pending jobs for manual completion, whose old results must stay invalid after activation. Suspending Upload does not physically cancel external business Promises; leaving the whole Demo settles its local jobs.

```demo
../example/demos/en-US/before-remove.vue
```

### Custom file chooser

```demo
../example/demos/en-US/click-action.vue
```

### Custom file item

```demo
../example/demos/en-US/custom-render.vue
```

### File size limit

```demo
../example/demos/en-US/max-file-size.vue
```

### File count limit

```demo
../example/demos/en-US/max-files.vue
```

### Custom remove button

```demo
../example/demos/en-US/remove-button-slot.vue
```

### Custom trigger

```demo
../example/demos/en-US/style.vue
```

### External progress

```demo
../example/demos/en-US/use-progress.vue
```

### Dynamic readonly and disabled states

Toggle readonly and disabled around a synthetic local image. The selection callback only increments a counter; it opens no file chooser and sends no request. Readonly preserves preview, while disabled blocks it. Removing restrictions restores actions. Restore sample replaces the parent-owned model, not the Upload reset method.

```demo
../example/demos/state-controls.vue
```

### Interaction states

Use this example for attachment lists and local file selection. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Custom preview

```demo
../example/demos/en-US/custom-preview.vue
```

### Image and video preview

```demo
../example/demos/en-US/preview.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Confirmation saves the file list relationship. It cannot undo remote uploads or permanent deletion. Set `auto-upload="false"` and upload after the final business submission when remote side effects must be deferred.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
