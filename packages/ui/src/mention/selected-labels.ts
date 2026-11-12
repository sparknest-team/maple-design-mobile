import type { InjectionKey } from 'vue'
import { parseMentionParts, serializeMentionParts, type MentionPart, type MentionTokenValue } from './token-codec'
import { findMentionLabel } from './token-label'

export const mentionLabelsKey: InjectionKey<{ labels: Map<string, string>; preservedModel: () => string }> =
  Symbol('mention-selected-labels')
export const mentionKey = (value: MentionTokenValue) => serializeMentionParts([{ type: 'mention', value }])

export function syncMentionLabels(
  labels: Map<string, string>,
  model: string,
  options: Parameters<typeof findMentionLabel>[1],
  preservedModel = '',
) {
  const values = parseMentionParts(model).filter(
    (part): part is Extract<MentionPart, { type: 'mention' }> => part.type === 'mention',
  )
  const keys = new Set(values.map((part) => mentionKey(part.value)))
  for (const part of parseMentionParts(preservedModel)) {
    if (part.type === 'mention') {
      keys.add(mentionKey(part.value))
    }
  }
  for (const key of labels.keys()) {
    if (!keys.has(key)) {
      labels.delete(key)
    }
  }
  for (const part of values) {
    const label = findMentionLabel(part.value, options)
    if (label !== undefined) {
      labels.set(mentionKey(part.value), label)
    }
  }
}
