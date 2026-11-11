import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import Button from '../button'

describe('SSR contract', () => {
  it('renders a representative interactive component without browser globals', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Button, null, { default: () => 'Submit' }) }))
    expect(html).toContain('Submit')
  })
})
