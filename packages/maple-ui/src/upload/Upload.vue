<template>
  <div :class="classes(n(), n('$--box'))">
    <div :class="n('file-list')">
      <div
        v-for="f in files"
        :key="f.uid"
        v-ripple="{ disabled: disabled || formDisabled || readonly || formReadonly || !ripple }"
        :class="classes(n('file'), formatElevation(elevation, 2), [f.status === 'uploading', n('--loading')])"
        @click="preview(f)"
      >
        <div :class="n('file-name')">{{ f.name || f.url }}</div>
        <slot
          v-if="showRemoveButton"
          name="remove-button"
          :remove="
            () => {
              handleRemove(f)
            }
          "
        >
          <div :class="n('file-close')" @click.stop="handleRemove(f)">
            <mp-icon :class="n('file-close-icon')" mp-upload-cover><MIconDelete /></mp-icon>
          </div>
        </slot>
        <img
          v-if="f.thumbnailUrl"
          role="img"
          :class="n('file-cover')"
          :style="{ objectFit: f.fit }"
          :src="f.thumbnailUrl"
          :alt="f.name"
        />
        <div :class="n('file-indicator')">
          <div
            :class="
              classes(n('progress'), [f.status === 'success', n('--success')], [f.status === 'error', n('--error')])
            "
            :style="{ width: f.status === 'success' || f.status === 'error' ? '100%' : `${f.percent}%` }"
          ></div>
        </div>
      </div>

      <div
        v-if="!maxFiles || modelValue.length < toNumber(maxFiles)"
        ref="actionRef"
        v-ripple="{
          disabled: disabled || formDisabled || readonly || formReadonly || !ripple || Boolean($slots.default),
        }"
        v-hover:desktop="handleHovering"
        :class="
          classes(
            n('--outline-none'),
            [!$slots.default, `${n('action')} ${formatElevation(elevation, 2)}`],
            [disabled || formDisabled, n('--disabled')],
          )
        "
        :tabindex="disabled || formDisabled ? undefined : '0'"
        @click="handleActionClick"
        @focus="isFocusing = true"
        @blur="isFocusing = false"
      >
        <input
          ref="input"
          type="file"
          autocomplete="off"
          :class="n('action-input')"
          :multiple="multiple"
          :accept="accept"
          :capture="capture"
          :disabled="disabled || formDisabled || readonly || formReadonly"
          @change="handleChange"
          @click.stop
        />

        <slot>
          <mp-icon :class="n('action-icon')" mp-upload-cover><MIconPlus /></mp-icon>
          <mp-hover-overlay
            :hovering="hovering && !disabled && !formDisabled && !readonly && !formReadonly"
            :focusing="isFocusing && !disabled && !formDisabled && !readonly && !formReadonly"
          />
        </slot>
      </div>
    </div>

    <div v-if="maxFilesText" :class="n('length')">{{ maxFilesText }}</div>

    <mp-popup
      v-model:open="showPreview"
      :class="n('preview')"
      mp-upload-cover
      placement="center"
      @closed="currentPreview = null"
    >
      <video
        v-if="
          currentPreview && (isHTMLSupportVideo(currentPreview.url) || currentPreview.file?.type.startsWith('video/'))
        "
        :class="n('preview-video')"
        playsinline="true"
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="false"
        controls
        :src="currentPreview?.url"
      ></video>
    </mp-popup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { IconDelete as MIconDelete, IconPlus as MIconPlus } from '@maplejs/icons-vue'
import { call, isNumber, normalizeToArray, toDataURL, toNumber } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import Hover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import MpIcon from '../icon'
import { imagePreview } from '../image/preview'
import MpPopup from '../popup'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { isHTMLSupportImage, isHTMLSupportVideo } from '../utils/shared'
import { props, type UploadFileItem } from './props'

const { name, n, classes } = createNamespace('upload')

interface ValidationUploadFileItem {
  valid: boolean
  varFile: UploadFileItem
}

let fid = 0

