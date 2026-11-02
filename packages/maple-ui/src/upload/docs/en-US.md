# Upload

Both libraries maintain independent copies of the upload queue, file reader and request core. Without action/custom-request, reading only creates ready items for application-managed uploads.

## Basic examples

### read-only

```demo
../example/demos/en-US/read-only.vue
```

### Basic usage

```demo
../example/demos/en-US/basic-usage.vue
```

## Appearance and states

### Dynamic readonly and disabled states

Toggle readonly and disabled around a synthetic local image. The selection callback only increments a counter; it opens no file chooser and sends no request. Readonly preserves preview, while disabled blocks it. Removing restrictions restores actions. Restore sample replaces the parent-owned model, not the Upload reset method.

```demo
../example/demos/state-controls.vue
```

### Queue states

```demo
../example/demos/en-US/state.vue
```

### Interaction state comparison

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for attachment lists and local file selection. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### custom-surface

```demo
../example/demos/en-US/custom-surface.vue
```

### Custom file item

```demo
../example/demos/en-US/custom-render.vue
```

### Custom remove button

```demo
../example/demos/en-US/remove-button-slot.vue
```

### Custom trigger

```demo
../example/demos/en-US/style.vue
```

### Custom preview

```demo
../example/demos/en-US/custom-preview.vue
```

### Image and video preview

```demo
../example/demos/en-US/preview.vue
```

## File sources and validation

### Directory selection and multiple-file fallback

Compose paste events with the existing addFiles API. Keep a regular file picker on mobile; no network requests are sent.

```demo
../example/demos/directory.vue
```

### Custom file chooser

```demo
../example/demos/en-US/click-action.vue
```

### Clipboard images and file validation

```demo
../example/demos/clipboard.vue
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

### Batch filtering

```demo
../example/demos/en-US/before-add.vue
```

### Before reading

```demo
../example/demos/en-US/before-read.vue
```

### File size and count limits

Choose local files exceeding the size or count limits and inspect the rejection feedback. Selection limits are separate from request preparation and upload queues.

```demo
../example/demos/en-US/selection-limits-comparison.vue
```

## Queues and progress

### Application-managed progress

Add local sample items to see externally managed progress at 40%, then complete the active uploads. Completion only updates items that are still uploading: canceled items remain canceled and removed items do not reappear. The built-in request retry button is hidden; use “Retry externally” to restart canceled or failed items before completing them. This demo makes no network requests.

```demo
../example/demos/en-US/external-state.vue
```

### External progress

```demo
../example/demos/en-US/use-progress.vue
```

### queue-request

Add a generated example file or choose a local file; neither sends a network request. Submit manually, observe progress, cancel, and retry. Enable the first-attempt failure option to exercise error recovery. Active requests return to zero after completion, cancellation, failure, or leaving the demo.

```demo
../example/demos/en-US/queue-request.vue
```

## Async hooks and requests

### Before removing

With manual async confirmation enabled, the synchronous allow switch is ignored. Repeated removal of a pending file invokes one hook. Cancel keeps the file; resolving after disabling also keeps it, and a fresh removal is required after re-enabling. Counters expose the list, pending tasks, hook calls and remove notifications. Deactivation/unmount settles local tasks without network requests.

All extra controls are local. Reject removal rejects the pending Promise, keeps the file and allows a fresh attempt. Replace same UID file creates a new local File; an old confirmation must not remove that replacement. Reset upload queue invokes public reset without a late remove notification. Activate upload suspends/restores Upload through KeepAlive; the outer Demo keeps pending jobs for manual completion, whose old results must stay invalid after activation. Suspending Upload does not physically cancel external business Promises; leaving the whole Demo settles its local jobs.

```demo
../example/demos/en-US/before-remove.vue
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

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Props

