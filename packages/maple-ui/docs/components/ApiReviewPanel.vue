<script setup lang="ts">
import { markRaw } from 'vue'
import { ReviewPanel, type ReviewField } from '@ui-foundation/ui-doc-preview'
import Button from '../../src/button'
import '../../src/button/style'
import Checkbox from '../../src/checkbox'
import '../../src/checkbox/style'
import Select from '../../src/select'
import '../../src/select/style'
import Input from '../../src/input'
import '../../src/input/style'
import InputNumber from '../../src/input-number'
import '../../src/input-number/style'
import Textarea from '../../src/textarea'
import '../../src/textarea/style'
import Collapse, { CollapseItem } from '../../src/collapse'
import '../../src/collapse/style'
import Space from '../../src/space'
import '../../src/space/style'
import Tag from '../../src/tag'
import '../../src/tag/style'

const controls = markRaw({ Space, Tag, Button, Checkbox, Select, Input, InputNumber, Textarea, Collapse, CollapseItem })
const props = defineProps<{
  handle?: Record<string, unknown>
  service?: Record<string, unknown>
  methodNames?: string[]
  methodDefaults?: Record<string, unknown[]>
  fields: ReviewField[]
  events?: string[]
  slotNames?: string[]
  slotDefaults?: Record<string, boolean>
  scenarios?: { name: string; kind: string; demos: string[] }[]
}>()
</script>
<template>
  <ReviewPanel v-bind="props" :controls="controls"
    ><template #default="scope"><slot v-bind="scope" /></template
  ></ReviewPanel>
</template>
