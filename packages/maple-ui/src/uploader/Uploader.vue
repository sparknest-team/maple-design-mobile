<template>
  <div :class="classes(n(), n('$--box'))">
    <div :class="n('file-list')">
      <div
        v-for="f in files"
        :key="f.id"
        v-ripple="{ disabled: disabled || formDisabled || readonly || formReadonly || !ripple }"
        :class="classes(n('file'), formatElevation(elevation, 2), [f.state === 'loading', n('--loading')])"
        @click="preview(f)"
      >
        <div :class="n('file-name')">{{ f.name || f.url }}</div>
        <slot
          v-if="removable"
          name="remove-button"
          :remove="
            () => {
              handleRemove(f)
            }
          "
        >
          <div :class="n('file-close')" @click.stop="handleRemove(f)">
            <mp-icon :class="n('file-close-icon')" mp-uploader-cover><MIconDelete /></mp-icon>
          </div>
        </slot>
        <img
          v-if="f.cover"
          role="img"
          :class="n('file-cover')"
          :style="{ objectFit: f.fit }"
          :src="f.cover"
          :alt="f.name"
        />
        <div :class="n('file-indicator')">
          <div
            :class="
              classes(n('progress'), [f.state === 'success', n('--success')], [f.state === 'error', n('--error')])
            "
            :style="{ width: f.state === 'success' || f.state === 'error' ? '100%' : `${f.progress}%` }"
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
          <mp-icon :class="n('action-icon')" mp-uploader-cover><MIconPlus /></mp-icon>
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
      mp-uploader-cover
      position="center"
      @closed="currentPreview = null"
    >
      <video
        v-if="currentPreview && isHTMLSupportVideo(currentPreview?.url)"
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
import { computed, defineComponent, reactive, ref } from 'vue'
import { IconDelete as MIconDelete, IconPlus as MIconPlus } from '@maplejs/icons-vue'
import { call, isNumber, normalizeToArray, toDataURL, toNumber } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import { useFormItem } from '../form-item'
import { useForm } from '../form/provide'
import Hover from '../hover'
import MpHoverOverlay, { useHoverOverlay } from '../hover-overlay'
import MpIcon from '../icon'
import { previewImage } from '../image/preview'
import MpPopup from '../popup'
import Ripple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { isHTMLSupportImage, isHTMLSupportVideo } from '../utils/shared'
import { props, type MpFile } from './props'

const { name, n, classes } = createNamespace('uploader')

interface ValidationMpFile {
  valid: boolean
  varFile: MpFile
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
    const isFocusing = ref(false)
    const actionRef = ref<null | HTMLElement>(null)
    const input = ref<null | HTMLElement>(null)
    const showPreview = ref(false)
    const currentPreview = ref<null | MpFile>(null)
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
      const { modelValue, hideList } = props