| Prop                                                         | Type                                                     | Default / description                                                        |
| ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| model-value / default-value                                  | UploadFileItem[]                                         | Controlled value / uncontrolled initial []                                   |
| accept / capture                                             | string / native capture                                  | Unspecified                                                                  |
| multiple / directory / draggable                             | boolean                                                  | false                                                                        |
| disabled / readonly                                          | boolean                                                  | undefined inherits Form; explicit false overrides                            |
| action / method                                              | string                                                   | None / post                                                                  |
| headers / data                                               | object or async(file) => object                          | Cancelable during request preparation                                        |
| name                                                         | string / (file) => string                                | file                                                                         |
| with-credentials                                             | boolean                                                  | false                                                                        |
| custom-request                                               | (UploadRequestOptions) => UploadRequest / Promise / void | Custom transport; may return abort                                           |
| auto-upload                                                  | boolean                                                  | true; requires action or custom-request to start                             |
| max-files / max-file-size / max-total-size                   | number                                                   | Unspecified; sizes use bytes, max-files applies when >0                      |
| resolve-type                                                 | file / data-url / object-url                             | object-url; all files get url, images also get thumbnailUrl                  |
| create-thumbnail-url                                         | (options) => string / Promise                            | Custom URLs belong to callers and are not automatically revoked              |
| before-add                                                   | async(files) => File[]                                   | Batch filtering/replacement                                                  |
| before-read                                                  | async(file) => boolean / File                            | false/rejection rejects; replacements are revalidated                        |
| before-upload                                                | async(item) => boolean / File / Blob                     | false/rejection cancels preparation; replacements are revalidated            |
| before-remove                                                | async(item,list) => boolean                              | false/rejection prevents removal                                             |
| is-success-response                                          | (xhr,item) => boolean                                    | HTTP 2xx by default                                                          |
| request-choose                                               | (chooseFile,event) => void / Promise                     | Own the selection entry; exceptions do not automatically open a file chooser |
| list-type                                                    | text / picture / picture-card                            | text; supported on both platforms                                            |
| image-fit                                                    | fill / contain / cover / none / scale-down               | cover; item.fit overrides                                                    |
| preview                                                      | boolean                                                  | true                                                                         |
| show-file-list / show-upload-button / show-remove-button     | boolean                                                  | true                                                                         |
| show-retry-button / show-cancel-button / show-preview-button | boolean                                                  | true                                                                         |
| show-download-button                                         | boolean                                                  | false; disabled prevents interaction                                         |
| elevation / ripple                                           | boolean or number / boolean                              | false / true                                                                 |

UploadFileItem requires uid, status and percent. name/size/type/file/url/thumbnailUrl/fit/response/error are optional. status is ready/reading/uploading/success/error/canceled/removed.

### Events

- update:model-value(files), change(files, changedFile?): queue proposal order; Form receives one change notification per change, including progress/state updates.
- read(item): reading completed; business code may take over uploading. It does not indicate server success.
- rejected(UploadRejectedFile[]): reason is accept/before-add/before-read/read-error/max-file-size/max-total-size/max-files.
- exceed(nativeFiles, acceptedList): file-count limit exceeded.
- progress(item,event?), success(item), error(item): active-request notifications. Stale/canceled callbacks have no effect.
- remove(item): removal proposal after removal hooks accept it.
- preview(item, UploadPreviewEvent): event.preventDefault() cancels built-in image/video preview. Programmatic previews are cancelable too; originalEvent is optional.

### Slots

- trigger({chooseFile,dragOver,disabled}): custom selection entry.
- item({file,index,remove,retry,abort}): custom complete item.
- remove-button({file,index,remove,retry,abort}): custom removal action.

### Expose

chooseFile(), submit(file?), abort(file?), retry(file), remove(file), reset(), clearSuccess(), clearError(), getFiles(status?), preview(file), closePreview(). useUploader(options) supplies matching UI-free logic plus addFiles(files) and input/drag handlers.

### Controlled state and lifecycle

If a controlled parent rejects an addition, only read/list proposals emit; automatic upload waits until that uid is accepted, then runs once. Same-tick proposals merge transactionally; across ticks, the actual parent list is authoritative. Rejected entries do not count toward total size. Parents own consistency of late list replacements. Explicit removal of rejected items, reset or unmount releases generated URLs; external URLs are never revoked. Built-in preview retains its own URL ownership until closing and does not close another component's later preview.

