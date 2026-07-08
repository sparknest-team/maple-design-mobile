import { expect, test } from 'vitest'
import Themes from '..'

test('dark theme', () => {
  expect(Themes.dark).toMatchSnapshot()
})

test('md3Light theme', () => {
  expect(Themes.md3Light).toMatchSnapshot()
})

test('md3Dark theme', () => {
  expect(Themes.md3Dark).toMatchSnapshot()
})

test('toViewport', () => {
  expect(
    Themes.toViewport({
      '--mp-a': '30px',
      '--mp-b': '30px -30px',
      '--mp-c': '30px 30px 30px',
      '--mp-d': '30px 30px 30px 30px',
      '--mp-e': '10px',
      '--mp-f': '10.55px',
      '--mp-g': 'calc(100% - 30px)',
    }),
  ).toStrictEqual({
    '--mp-a': '8vmin',
    '--mp-b': '8vmin -8vmin',
    '--mp-c': '8vmin 8vmin 8vmin',
    '--mp-d': '8vmin 8vmin 8vmin 8vmin',
    '--mp-e': '2.666667vmin',
    '--mp-f': '2.813333vmin',
    '--mp-g': 'calc(100% - 8vmin)',
  })

  expect(
    Themes.toViewport(
      {
        '--mp-a': '30px',
        '--mp-b': '30px -30px',
        '--mp-c': '30px 30px 30px',
        '--mp-d': '30px 30px 30px 30px',
        '--mp-e': '10px',
        '--mp-f': '10.55px',
        '--mp-g': 'calc(100% - 30px)',
      },
      {
        viewportWidth: 750,
        viewportUnit: 'vw',
        unitPrecision: 4,
      },
    ),
  ).toStrictEqual({
    '--mp-a': '4vw',
    '--mp-b': '4vw -4vw',
    '--mp-c': '4vw 4vw 4vw',
    '--mp-d': '4vw 4vw 4vw 4vw',
    '--mp-e': '1.3333vw',
    '--mp-f': '1.4067vw',
    '--mp-g': 'calc(100% - 4vw)',
  })
})

test('toRem', () => {
  expect(
    Themes.toRem({
      '--mp-a': '30px',
      '--mp-b': '30px -30px',
      '--mp-c': '30px 30px 30px',
      '--mp-d': '30px 30px 30px 30px',
      '--mp-e': '10px',
      '--mp-f': '10.55px',
      '--mp-g': 'calc(100% - 30px)',
    }),
  ).toStrictEqual({
    '--mp-a': '1.875rem',
    '--mp-b': '1.875rem -1.875rem',
    '--mp-c': '1.875rem 1.875rem 1.875rem',
    '--mp-d': '1.875rem 1.875rem 1.875rem 1.875rem',
    '--mp-e': '0.625rem',
    '--mp-f': '0.659375rem',
    '--mp-g': 'calc(100% - 1.875rem)',
  })

  expect(
    Themes.toRem(
      {
        '--mp-a': '30px',
        '--mp-b': '30px -30px',
        '--mp-c': '30px 30px 30px',
        '--mp-d': '30px 30px 30px 30px',
        '--mp-e': '10px',
        '--mp-f': '10.55px',
        '--mp-g': 'calc(100% - 30px)',
      },
      {
        rootFontSize: 30,
        unitPrecision: 4,
      },
    ),
  ).toStrictEqual({
    '--mp-a': '1rem',
    '--mp-b': '1rem -1rem',
    '--mp-c': '1rem 1rem 1rem',
    '--mp-d': '1rem 1rem 1rem 1rem',
    '--mp-e': '0.3333rem',
    '--mp-f': '0.3517rem',
    '--mp-g': 'calc(100% - 1rem)',
  })
})
