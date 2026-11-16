<template>
  <mp-popup
    v-model:open="open"
    placement="bottom"
    :class="n('popup-radius')"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :lock-scroll="lockScroll"
    :overlay-closable="effectiveCloseOnClickOverlay"
    :esc-to-close="escToClose"
    :popup-container="popupContainer"
    :safe-area-inset-bottom="safeArea"
    :safe-area-inset-left="safeArea"
    :safe-area-inset-right="safeArea"
    :aria-describedby="describeError($attrs['aria-describedby'])"
    :aria-label="dialogLabel()"
    :aria-labelledby="dialogLabelledby()"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="handlePopupClose"
    @closed="$emit('closed')"
    @key-escape="$emit('key-escape')"
  >
    <div :class="classes(n(), n(`--${theme}`), n('$--box'))" v-bind="contentAttrs()">
      <div v-if="title" :id="titleId" :class="n('header')">{{ title }}</div>

      <div :class="n('body')">
        <div :class="n('keys')" dir="ltr">
          <div v-for="(row, rowIndex) in bodyKeys" :key="rowIndex" :class="n('row')">
            <button
              v-for="(key, keyIndex) in row"
              :key="keyIndex"
              v-ripple
              type="button"
              :disabled="key.type === 'blank'"
              :aria-hidden="key.type === 'blank' ? true : undefined"
              :aria-label="key.type === 'delete' && !deleteButtonText ? deleteLabel : undefined"
              :class="
                classes(
                  n('key'),
                  n(`key--${key.type}`),
                  [key.wider, n('key--wider')],
                  [key.type === 'blank', n('key--blank')],
                )
              "
              @click="handleKeyPress(key)"
            >
              <template v-if="key.type === 'delete'">
                <span v-if="deleteButtonText">{{ deleteButtonText }}</span>
                <mp-icon v-else :class="n('key-icon')"><MIconChevronLeft /></mp-icon>
              </template>
              <template v-else-if="key.type === 'close'">{{ closeText }}</template>
              <template v-else-if="key.type !== 'blank'">{{ key.text }}</template>
            </button>
          </div>
        </div>

        <div v-if="theme === 'custom'" :class="n('sidebar')">
          <button
            v-if="showDeleteKey"
            v-ripple
            type="button"
            :aria-label="!deleteButtonText ? deleteLabel : undefined"
            :class="classes(n('key'), n('key--delete'))"
            @click="handleDelete"
          >
            <span v-if="deleteButtonText">{{ deleteButtonText }}</span>
            <mp-icon v-else :class="n('key-icon')"><MIconChevronLeft /></mp-icon>
          </button>
          <button
            v-ripple
            type="button"
            :class="classes(n('key'), n('key--close'))"
            :aria-label="closeText || closeLabel"
            @click="handleClose"
          >
            {{ closeText }}
          </button>
        </div>
      </div>
    </div>
  </mp-popup>
</template>

<script lang="ts">
import { computed, defineComponent, useAttrs, type Ref } from 'vue'
import { IconChevronLeft as MIconChevronLeft } from '@maple-design/icons-vue'
import { toNumber } from '@maple-design/shared-vue'
import { useVModel } from '@maple-design/use-vue'
import { useFormErrorDescription } from '../form/error-description'
import MpIcon from '../icon'
import { injectLocaleProvider } from '../locale-provider/provide'
import { miscText as t } from '../locale/misc-text'
import MpPopup from '../popup'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { props } from './props'

const { name, n, classes } = createNamespace('number-keyboard')

type KeyType = 'number' | 'extra' | 'delete' | 'close' | 'blank'