Cancellation covers before-upload, asynchronous headers/data/name and asynchronous custom-request handles. Retrying or replacing a File under the same uid invalidates old callbacks. before-read/before-upload replacements recheck limits. max-total-size counts accepted entries and the current valid prepared batch/request only. Disabled/readonly block selection, removal, submission and other mutations; readonly allows preview/download. KeepAlive deactivation cancels preparation/requests; reactivation allows new operations.

## Type definitions

UploadProps、UploadEmits、UploadSlots、UploadExpose、UploadPublicMethods、UploadFileItem、UploadStatus、UploadListType、UploadResolveType、UploadImageFit、UploadCapture、UploadRejectedFile、UploadRejectedReason、UploadRequestOptions、UploadRequest、UploadCustomRequest、UploadProgressEvent、UploadData、UploadHeaders、UploadBeforeRead、UploadBeforeUpload、UploadBeforeRemove、UploadCreateThumbnailUrl、UploadIsSuccessResponse、UploadRequestChoose、UploadPreviewEvent、UseUploaderOptions、UploadInstance。

## Style variables

Public variable suffixes match across platforms; all defaults appear below with c/mp prefixes respectively.

| Variable                                 | Default                                   |
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

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Attachment confirmation commits file-list relationships; it cannot undo completed remote uploads or permanent deletion. To defer network side effects, set `auto-upload="false"` and upload after the final business submission.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Replacing attachments and video duration

`reupload` defaults to `false`. When enabled, each attachment has Replace, including at `max-files`. `replace(file, replacement?)` opens a single-file chooser when replacement is omitted or directly validates/proposes a supplied `File`. The replacement chooser respects request-choose/disabled/readonly and does not support multiple selection.

New files pass before-add, before-read, accept, individual/total size/count checks, then before-remove. Count/total calculations subtract the old item. Canceling selection, validation/guard rejection or externally removed targets preserve the original. Accepted replacements use a new UID at the same position and emit `replace(next, previous)` plus `change`, without remove or server-deletion requests. Controlled parents decide acceptance. Acceptance invalidates old upload callbacks. Later upload failure displays an error/retry state without restoring the old file automatically.

`UploadFileItem.duration?: number` is seconds. Finite nonnegative values display `mm:ss`/`h:mm:ss`; 0 displays `00:00`, unknown/invalid values remain hidden. Local video metadata waits at most 5 seconds and cleans temporary URLs/listeners/timers on success, failure, abort or unmount. Remote records may supply duration directly; reading it does not request remote videos. Text lists show duration text; image layouts show badges.

| New entry                   | Type / default                                                     |
| --------------------------- | ------------------------------------------------------------------ |
| reupload                    | boolean / false                                                    |
| replace(file, replacement?) | `Promise<void>`; a method completion, not successful remote upload |
| replace event               | next: UploadFileItem, previous: UploadFileItem; model proposal     |
| item slot replace           | () => void; open this item's replacement chooser                   |
| duration                    | Optional UploadFileItem duration in seconds                        |

The complete-form example uses data-url to retain local attachment drafts across popup switches without temporary object URLs. Production uploads should store server URLs after success. The creating component/preview references still own object-url lifetimes.

| Style variables                   | Default                                       |
| --------------------------------- | --------------------------------------------- |
| `--mp-upload-duration-background` | `var(--mp-sys-color-surface-tooltip)`         |
| `--mp-upload-duration-color`      | `var(--mp-sys-color-content-on-dark)`         |
| `--mp-upload-duration-radius`     | `var(--mp-sys-radius-sm)`                     |
| `--mp-upload-duration-padding`    | `var(--mp-sys-space-1) var(--mp-sys-space-2)` |
| `--mp-upload-duration-font-size`  | `var(--mp-sys-font-size-sm)`                  |

### Before-hook waiting feedback

Before-hook waits show visible feedback and aria-busy. Rejected or failed operations recover; duplicate submissions do not start another copy. Notification event Promises never drive loading. Independent file operations retain concurrency and share aggregate hook feedback.

`useUploader()` exposes readonly `guardPending`, aggregating currently awaited before hooks. It does not represent upload progress.
