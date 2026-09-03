/**
 * Less plugin: convert color values to `r,g,b` without external `color` package.
 * Vite's Less pipeline can break `require('color')` (Color is not a function).
 */

function parseToRgb(input) {
  if (typeof input !== 'string') {
    return null
  }
  const value = input.trim()
  if (value.indexOf('rgb') === 0) {
    const inner = value.replace(/^rgba?\((.*)\)$/, '$1')
    const parts = inner.split(',').map((part) => part.trim())
    if (parts.length >= 3) {
      return {
        r: Number(parts[0]),
        g: Number(parts[1]),
        b: Number(parts[2]),
      }
    }
    return null
  }

  let hex = value.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((ch) => ch + ch)
      .join('')
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return null
  }
  const num = parseInt(hex, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

function getRgbStr(color) {
  const rgb = parseToRgb(color)
  if (!rgb) {
    return color
  }
  return `${rgb.r},${rgb.g},${rgb.b}`
}

module.exports = {
  install(_, __, functions) {
    functions.add('get-rgb-str', (color) => {
      return getRgbStr(color.value)
    })

    functions.add('get-var-str', (color) => {
      if (color.value.indexOf('rgb') === 0) {
        return color.value.replace(/rgb\((.*)\)/, '$1')
      }
      return getRgbStr(color.value)
    })
  },
}
