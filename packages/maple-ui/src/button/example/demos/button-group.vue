<script setup lang="ts">
import { ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
const variants = ['default', 'tonal', 'outline', 'text'] as const
const action = ref('Ready')
const pending = ref(false)
async function save() {
  action.value = 'Saving'
  await new Promise((resolve) => setTimeout(resolve, 800))
  action.value = 'Saved'
}
</script>
<template>
  <p>Sizes</p>
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px">
    <mp-button-group v-for="size in sizes" :key="size" :size="size" status="primary"
      ><mp-button>{{ size }}</mp-button
      ><mp-button>Next</mp-button></mp-button-group
    >
  </div>
  <p>Themes</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group v-for="status in statuses" :key="status" :status="status"
      ><mp-button>{{ status }}</mp-button
      ><mp-button>Next</mp-button></mp-button-group
    >
  </div>
  <p>Horizontal / vertical variants</p>
  <div
    v-for="vertical in [false, true]"
    :key="String(vertical)"
    style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px; margin-bottom: 16px"
  >
    <mp-button-group v-for="variant in variants" :key="variant" :variant="variant" :vertical="vertical" status="primary"
      ><mp-button>{{ variant }}</mp-button
      ><mp-button>Next</mp-button><mp-button>Last</mp-button></mp-button-group
    >
  </div>
  <p>Inheritance / individual overrides</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group status="primary"
      ><mp-button>Default</mp-button><mp-button status="success">Success</mp-button
      ><mp-button variant="outline">Outline</mp-button><mp-button disabled>Off</mp-button></mp-button-group
    >
    <mp-button-group disabled
      ><mp-button>Disabled</mp-button><mp-button :disabled="false">Enabled override</mp-button></mp-button-group
    >
  </div>
  <p>Custom colors / gradient</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group color="#6750a4" text-color="white"
      ><mp-button>Custom</mp-button><mp-button>Next</mp-button></mp-button-group
    >
    <mp-button-group color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white"
      ><mp-button>Gradient</mp-button><mp-button>Next</mp-button></mp-button-group
    >
    <mp-button-group variant="outline" text-color="#6750a4"
      ><mp-button>Outline</mp-button><mp-button>Next</mp-button></mp-button-group
    >
  </div>
  <p>Icons / stacked / independent loading</p>
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px">
    <mp-switch v-model="pending" aria-label="Group loading" />Loading preview
  </div>
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px">
    <mp-button-group v-for="stacked in [false, true]" :key="String(stacked)" :stacked="stacked" status="primary">
      <mp-button :loading="pending" auto-loading @click="save"
        ><template #icon
          ><svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" /></svg></template
        >Save</mp-button
      >
      <mp-button @click="action = 'Edited'"
        ><template #icon
          ><svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m4 16 12-12 4 4L8 20H4z" /></svg></template
        >Edit</mp-button
      >
    </mp-button-group>
    <mp-button-group
      ><mp-button
        v-for="status in ['warning', 'info', 'success'] as const"
        :key="status"
        icon-container
        :status="status"
        :aria-label="status"
        ><template #icon
          ><svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" /></svg></template></mp-button
    ></mp-button-group>
  </div>
  <p aria-live="polite">{{ action }}</p>
</template>