export interface KeyConfig {
  text?: string
  type: KeyType
  wider?: boolean
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

export default defineComponent({
  name,
  directives: { Ripple },
  components: {
    MIconChevronLeft,
    MpPopup,
    MpIcon,
  },
  inheritAttrs: false,
  props,
  emits: [
    'update:modelValue',
    'update:open',
    'input',
    'delete',
    'blur',
    'close',
    'open',
    'opened',
    'closed',
    'key-escape',
  ],
  setup(props, { emit }) {
    const attrs = useAttrs()
    const { describe: describeError } = useFormErrorDescription()
    const { t: localT } = injectLocaleProvider()
    const titleId = `number-keyboard-title-${useId()}`
    const deleteLabel = computed(() => (localT || t)('numberKeyboard.delete') ?? 'Delete')
    const closeLabel = computed(() => (localT || t)('numberKeyboard.done') ?? 'Done')
    const dialogLabel = () =>
      attrs['aria-label'] ??
      (!attrs['aria-labelledby'] && !props.title
        ? ((localT || t)('numberKeyboard.label') ?? 'Number keyboard')
        : undefined)
    const dialogLabelledby = () =>
      attrs['aria-labelledby'] ?? (!attrs['aria-label'] && props.title ? titleId : undefined)
    const contentAttrs = () =>
      Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'aria-label' && key !== 'aria-labelledby'))
    const open = useVModel(props, 'open', { emit, eventName: 'update:open', defaultValue: props.defaultOpen })
    const modelValue = useVModel(props, 'modelValue', {
      emit,
      eventName: 'update:modelValue',
      defaultValue: props.defaultValue,
    }) as Ref<string>

    const effectiveCloseOnClickOverlay = computed(() => {
      if (!props.hideOnClickOutside) {
        return false
      }

      return props.overlayClosable ?? true
    })

    const closeText = computed(() => props.closeButtonText ?? (localT || t)('cascaderPickerDoneButtonText'))

    const extraKeys = computed(() => {
      const { extraKey } = props

      if (!extraKey || extraKey === '') {
        return []
      }

      return Array.isArray(extraKey) ? extraKey : [extraKey]
    })

    const numberKeys = computed(() => {
      const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      return props.randomKeyOrder ? shuffle(keys) : keys
    })

    const defaultBodyKeys = computed(() => {
      const rows: KeyConfig[][] = []
      const nums = numberKeys.value

      for (let i = 0; i < 3; i++) {
        rows.push(nums.slice(i * 3, i * 3 + 3).map((text) => ({ text, type: 'number' as const })))
      }

      const bottomRow: KeyConfig[] = []

      extraKeys.value.forEach((text) => {
        bottomRow.push({ text, type: 'extra' })
      })
      bottomRow.push({ text: '0', type: 'number' })

      if (props.showDeleteKey) {
        bottomRow.push({ type: 'delete' })
      }

      rows.push(bottomRow)
      return rows
    })

    const customBodyKeys = computed(() => {
      const rows: KeyConfig[][] = []
      const nums = numberKeys.value

      for (let i = 0; i < 3; i++) {
        rows.push(nums.slice(i * 3, i * 3 + 3).map((text) => ({ text, type: 'number' as const })))
      }

      const bottomRow: KeyConfig[] = []

      if (extraKeys.value.length === 0) {
        bottomRow.push({ type: 'blank' })
      } else if (extraKeys.value.length === 1) {
        bottomRow.push({ text: extraKeys.value[0], type: 'extra', wider: true })
      } else {
        extraKeys.value.forEach((text) => {
          bottomRow.push({ text, type: 'extra' })
        })
      }

      bottomRow.push({ text: '0', type: 'number' })

      if (extraKeys.value.length <= 1) {
        bottomRow.push({ type: 'blank' })
      }

      rows.push(bottomRow)
      return rows
    })

    const bodyKeys = computed(() => (props.theme === 'custom' ? customBodyKeys.value : defaultBodyKeys.value))

    function getMaxLength() {
      const { maxLength } = props

      if (maxLength === Infinity || maxLength === 'Infinity') {
        return Infinity
      }

      const value = toNumber(maxLength)
      return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0
    }

    function handleInput(key: string) {
      const maxLength = getMaxLength()

      if (modelValue.value.length + key.length > maxLength) {
        return
      }

      modelValue.value += key
      emit('input', key)
    }

    function handleDelete() {
      if (!modelValue.value) {
        return
      }

      modelValue.value = modelValue.value.slice(0, -1)
      emit('delete')
    }

    function handleClose() {
      open.value = false
    }

    function handlePopupClose() {
      emit('close')
      emit('blur')
    }

    function handleKeyPress(key: KeyConfig) {
      if (key.type === 'blank') {
        return
      }

      if (key.type === 'delete') {
        handleDelete()
        return
      }

      if (key.type === 'close') {
        handleClose()
        return
      }

      if (key.text != null) {
        handleInput(key.text)
      }
    }

    return {
      describeError,
      open,
      titleId,
      contentAttrs,
      dialogLabel,
      dialogLabelledby,
      deleteLabel,
      closeLabel,
      n,
      classes,
      effectiveCloseOnClickOverlay,
      closeText,
      bodyKeys,
      handleKeyPress,
      handleDelete,
      handleClose,
      handlePopupClose,
    }
  },
})
</script>
