<template>
  <div class="mp-site-code-example">
    <div class="mp-site-code-example__toolbar">
      <button
        v-if="fold && !disabledFold"
        type="button"
        class="mp-site-code-example__toolbar-button"
        :aria-label="height >= 0 ? 'Show Source' : 'Hide Source'"
        :data-tooltip="height >= 0 ? 'Show Source' : 'Hide Source'"
        @click="toggle"
      >
        <MIconXml class="mp-site-code-example__toolbar-icon" />
      </button>

      <button
        v-if="clipboard"
        :id="`clip-trigger-${cid}`"
        :data-clipboard-target="`#clip-target-${cid}`"
        type="button"
        class="mp-site-code-example__toolbar-button"
        aria-label="Copy Example Code"
        data-tooltip="Copy Example Code"
      >
        <MIconContentCopy class="mp-site-code-example__toolbar-icon" />
      </button>

      <button
        v-if="playground"
        type="button"
        class="mp-site-code-example__toolbar-button"
        aria-label="Edit In Playground"
        data-tooltip="Edit In Playground"
        @click="toPlayground"
      >
        <MIconCodeJson class="mp-site-code-example__toolbar-icon" />
      </button>
    </div>
    <div
      :id="`clip-target-${cid}`"
      class="mp-site-code-example__code"
      :class="[disabledFold ? 'mp-site-code-example--scroller' : null]"
      ref="code"
      :style="{
        height: height >= 0 ? `${height}px` : undefined,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, type Ref } from 'vue'
import config from '@config'
import {
  IconCodeJson as MIconCodeJson,
  IconContentCopy as MIconContentCopy,
  IconXml as MIconXml,
} from '@maplejs/icons-vue'
import { getBrowserTheme, getPCLocationInfo } from '@maplejs/maple-cli/client'
import { doubleRaf } from '@maplejs/maple-shared'
import { Context, Message } from '@maplejs/maple-ui'
import Clipboard from 'clipboard'
import { type SiteContext } from '../../../types'
import { utoa } from '../../../utils'

const context = Context as SiteContext

let clipId = 0
const offset = 10

export default defineComponent({
  components: { MIconXml, MIconContentCopy, MIconCodeJson },
  name: 'MpSiteCodeExample',
  props: {
    playgroundIgnore: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const code: Ref<HTMLElement | null> = ref(null)
    const cid: Ref<number> = ref(clipId++)
    const fold: Ref = ref(config?.pc?.fold)
    const disabledFold: Ref<boolean> = ref(false)
    const clipboard: Ref = ref(config?.pc?.clipboard || {})
    const height: Ref<number> = ref(-1)
    const playground: Ref<string | undefined> = ref(
      !props.playgroundIgnore ? config?.pc?.header?.playground : undefined,
    )
    let timer: any = null

    const toggle = async () => {
      const foldHeight = fold.value.foldHeight

      if (height.value === foldHeight) {
        height.value = -1
        await nextTick()
        const { offsetHeight } = code.value as HTMLElement
        height.value = foldHeight
        await doubleRaf()
        height.value = offsetHeight

        timer = setTimeout(() => {
          height.value = -1
        }, 250)
      } else {
        clearTimeout(timer)
        const { offsetHeight } = code.value as HTMLElement
        height.value = offsetHeight
        await doubleRaf()
        height.value = foldHeight
      }
    }

    const toPlayground = () => {
      const codeText = code.value?.innerText ?? ''
      const file = { 'App.vue': codeText }
      const initialTheme = getBrowserTheme('demo')

      context.showPlayground = true
      context.playgroundURL = `${playground.value}/?initialTheme=${initialTheme}#${utoa(JSON.stringify(file))}`
    }

    onMounted(() => {
      const trigger = new Clipboard(`#clip-trigger-${cid.value}`)

      trigger.on('success', () => {
        Message.success(clipboard.value[getPCLocationInfo().language])
      })

      const { offsetHeight } = code.value as HTMLElement
      disabledFold.value = offsetHeight - fold.value.foldHeight < offset
      height.value = fold.value?.defaultFold ? fold.value?.foldHeight : -1
    })

    return {
      code,
      height,
      cid,
      fold,
      disabledFold,
      clipboard,
      playground,
      toggle,
      toPlayground,
    }
  },
})
</script>

<style lang="less">
@import './codeExample';
</style>