      if (hideList) {
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

    function preview(varFile: MpFile) {
      const { disabled, previewed, preventDefaultPreview } = props

      if (form?.disabled.value || disabled || !previewed) {
        return
      }

      emit('preview', reactive(varFile))

      if (preventDefaultPreview) {
        return
      }

      const { url } = varFile

      if (isHTMLSupportImage(url)) {
        previewImage(url)
        return
      }

      if (isHTMLSupportVideo(url)) {
        currentPreview.value = varFile
        showPreview.value = true
      }
    }

    function createMpFile(file: File): MpFile {
      return {
        id: fid++,
        url: '',
        cover: '',
        name: file.name,
        file,
        progress: 0,
      }
    }

    function getFiles(event: Event): File[] {
      const el = event.target as HTMLInputElement
      const { files: fileList } = el
      return Array.from<File>(fileList as ArrayLike<File>)
    }

    async function resolver(varFile: MpFile): Promise<MpFile> {
      const file = varFile.file!
      const shouldWithDataURL =
        (props.resolveType === 'default' && file.type.startsWith('image')) || props.resolveType === 'data-url'

      if (shouldWithDataURL) {
        const dataURL = await toDataURL(file)
        varFile.cover = dataURL
        varFile.url = dataURL
      }

      return varFile
    }

    function getResolvers(varFiles: MpFile[]) {
      return varFiles.map(resolver)
    }

    function getBeforeReaders(varFiles: MpFile[]): Promise<ValidationMpFile>[] {
      const { beforeRead } = props

      return varFiles.map(
        (varFile) =>
          new Promise((resolve) => {
            if (!beforeRead) {
              resolve({
                valid: true,
                varFile,
              })
            }

            const results = normalizeToArray(call(beforeRead, reactive(varFile)))
            Promise.all(results).then((values) => {
              resolve({
                valid: values.every(Boolean),
                varFile,
              })
            })
          }),
      )
    }

    async function handleChange(event: Event) {
      const { maxFileSize, maxFiles, modelValue, beforeAdd, readonly, disabled } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      const getValidSizeMpFile = (varFiles: MpFile[]): MpFile[] =>
        varFiles.filter((varFile) => {
          if (varFile.file!.size > toNumber(maxFileSize)) {
            emit('oversize', reactive(varFile))
            return false
          }

          return true
        })

      const getValidLengthMpFiles = (varFiles: MpFile[]): MpFile[] => {
        const limit = Math.min(varFiles.length, toNumber(maxFiles) - modelValue.length)
        return varFiles.slice(0, limit)
      }

      const getFilterMpFiles = async (varFiles: MpFile[]): Promise<MpFile[]> => {
        if (!beforeAdd) {
          return varFiles
        }

        const events = normalizeToArray(beforeAdd)

        for (const event of events) {
          varFiles = await event(varFiles)
        }

        return varFiles
      }

      // limit
      const files = getFiles(event)
      let varFiles: MpFile[] = files.map(createMpFile)

      varFiles = await getFilterMpFiles(varFiles)
      varFiles = maxFileSize != null ? getValidSizeMpFile(varFiles) : varFiles
      varFiles = maxFiles != null ? getValidLengthMpFiles(varFiles) : varFiles

      // pre resolve
      const resolvedMpFiles: MpFile[] = await Promise.all(getResolvers(varFiles))
      const validationMpFiles: ValidationMpFile[] = await Promise.all(getBeforeReaders(resolvedMpFiles))
      const validMpFiles: MpFile[] = validationMpFiles.filter(({ valid }) => valid).map(({ varFile }) => varFile)

      emit('update:modelValue', [...modelValue, ...validMpFiles])
      ;(event.target as HTMLInputElement).value = ''
      validMpFiles.forEach((varFile) => emit('after-read', reactive(varFile)))
      eventHandlers.value.onChange?.()
    }

    async function handleRemove(removedMpFile: MpFile) {
      const { disabled, readonly, modelValue, beforeRemove } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      if (beforeRemove) {
        const results = normalizeToArray(call(beforeRemove, reactive(removedMpFile)))
        if ((await Promise.all(results)).some((result) => !result)) {
          return
        }
      }

      const expectedFiles: MpFile[] = modelValue.filter((varFile) => varFile !== removedMpFile)
      emit('remove', reactive(removedMpFile))
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
      return props.modelValue.filter((varFile) => varFile.state === 'success')
    }

    // expose
    function getError() {
      return props.modelValue.filter((varFile) => varFile.state === 'error')
    }

    // expose
    function getLoading() {
      return props.modelValue.filter((varFile) => varFile.state === 'loading')
    }

    // expose
    function chooseFile() {
      input.value!.click()
    }

    // expose
    function closePreview() {
      currentPreview.value = null
      showPreview.value = false
      previewImage.close()
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

<style lang="less">
@import '../styles/common';
@import '../styles/elevation';
@import '../hover-overlay/hoverOverlay';
@import '../ripple/ripple';
@import '../icon/icon';
@import '../popup/popup';
@import '../carousel/carousel';
@import '../carousel-item/carouselItem';
@import '../image-preview/imagePreview';
@import './uploader';
</style>
