import { Themes } from '@maple-design/ui'

Themes.convert({ '--mp-button-height': '.5px' }, (value) => {
  const numericText: string = value
  // @ts-expect-error Conversion callbacks receive text, not a number.
  const numericValue: number = value
  void numericValue
  return numericText
})
Themes.toViewport({}, { viewportWidth: 375, viewportUnit: 'vw', unitPrecision: 2 })
