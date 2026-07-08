<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { z } from 'zod'
import { t, use } from './locale'

const standardValue = ref('')
const standardValue2 = ref('')
const standardValue3 = ref('')
const standardValue4 = ref('')
const standardValue5 = ref('')
const standardValue6 = ref('')
const standardValue7 = ref('')
const standardValue8 = ref('')
const standardValue9 = ref('')
const standardValue10 = ref('')
const standardValue11 = ref('')
const standardValue12 = ref('')
const standardValue13 = ref('')
const standardValue14 = ref('')

const outlinedValue = ref('')
const outlinedValue2 = ref('')
const outlinedValue3 = ref('')
const outlinedValue4 = ref('')
const outlinedValue5 = ref('')
const outlinedValue6 = ref('')
const outlinedValue7 = ref('')
const outlinedValue8 = ref('')
const outlinedValue9 = ref('')
const outlinedValue10 = ref('')
const outlinedValue11 = ref('')
const outlinedValue12 = ref('')
const outlinedValue13 = ref('')
const outlinedValue14 = ref('')

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('standard') }}</app-type>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-input v-model="standardValue" :placeholder="t('placeholder')" />
    <mp-input v-model="standardValue13" :placeholder="t('numberPlaceholder')" type="number" />
    <mp-input v-model="standardValue2" :placeholder="t('readonly')" readonly />
    <mp-input v-model="standardValue3" :placeholder="t('disabled')" disabled />
    <mp-input v-model="standardValue4" :placeholder="t('clearable')" clearable />
    <mp-input v-model="standardValue5" :placeholder="t('clearIconSlot')" clearable>
      <template #clear-icon="{ clear }">
        <mp-icon name="error" @click="clear" />
      </template>
    </mp-input>
    <mp-input v-model="standardValue6" :placeholder="t('validate')" :rules="(v) => v.length > 6 || t('maxMessage')" />
    <mp-input
      v-model="standardValue14"
      :placeholder="t('validateWithZod')"
      :rules="z.string().min(7, t('maxMessage'))"
    />
    <mp-input v-model="standardValue7" :placeholder="t('displayIcon')">
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" />
      </template>
    </mp-input>

    <mp-input v-model="standardValue8" :placeholder="t('customIconSize')">
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" size="8vmin" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" size="12vmin" />
      </template>
    </mp-input>
    <mp-input v-model="standardValue9" :placeholder="t('maxlength')" :maxlength="10" />
    <mp-input v-model="standardValue10" :placeholder="t('textarea')" textarea />
    <mp-input v-model="standardValue11" :placeholder="t('smallSize')" size="small" />
    <mp-input v-model.trim="standardValue12" :placeholder="t('trim')" />
  </mp-space>

  <app-type style="margin-top: 10vmin">{{ t('outlined') }}</app-type>
  <mp-space direction="column" :size="['6vmin', 0]">
    <mp-input v-model="outlinedValue" variant="outlined" :placeholder="t('placeholder')" />
    <mp-input v-model="outlinedValue13" variant="outlined" :placeholder="t('numberPlaceholder')" type="number" />
    <mp-input v-model="outlinedValue2" variant="outlined" :placeholder="t('readonly')" readonly />
    <mp-input v-model="outlinedValue3" variant="outlined" :placeholder="t('disabled')" disabled />
    <mp-input v-model="outlinedValue4" variant="outlined" :placeholder="t('clearable')" clearable />
    <mp-input v-model="outlinedValue5" variant="outlined" :placeholder="t('clearIconSlot')" clearable>
      <template #clear-icon="{ clear }">
        <mp-icon name="error" @click="clear" />
      </template>
    </mp-input>
    <mp-input
      v-model="outlinedValue6"
      variant="outlined"
      :placeholder="t('validate')"
      :rules="(v) => v.length > 6 || t('maxMessage')"
    />
    <mp-input
      v-model="outlinedValue14"
      variant="outlined"
      :placeholder="t('validateWithZod')"
      :rules="z.string().min(7, t('maxMessage'))"
    />
    <mp-input v-model="outlinedValue7" variant="outlined" :placeholder="t('displayIcon')">
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" />
      </template>
    </mp-input>
    <mp-input v-model="outlinedValue8" variant="outlined" :placeholder="t('customIconSize')">
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" size="8vmin" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" size="12vmin" />
      </template>
    </mp-input>
    <mp-input v-model="outlinedValue9" variant="outlined" :placeholder="t('maxlength')" :maxlength="10" />
    <mp-input v-model="outlinedValue10" variant="outlined" :placeholder="t('textarea')" textarea />
    <mp-input v-model="outlinedValue11" variant="outlined" :placeholder="t('smallSize')" size="small" />
    <mp-input v-model.trim="outlinedValue12" variant="outlined" :placeholder="t('trim')" />
  </mp-space>

  <div style="height: 40px"></div>
</template>

<style scoped lang="less">
.prepend-icon {
  margin-right: 6px;
}

.append-icon {
  margin-left: 6px;
}
</style>
