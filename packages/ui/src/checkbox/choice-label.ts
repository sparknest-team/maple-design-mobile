import type { FunctionalComponent, VNodeChild } from 'vue'

/** Render label content without narrowing Vue's supported child types. */
export const ChoiceLabel: FunctionalComponent<{ content: VNodeChild }> = (props) => props.content
