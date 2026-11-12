<script setup lang="ts">
import Rate from '../../../rate'
import Slider from '../../../slider'
import FormItem from '../../FormItem.vue'
</script>
<template>
  <main>
    <FormItem label="Rating" :label-attrs="{ for: 'rating' }"><Rate id="rating" edit-mode="direct" /></FormItem>
    <FormItem label="Volume" :label-attrs="{ for: 'volume' }"
      ><Slider id="volume" edit-mode="direct" style="width: 200px; height: 24px"
    /></FormItem>
    <FormItem label="Disabled" :label-attrs="{ for: 'disabled' }"
      ><Rate id="disabled" disabled edit-mode="direct"
    /></FormItem>
    <FormItem label="Range" :label-attrs="{ for: 'range' }"
      ><Slider id="range" range edit-mode="direct" style="width: 200px; height: 24px"
    /></FormItem>
    <div @click.prevent>
      <FormItem label="Canceled" :label-attrs="{ for: 'canceled' }"><Rate id="canceled" edit-mode="direct" /></FormItem>
    </div>
    <FormItem label="Native" :label-attrs="{ for: 'native' }"><input id="native" /></FormItem>
    <button id="reset-focus">Reset focus</button>
  </main>
</template>
