import { Blob } from 'node:buffer'
import { createApp, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { codeToHtml } from 'shiki'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Code from '..'
import VarHighlighterProvider from '../../highlighter-provider'
import VarCode from '../Code'

// Await the real highlighter promise, including cold grammar/WASM loading.
// A fixed delay can snapshot the empty container on a loaded CI worker.
const highlight = vi.fn(codeToHtml)
beforeEach(() => {
  // Shiki loads WASM through Blob.stream, which jsdom does not implement.
  vi.stubGlobal('Blob', Blob)
  highlight.mockClear()
})
afterEach(() => vi.unstubAllGlobals())

async function rendered() {
  await highlight.mock.results.at(-1).value
  await flushPromises()
}

test('code use', () => {
  const app = createApp({}).use(Code)
  expect(app.component(Code.name)).toBeTruthy()
})

describe('test code component props', () => {
  test('code content', async () => {
    const wrapper = mount(VarHighlighterProvider, {
      props: {
        highlighter: {
          codeToHtml: highlight,
        },
        theme: 'vitesse-light',
      },
      slots: {
        default: () =>
          h(VarCode, {
            code: "console.log('hello world')",
            language: 'javascript',
          }),
      },
    })

    await rendered()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('code language', async () => {
    const wrapper = mount(VarHighlighterProvider, {
      props: {
        highlighter: {
          codeToHtml: highlight,
        },
        theme: 'vitesse-light',
      },
      slots: {
        default: () =>
          h(VarCode, {
            code: "print('Hello Maple UI')",
            language: 'python',
          }),
      },
    })

    await rendered()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('code theme', async () => {
    const wrapper = mount(VarHighlighterProvider, {
      props: {
        highlighter: {
          codeToHtml: highlight,
        },
      },
      slots: {
        default: () =>
          h(VarCode, {
            code: "console.log('hello world')",
            language: 'javascript',
            theme: 'material-theme',
          }),
      },
    })

    await rendered()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('code word-wrap', async () => {
    const wrapper = mount(VarHighlighterProvider, {
      props: {
        highlighter: {
          codeToHtml: highlight,
        },
        theme: 'vitesse-light',
      },
      slots: {
        default: () =>
          h(VarCode, {
            code: "console.log('hello world')",
            language: 'javascript',
            wordWrap: true,
          }),
      },
    })

    await rendered()
    expect(wrapper.find('.mp-code--word-wrap').exists()).toBe(true)

    wrapper.unmount()
  })

  test('code trim', async () => {
    const wrapper = mount(VarHighlighterProvider, {
      props: {
        highlighter: {
          codeToHtml: highlight,
        },
        theme: 'vitesse-light',
      },
      slots: {
        default: () =>
          h(VarCode, {
            code: "   console.log('hello world')   ",
            language: 'javascript',
          }),
      },
    })

    await rendered()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('code no trim', async () => {
    const wrapper = mount(VarHighlighterProvider, {
      props: {
        highlighter: {
          codeToHtml: highlight,
        },
        theme: 'vitesse-light',
      },
      slots: {
        default: () =>
          h(VarCode, {
            code: "   console.log('hello world')   ",
            language: 'javascript',
            trim: false,
          }),
      },
    })

    await rendered()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
