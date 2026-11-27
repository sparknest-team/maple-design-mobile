<script setup lang="ts">
import { Message } from '@maple-design/ui-vue'

const publish = () => {
  Message.info('发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space wrap>
    <mp-split-button
      disabled
      :button-props="{ disabled: false }"
      :trigger-button-props="{ disabled: false }"
      @click="publish"
      @select="handleSelect"
    >
      整体禁用

      <template #content>
        <mp-menu-option label="保存草稿" value="draft" />
        <mp-menu-option label="保存并发布" value="publish" />
        <mp-menu-option label="暂无权限" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button :button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      仅禁用主按钮

      <template #content>
        <mp-menu-option label="保存草稿" value="draft" />
        <mp-menu-option label="保存并发布" value="publish" />
        <mp-menu-option label="暂无权限" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button :trigger-button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      仅禁用菜单按钮

      <template #content>
        <mp-menu-option label="保存草稿" value="draft" />
        <mp-menu-option label="保存并发布" value="publish" />
        <mp-menu-option label="暂无权限" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
