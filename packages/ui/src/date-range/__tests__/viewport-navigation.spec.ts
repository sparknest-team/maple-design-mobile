import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRange from '..'
import CalendarViewport from '../../date/presentation/CalendarViewport.vue'

for (const editMode of ['direct', 'popup'] as const) {
  for (const showTime of [false, true]) {
    for (const interactiveMode of ['scroll', 'line'] as const) {
      it(`${editMode}/${showTime}/${interactiveMode}: navigates both directions without editing the range`, async () => {
        const suffix = showTime ? ' 09:30:00' : ''
        const owner = mount(DateRange, {
          attachTo: document.body,
          props: {
            modelValue: [`2026-10-01${suffix}`, `2026-10-03${suffix}`],
            inputEditable: false,
            editMode,
            popupContainer: false,
            showTime,
            ...(showTime ? { timeZone: 'America/New_York' } : {}),
            interactiveMode,
            disableConfirm: false,
          },
        })
        try {
          await owner.findAll('input[role="combobox"]')[0].trigger('click')
          await flushPromises()
          const calendar = owner.getComponent(CalendarViewport)
          if (interactiveMode === 'scroll') {
            const scroller = calendar.get('.mp-calendar-viewport__scroll')
            // The default viewport spans twelve months either side of October 2026.
            for (const [index, month] of [
              [13, '2026-11-01'],
              [11, '2026-09-01'],
            ] as const) {
              scroller.element.scrollTop = index * 320
              await scroller.trigger('scroll')
              await flushPromises()
              expect((calendar.props('pickerValue') as string[])[0]).toContain(month)
              expect(scroller.element.scrollTop).toBe(index * 320)
              expect(calendar.find(`[data-month="${month.slice(0, 7)}"]`).exists()).toBe(true)
            }
          } else {
            await calendar.get('[aria-label="下一周"], [aria-label="Next week"]').trigger('click')
            await flushPromises()
            expect((calendar.props('pickerValue') as string[])[0]).toContain('2026-10-08')
            expect(calendar.find('[aria-label="2026-10-08"]').exists()).toBe(true)
            await calendar.get('[aria-label="上一周"], [aria-label="Previous week"]').trigger('click')
            await flushPromises()
            expect((calendar.props('pickerValue') as string[])[0]).toContain('2026-10-01')
          }
          expect(owner.emitted('update:pickerValue')?.at(-1)?.[0]).toHaveLength(2)
          expect(owner.emitted('select')).toBeUndefined()
          expect(owner.emitted('update:modelValue')).toBeUndefined()
        } finally {
          owner.unmount()
          document.body.innerHTML = ''
        }
      })
    }
  }
}
