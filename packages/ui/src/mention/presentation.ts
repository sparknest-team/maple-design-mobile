import { nextTick, provide, reactive, watch } from 'vue'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './mention'
import { mentionKey, mentionLabelsKey, syncMentionLabels } from './selected-labels'
import { parseMentionParts } from './token-codec'
import { projectMentionParts } from './token-edit'
import { resolveMentionLabel } from './token-label'

const Presented: typeof Base = withFieldPresentation(Base, {
  methods: ['focus', 'blur'],
  intent: 'input',
  setup: ({ props, value, options, editorActive, draftActive }) => {
    const labels = reactive(new Map<string, string>())
    provide(mentionLabelsKey, { labels, preservedModel: () => (draftActive.value ? (value.value ?? '') : '') })
    const sync = () => {
      if (!editorActive.value) {
        syncMentionLabels(
          labels,
          props.atomic ? (value.value ?? '') : '',
          options.value as Parameters<typeof syncMentionLabels>[2],
        )
      }
    }
    watch(
      [value, options, editorActive, () => props.atomic, draftActive],
      (_next, previous) => {
        if (!editorActive.value) {
          if (previous?.[4]) {
            nextTick(sync)
          } else {
            sync()
          }
        }
      },
      { immediate: true, deep: true, flush: 'sync' },
    )
    return labels
  },
  text: (value, props, labels: Map<string, string>) =>
    props.atomic
      ? projectMentionParts(parseMentionParts(value ?? ''), (id) =>
          resolveMentionLabel(
            id,
            Array.isArray(props.options) ? props.options : [],
            props.fallbackOption,
            labels.get(mentionKey(id)),
          ),
        )
          .map((span) => span.text)
          .join('')
      : String(value ?? ''),
})

export default Presented
