<template>
  <div
    :class="n()"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="indeterminate ? undefined : mode === 'line' ? lineProps.value : circleProps.value"
  >
    <div v-if="mode === 'line'" :class="n('line')">
      <div
        :class="classes(n('line-block'), [track, n('line-background')])"
        :style="{ height: toSizeUnit(strokeWidth), background: trackColor }"
      >
        <div v-if="indeterminate" :class="n('line-indeterminate')">
          <div :class="classes(n(`line--${status}`))" :style="{ background: progressColor }"></div>
          <div :class="classes(n(`line--${status}`))" :style="{ background: progressColor }"></div>
        </div>
        <div
          v-else
          :class="classes(n('line-certain'), n(`line--${status}`))"
          :style="{ background: progressColor, width: lineProps.width }"
        ></div>
      </div>
      <div v-if="showText" :class="classes(n('line-label'), [textClass, textClass])">
        <slot>
          {{ lineProps.roundValue }}
        </slot>
      </div>
    </div>

    <div
      v-if="mode === 'circle'"
      :class="classes(n('circle'), [indeterminate, n('circle-indeterminate')])"
      :style="{ width: toSizeUnit(size), height: toSizeUnit(size) }"
    >
      <svg :class="n('circle-svg')" :viewBox="circleProps.viewBox">
        <defs v-if="isPlainObject(color)">
          <linearGradient :id="id" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop
              v-for="(progress, idx) in linearGradientProgress"
              :key="idx"
              :offset="progress"
              :stop-color="color[progress]"
            ></stop>
          </linearGradient>
        </defs>
        <path
          v-if="track"
          :class="n('circle-background')"
          :d="circleProps.path"
          fill="transparent"
          :stroke-width="circleProps.strokeWidth"
          :stroke-dasharray="CIRCUMFERENCE"
          :style="{
            stroke: trackColor,
          }"
        ></path>
        <path
          :class="classes(n('circle-certain'), n(`circle--${status}`), [indeterminate, n('circle-overlay')])"
          :d="circleProps.path"
          fill="transparent"
          :stroke-width="circleProps.strokeWidth"
          :stroke-dasharray="CIRCUMFERENCE"
          :stroke-dashoffset="circleProps.strokeOffset"
          :style="{
            stroke: progressColor,
            transform: `rotateZ(${rotate}deg)`,
            transformOrigin: '50% 50%',
          }"
        ></path>
      </svg>

      <div v-if="showText" :class="classes(n('circle-label'), textClass)">
        <slot>
          {{ circleProps.roundValue }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { clamp, isPlainObject, toNumber } from '@maplejs/maple-shared'
import { useClientId } from '@maplejs/maple-use'
import { createNamespace } from '../utils/components'
import { toPxNum, toSizeUnit } from '../utils/elements'
import { props } from './props'

const MAX = 100
const MIN = 0
const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const { name, n, classes } = createNamespace('progress')

export default defineComponent({
  name,
  props,
  setup(props) {
    const id = useClientId()
    const lineProps = computed(() => {
      const percent = toNumber(props.percent)
      const width = clamp(percent, MIN, MAX)
      const roundValue = clamp(Math.round(percent), MIN, MAX)

      return {
        width: `${width}%`,
        roundValue: `${roundValue}%`,
        value: width,
      }
    })

    const circleProps = computed(() => {
      const { size, strokeWidth: strokeWidthProp, percent } = props

      const diameter = (RADIUS / (1 - toPxNum(strokeWidthProp) / toPxNum(size))) * 2
      const viewBox = `0 0 ${diameter} ${diameter}`
      const roundValue = clamp(Math.round(toNumber(percent)), MIN, MAX)
      const strokeOffset = `${((MAX - roundValue) / MAX) * CIRCUMFERENCE}`
      const strokeWidth = (toPxNum(strokeWidthProp) / toPxNum(size)) * diameter

      const beginPositionX = 0
      const beginPositionY = -RADIUS
      const endPositionX = 0
      const endPositionY = -2 * RADIUS
      const path = `M ${diameter / 2} ${diameter / 2} m ${beginPositionX} ${beginPositionY} a ${RADIUS} ${RADIUS} 
        0 1 1 ${endPositionX} ${-endPositionY} a ${RADIUS} ${RADIUS} 0 1 1 ${-endPositionX} ${endPositionY}`

      return {
        strokeWidth,
        viewBox,
        strokeOffset,
        roundValue: `${roundValue}%`,
        path,
        value: clamp(toNumber(percent), MIN, MAX),
      }
    })

    const progressColor = computed(() => {
      // set linear gradient color for circle progress
      if (isPlainObject(props.color)) {
        return `url(#${id.value})`
      }

      return props.color
    })

    const linearGradientProgress = computed(() =>
      Object.keys(props.color!).sort((a, b) => parseFloat(a) - parseFloat(b)),
    )

    return {
      id,
      lineProps,
      CIRCUMFERENCE,
      RADIUS,
      circleProps,
      progressColor,
      linearGradientProgress,
      n,
      classes,
      toSizeUnit,
      isPlainObject,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import './progress';
</style>
