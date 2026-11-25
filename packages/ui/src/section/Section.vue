<script lang="tsx">
import { createTextVNode, defineComponent, renderSlot, useSlots, type SlotsType } from 'vue'
import { useForm } from '../form/provide'
import { createNamespace } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { sectionProps, type SectionSlots } from './props'

export default defineComponent({
  name: createNamespace('section').name,
  props: sectionProps,
  slots: Object as SlotsType<SectionSlots>,
  setup(props) {
    const { n, classes } = createNamespace('section')
    const { form } = useForm()
    const slots = useSlots()
    const uniqueId = useId()

    function renderBody() {
      const body = renderSlot(slots, 'default')
      if (!Array.isArray(body.children) || !body.children.length) {
        return null
      }
      return <div class={classes(n('content'), [form?.layout.value === 'inline', n('content--inline')])}>{body}</div>
    }

    return () => {
      const id = props.id ?? `mp-section-${uniqueId}`
      const titleId = props.title || slots.title ? `${id}-title` : undefined
      const descriptionId = props.description || slots.description ? `${id}-description` : undefined
      const marker = props.showMarker && props.markerPlacement
      const Heading = `h${props.headingLevel}` as const
      return (
        <section
          id={id}
          class={classes(
            n(),
            n(`--${props.variant}`),
            n(`--size-${props.size}`),
            [!!props.status, n(`--${props.status}`)],
            [!!form, n('--form')],
          )}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <div class={classes(n('surface'), [marker === 'section', n('surface--marked')])}>
            {(titleId || descriptionId || slots.extra) && (
              <div class={n('header')}>
                <div class={n('heading')}>
                  {titleId && (
                    <div class={classes(n('label'), [marker === 'title', n('label--marked')])}>
                      <Heading id={titleId} class={n('title')}>
                        {renderSlot(slots, 'title', {}, () => [createTextVNode(props.title)])}
                      </Heading>
                    </div>
                  )}
                  <span class={n(props.variant === 'heading-line' ? 'line' : 'spacer')} aria-hidden="true" />
                  {slots.extra && <div class={n('extra')}>{renderSlot(slots, 'extra')}</div>}
                </div>
                {descriptionId && (
                  <div id={descriptionId} class={n('description')}>
                    {renderSlot(slots, 'description', {}, () => [createTextVNode(props.description)])}
                  </div>
                )}
              </div>
            )}
            {renderBody()}
          </div>
        </section>
      )
    }
  },
})
</script>
