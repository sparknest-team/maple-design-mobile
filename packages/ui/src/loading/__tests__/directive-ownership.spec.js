import { nextTick } from 'vue'
import { afterEach, expect, test } from 'vitest'
import { vLoading } from '..'

const hosts = []
const prefix = 'mp-loading'
function host(value) {
  const el = document.createElement('section')
  el.style.position = 'static'
  document.body.appendChild(el)
  hosts.push(el)
  vLoading.mounted(el, { value, instance: null })
  return el
}
function update(el, value) {
  vLoading.updated(el, { value, instance: null })
  return nextTick()
}
afterEach(() => {
  for (const el of hosts.splice(0)) {
    vLoading.unmounted(el)
    el.remove()
  }
  document.body.classList.remove(`${prefix}-parent--hidden`)
})

test('fullscreen leases survive local teardown and release only the final owned lock', async () => {
  const first = host({ loading: true, fullscreen: true })
  const second = host({ loading: true, fullscreen: true })
  const local = host(true)
  await update(local, false)
  expect(document.body.classList.contains(`${prefix}-parent--hidden`)).toBe(true)
  await update(first, false)
  expect(document.body.classList.contains(`${prefix}-parent--hidden`)).toBe(true)
  await update(second, false)
  expect(document.body.classList.contains(`${prefix}-parent--hidden`)).toBe(false)
  document.body.classList.add(`${prefix}-parent--hidden`)
  const external = host({ loading: true, fullscreen: true })
  await update(external, false)
  expect(document.body.classList.contains(`${prefix}-parent--hidden`)).toBe(true)
})

test('a new configuration replaces omitted values and boolean true uses defaults', async () => {
  const el = host({ loading: true, type: 'wave', tip: 'Old tip', color: 'red', background: 'black' })
  expect(el.querySelector(`.${prefix}__wave, .${prefix}-wave`)).not.toBeNull()
  await update(el, { loading: true })
  expect(el.textContent).not.toContain('Old tip')
  expect(el.querySelector(`.${prefix}__wave, .${prefix}-wave`)).toBeNull()
  expect(el.querySelector(`.${prefix}__circle`)).not.toBeNull()
  expect(el.querySelector(`.${prefix}-directive`).style.getPropertyValue(`--mp-loading-overlay-background`)).toBe('')
  await update(el, { loading: true, type: 'wave', tip: 'Other' })
  await update(el, true)
  expect(el.textContent).not.toContain('Other')
  expect(el.querySelector(`.${prefix}__circle`)).not.toBeNull()
})

test('changing fullscreen migrates the overlay and restores only owned positioning', async () => {
  const el = host(true)
  expect(el.querySelector(`.${prefix}-directive`)).not.toBeNull()
  await update(el, { loading: true, fullscreen: true })
  expect(el.querySelector(`.${prefix}-directive`)).toBeNull()
  expect(document.body.querySelector(`:scope > .${prefix}-directive--fullscreen`)).not.toBeNull()
  expect(el.classList.contains(`${prefix}-parent--relative`)).toBe(false)
  await update(el, { loading: true })
  expect(document.body.querySelector(`:scope > .${prefix}-directive--fullscreen`)).toBeNull()
  expect(document.body.classList.contains(`${prefix}-parent--hidden`)).toBe(false)
  expect(el.querySelector(`.${prefix}-directive`)).not.toBeNull()
  await update(el, false)
  el.classList.add(`${prefix}-parent--relative`)
  await update(el, true)
  await update(el, false)
  expect(el.classList.contains(`${prefix}-parent--relative`)).toBe(true)
})
