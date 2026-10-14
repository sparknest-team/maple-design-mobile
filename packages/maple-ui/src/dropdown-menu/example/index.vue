<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import ContextMenuDemo from './demos/context-menu.vue'
import ControlledDemo from './demos/controlled.vue'
import DisabledStateDemo from './demos/disabled-state.vue'
import PositioningEnglishDemo from './demos/en-US/positioning.vue'
import FooterDemo from './demos/footer.vue'
import GroupDemo from './demos/group.vue'
import OptionContentDemo from './demos/option-content.vue'
import OverflowActionsDemo from './demos/overflow-actions.vue'
import PlacementDemo from './demos/placement.vue'
import PopupMaxHeightDemo from './demos/popup-max-height.vue'
import PositioningDemo from './demos/positioning.vue'
import SelectionDemo from './demos/selection.vue'
import SubmenuDemo from './demos/submenu.vue'
import TriggerDemo from './demos/trigger.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="positioning">
    <app-type>{{ english ? 'Positioning Strategy' : '定位策略' }}</app-type>
    <PositioningEnglishDemo v-if="english" />
    <PositioningDemo v-else />
  </section>

  <section data-demo="overflow-actions">
    <app-type>{{ english ? 'Overflow Actions' : '更多操作' }}</app-type>
    <OverflowActionsDemo />
  </section>

  <section data-demo="context-menu">
    <app-type>{{ english ? 'Context Menu' : '右键菜单' }}</app-type>
    <ContextMenuDemo />
  </section>

  <section data-demo="selection">
    <app-type>{{ english ? 'Active Value and Select Event' : '激活值与 select 事件' }}</app-type>
    <SelectionDemo />
  </section>

  <section data-demo="group">
    <app-type>{{ english ? 'Option Group' : '选项分组' }}</app-type>
    <GroupDemo />
  </section>

  <section data-demo="submenu">
    <app-type>{{ english ? 'Submenu' : '多级菜单' }}</app-type>
    <SubmenuDemo />
  </section>

  <section data-demo="option-content">
    <app-type>{{ english ? 'Custom Option Content' : '自定义选项内容' }}</app-type>
    <OptionContentDemo />
  </section>

  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger' : '触发方式' }}</app-type>
    <TriggerDemo />
  </section>

  <section data-demo="disabled-state">
    <app-type>{{ english ? 'Disabled State' : '禁用状态' }}</app-type>
    <DisabledStateDemo />
  </section>

  <section data-demo="popup-max-height">
    <app-type>{{ english ? 'Popup Max Height' : '高度限制' }}</app-type>
    <PopupMaxHeightDemo />
  </section>

  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled Open State' : '受控打开状态' }}</app-type>
    <ControlledDemo />
  </section>

  <section data-demo="footer">
    <app-type>{{ english ? 'Footer' : '页脚' }}</app-type>
    <FooterDemo />
  </section>

  <section data-demo="placement">
    <app-type>{{ english ? 'Placement' : '弹出方向' }}</app-type>
    <PlacementDemo />
  </section>
</template>
