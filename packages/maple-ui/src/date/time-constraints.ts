/** Private renderer predicates; public Date APIs use DateDisabledTime callbacks. */
export type DisabledTime = {
  hours?: (hour: number) => boolean
  minutes?: (minute: number, hour?: number) => boolean
  seconds?: (second: number, hour?: number, minute?: number) => boolean
}