export default defineComponent({
  name,
  directives: { Ripple, Hover },
  components: {
    MIconDelete,
    MIconPlus,
    MpIcon,
    MpPopup,
    MpHoverOverlay,
  },
  props,
  emits: ['click-action', 'update:modelValue', 'after-read', 'remove', 'oversize', 'preview'],
  setup(props, { emit }) {
    let active = true
    const ownedUrls = new Map<string, string>()
    function releaseUrl(uid: string) {
      const url = ownedUrls.get(uid)
      if (url) {
        URL.revokeObjectURL(url)
      }
      ownedUrls.delete(uid)
    }
    watch(
      () => props.modelValue.map((file) => file.uid),
      (uids) => {
        for (const uid of ownedUrls.keys()) {
          if (!uids.includes(uid)) {
            releaseUrl(uid)
          }
        }
      },
    )
    onBeforeUnmount(() => {
      active = false
      for (const uid of ownedUrls.keys()) {
        releaseUrl(uid)
      }
    })
    const isFocusing = ref(false)
    const actionRef = ref<null | HTMLElement>(null)
    const input = ref<null | HTMLElement>(null)
    const showPreview = ref(false)
    const currentPreview = ref<null | UploadFileItem>(null)
    const maxFilesText = computed(() => {
      const {
        maxFiles,
        modelValue: { length },
      } = props

      return isNumber(maxFiles) ? `${length} / ${maxFiles}` : ''
    })
    const { form } = useForm()
    const { eventHandlers } = useFormItem()
    const { hovering, handleHovering } = useHoverOverlay()
    const files = computed(() => {
      const { modelValue, showFileList } = props

      if (!showFileList) {
        return []
      }
      return modelValue
    })

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    function handleKeydown(event: KeyboardEvent) {
      if (!isFocusing.value) {
        return
      }

      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
      }

      if (event.key === 'Enter') {
        actionRef.value!.click()
      }
    }

    function handleKeyup(event: KeyboardEvent) {
      if (!isFocusing.value || event.key !== ' ') {
        return
      }

      event.preventDefault()
      actionRef.value!.click()
    }

    function preview(varFile: UploadFileItem) {
      const { disabled, preview, preventDefaultPreview } = props

      if (form?.disabled.value || disabled || !preview) {
        return
      }

      emit('preview', reactive(varFile))

      if (preventDefaultPreview) {
        return
      }

      const { url } = varFile

      if (url && (isHTMLSupportImage(url) || varFile.file?.type.startsWith('image/'))) {
        imagePreview(url)
        return
      }

      if (url && (isHTMLSupportVideo(url) || varFile.file?.type.startsWith('video/'))) {
        currentPreview.value = varFile
        showPreview.value = true
      }
    }

    function createUploadFileItem(file: File): UploadFileItem {
      return {
        uid: String(fid++),
        url: '',
        thumbnailUrl: '',
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'ready',
        file,
        percent: 0,
      }
    }

    function getFiles(event: Event): File[] {
      const el = event.target as HTMLInputElement
      const { files: fileList } = el
      return Array.from<File>(fileList as ArrayLike<File>)
    }

    async function resolver(varFile: UploadFileItem): Promise<UploadFileItem> {
      const file = varFile.file!
      if (!active) {
        return varFile
      }
      if (props.resolveType === 'data-url') {
        const dataURL = await toDataURL(file)
        varFile.thumbnailUrl = dataURL
        varFile.url = dataURL
      } else if (props.resolveType === 'object-url') {
        const url = URL.createObjectURL(file)
        ownedUrls.set(varFile.uid, url)
        varFile.url = url
        if (file.type.startsWith('image/')) {
          varFile.thumbnailUrl = url
        }
      }

      return varFile
    }

    function getResolvers(varFiles: UploadFileItem[]) {
      return varFiles.map(resolver)
    }

    function getBeforeReaders(varFiles: UploadFileItem[]): Promise<ValidationUploadFileItem>[] {
      return varFiles.map(async (varFile) => {
        try {
          const result = props.beforeRead ? await props.beforeRead(varFile.file!) : true
          if (result instanceof File) {
            varFile.file = result
            varFile.name = result.name
            varFile.size = result.size
            varFile.type = result.type
          }
          return { valid: result !== false, varFile }
        } catch {
          return { valid: false, varFile }
        }
      })
    }

    async function handleChange(event: Event) {
      const { maxFileSize, maxFiles, modelValue, beforeAdd, readonly, disabled } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      const getValidSizeUploadFileItem = (varFiles: UploadFileItem[]): UploadFileItem[] =>
        varFiles.filter((varFile) => {
          if (varFile.file!.size > toNumber(maxFileSize)) {
            emit('oversize', reactive(varFile))
            return false
          }

          return true
        })

      const getValidLengthUploadFileItems = (varFiles: UploadFileItem[]): UploadFileItem[] => {
        const limit = Math.max(0, Math.min(varFiles.length, toNumber(maxFiles) - props.modelValue.length))
        return varFiles.slice(0, limit)
      }

      // beforeAdd operates on native File objects before reading or creating previews.
      // limit
      let files = getFiles(event)
      if (beforeAdd) {
        try {
          files = await beforeAdd(files)
        } catch {
          ;(event.target as HTMLInputElement).value = ''
          return
        }
      }
      let varFiles: UploadFileItem[] = files.map(createUploadFileItem)
      varFiles = maxFileSize != null ? getValidSizeUploadFileItem(varFiles) : varFiles
      varFiles = maxFiles != null ? getValidLengthUploadFileItems(varFiles) : varFiles

      // pre resolve
      const validationUploadFileItems = await Promise.all(getBeforeReaders(varFiles))
      let acceptedFiles = validationUploadFileItems.filter(({ valid }) => valid).map(({ varFile }) => varFile)
      if (maxFileSize != null) {
        acceptedFiles = getValidSizeUploadFileItem(acceptedFiles)
      }
      if (maxFiles != null) {
        acceptedFiles = getValidLengthUploadFileItems(acceptedFiles)
      }
      const validUploadFileItems = await Promise.all(getResolvers(acceptedFiles))

      if (!active) {
        return
      }
      emit('update:modelValue', [...props.modelValue, ...validUploadFileItems])
      ;(event.target as HTMLInputElement).value = ''
      validUploadFileItems.forEach((varFile) => emit('after-read', reactive(varFile)))
      eventHandlers.value.onChange?.()
    }

    async function handleRemove(removedUploadFileItem: UploadFileItem) {
      const { disabled, readonly, modelValue, beforeRemove } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      if (beforeRemove) {
        try {
          if (!(await beforeRemove(reactive(removedUploadFileItem), modelValue))) {
            return
          }
        } catch {
          return
        }
      }

      if (!active) {
        return
      }
      const expectedFiles: UploadFileItem[] = props.modelValue.filter(
        (varFile) => varFile.uid !== removedUploadFileItem.uid,
      )
      emit('remove', reactive(removedUploadFileItem))
      emit('update:modelValue', expectedFiles)
      eventHandlers.value.onChange?.()
    }

    function handleActionClick(event: Event) {
      if (form?.disabled.value || props.disabled) {
        return
      }

      if (props.onClickAction) {
        call(props.onClickAction, chooseFile, event)
        return
      }

      chooseFile()
    }

    // expose
    function getSuccess() {
      return props.modelValue.filter((varFile) => varFile.status === 'success')
    }

    // expose
    function getError() {
      return props.modelValue.filter((varFile) => varFile.status === 'error')
    }

    // expose
    function getLoading() {
      return props.modelValue.filter((varFile) => varFile.status === 'uploading')
    }

    // expose
    function chooseFile() {
      input.value!.click()
    }

    // expose
    function closePreview() {
      currentPreview.value = null
      showPreview.value = false
      imagePreview.close()
    }

    return {
      input,
      actionRef,
      files,
      showPreview,
      currentPreview,
      maxFilesText,
      hovering,
      isFocusing,
      formDisabled: form?.disabled,
      formReadonly: form?.readonly,
      n,
      classes,
      formatElevation,
      toNumber,
      handleHovering,
      isHTMLSupportVideo,
      isHTMLSupportImage,
      preview,
      handleChange,
      handleRemove,
      getSuccess,
      getError,
      getLoading,
      chooseFile,
      closePreview,
      handleActionClick,
      toSizeUnit,
    }
  },
})
</script>
