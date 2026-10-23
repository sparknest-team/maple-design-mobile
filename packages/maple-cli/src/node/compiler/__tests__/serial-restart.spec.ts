import { describe, expect, it } from 'vitest'
import { createSerialTask } from '../../shared/serial-task'

describe('dev restart queue', () => {
  it('never creates overlapping servers for simultaneous watcher events', async () => {
    const schedule = createSerialTask()
    let active = 0
    let maximum = 0
    const events: string[] = []
    await Promise.all(
      [1, 2, 3].map((id) =>
        schedule(async () => {
          maximum = Math.max(maximum, ++active)
          events.push(`start ${id}`)
          await Promise.resolve()
          events.push(`end ${id}`)
          active--
        }),
      ),
    )
    expect(maximum).toBe(1)
    expect(events).toEqual(['start 1', 'end 1', 'start 2', 'end 2', 'start 3', 'end 3'])
  })

  it('accepts a later restart after failure', async () => {
    const schedule = createSerialTask()
    await expect(
      schedule(async () => {
        throw new Error('compile failed')
      }),
    ).rejects.toThrow('compile failed')
    await expect(schedule(async () => 'recovered')).resolves.toBe('recovered')
  })
})
