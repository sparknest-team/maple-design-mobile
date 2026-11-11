import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { currentTheme, observeTheme } from '../theme-state'

afterEach(() => {
  currentTheme.value = undefined
})

describe('documentation theme observers', () => {
  it('initializes from the mounted app theme and follows every theme switch', () => {
    currentTheme.value = 'darkTheme'
    const callback = vi.fn()
    const wrapper = mount({
      setup: () => {
        observeTheme(callback)
        return () => null
      },
    })

    expect(callback).toHaveBeenLastCalledWith('darkTheme')
    for (const theme of ['lightTheme', 'mapleDarkTheme', 'mapleLightTheme'] as const) {
      currentTheme.value = theme
      expect(callback).toHaveBeenLastCalledWith(theme)
    }
    expect(callback).toHaveBeenCalledTimes(4)

    wrapper.unmount()
    currentTheme.value = 'darkTheme'
    expect(callback).toHaveBeenCalledTimes(4)
  })
})
