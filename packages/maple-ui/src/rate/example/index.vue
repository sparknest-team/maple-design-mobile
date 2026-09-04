<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})

function handleChange(score) {
  Message({
    content: `click ${score}`,
    position: 'top',
  })
}

onThemeChange()
watchLang(use)
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-rate v-model="scores.score" />
  <mp-rate v-model="scores.score" icon="thumb-up-fill" empty-icon="thumb-up" />

  <app-type>{{ t('customTotalRating') }}</app-type>
  <mp-rate v-model="scores.score1" :count="8" />

  <app-type>{{ t('customRatingIconStyle') }}</app-type>
  <mp-rate
    v-model="scores.score3"
    icon="heart-fill"
    empty-icon="heart"
    color="var(--mp-color-danger)"
    empty-color="var(--mp-color-danger)"
  />

  <app-type>{{ t('customRatingIconSizeAndGap') }}</app-type>
  <mp-rate v-model="scores.score4" size="8vmin" gap="1vmin" />

  <app-type>{{ t('halfStar') }}</app-type>
  <mp-rate v-model="scores.score6" :count="8" allow-half />
  <mp-rate
    v-model="scores.score6"
    :count="8"
    icon="heart-fill"
    half-icon="heart-half-full"
    empty-icon="heart"
    color="var(--mp-color-danger)"
    allow-half
    style="margin-top: 4px"
  />

  <app-type>{{ t('disabledAndReadonly') }}</app-type>
  <mp-rate v-model="scores.score7" disabled />
  <mp-rate v-model="scores.score8" readonly />

  <app-type>{{ t('clearable') }}</app-type>
  <mp-rate v-model="scores.score12" clearable allow-half />

  <app-type>{{ t('listenEvent') }}</app-type>
  <mp-rate v-model="scores.score10" @change="handleChange" />
</template>
