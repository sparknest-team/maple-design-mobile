import { expect, test } from 'vitest'
import { focusExplicitSlider } from '../focus-explicit-label'

test('a label moved to another root does not focus a slider in its previous root', async () => {
  const firstHost = document.createElement('div')
  const secondHost = document.createElement('div')
  document.body.append(firstHost, secondHost)
  const first = firstHost.attachShadow({ mode: 'open' })
  const second = secondHost.attachShadow({ mode: 'open' })
  const label = document.createElement('label')
  label.htmlFor = 'volume'
  label.textContent = 'Volume'
  const slider = document.createElement('div')
  slider.id = 'volume'
  slider.setAttribute('role', 'slider')
  slider.tabIndex = 0
  first.append(label, slider)
  label.addEventListener('click', focusExplicitSlider)
  try {
    label.click()
    second.append(label)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(first.activeElement).toBeNull()
    expect(second.activeElement).toBeNull()
  } finally {
    firstHost.remove()
    secondHost.remove()
  }
})
