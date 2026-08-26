<template>
  <div :class="n()">
    <slot />
    <Teleport to="body" :disabled="!fullscreen">
      <div
        ref="containerRef"
        :class="classes(n('container'), [fullscreen, n('--fullscreen')])"
        :style="{
          backgroundImage: `url(${watermarkUrl})`,
          zIndex,
        }"
      >
        <div v-show="false" ref="svgRef">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            :viewBox="`0 0 ${width + gap[0]} ${height + gap[1]}`"
            :width="`${width + gap[0]}`"
            :height="`${height + gap[1]}`"
            :style="{
              padding: `0 ${gap[0]}px ${gap[1]}px 0`,
              opacity: alpha,
            }"
          >
            <foreignObject v-if="showContent()" x="0" y="0" :width="width" :height="height">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                :style="{
                  transform: `translate(${offset[0]}px, ${offset[1]}px) rotate(${rotate}deg)`,
                  transformOrigin: 'center',
                }"
              >
                <slot name="content">
                  <span :style="{ ...font, fontSize: `${font.fontSize}px`, color: textColor }">{{ content }}</span>
                </slot>
              </div>
            </foreignObject>
            <image
              v-if="!$slots.content && image"
              :href="imageUrl"
              :xlink:href="imageUrl"
              :x="offset[0]"
              :y="offset[1]"
              :width="width"
              :height="height"
              :style="{
                transform: `rotate(${rotate}deg)`,
                transformOrigin: 'center',
              }"
            />
          </svg>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { getStyle } from '@maplejs/maple-shared'
import { createNamespace } from '../utils/components'
import { props } from './props'

const { name, n, classes } = createNamespace('watermark')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const watermarkUrl = ref('')
    const imageUrl = ref('')
    const textColor = ref('')
    const svgRef = ref<SVGElement | null>(null)
    const containerRef = ref<Element | null>(null)

    watch(
      () => [
        props.image,
        props.font,
        props.content,
        props.height,
        props.width,
        props.rotate,
        props.gap,
        props.offset,
        props.alpha,
      ],
      resize,
      {
        deep: true,
      },
    )

    onMounted(resize)

    onUnmounted(revokeWatermarkUrl)

    function showContent() {
      if (slots.content) {
        return true
      }

      if (props.content && !props.image) {
        return true
      }

      return false
    }

    function imageToBase64(): Promise<string> {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.referrerPolicy = 'no-referrer'
        img.src = props.image!

        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx!.drawImage(img, 0, 0)
          resolve(canvas.toDataURL())
        }
      })
    }

    function svgToBlobUrl(svgStr: string) {
      const svgBlob = new Blob([svgStr], {
        type: 'image/svg+xml',
      })

      return URL.createObjectURL(svgBlob)
    }

    function revokeWatermarkUrl() {
      if (watermarkUrl.value) {
        URL.revokeObjectURL(watermarkUrl.value)
      }
    }

    // expose
    async function resize() {
      textColor.value = getStyle(containerRef.value!).color

      if (props.image) {
        imageUrl.value = await imageToBase64()
      }

      await nextTick()

      revokeWatermarkUrl()
      watermarkUrl.value = svgToBlobUrl(svgRef.value!.innerHTML)
    }

    return {
      svgRef,
      containerRef,
      watermarkUrl,
      imageUrl,
      textColor,
      n,
      classes,
      showContent,
      resize,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './watermark';
</style>
