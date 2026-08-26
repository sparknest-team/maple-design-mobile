<template>
  <mp-popup
    v-model:open="open"
    position="bottom"
    :class="n('popup-radius')"
    :mask="mask"
    :mask-class="maskClass"
    :mask-style="maskStyle"
    :lock-scroll="lockScroll"
    :mask-closable="effectiveCloseOnClickOverlay"
    :esc-to-close="escToClose"
    :popup-container="popupContainer"
    :safe-area="safeArea"
    @open="$emit('open')"
    @opened="$emit('opened')"
    @close="handlePopupClose"
    @closed="$emit('closed')"
    @key-escape="$emit('key-escape')"
  >
    <div :class="classes(n(), n(`--${theme}`), n('$--box'))" v-bind="$attrs">
      <div v-if="title" :class="n('header')">{{ title }}</div>

      <div :class="n('body')">
        <div :class="n('keys')">
          <div v-for="(row, rowIndex) in bodyKeys" :key="rowIndex" :class="n('row')">
            <div
              v-for="(key, keyIndex) in row"
              :key="keyIndex"
              v-ripple
              :class="
                classes(
                  n('key'),
                  n(`key--${key.type}`),
                  [key.wider, n('key--wider')],
                  [key.type === 'blank', n('key--blank')],
                )
              "
              role="button"
              :tabindex="key.type === 'blank' ? -1 : 0"
              @click="handleKeyPress(key)"
            >
              <template v-if="key.type === 'delete'">
                <span v-if="deleteButtonText">{{ deleteButtonText }}</span>
                <mp-icon v-else :class="n('key-icon')"><MIconChevronLeft /></mp-icon>
              </template>
              <template v-else-if="key.type === 'close'">{{ closeText }}</template>
              <template v-else-if="key.type !== 'blank'">{{ key.text }}</template>
            </div>
          </div>
        </div>

        <div v-if="theme === 'custom'" :class="n('sidebar')">
          <div
            v-if="showDeleteKey"
            v-ripple
            :class="classes(n('key'), n('key--delete'))"
            role="button"
            tabindex="0"
            @click="handleDelete"
          >
            <span v-if="deleteButtonText">{{ deleteButtonText }}</span>
            <mp-icon v-else :class="n('key-icon')"><MIconChevronLeft /></mp-icon>
          </div>
          <div v-ripple :class="classes(n('key'), n('key--close'))" role="button" tabindex="0" @click="handleClose">
            {{ closeText }}
          </div>
        </div>
      </div>
    </div>
  </mp-popup>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IconChevronLeft as MIconChevronLeft } from '@maplejs/icons-vue'
import { toNumber } from '@maplejs/maple-shared'
import { useVModel } from '@maplejs/maple-use'
import MpIcon from '../icon'
import { t } from '../locale'
import MpPopup from '../popup'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('number-keyboard')

type KeyType = 'number' | 'extra' | 'delete' | 'close' | 'blank'

interface KeyConfig {
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
    const open = useVModel(props, 'open', { emit, eventName: 'update:open' })
    const modelValue = useVModel(props, 'modelValue', { emit, eventName: 'update:modelValue' })

    const effectiveCloseOnClickOverlay = computed(() => {
      if (!props.hideOnClickOutside) {
        return false
      }

      return props.maskClosable ?? true
    })

    const closeText = computed(() => props.closeButtonText ?? t('cascaderPickerDoneButtonText'))

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

      return toNumber(maxLength)
    }

    function handleInput(key: string) {
      const maxLength = getMaxLength()

      if (modelValue.value.length >= maxLength) {
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
      emit('close')
      emit('blur')
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
      open,
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

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import '../ripple/ripple';
@import '../popup/popup';
@import './numberKeyboard.less';
</style>
