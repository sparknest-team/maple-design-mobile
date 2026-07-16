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
            <mp-icon :class="n('file-close-icon')" mp-uploader-cover name="delete" />
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
        v-if="!maxlength || modelValue.length < toNumber(maxlength)"
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
          :class="n('action-input')"
          :multiple="multiple"
          :accept="accept"
          :capture="capture"
          :disabled="disabled || formDisabled || readonly || formReadonly"
          @change="handleChange"
          @click.stop
        />

        <slot>
          <mp-icon :class="n('action-icon')" mp-uploader-cover name="plus" />
          <mp-hover-overlay
            :hovering="hovering && !disabled && !formDisabled && !readonly && !formReadonly"
            :focusing="isFocusing && !disabled && !formDisabled && !readonly && !formReadonly"
          />
        </slot>
      </div>
    </div>

    <mp-form-details :error-message="errorMessage" :extra-message="maxlengthText">
      <template v-if="$slots['extra-message']" #extra-message>
        <slot name="extra-message" />
      </template>
    </mp-form-details>

    <mp-popup
      v-model:show="showPreview"
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
import { computed, defineComponent, nextTick, reactive, ref, watch } from 'vue'
import { call, isNumber, normalizeToArray, toDataURL, toNumber } from '@maplejs/maple-shared'
import { useEventListener } from '@maplejs/maple-use'
import MpFormDetails from '../form-details'
import { useForm } from '../form/provide'
import Hover from '../hover'
import MpHoverOverlay, { useHoverOverlay } from '../hover-overlay'
import MpIcon from '../icon'
import { previewImage } from '../image/preview'
import MpPopup from '../popup'
import Ripple from '../ripple'
import { createNamespace, formatElevation, useValidation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { isHTMLSupportImage, isHTMLSupportVideo } from '../utils/shared'
import { props, type MpFile, type UploaderValidateTrigger } from './props'
import { type UploaderProvider } from './provide'

const { name, n, classes } = createNamespace('uploader')

interface ValidationMpFile {
  valid: boolean
  varFile: MpFile
}

interface MpFileUtils {
  getLoading(): MpFile[]

  getSuccess(): MpFile[]

  getError(): MpFile[]
}

let fid = 0

export default defineComponent({
  name,
  directives: { Ripple, Hover },
  components: {
    MpIcon,
    MpPopup,
    MpFormDetails,
    MpHoverOverlay,
  },
  props,
  setup(props) {
    const isFocusing = ref(false)
    const actionRef = ref<null | HTMLElement>(null)
    const input = ref<null | HTMLElement>(null)
    const showPreview = ref(false)
    const currentPreview = ref<null | MpFile>(null)
    const maxlengthText = computed(() => {
      const {
        maxlength,
        modelValue: { length },
      } = props

      return isNumber(maxlength) ? `${length} / ${maxlength}` : ''
    })
    const { form, bindForm } = useForm()
    const {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation,
    } = useValidation()
    const { hovering, handleHovering } = useHoverOverlay()
    const files = computed(() => {
      const { modelValue, hideList } = props

      if (hideList) {
        return []
      }
      return modelValue
    })

    let callReset = false
    const varFileUtils: MpFileUtils = {
      getSuccess,
      getError,
      getLoading,
    }
    const uploaderProvider: UploaderProvider = {
      validate,
      resetValidation,
      reset,
    }

    call(bindForm, uploaderProvider)

    useEventListener(() => window, 'keydown', handleKeydown)
    useEventListener(() => window, 'keyup', handleKeyup)

    watch(
      () => props.modelValue,
      () => {
        !callReset && validateWithTrigger('onChange')
        callReset = false
      },
      { deep: true },
    )

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
      const { disabled, previewed, preventDefaultPreview, onPreview } = props

      if (form?.disabled.value || disabled || !previewed) {
        return
      }

      call(onPreview, reactive(varFile))

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
      const { onBeforeRead } = props

      return varFiles.map(
        (varFile) =>
          new Promise((resolve) => {
            if (!onBeforeRead) {
              resolve({
                valid: true,
                varFile,
              })
            }

            const results = normalizeToArray(call(onBeforeRead, reactive(varFile)))
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
      const { maxsize, maxlength, modelValue, onOversize, onAfterRead, onBeforeFilter, readonly, disabled } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      const getValidSizeMpFile = (varFiles: MpFile[]): MpFile[] =>
        varFiles.filter((varFile) => {
          if (varFile.file!.size > toNumber(maxsize)) {
            call(onOversize, reactive(varFile))
            return false
          }

          return true
        })

      const getValidLengthMpFiles = (varFiles: MpFile[]): MpFile[] => {
        const limit = Math.min(varFiles.length, toNumber(maxlength) - modelValue.length)
        return varFiles.slice(0, limit)
      }

      const getFilterMpFiles = async (varFiles: MpFile[]): Promise<MpFile[]> => {
        if (!onBeforeFilter) {
          return varFiles
        }

        const events = normalizeToArray(onBeforeFilter)

        for (const event of events) {
          varFiles = await event(varFiles)
        }

        return varFiles
      }

      // limit
      const files = getFiles(event)
      let varFiles: MpFile[] = files.map(createMpFile)

      varFiles = await getFilterMpFiles(varFiles)
      varFiles = maxsize != null ? getValidSizeMpFile(varFiles) : varFiles
      varFiles = maxlength != null ? getValidLengthMpFiles(varFiles) : varFiles

      // pre resolve
      const resolvedMpFiles: MpFile[] = await Promise.all(getResolvers(varFiles))
      const validationMpFiles: ValidationMpFile[] = await Promise.all(getBeforeReaders(resolvedMpFiles))
      const validMpFiles: MpFile[] = validationMpFiles.filter(({ valid }) => valid).map(({ varFile }) => varFile)

      call(props['onUpdate:modelValue'], [...modelValue, ...validMpFiles])
      ;(event.target as HTMLInputElement).value = ''
      validMpFiles.forEach((varFile) => call(onAfterRead, reactive(varFile)))
    }

    async function handleRemove(removedMpFile: MpFile) {
      const { disabled, readonly, modelValue, onBeforeRemove, onRemove } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      if (onBeforeRemove) {
        const results = normalizeToArray(call(onBeforeRemove, reactive(removedMpFile)))
        if ((await Promise.all(results)).some((result) => !result)) {
          return
        }
      }

      const expectedFiles: MpFile[] = modelValue.filter((varFile) => varFile !== removedMpFile)
      call(onRemove, reactive(removedMpFile))
      validateWithTrigger('onRemove')
      call(props['onUpdate:modelValue'], expectedFiles)
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

    function validateWithTrigger(trigger: UploaderValidateTrigger) {
      nextTick(() => {
        const { validateTrigger, rules, modelValue } = props
        vt(validateTrigger, trigger, rules, modelValue, varFileUtils)
      })
    }

    // expose
    function validate() {
      return v(props.rules, props.modelValue, varFileUtils)
    }

    // expose
    function reset() {
      callReset = true
      call(props['onUpdate:modelValue'], [])
      resetValidation()
    }

    return {
      input,
      actionRef,
      files,
      showPreview,
      currentPreview,
      errorMessage,
      maxlengthText,
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
      validate,
      resetValidation,
      reset,
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
@import '../form-details/formDetails';
@import '../icon/icon';
@import '../popup/popup';
@import '../carousel/carousel';
@import '../carousel-item/carouselItem';
@import '../image-preview/imagePreview';
@import './uploader';
</style>
