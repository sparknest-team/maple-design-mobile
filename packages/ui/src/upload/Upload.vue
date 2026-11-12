<template>
  <div :class="classes(n(), n('--' + listType))" :aria-busy="uploader.guardPending.value || undefined">
    <input
      ref="inputRef"
      :aria-describedby="describeError($attrs['aria-describedby'])"
      :class="n('input')"
      type="file"
      :accept="accept"
      :capture="(capture === false ? undefined : capture === true ? '' : capture) as UploadCapture"
      :multiple="!replacementTarget && (multiple || directory)"
      :disabled="disabledState"
      :webkitdirectory="(!replacementTarget && directory) || undefined"
      @change="handleInputChange"
      @cancel="cancelChoose"
    />
    <div :class="n('content')">
      <PendingFeedback :loading="uploader.guardPending.value" />
      <div
        v-if="showUploadButton && !maxReached"
        ref="triggerRef"
        v-ripple="{ disabled: disabledState || hasInteractiveTrigger || !ripple }"
        :class="
          classes(
            n('trigger'),
            formatElevation(elevation, 2),
            [draggable, n('trigger--draggable')],
            [dragOver, n('trigger--dragover')],
          )
        "
        :role="hasInteractiveTrigger ? (describeError($attrs['aria-describedby']) ? 'group' : undefined) : 'button'"
        :aria-describedby="describeError($attrs['aria-describedby'])"
        :tabindex="disabledState || hasInteractiveTrigger ? undefined : 0"
        :aria-disabled="disabledState"
        @click.capture="captureClick"
        @click="choose($event)"
        @keydown="handleKeydown"
        @dragover="draggable && handleDragOver($event)"
        @dragleave="handleDragLeave"
        @drop="draggable && handleDrop($event)"
      >
        <slot
          name="trigger"
          :choose-file="chooseFile"
          :disabled="disabledState"
          :drag-over="dragOver"
          :described-by="describeError($attrs['aria-describedby'])"
        >
          <span aria-hidden="true">＋</span><span>{{ draggable ? text.dropFiles : text.upload }}</span>
        </slot>
      </div>
      <div v-if="showFileList" :class="n('list')">
        <template v-for="(file, index) in fileList" :key="file.uid">
          <slot name="item" v-bind="itemScope(file, index)">
            <div :class="classes(n('item'), n('item--' + file.status), formatElevation(elevation, 2))">
              <button
                v-if="listType !== 'text'"
                type="button"
                :class="n('thumb')"
                :disabled="mergedDisabled || !preview"
                :aria-label="text.preview"
                @click="uploader.preview(file, $event)"
              >
                <img
                  v-if="isImage(file)"
                  :src="file.thumbnailUrl || file.url"
                  :alt="file.name"
                  :style="{ objectFit: file.fit || imageFit }"
                /><span v-else>{{ file.name?.slice(0, 1) || 'F' }}</span>
                <span
                  v-if="isVideo(file) && formatVideoDuration(file.duration)"
                  :class="n('duration')"
                  :aria-label="`${text.duration} ${formatVideoDuration(file.duration)}`"
                  >{{ formatVideoDuration(file.duration) }}</span
                >
              </button>
              <div :class="n('meta')">
                <span :class="n('name')">{{ file.name }}</span
                ><span :class="n('size')">{{ formatSize(file.size) }}</span>
                <span
                  v-if="listType === 'text' && isVideo(file) && formatVideoDuration(file.duration)"
                  :aria-label="`${text.duration} ${formatVideoDuration(file.duration)}`"
                  >{{ formatVideoDuration(file.duration) }}</span
                >
                <progress
                  v-if="file.status === 'uploading'"
                  :class="n('progress')"
                  :value="file.percent"
                  max="100"
                  :aria-label="file.name"
                />
                <span v-if="file.status === 'error'" role="status">{{ text.retry }}</span>
              </div>
              <div :class="n('actions')">
                <button
                  v-if="showPreviewButton && preview && file.url"
                  type="button"
                  :class="n('action')"
                  :disabled="mergedDisabled"
                  :aria-label="text.preview"
                  @click="uploader.preview(file, $event)"
                >
                  <IconEye />
                </button>
                <a
                  v-if="showDownloadButton && file.url"
                  :class="n('action')"
                  :href="mergedDisabled ? undefined : file.url"
                  :role="mergedDisabled ? 'link' : undefined"
                  :tabindex="mergedDisabled ? -1 : undefined"
                  :aria-disabled="mergedDisabled || undefined"
                  :download="file.name"
                  :aria-label="text.download"
                  @click="mergedDisabled && $event.preventDefault()"
                  ><IconDownload
                /></a>
                <button
                  v-if="showCancelButton && file.status === 'uploading'"
                  type="button"
                  :class="n('action')"
                  :disabled="disabledState"
                  :aria-label="text.cancel"
                  @click="uploader.abort(file)"
                >
                  <IconClose />
                </button>
                <button
                  v-if="showRetryButton && ['error', 'canceled'].includes(file.status)"
                  type="button"
                  :class="n('action')"
                  :disabled="disabledState"
                  :aria-label="text.retry"
                  @click="uploader.retry(file)"
                >
                  <IconRefresh />
                </button>
                <button
                  v-if="reupload"
                  type="button"
                  :class="n('action')"
                  :disabled="disabledState"
                  :aria-label="text.replace"
                  @click="chooseReplacement(file, $event)"
                >
                  <IconRefresh />
                </button>
                <slot v-if="showRemoveButton" name="remove-button" v-bind="itemScope(file, index)"
                  ><button
                    type="button"
                    :class="n('action')"
                    :disabled="disabledState"
                    :aria-label="text.remove"
                    @click="uploader.remove(file)"
                  >
                    <IconClose /></button
                ></slot>
              </div>
            </div>
          </slot>
        </template>
      </div>
    </div>
    <PreviewPresentation
      :popup-container="popupContainer"
      :file="video"
      :label="text.preview"
      @close="closePreview"
      @closed="releaseClosedVideos"
    />
  </div>
