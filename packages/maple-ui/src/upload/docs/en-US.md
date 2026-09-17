# Upload

### Intro

It provides the ability to read files and preview pictures and videos.
Get the file upload server by listening for `after-read` events.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### File Preview

By analyzing the file URL suffix name to determine the file type, support image and video preview.

```demo
../example/demos/preview.vue
```

### Custom Preview

```demo
../example/demos/custom-preview.vue
```

### Upload State

Three uploading states, `loading`, `success` and `error`, are provided, and tool functions are provided to quickly obtain files with corresponding states.

```demo
../example/demos/state.vue
```

### Use Progress

```demo
../example/demos/use-progress.vue
```

### File Maxlength

```demo
../example/demos/max-files.vue
```

### File Size Limit

If the limit is exceeded, the file will be blocked. You can get the file by listening for the `oversize` event.

```demo
../example/demos/max-file-size.vue
```

### File List Filter

Use the beforeAdd prop to filter native File[] before reading; return File[] or Promise<File[]>.

```demo
../example/demos/before-add.vue
```

### Upload Preprocessing

Operate on a file by registering the beforeRead prop that returns a false value to prevent the file from being read.

```demo
../example/demos/before-read.vue
```

### Upload Button Click Event

By listen the `click-action` event, you can intercept the click behavior of the upload button, and manually trigger the browser to select the file through the `chooseFile` method in the callback.

```demo
../example/demos/click-action.vue
```

### Disabled

```demo
../example/demos/disabled.vue
```

### Readonly

```demo
../example/demos/readonly.vue
```

### Remove Preprocessing

Before deleting the file, the beforeRemove prop is triggered, and a falsy value is returned to prevent the delete operation.

```demo
../example/demos/before-remove.vue
```

### Customize Upload Styles



> For form validation of the upload, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/style.vue
```

### Custom Render File List

You can use the `show-file-list` to hide component files list, then you can render this list by custom.

```demo
../example/demos/custom-render.vue
```

### Custom Remove Button

```demo
../example/demos/remove-button-slot.vue
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
