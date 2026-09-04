<script setup>
import { nextTick, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const drag = ref(null)
const drag2 = ref(null)
const drag3 = ref(null)
const drag4 = ref(null)
const drag5 = ref(null)
const drag6 = ref(null)

function reset() {
  drag.value.reset()
  drag2.value.reset()
  drag3.value.reset()
  drag4.value.reset()
  drag5.value.reset()
  drag6.value.reset()
}

watchLang((lang) => {
  use(lang)
  nextTick(() => {
    drag.value.resize()
    drag2.value.resize()
    drag3.value.resize()
    drag4.value.resize()
    drag5.value.resize()
    drag6.value.resize()
  })
})
onThemeChange()
</script>

<template>
  <app-type style="height: 50px">{{ t('basicUse') }}</app-type>
  <mp-drag ref="drag" style="left: 15px; top: 105px" :boundary="{ top: 54 }">
    <mp-button status="primary">{{ t('basicUse') }}</mp-button>
  </mp-drag>

  <app-type style="height: 50px; margin-top: 40px">{{ t('direction') }}</app-type>
  <mp-drag ref="drag2" style="left: 15px; top: 195px" direction="x" :boundary="{ top: 54 }">
    <mp-button status="primary">{{ t('direction') }}</mp-button>
  </mp-drag>

  <app-type style="height: 50px; margin-top: 40px">{{ t('attraction') }}</app-type>
  <mp-drag ref="drag3" style="left: 15px; top: 285px" attraction="x" :boundary="{ top: 54 }">
    <mp-button status="primary">{{ t('xAttraction') }}</mp-button>
  </mp-drag>
  <mp-drag ref="drag4" style="left: 132px; top: 285px" attraction="y" :boundary="{ top: 54 }">
    <mp-button status="primary">{{ t('yAttraction') }}</mp-button>
  </mp-drag>

  <app-type style="height: 50px; margin-top: 40px">{{ t('disabled') }}</app-type>
  <mp-drag ref="drag5" style="left: 15px; top: 375px" disabled attraction="x" :boundary="{ top: 54 }" z-index="80">
    <mp-button status="primary" disabled>{{ t('disabled') }}</mp-button>
  </mp-drag>

  <app-type style="height: 50px; margin-top: 40px">{{ t('boundary') }}</app-type>
  <mp-drag
    ref="drag6"
    style="left: 15px; top: 465px"
    attraction="x"
    :boundary="{ top: 465, bottom: 15, left: 15, right: 15 }"
  >
    <mp-button status="primary">{{ t('boundary') }}</mp-button>
  </mp-drag>

  <app-type style="height: 50px; margin-top: 40px">{{ t('reset') }}</app-type>
  <mp-button status="primary" @click="reset">{{ t('reset') }}</mp-button>
</template>
