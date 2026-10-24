<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DemoBasic from './demos/basic.vue'
import DemoColor from './demos/color.vue'
import DemoContent from './demos/content.vue'
import DemoDot from './demos/dot.vue'
import DemoInline from './demos/inline.vue'
import DemoMax from './demos/max.vue'
import DemoPosition from './demos/position.vue'
import DemoShow from './demos/show.vue'
import DemoSize from './demos/size.vue'
import DemoVariant from './demos/variant.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type
    ><DemoBasic />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Five sizes' : '五种尺寸' }}</app-type
    ><DemoSize />
  </section>
  <section data-demo="variant">
    <app-type>{{ english ? 'Solid and outline' : '实心与描边' }}</app-type
    ><DemoVariant />
  </section>
  <section data-demo="inline">
    <app-type>{{ english ? 'Inline and standalone' : '内联与独立展示' }}</app-type
    ><DemoInline />
  </section>
  <section data-demo="dot">
    <app-type>{{ english ? 'Dot badges' : '小圆点' }}</app-type
    ><DemoDot />
  </section>
  <section data-demo="content">
    <app-type>{{ english ? 'Custom content' : '自定义内容' }}</app-type
    ><DemoContent />
  </section>
  <section data-demo="max">
    <app-type>{{ english ? 'Maximum and zero' : '最大值与零值' }}</app-type
    ><DemoMax />
  </section>
  <section data-demo="color">
    <app-type>{{ english ? 'Statuses and colors' : '状态和颜色' }}</app-type
    ><DemoColor />
  </section>
  <section data-demo="position">
    <app-type>{{ english ? 'Positions and offsets' : '位置与偏移' }}</app-type
    ><DemoPosition />
  </section>
  <section data-demo="show">
    <app-type>{{ english ? 'Show and hide' : '显示与隐藏' }}</app-type
    ><DemoShow />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
