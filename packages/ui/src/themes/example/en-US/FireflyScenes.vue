<script setup>
import { computed, ref, watch } from 'vue'
import { Themes } from '@maple-design/ui-vue'

const props = defineProps({ dark: Boolean })
const mode = computed(() => (props.dark ? 'dark' : 'light'))
const background = ref('light')
watch(
  mode,
  () => {
    background.value = mode.value === 'dark' ? 'navy' : 'light'
  },
  { immediate: true },
)
const variants = ['default', 'text', 'outline', 'tonal']
const roles = [
  { status: 'primary', label: 'Yellow primary action' },
  { status: 'secondary', label: 'Neutral secondary action' },
  { status: 'tertiary', label: 'Violet auxiliary brand' },
]
const backgrounds = [
  { label: 'Navy', value: 'navy', color: '#17224B', text: '#FFFFFF' },
  { label: 'White', value: 'light', color: '#FFFFFF', text: '#17224B' },
  { label: 'Light gray', value: 'muted', color: '#F5F5F5', text: '#17224B' },
  { label: 'Dark gray', value: 'dark', color: '#252525', text: '#FFFFFF' },
]
// Read the actual preset so this example cannot silently redefine secondary as violet.
const palette = computed(() => Themes.firefly[mode.value])
const cardVars = computed(() => {
  const surface = backgrounds.find((item) => item.value === background.value)
  return {
    ...palette.value,
    '--mp-sys-color-surface-page': surface.color,
    '--mp-sys-color-content-primary': surface.text,
    '--mp-button-state-layer-color': surface.color,
  }
})
const interactionVars = computed(() => ({
  ...palette.value,
  // Public aliases inherited from the document must also be set for a local preset.
  '--mp-link-text-color': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-primary': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-hover': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-active': palette.value['--mp-link-primary-color'],
}))
const service = ref('drive')
const agreement = ref(true)
const reminder = ref(true)
const level = ref(60)
const contact = ref('')
</script>

<template>
  <section class="firefly-button-scenes" aria-label="Firefly brand roles">
    <p>
      Primary is yellow, secondary is neutral, and tertiary is violet. Switch the card background to compare transparent
      text and outline buttons; yellow text belongs on dark surfaces.
    </p>
    <mp-form-item layout="vertical" size="sm" label="Card background">
      <mp-radio-group
        v-model="background"
        aria-label="Card background"
        :options="backgrounds"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-theme-provider :style-vars="cardVars" class="firefly-button-scenes__panel" :data-surface="background">
      <div v-for="role in roles" :key="role.status" class="firefly-button-scenes__family">
        <p>{{ role.label }} / {{ role.status }}</p>
        <mp-space wrap>
          <mp-button
            v-for="variant in variants"
            :key="variant"
            :status="role.status"
            :variant="variant"
            :data-brand-status="role.status"
            :data-brand-variant="variant"
            :elevation="false"
            >{{ variant }}</mp-button
          >
        </mp-space>
      </div>
    </mp-theme-provider>
    <mp-theme-provider :style-vars="interactionVars" class="firefly-interactions">
      <h3>Violet selection and focus</h3>
      <mp-space direction="column" block align="stretch" :size="16">
        <mp-radio-group v-model="service" aria-label="Service selection">
          <mp-radio value="drive">Test drive</mp-radio>
          <mp-radio value="visit">Visit</mp-radio>
        </mp-radio-group>
        <mp-checkbox v-model="agreement">Receive service updates</mp-checkbox>
        <mp-switch v-model="reminder" aria-label="Service reminder" />
        <mp-slider v-model="level" aria-label="Preference level" />
        <mp-input v-model="contact" aria-label="Firefly focus example" placeholder="Focus to see the violet border" />
        <mp-link status="primary">View service details</mp-link>
      </mp-space>
    </mp-theme-provider>
  </section>
</template>

<style scoped>
.firefly-button-scenes__panel,
.firefly-interactions {
  margin-top: 16px;
  padding: 20px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 16px;
  background: var(--mp-sys-color-surface-page);
  color: var(--mp-sys-color-content-primary);
}
.firefly-button-scenes__family + .firefly-button-scenes__family {
  margin-top: 20px;
}
.firefly-button-scenes__family p,
.firefly-interactions h3 {
  margin: 0 0 12px;
  color: inherit;
  background: transparent;
}
</style>
