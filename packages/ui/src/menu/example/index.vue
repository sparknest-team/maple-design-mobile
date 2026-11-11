<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import ActiveRenderingDemo from './demos/active-rendering.vue'
import ContextMenuDemo from './demos/context-menu.vue'
import ControlledDemo from './demos/controlled.vue'
import DisabledStateDemo from './demos/disabled-state.vue'
import PositioningEnglishDemo from './demos/en-US/positioning.vue'
import FooterDemo from './demos/footer.vue'
import OverflowActionsDemo from './demos/overflow-actions.vue'
import PlacementDemo from './demos/placement.vue'
import PopupMaxHeightDemo from './demos/popup-max-height.vue'
import PositioningDemo from './demos/positioning.vue'
import SelectionDemo from './demos/selection.vue'
import ContentStructureComparison from './demos/structure-comparison.vue'
import TriggerDemo from './demos/trigger.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="menu">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="overflow-actions">
    <app-type>{{ english ? 'Overflow Actions' : '更多操作' }}</app-type>
    <OverflowActionsDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="disabled-state">
    <app-type>{{ english ? 'Disabled State' : '禁用状态' }}</app-type>
    <DisabledStateDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="options-and-hierarchy">
    <span lang="zh-CN">选项与层级</span>
    <span lang="en-US">Options and hierarchy</span>
  </h2>

  <section data-demo="structure-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">分组、子菜单与选项内容</span><span lang="en-US">Groups, submenus and option content</span>
    </h3>
    <ContentStructureComparison />
  </section>

  <section data-demo="active-rendering">
    <app-type>{{ english ? 'Selection and Visual Emphasis' : '选中与视觉强调' }}</app-type>
    <ActiveRenderingDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="triggers-and-positioning">
    <span lang="zh-CN">触发与定位</span>
    <span lang="en-US">Triggers and positioning</span>
  </h2>

  <section data-demo="context-menu">
    <app-type>{{ english ? 'Context Menu' : '右键菜单' }}</app-type>
    <ContextMenuDemo />
  </section>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger' : '触发方式' }}</app-type>
    <TriggerDemo />
  </section>

  <section data-demo="placement">
    <app-type>{{ english ? 'Placement' : '弹出方向' }}</app-type>
    <PlacementDemo />
  </section>

  <section data-demo="positioning">
    <app-type>{{ english ? 'Positioning strategy' : '定位策略' }}</app-type>
    <PositioningEnglishDemo v-if="english" />
    <PositioningDemo v-else />
  </section>

  <section data-demo="popup-max-height">
    <app-type>{{ english ? 'Popup Max Height' : '高度限制' }}</app-type>
    <PopupMaxHeightDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="state-and-content-customization">
    <span lang="zh-CN">状态与内容定制</span>
    <span lang="en-US">State and content customization</span>
  </h2>

  <section data-demo="selection">
    <app-type>{{ english ? 'Selected Value and Select Event' : '选中值与 select 事件' }}</app-type>
    <SelectionDemo />
  </section>

  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled Open State' : '受控打开状态' }}</app-type>
    <ControlledDemo />
  </section>

  <section data-demo="footer">
    <app-type>{{ english ? 'Footer' : '页脚' }}</app-type>
    <FooterDemo />
  </section>
</template>