</template>
<script setup lang="ts">
import { inject, onBeforeUnmount, ref, watch } from 'vue'
import { IconClose, IconDownload, IconEye, IconRefresh } from '@maple-design/icons-vue'
import { fieldEditorControlPending } from '../_components/field-presentation/editor-pending'
import PendingFeedback from '../_components/pending-feedback/PendingFeedback.vue'
import { useFormErrorDescription } from '../form/error-description'
// Keep preview types erased from runtime dependencies.
import type { ImagePreviewHandle } from '../image/api'
// Internal controls depend on the preview service, not the installed Image family.
import { previewImage } from '../image/preview'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { useUploader } from './composables/use-uploader'
import { useUploadForm } from './form-adapter'
// Vue's input type omits the empty-attribute form used for capture=true.
import type { UploadCapture, UploadEmits, UploadExpose, UploadFileItem, UploadSlots } from './interfaces'
import PreviewPresentation from './preview-presentation.vue'
import { uploadProps } from './props'
import { useUploadTrigger } from './use-trigger'
import { useUploadLocale } from './use-upload-locale'
import { formatVideoDuration, isVideo } from './utils/video-duration'

defineOptions({ name: createNamespace('upload').name })
const props = defineProps(uploadProps)
const { describe: describeError } = useFormErrorDescription()
const emit = defineEmits<UploadEmits>()
defineSlots<UploadSlots>()
const vRipple = Ripple
const { n, classes } = createNamespace('upload')
const text = useUploadLocale()
const { mergedDisabled, mergedReadonly, eventHandlers } = useUploadForm(props)
const video = ref<UploadFileItem>()
let imageHandle: ImagePreviewHandle | undefined
const previewReleases = new Set<() => void>()
let videoRelease: (() => void) | undefined
const closedVideos: Array<() => void> = []
function retainPreview(uids: string[]) {
  const release = uploader.retainUrls(uids)
  const done = () => {
    release()
    previewReleases.delete(done)
  }
  previewReleases.add(done)
  return done
}
function releaseClosedVideos() {
  closedVideos.splice(0).forEach((release) => release())
}
const uploader = useUploader({
  modelValue: () => (props.modelValue === null ? [] : props.modelValue),
  defaultValue: () => props.defaultValue,
  accept: () => props.accept,
  capture: () => props.capture,
  multiple: () => props.multiple,
  directory: () => props.directory,
  draggable: () => props.draggable,
  disabled: () => mergedDisabled.value,
  readonly: () => mergedReadonly.value,
  action: () => props.action,
  method: () => props.method,
  headers: () => props.headers,
  data: () => props.data,
  name: () => props.name,
  withCredentials: () => props.withCredentials,
  customRequest: () => props.customRequest,
  autoUpload: () => props.autoUpload,
  maxFiles: () => props.maxFiles,
  maxFileSize: () => props.maxFileSize,
  maxTotalSize: () => props.maxTotalSize,
  resolveType: () => props.resolveType,
  createThumbnailUrl: () => props.createThumbnailUrl,
  beforeAdd: (files) => (props.beforeAdd ? props.beforeAdd(files) : files),
  beforeRead: () => props.beforeRead,
  beforeUpload: () => props.beforeUpload,
  beforeRemove: () => props.beforeRemove,
  isSuccessResponse: () => props.isSuccessResponse,
  onRead: (file) => emit('read', file),
  onUpdateModelValue: (files) => emit('update:modelValue', files),
  onChange: (files, file) => {
    emit('change', files, file)
    eventHandlers.value?.onChange?.()
  },
  onRejected: (files) => emit('rejected', files),
  onExceed: (files, list) => emit('exceed', files, list),
  onProgress: (file, event) => emit('progress', file, event),
  onSuccess: (file) => emit('success', file),
  onError: (file) => emit('error', file),
  onReplace: (file, previous) => emit('replace', file, previous),
  onRemove: (file) => emit('remove', file),
  onPreview: (file, event, isCurrent) => {
    emit('preview', file, event)
    if (event.defaultPrevented || !props.preview || !isCurrent()) {
      return
    }
    closePreview()
    const media = uploader.fileList.value.filter(
      (item) => item.url && !isVideo(item) && (item.type?.startsWith('image/') || item.thumbnailUrl),
    )
    if (isVideo(file)) {
      videoRelease = retainPreview([file.uid])
      video.value = file
    } else if (file.url) {
      const releaseImage = retainPreview(media.length ? media.map((item) => item.uid) : [file.uid])
      try {
        imageHandle = previewImage({
          images: media.length ? media.map((item) => item.thumbnailUrl || item.url!) : [file.url],
          modelValue:
            Math.max(
              0,
              media.findIndex((item) => item.uid === file.uid),
            ) + 1,
          onClosed: releaseImage,
        })
      } finally {
        if (!imageHandle) {
          releaseImage()
        }
      }
    }
  },
})
const editorPending = inject(fieldEditorControlPending, undefined)
watch(
  uploader.editorPending,
  (value) => {
    if (editorPending) {
      editorPending.value = value
    }
  },
  { flush: 'sync' },
)
onBeforeUnmount(() => {
  if (editorPending) {
    editorPending.value = false
  }
})
const {
  fileList,
  maxReached,
  disabled: disabledState,
  inputRef,
  dragOver,
  chooseFile: chooseNativeFile,
  replacementTarget,
  cancelChoose,
  handleInputChange,
  handleDragOver,
  handleDragLeave,
  handleDrop,
} = uploader
const { triggerRef, hasInteractiveTrigger, captureClick, claim, chooser, isClaimed } = useUploadTrigger()
function chooseFile() {
  return claim() ? chooseNativeFile() : Promise.resolve()
}
function closePreview() {
  if (videoRelease) {
    closedVideos.push(videoRelease)
    videoRelease = undefined
  }
  video.value = undefined
  imageHandle?.close()
  imageHandle = undefined
}
function itemScope(file: UploadFileItem, index: number) {
  return {
    file,
    index,
    remove: () => uploader.remove(file),
    retry: () => uploader.retry(file),
    abort: () => uploader.abort(file),
    replace: () => uploader.replace(file),
  }
}
async function chooseReplacement(file: UploadFileItem, event: Event) {
  if (disabledState.value) {
    return
  }
  try {
    const choose = chooser(() => uploader.replace(file), event)
    if (props.requestChoose) {
      await props.requestChoose(choose, event)
    } else {
      await choose()
    }
  } catch {
    /* A rejected chooser preserves the previous attachment. */
  }
}
async function choose(event: Event, ownKeydown = false) {
  if (disabledState.value || isClaimed(event) || (!ownKeydown && event.defaultPrevented)) {
    return
  }
  try {
    if (props.requestChoose) {
      await props.requestChoose(chooser(chooseNativeFile, event), event)
    } else {
      await chooser(chooseNativeFile, event)()
    }
  } catch {
    /* A rejected chooser does not open the native picker. */
  }
}
function isImage(file: UploadFileItem) {
  return Boolean(
    file.thumbnailUrl ||
    file.type?.startsWith('image/') ||
    /\.(png|jpe?g|gif|webp|svg|avif|bmp)(?:[?#]|$)/i.test(file.url ?? '') ||
    file.url?.startsWith('data:image/'),
  )
}
function handleKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented || hasInteractiveTrigger.value || event.target !== event.currentTarget) {
    return
  }
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    void choose(event, true)
  }
}
function formatSize(size?: number) {
  return size === undefined
    ? ''
    : size < 1024
      ? size + ' B'
      : size < 1048576
        ? (size / 1024).toFixed(1) + ' KB'
        : (size / 1048576).toFixed(1) + ' MB'
}
watch(
  () => fileList.value.map((file) => file.uid),
  (ids) => {
    if (video.value && !ids.includes(video.value.uid)) {
      closePreview()
    }
  },
)
onBeforeUnmount(() => {
  closePreview()
  previewReleases.forEach((release) => release())
  releaseClosedVideos()
})
defineExpose<UploadExpose>({
  replace: uploader.replace,
  chooseFile,
  submit: uploader.submit,
  abort: uploader.abort,
  retry: uploader.retry,
  remove: uploader.remove,
  reset: uploader.reset,
  clearSuccess: uploader.clearSuccess,
  clearError: uploader.clearError,
  getFiles: uploader.getFiles,
  closePreview,
  preview: uploader.preview,
})
</script>
